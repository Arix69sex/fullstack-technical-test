from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from api.models import AdoptionModel, PetModel, UserModel


admin.site.register(UserModel, UserAdmin)
@admin.register(PetModel)
class PetModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'race', 'type', 'pet_status')
    search_fields = ('name', 'race', 'type')
    list_filter = ('type', 'pet_status')

@admin.register(AdoptionModel)
class AdoptionModelAdmin(admin.ModelAdmin):
    list_display = ('adopted_pet', 'adopter', 'adoption_date', 'adoption_status')
    search_fields = ('adopted_pet__name', 'adopter__username')
    list_filter = ('adoption_status',)