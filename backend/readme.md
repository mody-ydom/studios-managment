# Booking API Project Setup

This README outlines the steps required to set up the Booking API project using Django and Django Rest Framework on a Windows environment. It includes creating a virtual environment, installing necessary packages, seeding the database, and running the Django project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Virtual Environment](#1-virtual-environment)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Database Migrations](#3-database-migrations)
  - [4. Seeding the Database](#4-seeding-the-database)
  - [5. Run Development Server](#5-run-development-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Important Accounts](#important-accounts)

## Prerequisites

**Python 3.8+**: Ensure Python is installed on your machine. It can be downloaded from [python.org](https://www.python.org/downloads/).

## Setup Instructions

### 1. Virtual Environment

Navigate to your project directory and set up a virtual environment:

```bash
# Create a virtual environment
python -m venv env

# Activate the virtual environment
.\env\Scripts\activate
```

### 2. Install Dependencies

With the virtual environment activated, install Django and other necessary packages using:

```bash
# Install dependencies from requirements.txt
pip install -r requirements.txt
```

### 3. Database Migrations

Perform database migrations to set up your database schema:

```bash
# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### 4. Seeding the Database

To seed the database in the following sequence: accounts, studios, and reservations:

```bash
# Seed all data
python manage.py seed_accounts
python manage.py seed_studios
python manage.py seed_reservations
```

### 5. Run Development Server

Start the Django development server to verify the setup:

```bash
# Run the development server
python manage.py runserver
```

## API Documentation

Access API documentation through the following URLs:

- Swagger UI: `http://127.0.0.1:8000/api/schema/swagger-ui/`
- ReDoc: `http://127.0.0.1:8000/api/schema/redoc/`

## Project Structure

Your project directory after setup should include:

- `app/` - Main Django project configurations.
- `accounts/` - User management application.
- `studios/` - Studios management application.
- `reservations/` - Reservations management application.
- `manage.py` - Django's command-line utility for administrative tasks.
- `env/` - Virtual environment with Python executable and libraries.
- `requirements.txt` - List of dependencies for the project.

## Important Accounts

After seeding, the database will contain accounts with the following credentials:

| Username       | Password         | User Type   | Is Verified | Is Staff |
|----------------|------------------|-------------|-------------|----------|
| admin_1        | testpassword123  | Admin       | True        | True     |
| admin_2        | testpassword123  | Admin       | True        | True     |
| admin_3        | testpassword123  | Admin       | True        | True     |
| studio_owner_1 | testpassword123  | Studio Owner| True        | False    |
| studio_owner_2 | testpassword123  | Studio Owner| True        | False    |
| studio_owner_3 | testpassword123  | Studio Owner| True        | False    |
| studio_owner_4 | testpassword123  | Studio Owner| False       | False    |
| customer_1     | testpassword123  | Customer    | True        | False    |
| customer_2     | testpassword123  | Customer    | True        | False    |
| customer_3     | testpassword123  | Customer    | True        | False    |


Make sure the seeding scripts are populates the database in the order of accounts, studios, and reservations. Adjust the commands and the user types as needed to match your Django project's setup and authentication requirements.
