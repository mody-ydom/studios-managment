from rest_framework import serializers
from studios.serializers import StudioSerializer
from accounts.serializers import UserRegistrationSerializer
from studios.models import Studio
from accounts.models import CustomUser
from .models import Reservation
from django.core.exceptions import ValidationError

class ReservationSerializer(serializers.ModelSerializer):
    studio = serializers.PrimaryKeyRelatedField(queryset=Studio.objects.all())
    customer = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Reservation
        fields = ['id', 'start', 'end', 'studio', 'customer', 'status']
        read_only_fields = ['id']
    def validate(self, data):
        start = data.get('start', self.instance.start if self.instance else None)
        end = data.get('end', self.instance.end if self.instance else None)

        if start and end:
            if start >= end:
                raise ValidationError("End time must be after start time.")

        if 'studio' in data or start or end:
            studio = data.get('studio', self.instance.studio if self.instance else None)
            overlapping_reservations = Reservation.objects.filter(
                studio=studio,
                end__gt=start,
                start__lt=end,
                status=Reservation.ACTIVE
            )

            if self.instance:
                overlapping_reservations = overlapping_reservations.exclude(id=self.instance.id)

            if overlapping_reservations.exists():
                raise ValidationError("There is an overlap with another reservation.")

        return data