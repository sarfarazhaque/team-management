## Team Management Application

This project is a full-stack Team Management Application built with Django for the backend and React for the frontend. It allows users to manage team members, providing functionalities to view, add, edit, and delete members. Documenation divided into Backend and Frontend 


## Backend Documentation
Tech Stack

    Django: Web framework for backend.

    Django REST Framework (DRF): For building RESTful APIs.

    SQLite: Default database for development.

### Features
1. Models

    TeamMember: Represents a team member with the following attributes:

    - first_name (String): First name of the member.
    - last_name (String): Last name of the member.
    - email (String): Email of the member.
    - phone_number (String): Phone number in 123-456-7890 format.
    - role (String): Either "Admin" or "Regular".

2. APIs

    - GET /api/team-members/
    
        Fetch all team members.
    - POST /api/team-members/
    
        Create a new team member.
    
        Request Body:

        {

            "first_name": "Sarfaraz",

            "last_name": "Haque",

            "email": "sarfaraz.haque@example.com",

            "phone_number": "123-456-7890",

            "role": "Admin"
        }

    - GET /api/team-members/{id}/

        Fetch details of a specific team member by id.

    - PUT /api/team-members/{id}/

        Update details of a specific team member by id.

        Request Body (All fields are required):

        {

            "first_name": "Sarfaraz",

            "last_name": "Haque",

            "email": "sarfaraz.haque@example.com",

            "phone_number": "123-456-7890",

            "role": "Admin"
        }

    - DELETE /api/team-members/{id}/

        Delete a team member by id.

3. Setup and Running Tests
    - Clone the Repository:

        git clone https://github.com/your-repo/team-management.git

        cd team-management/backend
    - Create a Virtual Environment:

        python -m venv venv

        source venv/bin/activate
    - Install Dependencies:    

        pip install -r requirements.txt
    - Apply Migrations:

        python manage.py migrate
    - Run the Server:

        python manage.py runserver
    - Run Tests:

        python manage.py test

4. Tests cover:
    - Model validation
    - API CRUD operations
    - Edge cases like invalid email and phone number formats


### Frontend Documentation
Tech Stack

    React: Frontend library for building the user interface.

    Tailwind CSS: For styling.

    Axios: For making API requests.


### Features
1. Pages
    - List Page:

        Displays a list of all team members.

        Search functionality to filter by name, email, or role.

        Role-based filtering (e.g., Admin, Regular).

        Pagination for large datasets.

        Button (+) to navigate to the Add Page.

    - Add Page:

        Allows adding a new team member.

        Validates email and phone number formats.

    - Edit Page:

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

3. Setup
    - Clone Repository

        git clone https://github.com/your-repo/team-management.git

        cd team-management/frontend

    - Install Dependencies

        npm install

    - Run the Development Server
    
        npm start

### Usage Running the Project

    - Start the backend server:

        python manage.py runserver

    - Start the frontend server:

        npm start

    - Open the app in your browser:

        Frontend: http://localhost:3000

        Backend API: http://localhost:8000/api/team-members/


#### Further Improvements 

1. Additional tests can be included for the Frontend using Jest.
2. Backend API can be documented further with OpenAPI and Swagger format.