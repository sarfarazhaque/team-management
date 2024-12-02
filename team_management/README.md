### Team Management Application

This project is a full-stack Team Management Application built with Django for the backend and React for the frontend. It allows users to manage team members, providing functionalities to view, add, edit, and delete members. This is Backend Documentation


### Backend Documentation
Tech Stack
    Django: Web framework for backend.
    Django REST Framework (DRF): For building RESTful APIs.
    SQLite: Default database for development.

Features
1. Models

TeamMember: Represents a team member with the following attributes:
    first_name (String): First name of the member.
    last_name (String): Last name of the member.
    email (String): Email of the member.
    phone_number (String): Phone number in 123-456-7890 format.
    role (String): Either "Admin" or "Regular".

2. APIs

-> GET /api/team-members/
    Fetch all team members.
-> POST /api/team-members/
    Create a new team member.
    Request Body:
        {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone_number": "123-456-7890",
            "role": "Admin"
        }

-> GET /api/team-members/{id}/
        Fetch details of a specific team member by id.
-> PUT /api/team-members/{id}/
        Update details of a specific team member by id.
        Request Body (All fields are required):
        {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone_number": "123-456-7890",
            "role": "Admin"
        }

-> DELETE /api/team-members/{id}/
        Delete a team member by id.

3. Setup and Running Tests
    a. Clone the Repository:
        git clone https://github.com/your-repo/team-management.git
        cd team-management/backend
    b. Create a Virtual Environment:
        python -m venv venv
        source venv/bin/activate
    c. Install Dependencies:    
        pip install -r requirements.txt
    d. Apply Migrations:
        python manage.py migrate
    e. Run the Server:
        python manage.py runserver
    f. Run Tests:
        python manage.py test

Tests cover:
    Model validation
    API CRUD operations
    Edge cases like invalid email and phone number formats


Usage
    Running the Project
    -> Start the backend server:
        python manage.py runserver
    -> Open the app in your browser:
        Backend API: http://localhost:8000/api/team-members/


Further Improvements 

1. Backend API can be documented further with OpenAPI and Swagger format.