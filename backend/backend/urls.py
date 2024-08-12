from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.views import UserView
from api.custom_token_obtain_view import CustomTokenObtainPairView

urlpatterns = [
    path("admin", admin.site.urls),
    path("api/", include("api.adapters.urls")),
    path('api/auth/login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register', UserView.as_view(), name='token_obtain_pair'),
]
