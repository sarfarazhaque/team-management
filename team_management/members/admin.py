from django.contrib import admin
from .models import TeamMember

# Register your models here.

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone_number', 'role')
    search_fields = ('first_name', 'last_name', 'email', 'role')
