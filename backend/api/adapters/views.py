from django.shortcuts import render
from api.models import AdoptionModel, PetModel, UserModel 
from api.serializers import PetSerializer, UserSerializer, AdoptionSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class PetView(APIView):
    def get(self, request, *args, **kwargs):
        if 'id' in kwargs:
            pet = get_object_or_404(PetModel, pk=kwargs['id'])
            serializer = PetSerializer(pet)
            return Response(serializer.data)
        else:
            pet_status = request.query_params.get('pet_status')
            if pet_status:
                pets = PetModel.objects.filter(pet_status=pet_status)
            else:
                pets = PetModel.objects.all()
            
            serializer = PetSerializer(pets, many=True)
            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, *args, **kwargs):
        pet = get_object_or_404(PetModel, pk=kwargs['id'])
        serializer = PetSerializer(pet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        pet = get_object_or_404(PetModel, pk=kwargs['id'])
        pet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class AdoptionView(APIView):
    def get(self, request, *args, **kwargs):
        if 'id' in kwargs:
            adoption = get_object_or_404(AdoptionModel, pk=kwargs['id'])
            adoptionSerializer = AdoptionSerializer(adoption)
            pet = get_object_or_404(PetModel, pk=adoptionSerializer.data["adopted_pet"])
            petSerializer = PetSerializer(pet)
            return Response({
                "adoption": adoptionSerializer.data,
                "pet": petSerializer.data
            })
        else:
            adopter_id = request.query_params.get('adopter')
            if adopter_id:
                adoptions = AdoptionModel.objects.filter(adopter=adopter_id)
            else:
                adoptions = AdoptionModel.objects.all()

            serializer = AdoptionSerializer(adoptions, many=True)
            for adoptionData in serializer.data:
                pet = get_object_or_404(PetModel, pk=adoptionData["adopted_pet"])
                petSerializer = PetSerializer(pet)
                adoptionData["adopted_pet"] = petSerializer.data

            for adoptionData in serializer.data:
                user = get_object_or_404(UserModel, pk=adoptionData["adopter"])
                userSerializer = UserSerializer(user)
                adoptionData["adopter"] = userSerializer.data

            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = AdoptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        adoption = get_object_or_404(AdoptionModel, pk=kwargs['id'])
        serializer = AdoptionSerializer(adoption, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        adoption = get_object_or_404(AdoptionModel, pk=kwargs['id'])
        adoption.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserView(APIView):
    def get(self, request, *args, **kwargs):
        if 'id' in kwargs:
            user = get_object_or_404(UserModel, pk=kwargs['id'])
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            user_type = request.query_params.get('type')
            if user_type:
                users = UserModel.objects.filter(user_type=user_type)
            else:
                users = UserModel.objects.all()
                
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        user = get_object_or_404(UserModel, pk=kwargs['id'])
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = get_object_or_404(UserModel, pk=kwargs['id'])
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    