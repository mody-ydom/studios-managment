from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework.parsers import MultiPartParser, FormParser

from accounts.models import CustomUser

from .models import Studio
from .serializers import StudioSerializer
from .permissions import CreateStudioPermission, IsOwnerOrAdmin, CanOccupyStudio

class StudioFilter(filters.FilterSet):
    location = filters.CharFilter(lookup_expr='icontains', help_text="Filter studios by location.")
    capacity = filters.NumberFilter(lookup_expr='gte', help_text="Filter studios based on minimum capacity.")
    is_occupied = filters.BooleanFilter(help_text="Filter studios based on the occupancy status.")
    occupied_by = filters.ModelChoiceFilter(queryset=CustomUser.objects.all(), field_name='occupied_by', to_field_name='id', help_text="Filter studios by the customer currently occupying them.")
    owner = filters.ModelChoiceFilter(queryset=CustomUser.objects.all(), field_name='owner', to_field_name='id', help_text="Filter studios by the studio owner.")

    class Meta:
        model = Studio
        fields = ['location', 'capacity', 'is_occupied', 'occupied_by', 'owner']

    
@extend_schema(tags=['2 - Studios'])
class StudioViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)

    queryset = Studio.objects.all()
    serializer_class = StudioSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = StudioFilter
    ordering_fields = ['name', 'location', 'capacity']
    ordering = ['name']
    def get_permissions(self):
        # Initialize an empty list for permission classes
        permission_classes = []

        # Check the action and assign the correct permission class
        if self.action == 'create':
            permission_classes = [CreateStudioPermission]
        elif self.action == 'occupy_studio':
            permission_classes = [CanOccupyStudio]
        elif self.action not in ['list', 'retrieve']:  # Exclude 'create' from this check
            permission_classes = [IsOwnerOrAdmin]
        else:
            permission_classes = [permissions.AllowAny]  # AllowAny can be changed to any other default permissions

        # Return the instantiated permission classes
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



    @extend_schema(
        summary="Occupy a Studio",
        description="Allows an admin to assign any customer to any studio, a studio owner to assign any customer to their own studios, and a customer to assign themselves to any studio. The studio must not already be occupied. Provide the 'occupied_by' parameter with the ID of the customer.",
        methods=['PUT'],
        request={
            'content': {
                'application/json': {
                    'example': {
                        'occupied_by': '123'  # example user ID to occupy the studio
                    }
                }
            }
        },
        responses={
            200: {
                'description': 'Studio occupied successfully',
                'content': {
                    'application/json': {
                        'example': {
                            'status': 'Studio occupied successfully'
                        }
                    }
                }
            },
            400: {
                'description': 'Bad request, for example when the studio is already occupied or the customer is trying to occupy a studio for someone else.',
                'content': {
                    'application/json': {
                        'example': {
                            'error': 'You can only occupy a studio for yourself'
                        }
                    }
                }
            },
            403: {
                'description': 'Forbidden, occurs when the user does not have permission to perform the action.',
                'content': {
                    'application/json': {
                        'example': {
                            'error': 'You do not have permission to perform this action'
                        }
                    }
                }
            },
            404: {
                'description': 'User not found, occurs when the provided user ID does not exist.',
                'content': {
                    'application/json': {
                        'example': {
                            'error': 'User not found'
                        }
                    }
                }
            }
        },
        parameters=[
            {'name': 'occupied_by', 'in': 'body', 'description': 'User ID of the customer to occupy the studio', 'required': True, 'type': 'integer'}
        ]
    )
    @action(detail=True, methods=['put'])
    def occupy_studio(self, request, pk=None):
        studio = self.get_object()
        user_id = request.data.get('occupied_by', None)

        # Admin and Studio Owner logic
        if request.user.is_superuser or (studio.owner == request.user and request.user.user_type == CustomUser.STUDIO_OWNER):
            if user_id is not None:
                try:
                    user = CustomUser.objects.get(pk=user_id)
                    studio.occupied_by = user
                    studio.is_occupied = True
                    studio.save()
                    return Response({'status': 'Studio occupied successfully'}, status=status.HTTP_200_OK)
                except CustomUser.DoesNotExist:
                    return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Customer logic
        elif request.user.user_type == CustomUser.CUSTOMER:
            if user_id and int(user_id) == request.user.id:
                studio.occupied_by = request.user
                studio.is_occupied = True
                studio.save()
                return Response({'status': 'Studio occupied by you successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'You can only occupy a studio for yourself'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'You do not have permission to perform this action'}, status=status.HTTP_403_FORBIDDEN)  

    @extend_schema(
        summary="List all Studios",
        description="Retrieve a list of all studios with optional filtering by location, capacity, and occupancy status. Filters can be applied using query parameters like ?location=xyz&capacity=50.",
        responses={200: StudioSerializer(many=True)},
        parameters=[
            {'name': 'location', 'description': 'Filter by location', 'required': False, 'type': 'string'},
            {'name': 'capacity', 'description': 'Filter by minimum capacity', 'required': False, 'type': 'integer'},
            {'name': 'is_occupied', 'description': 'Filter by occupancy status', 'required': False, 'type': 'boolean'}
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create a Studio",
        description="Create a new studio instance. The owner will be automatically assigned based on the authenticated user making the request.",
        responses={201: StudioSerializer},
        request=StudioSerializer,
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Retrieve a Studio",
        description="Retrieve details of a specific studio by ID.",
        responses={200: StudioSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        summary="Update a Studio",
        description="Update details of a specific studio. Only the owner or an admin can update studio details.",
        responses={200: StudioSerializer},
        request=StudioSerializer,
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Partially update a Studio",
        description="Partially update details of a specific studio. This is typically used for patching a subset of fields.",
        responses={200: StudioSerializer},
        request=StudioSerializer,
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(
        summary="Delete a Studio",
        description="Delete a specific studio. Only the owner or an admin can delete a studio.",
        responses={204: None}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)