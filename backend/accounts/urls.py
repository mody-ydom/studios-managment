from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import OwnerVerificationViewSet, UserViewSet

app_name = 'accounts-api'
router = SimpleRouter()
router.register(r'', UserViewSet, basename='users')
router.register(r"verify_owners", OwnerVerificationViewSet, basename="verify_owners")

urlpatterns = [
    path("", include(router.urls)),
]
