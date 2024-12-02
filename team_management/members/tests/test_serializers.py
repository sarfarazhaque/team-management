from django.test import TestCase
from members.serializers import TeamMemberSerializer
from members.models import TeamMember

class TeamMemberSerializerTest(TestCase):
    def setUp(self):
        self.team_member = TeamMember.objects.create(
            first_name="Sarfaraz",
            last_name="Haque",
            email="sarfaraz.haque@example.com",
            phone_number="123-456-7890",
            role="Admin",
        )
        self.serializer_data = {
            "first_name": "Jenny",
            "last_name": "Haque",
            "email": "jenny.haque@example.com",
            "phone_number": "987-654-3210",
            "role": "Regular",
        }

    def test_serializer_contains_correct_fields(self):
        """Test that the serializer contains all required fields."""
        serializer = TeamMemberSerializer(instance=self.team_member)
        data = serializer.data
        self.assertCountEqual(
            data.keys(),
            ["id", "first_name", "last_name", "email", "phone_number", "role"],
        )

    def test_serializer_valid_data(self):
        """Test that valid data passes validation."""
        serializer = TeamMemberSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data["first_name"], "Jenny")

    def test_serializer_invalid_email(self):
        """Test that invalid email fails validation."""
        invalid_data = self.serializer_data.copy()
        invalid_data["email"] = "not-an-email"
        serializer = TeamMemberSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)
