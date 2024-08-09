from django.db import models
from dataclasses import dataclass
from datetime import date
from typing import Optional

class PetModel(models.Model):
    PET_TYPE_CHOICES = [
        ('dog', 'Dog'),
        ('cat', 'Cat'),
    ]
    
    PET_STATUS_CHOICES = [
        ('adopted', 'Adopted'),
        ('in_adoption', 'In Adoption'),
        ('awaiting_adoption', 'Awaiting Adoption'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    race = models.CharField(max_length=100)
    type = models.CharField(max_length=3, choices=PET_TYPE_CHOICES)
    status = models.CharField(max_length=17, choices=PET_STATUS_CHOICES)

    def __str__(self):
        return f'{self.name} ({self.get_type_display()})'

    
class VolunteerModel(models.Model):
    VOLUNTEER_STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    id = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128) # Reminder to hash this
    status = models.CharField(max_length=8, choices=VOLUNTEER_STATUS_CHOICES)

    def __str__(self):
        return f'{self.name} {self.lastname}'
    
class AdopterModel(models.Model):
    ADOPTER_STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    id = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128) # Reminder to hash this
    status = models.CharField(max_length=8, choices=ADOPTER_STATUS_CHOICES)

    def __str__(self):
        return f'{self.name} {self.lastname}'
    
class AdoptionModel(models.Model):
    ADOPTION_STATUS_CHOICES = [
        ('done', 'Done'),
        ('in_progress', 'In Progress'),
    ]

    id = models.AutoField(primary_key=True)
    adopted_pet = models.ForeignKey('PetModel', on_delete=models.CASCADE) 
    adopter = models.ForeignKey('AdopterModel', on_delete=models.CASCADE) 
    adoption_date = models.DateField()
    status = models.CharField(max_length=12, choices=ADOPTION_STATUS_CHOICES)

    def __str__(self):
        return f'Adoption of {self.adopted_pet.name} by {self.adopter.name} {self.adopter.lastname}'