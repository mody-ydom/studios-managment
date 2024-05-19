from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import StudioViewSet

app_name = 'studios-api'
router = SimpleRouter()
router.register(r'', StudioViewSet, basename='studios')

urlpatterns = [
    path("", include(router.urls)),
]
