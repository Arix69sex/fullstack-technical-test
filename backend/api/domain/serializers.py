from rest_framework import serializers
from .models import PetModel, VolunteerModel, AdopterModel, AdoptionModel

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetModel
        fields = '__all__'


class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerModel
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class AdopterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdopterModel
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class AdoptionSerializer(serializers.ModelSerializer):
    adopted_pet = PetSerializer(read_only=True)
    adopter = AdopterSerializer(read_only=True)
    adopted_pet_id = serializers.PrimaryKeyRelatedField(queryset=PetModel.objects.all(), source='adopted_pet', write_only=True)
    adopter_id = serializers.PrimaryKeyRelatedField(queryset=AdopterModel.objects.all(), source='adopter', write_only=True)

    class Meta:
        model = AdoptionModel
        fields = ['id', 'adopted_pet', 'adopter', 'adoption_date', 'status', 'adopted_pet_id', 'adopter_id']