# Healthcare Backend API - Node.js + Express + PostgreSQL

A secure and scalable backend system for a healthcare application. This API allows users to register, log in, and manage patient and doctor records securely, with support for patient-doctor assignments.

***

### Objective

The goal of this project was to create a RESTful API to manage healthcare-related data. The system implements robust JWT authentication for user security and provides CRUD (Create, Read, Update, Delete) functionality for patients and doctors. It also handles the many-to-many relationship between patients and doctors.

***

### Technologies Used

* **Backend Framework:** Node.js (with Express)
* **Database:** PostgreSQL
* **ORM:** Sequelize
* **Authentication:** JSON Web Tokens (JWT) using `jsonwebtoken`
* **Password Hashing:** `bcrypt`
* **Environment Variables:** `dotenv`
* **Development Tools:** `nodemon`

***

### Quick Setup

Follow these steps to get the project up and running on your local machine.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/ningaraddi-raddi/healthcare-backend.git]
    cd healthcare-backend-nodejs
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure PostgreSQL and `.env`:**
    * Ensure you have PostgreSQL installed and running.
    * Create a new database for the project (e.g., `healthcare_db`).
    * Create a `.env` file in the root directory. **Do not commit this file to Git.**
    * Add your database and JWT configurations to the `.env` file:
    ```
    PORT=5000
    DATABASE_URL=postgres://your_username:your_password@localhost:5432/healthcare_db
    JWT_SECRET=your_strong_secret_key_here
    JWT_EXPIRES_IN=1d
    ```

4.  **Start the Server:**
    This command will sync the database models (creating tables if they don't exist) and start the server.
    ```bash
    npm run dev
    ```

***

### API Endpoints

The API is structured around RESTful principles. All endpoints are prefixed with `/api`.

#### 1. Authentication

* **`POST /api/auth/register`**
    * **Description:** Registers a new user with a name, email, and password.
* **`POST /api/auth/login`**
    * **Description:** Logs in a user and returns a JWT token for authentication.

#### 2. Patient Management (Authenticated Access Required)

* **`POST /api/patients`**
    * **Description:** Adds a new patient record.
* **`GET /api/patients`**
    * **Description:** Retrieves all patients created by the authenticated user.
* **`GET /api/patients/:id`**
    * **Description:** Retrieves a specific patient's details.
* **`PUT /api/patients/:id`**
    * **Description:** Updates an existing patient's details.
* **`DELETE /api/patients/:id`**
    * **Description:** Deletes a patient record.

#### 3. Doctor Management (Authenticated Access Required for `POST`, `PUT`, `DELETE`)

* **`POST /api/doctors`**
    * **Description:** Adds a new doctor record.
* **`GET /api/doctors`**
    * **Description:** Retrieves all doctors.
* **`GET /api/doctors/:id`**
    * **Description:** Retrieves a specific doctor's details.
* **`PUT /api/doctors/:id`**
    * **Description:** Updates a doctor's details.
* **`DELETE /api/doctors/:id`**
    * **Description:** Deletes a doctor record.

#### 4. Patient-Doctor Mapping (Authenticated Access Required)

* **`POST /api/mappings`**
    * **Description:** Assigns a doctor to a patient.
* **`GET /api/mappings`**
    * **Description:** Retrieves all patient-doctor mappings.
* **`GET /api/mappings/:patientId`**
    * **Description:** Gets all doctors assigned to a specific patient.
* **`DELETE /api/mappings/:id`**
    * **Description:** Removes a doctor from a patient by deleting the mapping record.

***

### Example Usage

Here are a few examples of how to interact with the API using a tool like Postman.

#### 1. Register a new user

* **Method:** `POST`
* **URL:** `http://localhost:5000/api/auth/register`
* **Body (JSON):**
    ```json
    {
      "name": "Alex",
      "email": "alex@example.com",
      "password": "my_secure_password"
    }
    ```

#### 2. Log in and get a token

* **Method:** `POST`
* **URL:** `http://localhost:5000/api/auth/login`
* **Body (JSON):**
    ```json
    {
      "email": "alex@example.com",
      "password": "my_secure_password"
    }
    ```
* **Response:**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc..."
    }
    ```
    **Note:** Copy the token from the response.

#### 3. Create a patient (authenticated)

* **Method:** `POST`
* **URL:** `http://localhost:5000/api/patients`
* **Headers:**
    * `Authorization: Bearer <your_jwt_token>`
* **Body (JSON):**
    ```json
    {
      "name": "Jane Doe",
      "age": 35,
      "gender": "Female",
      "notes": "Patient with high blood pressure."
    }
    ```


***

