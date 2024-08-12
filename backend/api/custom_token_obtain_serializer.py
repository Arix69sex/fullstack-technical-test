from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from api.models import UserModel

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        print(username)
        print(password)
        user = UserModel.objects.filter(username=username).first()
        if user and user.check_password(password):
            return super().validate({"username": username, "password": password})

        raise serializers.ValidationError("No active account found with the given credentials")