from rest_framework import serializers
from .models import TeamMember

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'role']
        
    def validate_email(self, value):
        if TeamMember.objects.filter(email=value).exists():
            raise serializers.ValidationError("A team member with this email already exists.")
        return value
        