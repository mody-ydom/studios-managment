from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ADMIN = 'admin'
    STUDIO_OWNER = 'studio_owner'
    CUSTOMER = 'customer'
    USER_TYPE_CHOICES = [
        (ADMIN, 'Admin'),
        (STUDIO_OWNER, 'Studio Owner'),
        (CUSTOMER, 'Customer'),
    ]

    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default=CUSTOMER)

    is_verified = models.BooleanField(default=False)
    

    class Meta:
        ordering = ['username']  # Order by 'name' field, choose a field that makes sense for your model


    def __str__(self):
        return 'name: '+ self.username + '\ntype: ' + self.user_type + ('\nis_verified: ' + self.is_verified if self.user_type==self.STUDIO_OWNER else '')
