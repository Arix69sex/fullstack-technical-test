from django.db import models
from dataclasses import dataclass
from datetime import date
from typing import Optional
from django.contrib.auth.models import AbstractUser, Group, Permission

from api.custom_user_manager import UserManager

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
    pet_status = models.CharField(max_length=17, choices=PET_STATUS_CHOICES)

    def __str__(self):
        return f'{self.name} ({self.get_type_display()})'
        
class AdoptionModel(models.Model):
    ADOPTION_STATUS_CHOICES = [
        ('done', 'Done'),
        ('in_progress', 'In Progress'),
    ]

    id = models.AutoField(primary_key=True)
    adopted_pet = models.ForeignKey('PetModel', on_delete=models.CASCADE) 
    adopter = models.ForeignKey('UserModel', on_delete=models.CASCADE) 
    adoption_date = models.DateField()
    adoption_status = models.CharField(max_length=12, choices=ADOPTION_STATUS_CHOICES)

    def __str__(self):
        return f'Adoption of {self.adopted_pet.name} by {self.adopter.name} {self.adopter.lastname}'
    
class UserModel(AbstractUser):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    USER_TYPES = [
        ('volunteer', 'Volunteer'),
        ('admin', 'Admin'),
        ('adopter', 'Adopter'),
    ]
    
    id = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    username = models.EmailField(unique=True)
    password = models.CharField(max_length=128) 
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)
    user_type = models.CharField(max_length=9, choices=USER_TYPES)
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    USERNAME_FIELD = "username"

    objects = UserManager()