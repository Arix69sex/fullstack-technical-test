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
    adopted_pet = PetSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    adopted_pet_id = serializers.PrimaryKeyRelatedField(queryset=PetModel.objects.all(), source='adopted_pet', write_only=True)
    adopter_id = serializers.PrimaryKeyRelatedField(queryset=UserModel.objects.all(), source='adopter', write_only=True)

    class Meta:
        model = AdoptionModel
        fields = ['id', 'adopted_pet', 'adopter', 'adoption_date', 'status', 'adopted_pet_id', 'adopter_id']