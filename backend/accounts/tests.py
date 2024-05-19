from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.settings import api_settings
from rest_framework.test import APITestCase


User = get_user_model()



class BaseTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.admin_user = User.objects.create_user(
            username="adminuser", password="adminpass", is_staff=True, is_superuser=True
        )
        cls.admin_token = RefreshToken.for_user(cls.admin_user).access_token

        cls.regular_user = User.objects.create_user(
            username="regularuser", password="regularpass", is_staff=False, is_superuser=False
        )
        cls.regular_token = RefreshToken.for_user(cls.regular_user).access_token

        # Create several unverified owner users
        cls.owners = [
            User.objects.create_user(
                username=f"owneruser{i}", password="ownerpass", user_type=User.STUDIO_OWNER, is_verified=False
            ) for i in range(11)
        ]

    def authenticate(self, token):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')


class TokenRefreshTests(BaseTestCase):
    def test_refresh_token_valid(self):
        refresh = RefreshToken.for_user(self.admin_user)
        response = self.client.post(reverse("token_refresh"), {"refresh": str(refresh)})
        self.assertIn("access", response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_refresh_token_invalid(self):
        response = self.client.post(
            reverse("token_refresh"), {"refresh": "invalidtoken"}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class OwnerVerificationTests(BaseTestCase):

    def test_list_unverified_owners_by_non_admin(self):
        self.authenticate(self.regular_token)
        url = reverse("accounts-api:users-needs-verification")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_unverified_owners(self):
        self.authenticate(self.admin_token)
        url = reverse("accounts-api:users-needs-verification")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(all(not owner['is_verified'] for owner in response.data['results']))

    def test_pagination_of_unverified_owners(self):
        self.authenticate(self.admin_token)
        # Verify that there are more items than the default page size
        self.assertTrue(len(self.owners) > api_settings.PAGE_SIZE)
        url = reverse("accounts-api:users-needs-verification")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Expect default page size items on the first page
        self.assertEqual(len(response.data['results']), api_settings.PAGE_SIZE)
        # Check for the presence of a 'next' link for pagination
        self.assertIsNotNone(response.data.get('next'))

        response_custom_page_size_2 = self.client.get(url+'?page_size=2')
        self.assertEqual(response_custom_page_size_2.status_code, status.HTTP_200_OK)
        # Expect 2 page size items on the first page
        self.assertEqual(len(response_custom_page_size_2.data['results']), 2)
        # Check for the presence of a 'next' link for pagination
        self.assertIsNotNone(response_custom_page_size_2.data.get('next'))
        
    def test_batch_verify_owners_by_non_admin(self):
        self.authenticate(self.regular_token)
        url = reverse("accounts-api:verify_owners-batch-verify")
        response = self.client.put(
            url,
            {"ids": [self.owners[1].id, self.owners[2].id], "is_verified": True},
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_verify_single_owner_by_non_admin(self):
        self.authenticate(self.regular_token)
        url = reverse("accounts-api:verify_owners-detail", kwargs={"pk": self.owners[1].pk})
        response = self.client.put(url, {"is_verified": True})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_batch_verify_owners(self):
        self.authenticate(self.admin_token)
        url = reverse("accounts-api:verify_owners-batch-verify")
        response = self.client.put(
            url,
            {"ids": [self.owners[1].id, self.owners[2].id], "is_verified": True},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.owners[1].refresh_from_db()
        self.owners[2].refresh_from_db()
        self.assertTrue(self.owners[1].is_verified)
        self.assertTrue(self.owners[2].is_verified)

    def test_verify_single_owner(self):
        self.authenticate(self.admin_token)
        url = reverse("accounts-api:verify_owners-detail", kwargs={"pk": self.owners[1].pk})
        response = self.client.put(url, {"is_verified": True})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.owners[1].refresh_from_db()
        self.assertTrue(self.owners[1].is_verified)



class UserPermissionTests(BaseTestCase):
    def test_allow_non_authenticated_user_create_customer(self):
        url = reverse("accounts-api:users-list")
        data = {
            "username": "user",
            "password": "pass",
            "user_type": "customer",
            "email": "user@example.com",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_allow_authenticated_admin_create_owner(self):
        self.authenticate(self.admin_token)
        url = reverse("accounts-api:users-list")
        data = {
            "username": "newowner",
            "password": "ownerpass",
            "user_type": "studio_owner",
            "email": "owner@example.com",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_allow_authenticated_admin_create_admin(self):
        self.authenticate(self.admin_token)
        url = reverse("accounts-api:users-list")
        data = {
            "username": "newadmin",
            "password": "adminpass",
            "user_type": "admin",
            "email": "admin@example.com",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_prevent_non_authenticated_user_create_admin(self):
        url = reverse("accounts-api:users-list")
        data = {"username": "admin", "password": "pass", "user_type": "admin", "email": "admin2@example.com"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_allow_authenticated_admin_delete_admin(self):
        self.authenticate(self.admin_token)
        admin_to_delete = User.objects.create_user(username="deleteadmin", password="pass", user_type="admin")
        url = reverse("accounts-api:users-detail", kwargs={"pk": admin_to_delete.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_prevent_non_authenticated_user_delete_admin(self):
        admin_to_delete = User.objects.create_user(username="deleteadmin2", password="pass", user_type="admin")
        url = reverse("accounts-api:users-detail", kwargs={"pk": admin_to_delete.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_allow_user_to_delete_themselves(self):
        self.authenticate(self.regular_token)
        url = reverse("accounts-api:users-detail", kwargs={"pk": self.regular_user.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_prevent_user_from_deleting_other_users(self):
        self.authenticate(self.regular_token)
        another_user = User.objects.create_user(username="otheruser", password="pass", user_type="customer")
        url = reverse("accounts-api:users-detail", kwargs={"pk": another_user.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_delete_other_users(self):
        self.authenticate(self.admin_token)
        user_to_delete = User.objects.create_user(username="userToDelete", password="pass", user_type="customer")
        url = reverse("accounts-api:users-detail", kwargs={"pk": user_to_delete.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

