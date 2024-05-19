from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import CustomUser

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'user_type', 'is_staff', 'is_verified')
        extra_kwargs = {
            'password': {'write_only': True, 'help_text': 'Password for the user, write-only for security'},
            'is_staff': {'read_only': True, 'help_text': 'Indicates if the user is an admin. Set internally.'},
            'is_verified': {'read_only': True, 'help_text': 'Indicates if the Studio Owner is verified by an admin. Set internally.'},
            'id': {'read_only': True, 'help_text': 'user generated id. Set internally.'},
        }

    def create(self, validated_data):
        user_type = validated_data.get('user_type', CustomUser.CUSTOMER)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=user_type
        )
        # Set is_staff to True if the user_type is ADMIN and the request is authorized
        if user_type == CustomUser.ADMIN:
            user.is_staff = True
            user.save()
        return user
    
class OwnerVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'is_verified', 'username', 'email'] 
        read_only_fields = ['id', 'username', 'email', 'is_verified']

 
class BatchVerifySerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.IntegerField(),
        help_text="List of user IDs to verify."
    )


class TokenSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

class LoginResponseSerializer(serializers.Serializer):
    tokens = TokenSerializer()
    user = UserRegistrationSerializer()
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User is deactivated.")
                return user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")