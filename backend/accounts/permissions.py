from rest_framework import permissions
from .models import CustomUser

class CreateUserPermission(permissions.BasePermission):
    """
    Custom permission to only allow admins to create admin users.
    Allows creation of non-admin users by anyone.
    """
    def has_permission(self, request, view):
        # Allow user creation if no user is logged in or if the user is not trying to create an admin
        if not request.user.is_authenticated and request.data.get('user_type') != CustomUser.ADMIN:
            return True
        if request.user.is_authenticated and request.data.get('user_type') == CustomUser.ADMIN:
            return request.user.is_superuser or request.user.is_staff
        return True

class DeleteUserPermission(permissions.BasePermission):
    """
    Custom permission to allow users to delete their own account or allow admins to delete any account.
    """
    def has_object_permission(self, request, view, obj):
        # Allow users to delete their own account or admins to delete any account
        return obj == request.user or request.user.is_superuser or request.user.is_staff
