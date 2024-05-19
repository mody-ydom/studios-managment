from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Reservation
from studios.models import Studio
from django.urls import reverse
from rest_framework import status
import datetime
from django.utils import timezone
from django.utils.dateparse import parse_datetime


User = get_user_model()


class BaseTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Clear all data to start fresh
        User.objects.all().delete()
        Studio.objects.all().delete()
        Reservation.objects.all().delete()

        # Setup users
        cls.admin = User.objects.create_superuser(
            username="admin",
            email="admin@test.com",
            password="admin123",
            user_type=User.ADMIN,
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
        cls.customer2 = User.objects.create_user(
            username="customer2",
            email="customer2@test.com",
            password="customer234",
            user_type=User.CUSTOMER,
        )

        # Setup studios
        cls.studio = Studio.objects.create(
            name="Test Studio", location="City Center", capacity=50, owner=cls.owner
        )
        cls.studio2 = Studio.objects.create(
            name="Studio Two", location="Suburb", capacity=30, owner=cls.owner2
        )

        current_start = timezone.now()
        current_end = current_start + datetime.timedelta(hours=2)

        cls.reservation = Reservation.objects.create(
            start=current_start.isoformat(),
            end=current_end.isoformat(),
            studio=cls.studio,
            customer=cls.customer,
            status="active",
        )

        cls.reservation2 = Reservation.objects.create(
            start=current_start.isoformat(),
            end=current_end.isoformat(),
            studio=cls.studio2,
            customer=cls.customer2,
            status="active",
        )

        future_start = timezone.now() + datetime.timedelta(days=2)
        future_end = future_start + datetime.timedelta(hours=2)

        cls.reservation_after_2days = Reservation.objects.create(
            start=future_start.isoformat(),
            end=future_end.isoformat(),
            studio=cls.studio,
            customer=cls.customer,
            status="active",
        )

    def authenticate(self, user):
        refresh = RefreshToken.for_user(user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")


class TestAdminPermissions(BaseTestCase):
    def test_admin_can_access_any_reservation(self):
        self.authenticate(self.admin)
        url = reverse("reservations-api:reservations-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_admin_can_delete_any_reservation(self):
        self.authenticate(self.admin)
        url = reverse(
            "reservations-api:reservations-detail", kwargs={"pk": self.reservation.id}
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestOwnerPermissions(BaseTestCase):
    def test_owner_can_access_own_studio_reservations(self):
        self.authenticate(self.owner)
        url = reverse(
            "reservations-api:reservations-detail", kwargs={"pk": self.reservation.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_cannot_access_other_studio_reservations(self):
        self.authenticate(self.owner2)
        url = reverse(
            "reservations-api:reservations-detail", kwargs={"pk": self.reservation.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_owner_can_delete_own_reservation_before_24h(self):
        self.authenticate(self.owner)
        url = reverse(
            "reservations-api:reservations-detail",
            kwargs={"pk": self.reservation_after_2days.id},
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_owner_cannot_delete_own_reservation_after_24h(self):
        self.authenticate(self.owner)
        url = reverse(
            "reservations-api:reservations-detail", kwargs={"pk": self.reservation.id}
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_406_NOT_ACCEPTABLE)


class TestCustomerPermissions(BaseTestCase):
    def test_customer_can_access_own_reservation(self):
        self.authenticate(self.customer)
        url = reverse(
            "reservations-api:reservations-detail", kwargs={"pk": self.reservation.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_customer_cannot_access_other_customer_reservations(self):
        self.authenticate(self.customer)
        url = reverse(
            "reservations-api:reservations-detail", kwargs={"pk": self.reservation2.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_customer_can_delete_own_reservation_before_24h(self):
        self.authenticate(self.customer)
        url = reverse(
            "reservations-api:reservations-detail",
            kwargs={"pk": self.reservation_after_2days.id},
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_customer_cannot_delete_own_reservation_after_24h(self):
        self.authenticate(self.customer)
        url = reverse(
            "reservations-api:reservations-detail", kwargs={"pk": self.reservation.id}
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_406_NOT_ACCEPTABLE)

class TestReservationSerialization(BaseTestCase):
    def test_reservation_serialization(self):
        self.authenticate(self.admin)
        url = reverse("reservations-api:reservations-detail", kwargs={"pk": self.reservation.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.reservation.id)

        # Convert string to datetime and make it timezone-aware if necessary
        api_start_datetime = parse_datetime(response.data['start'])
        db_start_datetime = parse_datetime(self.reservation.start)
        if not timezone.is_aware(db_start_datetime):
            db_start_datetime = timezone.make_aware(db_start_datetime, timezone.get_default_timezone())

        self.assertEqual(api_start_datetime, db_start_datetime)

        # Repeat for the 'end' datetime
        api_end_datetime = parse_datetime(response.data['end'])
        db_end_datetime = parse_datetime(self.reservation.end)
        if not timezone.is_aware(db_end_datetime):
            db_end_datetime = timezone.make_aware(db_end_datetime, timezone.get_default_timezone())

        self.assertEqual(api_end_datetime, db_end_datetime)
        self.assertEqual(response.data['studio'], self.studio.id)
        self.assertEqual(response.data['customer'], self.reservation.customer.id)
        self.assertEqual(response.data['status'], self.reservation.status)

class TestReservationActions(BaseTestCase):
    def test_reservation_list_admin(self):
        self.authenticate(self.admin)
        url = reverse("reservations-api:reservations-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 3)  # Ensure data is returned

    def test_reservation_list_owner(self):
        self.authenticate(self.owner)
        url = reverse("reservations-api:reservations-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)  # Ensure data is returned

    def test_reservation_list_customer(self):
        self.authenticate(self.customer)
        url = reverse("reservations-api:reservations-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)  # Ensure data is returned

    def test_create_reservation(self):
        self.authenticate(self.customer)
        url = reverse("reservations-api:reservations-list")
        new_reservation_data = {
            "start": (timezone.now() + datetime.timedelta(days=3)).isoformat(),
            "end": (timezone.now() + datetime.timedelta(days=3, hours=2)).isoformat(),
            "studio": self.studio.id,
            "customer": self.customer.id,
            "status": Reservation.ACTIVE
        }
        response = self.client.post(url, new_reservation_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_reservation_with_overlap(self):
        self.authenticate(self.customer)
        url = reverse("reservations-api:reservations-list")
        new_reservation_data = {
            "start": (timezone.now() + datetime.timedelta(days=2, hours=1)).isoformat(),
            "end": (timezone.now() + datetime.timedelta(days=2, hours=3)).isoformat(),
            "studio": self.studio.id,
            "customer": self.customer.id,
            "status": Reservation.ACTIVE
        }
        response = self.client.post(url, new_reservation_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_reservation(self):
        self.authenticate(self.owner)
        url = reverse("reservations-api:reservations-detail", kwargs={"pk": self.reservation.id})
        update_data = {"status": "cancelled"}
        response = self.client.patch(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'cancelled')