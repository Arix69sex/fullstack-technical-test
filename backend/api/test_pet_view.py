from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from api.models import PetModel, AdoptionModel, UserModel

class PetViewTestCase(APITestCase):

    def setUp(self):
        self.pet1 = PetModel.objects.create(name="Buddy", age=3, race="Golden Retriever", type="dog", pet_status="in_adoption")
        self.pet2 = PetModel.objects.create(name="Whiskers", age=2, race="Siamese", type="cat", pet_status="awaiting_adoption")

    def test_get_all_pets(self):
        url = reverse('list-pets')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_pets_filtered_by_status(self):
        url = reverse('list-pets')
        response = self.client.get(url, {'pet_status': 'in_adoption'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Buddy')

    def test_get_single_pet(self):
        url = reverse('pet-detail-update-delete', kwargs={'id': self.pet1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Buddy')

    def test_create_pet(self):
        url = reverse('list-pets')
        data = {
            'name': 'Snowball',
            'age': 1,
            'race': 'Persian',
            'type': 'cat',
            'pet_status': 'awaiting_adoption'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PetModel.objects.count(), 3)

    def test_update_pet(self):
        url = reverse('pet-detail-update-delete', kwargs={'id': self.pet1.id})
        data = {
            'name': 'Buddy',
            'age': 4,
            'race': 'Golden Retriever',
            'type': 'dog',
            'pet_status': 'adopted'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.pet1.refresh_from_db()
        self.assertEqual(self.pet1.age, 4)
        self.assertEqual(self.pet1.pet_status, 'adopted')

    def test_delete_pet(self):
        url = reverse('pet-detail-update-delete', kwargs={'id': self.pet1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(PetModel.objects.count(), 1)
