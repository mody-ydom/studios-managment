from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial user data.'

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")
        users = self.create_users()
        self.stdout.write(self.style.SUCCESS('Successfully seeded the database.'))
        self.list_users(users)

    @transaction.atomic
    def create_users(self):
        users = []
        user_types = [
            (User.ADMIN, 3),
            (User.STUDIO_OWNER, 4),  # Creating an extra studio_owner to make one unverified
            (User.CUSTOMER, 3),
        ]

        for user_type, count in user_types:
            for i in range(count):
                username = f'{user_type}_{i+1}'
                is_verified = True if user_type != User.STUDIO_OWNER or i < 3 else False  # The fourth studio_owner is not verified
                user = User.objects.create_user(
                    username=username,
                    email=f'{username}@example.com',
                    password='testpassword123',
                    user_type=user_type,
                    is_verified=is_verified
                )
                if user_type == User.ADMIN:
                    user.is_staff = True
                    user.save()
                users.append(user)

        return users

    def list_users(self, users):
        self.stdout.write(self.style.SUCCESS('Listing all created users:'))
        for user in users:
            self.stdout.write(
                f'Username: {user.username}, Email: {user.email}, '
                f'User Type: {user.user_type}, Is Verified: {user.is_verified}, '
                f'Is Staff: {user.is_staff}'
            )
