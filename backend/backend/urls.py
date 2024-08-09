from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.adapters.views import UserView

urlpatterns = [
    path("admin", admin.site.urls),
    path("api/", include("api.adapters.urls")),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/register', UserView.as_view(), name='token_obtain_pair'),
]
