from rest_framework import serializers
from .models import Studio, StudioImage

class StudioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioImage
        fields = ['id', 'image']

class StudioSerializer(serializers.ModelSerializer):
    reserved_periods = serializers.ReadOnlyField()
    images = StudioImageSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Studio
        fields = ['id', 'name', 'location', 'capacity', 'owner', 'occupied_by', 'is_occupied', 'reserved_periods', 'images']
        read_only_fields = ['owner', 'occupied_by', 'is_occupied', 'reserved_periods', 'images']

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        studio = Studio.objects.create(**validated_data)
        for image_data in images_data:
            image_instance = StudioImage.objects.create(image=image_data)
            studio.images.add(image_instance)
        return studio

    def update(self, instance, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        removed_images = self.context['request'].data.getlist('removedImages')

        # Handling removed images
        for image_id in removed_images:
            image_instance = StudioImage.objects.filter(id=image_id).first()
            if image_instance:
                image_instance.delete()

        # Adding new images
        for image_data in images_data:
            image_instance = StudioImage.objects.create(image=image_data)
            instance.images.add(image_instance)

        return super().update(instance, validated_data)
