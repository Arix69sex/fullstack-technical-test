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
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class AdoptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdoptionModel
        fields = ['id', 'adopted_pet', 'adopter', 'adoption_date', 'adoption_status']