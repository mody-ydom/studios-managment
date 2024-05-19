from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from datetime import timedelta
from random import randint
from studios.models import Studio
from accounts.models import CustomUser
from reservations.models import Reservation

class Command(BaseCommand):
    help = 'Seeds the database with initial reservation data.'

    def handle(self, *args, **options):
        self.stdout.write("Seeding reservations...")
        self.create_reservations()
        self.stdout.write(self.style.SUCCESS('Successfully seeded reservations.'))

    @transaction.atomic
    def create_reservations(self):
        studios = Studio.objects.all()
        customers = CustomUser.objects.filter(user_type=CustomUser.CUSTOMER)[:3]  # Assuming there are at least 3 customers

        if not studios or studios.count() < 3:
            self.stdout.write(self.style.ERROR('Not enough studios to seed reservations.'))
            return
        
        # Define the reservation dates
        date_ranges = self.get_date_ranges()

        for studio in studios:
            for date_range, status in date_ranges:
                for _ in range(3):  # Create 3 reservations for each type per studio
                    self.create_reservation(
                        studio,
                        customers[randint(0, 2)],  # Randomly select a customer
                        date_range[0],
                        date_range[1],
                        status
                    )

    def create_reservation(self, studio, customer, start, end, status):
        # Check for overlapping active reservations
        if status == Reservation.ACTIVE:
            if Reservation.objects.filter(studio=studio, end__gt=start, start__lt=end, status=Reservation.ACTIVE).exists():
                return  # Skip creating this reservation to avoid overlap

        Reservation.objects.create(
            studio=studio,
            customer=customer,
            start=start,
            end=end,
            status=status
        )

    def get_date_ranges(self):
        today = timezone.now().date()
        start_of_this_week = today - timedelta(days=today.weekday())  # Monday of this week
        start_of_next_week = start_of_this_week + timedelta(days=7)

        past_active = [(today - timedelta(days=randint(10, 20)), today - timedelta(days=randint(3, 9))) for _ in range(3)]
        this_week_active = [(start_of_this_week + timedelta(days=i), start_of_this_week + timedelta(days=i+randint(1, 3))) for i in range(0, 7, 2)]
        next_week_active = [(start_of_next_week + timedelta(days=i), start_of_next_week + timedelta(days=i+randint(1, 3))) for i in range(0, 7, 2)]
        this_week_cancelled = [(start_of_this_week + timedelta(days=i), start_of_this_week + timedelta(days=i+randint(1, 3))) for i in range(1, 7, 2)]

        # Return tuples of (date_range, status)
        return [(date, Reservation.ACTIVE) for date in past_active + this_week_active + next_week_active] + \
               [(date, Reservation.CANCELLED) for date in this_week_cancelled]
