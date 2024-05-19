from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Seeds the database with all initial data for users, studios, and reservations.'

    def handle(self, *args, **options):
        self.stdout.write("Starting full database seeding process...")

        self.stdout.write("Seeding users...")
        call_command('seed_users')
        self.stdout.write(self.style.SUCCESS('Successfully seeded users.'))

        self.stdout.write("Seeding studios...")
        call_command('seed_studios')
        self.stdout.write(self.style.SUCCESS('Successfully seeded studios.'))

        self.stdout.write("Seeding reservations...")
        call_command('seed_reservations')
        self.stdout.write(self.style.SUCCESS('Successfully seeded reservations.'))

        self.stdout.write(self.style.SUCCESS('Successfully completed full database seeding process.'))
