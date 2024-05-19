from rest_framework import permissions
from .models import CustomUser

class CanOccupyStudio(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow if the user is trying to access the 'occupy_studio' action
        if view.action == 'occupy_studio':
            return (
                request.user.is_authenticated and
                (request.user.is_superuser or
                 request.user.user_type == CustomUser.STUDIO_OWNER or
                 request.user.user_type == CustomUser.CUSTOMER)
            )
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True  # Admin can modify any studio
        elif request.user.user_type == CustomUser.STUDIO_OWNER:
            return obj.owner == request.user  # Studio owners can modify their own studios
        elif request.user.user_type == CustomUser.CUSTOMER:
            # Customers can only set themselves as the occupant
            return request.data.get('occupied_by', None) == str(request.user.id)
        return False
    

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or admins to edit or delete it.

    Ensures that the owner of an object, or a superuser, has the permissions to modify or delete the object.
    This is particularly useful in scenarios where objects like studios have a specific owner, and stringent control over who can modify these objects is required.

    Methods:
        has_object_permission(request, view, obj) -> bool:
            Checks whether the request.user is the owner of the object or a superuser.

    Returns:
        bool: True if the user is the owner or superuser, False otherwise.
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or request.user.is_superuser



class CreateStudioPermission(permissions.BasePermission):
    """
    Custom permission to only allow studio owners and admins to create studios.

    This permission ensures that only users identified as 'STUDIO_OWNER' or superusers
    can create studio objects. This is crucial for maintaining control over who
    can add new entries to the database, ensuring that only authorized users
    have the capability to expand the list of studios.

    Methods:
        has_permission(request, view) -> bool:
            Determines if the user is either a studio owner or a superuser.

    Returns:
        bool: True if the user is a studio owner or superuser, False otherwise.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated and has the correct user_type or is a superuser
        if not request.user.is_authenticated:
            return False
        return request.user.user_type == CustomUser.STUDIO_OWNER or request.user.is_superuser