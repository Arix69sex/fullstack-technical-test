from rest_framework import serializers
from api.models import PetModel, AdoptionModel, UserModel

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetModel
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields =  ["id", "username", "password", "name", "lastname", "user_type"]
        extra_kwargs = {"password": {"write_only": True }}
    
    def create(self, validated_data):
        print(validated_data)
        user = UserModel.objects.create_user(**validated_data)
        return user

class AdoptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdoptionModel
        fields = ['id', 'adopted_pet', 'adopter', 'adoption_date', 'adoption_status']