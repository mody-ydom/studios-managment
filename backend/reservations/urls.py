from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ReservationViewSet

app_name = 'reservations-api'
router = SimpleRouter()
router.register(r'', ReservationViewSet, basename='reservations')

urlpatterns = [
    path("", include(router.urls)),
]
