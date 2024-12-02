from django.db import models

# Create your models here.

class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('Regular', 'Regular - Cannot delete members'),
        ('Admin', 'Admin - Can delete members'),
    ]
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Regular')
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
    
    