from django.db import models
from accounts.models import CustomUser

class Studio(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    capacity = models.IntegerField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owned_studios')
    is_occupied = models.BooleanField(default=False)
    occupied_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='occupied_studios', null=True, blank=True)
    images = models.ManyToManyField('StudioImage', related_name='studios', blank=True)

    @property
    def reserved_periods(self):
        reservations = self.reservations.filter(status='active').order_by('start')
        return [f"{r.start.isoformat()}||{r.end.isoformat()}" for r in reservations]


    class Meta:
        ordering = ['name']  # Order by 'name' field, choose a field that makes sense for your model

    def __str__(self):
        return f"Studio name: {self.name} location: ({self.location}) capacity: ({self.capacity}) is_occupied: ({self.is_occupied}) occupied_by: ({self.occupied_by})"

class StudioImage(models.Model):
    image = models.ImageField(upload_to='studio_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)