from django.shortcuts import render
from api.domain.models import PetModel, VolunteerModel
from api.domain.serializers import PetSerializer, VolunteerSerializer, AdopterSerializer, AdopterModel, AdoptionModel, AdoptionSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class PetView(APIView):
    def get(self, request, *args, **kwargs):
        if 'id' in kwargs:
            pet = get_object_or_404(PetModel, pk=kwargs['id'])
            serializer = PetSerializer(pet)
            return Response(serializer.data)
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