from django.core.management.base import BaseCommand
from django.db import transaction
from accounts.models import CustomUser
from studios.models import Studio, StudioImage
from django.core.files.base import ContentFile
import urllib.request
import urllib.parse

class Command(BaseCommand):
    help = 'Seeds the database with initial studio data.'

    def handle(self, *args, **options):
        self.stdout.write("Seeding studios...")
        self.create_studios()
        self.stdout.write(self.style.SUCCESS('Successfully seeded studios.'))

    @transaction.atomic
    def create_studios(self):
        studio_owners = CustomUser.objects.filter(username__startswith='STUDIO_OWNER')
        studio_image_counts = [0, 1, 3, 5]  # Adjusted image counts based on your request

        for owner, count in zip(studio_owners, studio_image_counts):
            for i in range(count):
                studio = Studio.objects.create(
                    name=f'Studio {i+1} of {owner.username}',
                    location='Location ' + str(i),
                    capacity=100 + i * 5,
                    owner=owner,
                    is_occupied=False
                )
                if count > 0:
                    self.create_studio_images(studio, max(5, count))  # Ensure at least 5 images unless count is lower

    def create_studio_images(self, studio, number_of_images):
        for i in range(number_of_images):
            # Using custom text on each image and URL-encode the studio name
            encoded_studio_name = urllib.parse.quote(studio.name)
            image_url = f'https://via.placeholder.com/300.png?text={encoded_studio_name}+Image+{i+1}'
            # Fetch image content using urllib
            with urllib.request.urlopen(image_url) as response:
                image_content = response.read()
            # Using unique filename for each image
            unique_filename = f'{studio.name.replace(" ", "_")}_image_{i+1}.jpg'
            image = StudioImage()
            image.image.save(unique_filename, ContentFile(image_content))
            image.save()
            studio.images.add(image)
