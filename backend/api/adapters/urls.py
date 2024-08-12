from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.adapters.views import AdoptionView, PetView, UserView

urlpatterns = [
    path("pets", PetView.as_view(), name="list-pets"),
    path('pets/<int:id>', PetView.as_view(), name='pet-detail-update-delete'),
    path("adoptions", AdoptionView.as_view(), name="list-adoptions"),
    path('adoptions/<int:id>', AdoptionView.as_view(), name='adoption-detail-update-delete'),
    path('users', UserView.as_view(), name='users'),
    path('users/<int:id>', UserView.as_view(), name='user-detail-update-delete')
]