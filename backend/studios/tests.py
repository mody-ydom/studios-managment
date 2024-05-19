from django.utils import timezone
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Studio
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import tempfile
from django.core.files.storage import default_storage

from .models import Studio, StudioImage
from reservations.models import Reservation


User = get_user_model()

def create_test_image():
    image = Image.new('RGB', (100, 100), color = 'red')
    temp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
    image.save(temp_file)
    temp_file.seek(0)
    return temp_file


class BaseTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.all().delete()
        Studio.objects.all().delete()
        Reservation.objects.all().delete()
    
        cls.image = SimpleUploadedFile(
            "test_image.jpg",
            b"dummy data",  # This can be an actual image byte data or just dummy content.
            content_type="image/jpeg"
        )

        cls.admin = User.objects.create_user(
            username="admin",
            email="admin@test.com",
            password="admin123",
            is_superuser=True,
        )
        cls.owner = User.objects.create_user(
            username="owner1",
            email="owner1@test.com",
            password="owner123",
            user_type=User.STUDIO_OWNER,
        )
        cls.owner2 = User.objects.create_user(
            username="owner2",
            email="owner2@test.com",
            password="owner234",
            user_type=User.STUDIO_OWNER,
        )
        cls.customer = User.objects.create_user(
            username="customer",
            email="customer@test.com",
            password="customer123",
            user_type=User.CUSTOMER,
        )
        cls.studio = Studio.objects.create(
            name="Test Studio", location="City Center", capacity=50, owner=cls.owner
        )
        cls.studio2 = Studio.objects.create(
            name="Studio Two", location="Suburb", capacity=30, owner=cls.owner2
        )
        
        cls.reservation = Reservation.objects.create(
            studio=cls.studio,            
            customer=cls.customer,
            start=timezone.make_aware(timezone.datetime(2023, 1, 1)),
            end=timezone.make_aware(timezone.datetime(2023, 1, 2)),
            status=Reservation.ACTIVE
        )

    def authenticate(self, user):
        refresh = RefreshToken.for_user(user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
    
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls.image.close()  

class StudioListFilterTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.authenticate(self.admin)
        # Additional setup for occupied status
        self.studio2.is_occupied = True
        self.studio2.occupied_by = self.customer
        self.studio2.save()

    def test_list_studios_by_owner(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url, {"owner": self.owner.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["count"], 1
        )  # Expect only one studio owned by 'owner1'
        self.assertEqual(response.data["results"][0]["name"], "Test Studio")

    def test_list_studios_by_occupied_by(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url, {"occupied_by": self.customer.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["count"], 1
        )  # Expect only one studio occupied by 'customer'
        self.assertEqual(response.data["results"][0]["name"], "Studio Two")

    def test_list_studios_by_combination_of_filters(self):
        url = reverse("studios-api:studios-list")
        # Combination filter: owner and occupied_by
        response = self.client.get(
            url,
            {
                "owner": self.owner2.id,
                "occupied_by": self.customer.id,
                "is_occupied": True,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["count"], 1
        )  # Expect the specific studio that matches all criteria
        self.assertEqual(response.data["results"][0]["name"], "Studio Two")

    def test_list_studios_without_filters(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 2)

    def test_list_studios_by_location(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url, {"location": "City Center"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["name"], "Test Studio")

    def test_list_studios_by_capacity(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url, {"capacity": 40})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["name"], "Test Studio")

    def test_list_studios_by_occupation_status_true(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url, {"is_occupied": True})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["name"], "Studio Two")

    def test_list_studios_by_occupation_status_false(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url, {"is_occupied": False})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["name"], "Test Studio")


class AdminStudioTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.authenticate(self.admin)
    def test_admin_create_studio(self):
        url = reverse("studios-api:studios-list")
        data = {"name": "Admin Studio", "location": "Downtown", "capacity": 120}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_admin_update_studio(self):
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        data = {"name": "Updated Admin Studio"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_admin_delete_studio(self):
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class OwnerStudioTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.authenticate(self.owner)
    def test_owner_create_studio(self):
        self.authenticate(self.owner)
        url = reverse("studios-api:studios-list")
        data = {"name": "Owner Studio", "location": "Uptown", "capacity": 80}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_owner_update_own_studio(self):
        self.authenticate(self.owner)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        data = {"name": "Updated Owner Studio"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_delete_own_studio(self):
        self.authenticate(self.owner)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_owner_cannot_update_other_owner_studio(self):
        self.authenticate(self.owner)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio2.id})
        response = self.client.patch(url, {"name": "Illegal Update"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_owner_cannot_delete_other_owner_studio(self):
        self.authenticate(self.owner)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio2.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CustomerStudioTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.authenticate(self.customer)

    def test_customer_cannot_create_studio(self):
        url = reverse("studios-api:studios-list")
        data = {"name": "Customer Studio", "location": "Suburb", "capacity": 40}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_customer_cannot_update_studio(self):
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        response = self.client.patch(url, {"name": "Illegal Update"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_customer_cannot_delete_studio(self):
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class StudioImageUploadTests(BaseTestCase):
    def tearDown(self):
        # Delete test images after each test method
        for image in StudioImage.objects.all():
            # This assumes your image field is named 'image'
            if image.image:
                default_storage.delete(image.image.path)
        super().tearDown()
    def test_create_studio_with_images(self):
        self.authenticate(self.admin)
        url = reverse("studios-api:studios-list")
        data = {
            'name': 'New Studio with Image',
            'location': 'Downtown',
            'capacity': 100,
            'images': [self.image]
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('images' in response.data)
        self.assertEqual(len(response.data['images']), 1)

    def test_update_studio_add_images(self):
        self.authenticate(self.admin)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        data = {'images': [self.image]}
        response = self.client.patch(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('images' in response.data)
        self.assertEqual(len(response.data['images']), 1)  # assuming no images previously

class StudioReservedPeriodsTests(BaseTestCase):
    def test_reserved_periods_serialization(self):
        self.authenticate(self.admin)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('reserved_periods', response.data)
        self.assertEqual(response.data['reserved_periods'], ['2023-01-01T00:00:00+00:00||2023-01-02T00:00:00+00:00'])


class StudioOccupationTests(BaseTestCase):
    def test_customer_occupy_studio_for_self(self):
        self.authenticate(self.customer)
        url = reverse(
            "studios-api:studios-occupy-studio", kwargs={"pk": self.studio.id}
        )
        response = self.client.put(url, {"occupied_by": self.customer.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_customer_cannot_occupy_studio_for_others(self):
        self.authenticate(self.customer)
        url = reverse(
            "studios-api:studios-occupy-studio", kwargs={"pk": self.studio.id}
        )
        response = self.client.put(url, {"occupied_by": self.owner.id})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_occupy_studio(self):
        url = reverse(
            "studios-api:studios-occupy-studio", kwargs={"pk": self.studio.id}
        )
        response = self.client.put(url, {"occupied_by": self.customer.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_can_occupy_any_studio(self):
        self.authenticate(self.admin)
        url = reverse(
            "studios-api:studios-occupy-studio", kwargs={"pk": self.studio.id}
        )
        response = self.client.put(url, {"occupied_by": self.customer.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_can_occupy_own_studio(self):
        self.authenticate(self.owner)
        url = reverse(
            "studios-api:studios-occupy-studio", kwargs={"pk": self.studio.id}
        )
        response = self.client.put(url, {"occupied_by": self.customer.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_cannot_occupy_other_studios(self):
        self.authenticate(self.owner)
        url = reverse(
            "studios-api:studios-occupy-studio", kwargs={"pk": self.studio2.id}
        )
        response = self.client.put(url, {"occupied_by": self.customer.id})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class StudioPermissionTests(BaseTestCase):
    def test_unauthenticated_user_access(self):
        url = reverse("studios-api:studios-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_customer_access_to_protected_studio_action(self):
        self.authenticate(self.customer)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        response = self.client.patch(url, {"name": "Attempted Unauthorized Update"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_owner_access_to_protected_action_on_other_studio(self):
        self.authenticate(self.owner)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio2.id})
        response = self.client.patch(url, {"name": "Attempted Cross Ownership Update"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_access_to_protected_actions(self):
        self.authenticate(self.admin)
        url = reverse("studios-api:studios-detail", kwargs={"pk": self.studio.id})
        response = self.client.patch(url, {"name": "Admin Authorized Update"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
