from rest_framework import permissions
from accounts.models import CustomUser

class ReservationAccessControl(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.user.user_type == CustomUser.ADMIN:
                return True
            if request.user.user_type == CustomUser.STUDIO_OWNER:
                return obj.studio.owner == request.user
            if request.user.user_type == CustomUser.CUSTOMER:
                return obj.customer == request.user
        return False