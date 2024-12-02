from django.test import TestCase
from members.serializers import TeamMemberSerializer
from members.models import TeamMember


def test_duplicate_email(self):
    """Test that duplicate emails are not allowed."""
    with self.assertRaises(Exception):
        TeamMember.objects.create(
            first_name="Duplicate",
            last_name="Email",
            email="john.doe@example.com",  # Already exists
            phone_number="111-111-1111",
            role="Regular",
        )


def test_invalid_phone_number(self):
    """Test that invalid phone numbers fail validation."""
    invalid_data = self.new_team_member_data.copy()
    invalid_data["phone_number"] = "abc-def-ghij"
    response = self.client.post("/api/team-members/", invalid_data)
    self.assertEqual(response.status_code, 400)
    self.assertIn("phone_number", response.data)
