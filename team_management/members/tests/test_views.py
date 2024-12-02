from django.test import TestCase
from rest_framework.test import APIClient
from members.models import TeamMember

class TeamMemberAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team_member = TeamMember.objects.create(
            first_name="Sarfaraz",
            last_name="Haque",
            email="Sarfaraz.Haque@example.com",
            phone_number="123-456-7890",
            role="Admin",
        )
        self.new_team_member_data = {
            "first_name": "Jane",
            "last_name": "Haque",
            "email": "jane.Haque@example.com",
            "phone_number": "987-654-3210",
            "role": "Regular",
        }

    def test_get_team_members(self):
        """Test retrieving the list of team members."""
        response = self.client.get("/api/team-members/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["first_name"], "Sarfaraz")

    def test_create_team_member(self):
        """Test creating a new team member."""
        response = self.client.post("/api/team-members/", self.new_team_member_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["first_name"], "Jane")
        
    def test_update_team_member(self):
        """Test updating an existing team member."""
        updated_data = {
            "first_name": "Sarfarazathan",
            "last_name": "Haque",
            "email": self.team_member.email,  # Include existing email
            "phone_number": self.team_member.phone_number,  # Include existing phone number
            "role": self.team_member.role,  # Include existing role
        }
        response = self.client.put(
            f"/api/team-members/{self.team_member.id}/", updated_data, format="json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["first_name"], "Sarfarazathan")


    def test_delete_team_member(self):
        """Test deleting a team member."""
        response = self.client.delete(f"/api/team-members/{self.team_member.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(TeamMember.objects.count(), 0)
