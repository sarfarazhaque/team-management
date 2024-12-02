### Team Management Application

This project is a full-stack Team Management Application built with Django for the backend and React for the frontend. It allows users to manage team members, providing functionalities to view, add, edit, and delete members. Documenation divided into Backend and Frontend 


### Backend Documentation
Tech Stack
    Django: Web framework for backend.
    Django REST Framework (DRF): For building RESTful APIs.
    SQLite: Default database for development.

##Features
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
            "first_name": "Sarfaraz",
            "last_name": "Haque",
            "email": "sarfaraz.haque@example.com",
            "phone_number": "123-456-7890",
            "role": "Admin"
        }

-> GET /api/team-members/{id}/
        Fetch details of a specific team member by id.
-> PUT /api/team-members/{id}/
        Update details of a specific team member by id.
        Request Body (All fields are required):
        {
            "first_name": "Sarfaraz",
            "last_name": "Haque",
            "email": "sarfaraz.haque@example.com",
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


### Frontend Documentation
Tech Stack
    React: Frontend library for building the user interface.
    Tailwind CSS: For styling.
    Axios: For making API requests.


Features
    1. Pages
        a. List Page:
            Displays a list of all team members.
            Search functionality to filter by name, email, or role.
            Role-based filtering (e.g., Admin, Regular).
            Pagination for large datasets.
            Button (+) to navigate to the Add Page.
        b. Add Page:
            Allows adding a new team member.
            Validates email and phone number formats.
        c. Edit Page:
            Allows editing a team member’s details.
            Deletes a team member.
            Validates email and phone number formats.
    2. UI Enhancements added
        Search and sort functionalities on the List Page.
        Auto-formatting for phone numbers to 123-456-7890.
        Custom modal for delete confirmation on the Edit Page.
        Improved UX with Tailwind CSS for better accessibility:
            Keyboard navigation.
            ARIA attributes for screen readers.

Setup
    1. Clone Repository
        git clone https://github.com/your-repo/team-management.git
        cd team-management/frontend
    2. Install Dependencies
        npm install
    3. Run the Development Server
        npm start


Further Improvements 

1. Additional tests can be included for the Frontend using Jest.
