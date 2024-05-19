from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from .permissions import CreateUserPermission, DeleteUserPermission
from .models import CustomUser
from .serializers import (
    BatchVerifySerializer,
    LoginResponseSerializer,
    LoginSerializer,
    UserRegistrationSerializer,
    OwnerVerificationSerializer,
)
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@extend_schema(tags=["1 - Users"])
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer
    ordering = ["username"]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["create"]:
            permission_classes = [CreateUserPermission]
        elif self.action in ["destroy"]:
            permission_classes = [DeleteUserPermission]
        elif self.action in ["needs_verification"]:
            permission_classes = [permissions.IsAdminUser]
        elif self.action in ["login"]:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @extend_schema(
        summary="Create a new user",
        description="Creates a new user with the given details. Admins can create other admin accounts.",
        request=UserRegistrationSerializer,
        responses={201: OpenApiResponse(description="User created successfully")},
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            user = serializer.instance
            user_data = UserRegistrationSerializer(user).data

            return Response(
                {
                    "user": user_data,
                    "tokens": get_tokens_for_user(user),
                    "message": "User created successfully. Please log in to get your token.",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        user_type = serializer.validated_data.get("user_type", CustomUser.CUSTOMER)
        if user_type == CustomUser.ADMIN:
            if not (self.request.user.is_staff or self.request.user.is_superuser):
                raise PermissionDenied("Only admins can create other admin accounts.")
        serializer.save()

    @extend_schema(
        summary="Delete a user",
        description="Deletes a user. Users can only delete themselves unless they are admin.",
        responses={204: OpenApiResponse(description="User deleted successfully")},
    )
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not (
            instance == request.user
            or request.user.is_superuser
            or request.user.is_staff
        ):
            raise PermissionDenied("You do not have permission to delete this user.")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(
        summary="List all users",
        description="List detailed information about all users.",
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


    @extend_schema(
        summary="Retrieve a user",
        description="Retrieves detailed information about a user. If no ID is provided, it retrieves the current authenticated user.",
    )
    def retrieve(self, request, *args, **kwargs):
        # Check if an ID is provided in the URL
        if "pk" in kwargs:
            user_id = kwargs["pk"]
            if request.user.is_authenticated:
                if (
                    request.user.id == int(user_id)
                    or request.user.is_superuser
                    or request.user.is_staff
                ):
                    return super().retrieve(request, *args, **kwargs)
                else:
                    serializer = self.get_serializer(request.user)
                    return Response(serializer.data)
            else:
                raise PermissionDenied("You need to be authenticated to view user details.")
        else:
            # If no ID is provided, return the current authenticated user
            if request.user.is_authenticated:
                serializer = self.get_serializer(request.user)
                return Response(serializer.data)
            else:
                raise PermissionDenied("You need to be authenticated to view user details.")

        return Response(status=status.HTTP_404_NOT_FOUND)

    @extend_schema(
        summary="Update a user",
        description="Updates the specified user with the provided data.",
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Partially update a user",
        description="Partially updates the specified user with the provided data.",
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(
        methods=["post"],
        summary="Login user",
        description="Authenticates a user and returns tokens if credentials are valid.",
        request=LoginSerializer,
        responses={
            200: OpenApiResponse(
                response=LoginResponseSerializer, description="Login successful"
            ),
            400: OpenApiResponse(description="Invalid credentials"),
        },
    )
    @action(methods=["post"], detail=False, permission_classes=[permissions.AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            tokens = get_tokens_for_user(user)
            user_data = UserRegistrationSerializer(user).data
            return Response(
                {"tokens": tokens, "user": user_data}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        methods=["GET"],
        summary="List unverified owners",
        description="Lists all studio owners who have not been verified. Accessible only by admins.",
        responses={200: OwnerVerificationSerializer(many=True)},
    )
    @action(methods=["get"], detail=False)
    def needs_verification(self, request):
        queryset = CustomUser.objects.filter(
            user_type=CustomUser.STUDIO_OWNER, is_verified=False
        )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@extend_schema(tags=["1 - Users"])
class OwnerVerificationViewSet(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = OwnerVerificationSerializer

    @extend_schema(
        summary="Verify a single owner",
        description="Verifies the owner with the specified ID.",
        responses={200: OpenApiResponse(description="Owner verified")},
    )
    def update(self, request, pk=None):
        queryset = CustomUser.objects.get(pk=pk)
        queryset.is_verified = True
        queryset.save()
        return Response({"status": "verified"}, status=status.HTTP_200_OK)

    @extend_schema(
        methods=["PUT"],
        summary="Batch verify owners",
        description="Verifies a batch of owners identified by their IDs.",
        request=BatchVerifySerializer,
        responses={200: OpenApiResponse(description="Owners verified in batch")},
    )
    @action(methods=["put"], detail=False, serializer_class=BatchVerifySerializer)
    def batch_verify(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            ids = serializer.validated_data["ids"]
            CustomUser.objects.filter(id__in=ids).update(is_verified=True)
            return Response({"status": "batch verified"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
