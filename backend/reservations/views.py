from rest_framework import viewsets, status
from rest_framework.response import Response
from django.utils import timezone
import datetime
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Reservation
from .serializers import ReservationSerializer
from .permissions import ReservationAccessControl
from accounts.models import CustomUser
from studios.models import Studio
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse

class ReservationFilter(filters.FilterSet):
    upcoming = filters.BooleanFilter(method='filter_upcoming', help_text="Filter upcoming reservations based on the current time.")
    past = filters.BooleanFilter(method='filter_past', help_text="Filter upcoming reservations based on the current time.")
    studio = filters.ModelChoiceFilter(queryset=Studio.objects.all(), help_text="Filter reservations by studio.")
    customer = filters.ModelChoiceFilter(queryset=CustomUser.objects.all(), help_text="Filter reservations by customer.")
    status = filters.ChoiceFilter(choices=Reservation.STATUS_CHOICES, help_text="Filter reservations by status.")
    owner = filters.ModelChoiceFilter(queryset=CustomUser.objects.all(), field_name='studio__owner', to_field_name='id', help_text="Filter reservations by the numeric ID of the studio owner.")

    class Meta:
        model = Reservation
        fields = []

    def filter_upcoming(self, queryset, name, value):
        if value:
            return queryset.filter(start__gte=timezone.now())
        return queryset

    def filter_past(self, queryset, name, value):
        if value:
            return queryset.filter(start__lt=timezone.now())
        return queryset

    def filter_by_owner(self, queryset, name, value):
        return queryset.filter(studio__owner=value)

@extend_schema(tags=['3 - Reservations'])
class ReservationViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing reservation instances.
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [ReservationAccessControl]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReservationFilter
    def get_queryset(self):
        """
        Returns reservations based on the user's type.
        Admins get access to all reservations, studio owners to those linked to their studios,
        and customers to their own reservations.
        """
        user = self.request.user
        if user.user_type == CustomUser.ADMIN:
            return Reservation.objects.all()
        elif user.user_type == CustomUser.STUDIO_OWNER:
            return Reservation.objects.filter(studio__owner=user)
        elif user.user_type == CustomUser.CUSTOMER:
            return Reservation.objects.filter(customer=user)
        return Reservation.objects.none()

    @extend_schema(
        summary="Partially update a Reservation",
        description="Partially updates a reservation with the provided fields. All other fields remain unchanged.",
        responses={200: ReservationSerializer},
        methods=['PATCH'],
        request=ReservationSerializer
    )
    def partial_update(self, request, *args, **kwargs):
        """
        Handles partial updates to a reservation.
        """
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(
        summary="Delete a Reservation",
        description="Deletes a reservation. Restrictions apply based on user type and timing relative to the reservation's start.",
        responses={
            204: OpenApiResponse(description="Reservation deleted successfully"),
            406: OpenApiResponse(description="Cannot delete reservation within 24 hours of start time"),
            403: OpenApiResponse(description="Unauthorized to delete the reservation")
        }
    )
    def destroy(self, request, *args, **kwargs):
        """
        Deletes a reservation if the user is allowed to do so.
        Non-staff users cannot delete a reservation within 24 hours of its start time.
        """
        reservation = self.get_object()
        if not request.user.is_staff and reservation.start - timezone.now() < datetime.timedelta(hours=24):
            return Response(
                {"error": "Cannot delete reservation within 24 hours of start time."},
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )
        return super().destroy(request, *args, **kwargs)

    @extend_schema(
        summary="List all Reservations",
        description="Retrieve a list of all reservations available to the authenticated user. Filters can be applied to refine the list based on studio, customer, and reservation status.",
        responses={200: ReservationSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create a Reservation",
        description="Create a new reservation instance. Necessary details such as start and end times, customer, and studio must be provided.",
        responses={201: ReservationSerializer},
        request=ReservationSerializer
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Retrieve a Reservation",
        description="Retrieve details of a specific reservation by ID. Only accessible if the user has the right permissions based on their role (admin, studio owner, or customer).",
        responses={200: ReservationSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        summary="Update a Reservation",
        description="Update details of a specific reservation. Modifications are allowed based on user roles and specific business rules (e.g., cannot modify past reservations).",
        responses={200: ReservationSerializer},
        request=ReservationSerializer
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
