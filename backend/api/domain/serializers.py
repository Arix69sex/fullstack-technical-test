from rest_framework import serializers
from api.domain.models import PetModel, AdoptionModel, UserModel

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetModel
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

class AdoptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdoptionModel
        fields = ['id', 'adopted_pet', 'adopter', 'adoption_date', 'status']