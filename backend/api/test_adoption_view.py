from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from api.models import AdoptionModel, PetModel, UserModel
from django.utils import timezone

class AdoptionViewTestCase(APITestCase):

    def setUp(self):
        self.adopter = UserModel.objects.create_user(
            username='testuser',
            password='testpassword',
            name='Test',
            lastname='User',
            user_type='adopter'
        )
        
        self.pet = PetModel.objects.create(
            name='Test Pet',
            age=2,
            race='Test Race',
            type='dog',
            pet_status='awaiting_adoption'
        )
        
        self.adoption = AdoptionModel.objects.create(
            adopted_pet=self.pet,
            adopter=self.adopter,
            adoption_date=timezone.now().date(),
            adoption_status='done'
        )

    def test_get_all_adoptions(self):
        url = reverse('list-adoptions')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_single_adoption(self):
        url = reverse('adoption-detail-update-delete', args=[self.adoption.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.adoption.id)

    def test_create_adoption(self):
        url = reverse('list-adoptions')
        data = {
            'adopted_pet': self.pet.id,
            'adopter': self.adopter.id,
            'adoption_date': timezone.now().date(),
            'adoption_status': 'in_progress'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AdoptionModel.objects.count(), 2)

    def test_update_adoption(self):
        url = reverse('adoption-detail-update-delete', args=[self.adoption.id])
        data = {
            'adopted_pet': self.pet.id,
            'adopter': self.adopter.id,
            'adoption_date': timezone.now().date(),
            'adoption_status': 'in_progress'
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.adoption.refresh_from_db()
        self.assertEqual(self.adoption.adoption_status, 'in_progress')

    def test_delete_adoption(self):
        url = reverse('adoption-detail-update-delete', args=[self.adoption.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(AdoptionModel.objects.count(), 0)
