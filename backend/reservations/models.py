from django.db import models
from accounts.models import CustomUser
from studios.models import Studio
from django.utils import timezone

class Reservation(models.Model):
    ACTIVE = 'active'
    CANCELLED = 'cancelled'
    STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (CANCELLED, 'Cancelled'),
    ]

    start = models.DateTimeField()
    end = models.DateTimeField()
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='reservations')
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reservations')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=ACTIVE)

    class Meta:
        ordering = ['start', 'end']  # Order by start and end times

    def __str__(self):
        return f'Reservation at {self.studio.name}:{self.studio.id} from {self.start} to {self.end} - Status: {self.status}'