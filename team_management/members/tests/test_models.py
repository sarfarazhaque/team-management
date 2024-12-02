from django.test import TestCase
from members.models import TeamMember

class TeamMemberModelTest(TestCase):
    def test_team_member_creation(self):
        """Test that a team member is created successfully."""
        team_member = TeamMember.objects.create(
            first_name="Sarfaraz",
            last_name="Haque",
            email="sarfaraz.haque@example.com",
            phone_number="123-456-7890",
            role="Admin",
        )
        self.assertEqual(team_member.first_name, "Sarfaraz")
        self.assertEqual(team_member.role, "Admin")
        self.assertIsInstance(team_member, TeamMember)

    def test_team_member_string_representation(self):
        """Test the string representation of the TeamMember model."""
        team_member = TeamMember.objects.create(
            first_name="Jenny",
            last_name="Haque",
            email="jane.doe@example.com",
            phone_number="987-654-3210",
            role="Regular",
        )
        self.assertEqual(str(team_member), "Jenny Haque (Regular)")
