# Multitenant-School-Management-System
This project is built using Laravel, Inertia.js, and React.

If you want to run this project in your local machine then at first have to clone this project.


To clone this project go to your project folder and then open your terminal and run
1. Clone this repository
    ```bash
        git clone https://github.com/sabuj0012i/Multitenant-School-Management-System.git
    ```
2. Navigate to the cloned project directory
    ```bash
    cd multitenat-school-management-system
    ```

3. Install PHP dependencies
    ```bash
    composer install
    ```

4. Install Node.js dependencies
    ```bash
    npm install
    ```

5. Environment setup
    ```bash
    # Copy environment file
    cp .env.example .env

    # Generate application key
    php artisan key:generate
    ```

6. **Configure your `.env` file**
    ```php
    APP_NAME="Seminar Scraping"
    APP_URL=http://localhost:8000

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=multitenant-school-management-system
    DB_USERNAME=your_username
    DB_PASSWORD=your_password

7. **Database setup**
    ```bash
    # Create database (make sure MySQL/PostgreSQL is running)
    # Then run migrations
    php artisan migrate

    # If you have seeders to populate dummy data (optional)
    php artisan db:seed
    ```

8. Start the development server
    ```bash
    composer run dev
    ```
9. Access the application

    ```bash
    Open your browser and visit: `http://localhost:8000`
    ```

---


my Project Scope

The School Management System is a Laravel-based web application with the follwoing key features:
1. Multitenancy: Multiple School(tenants) share a single database, with data isolation enforced bya tenant_id column.
2. Core Functionality:
 2.1 Manage school-specific students, teachers, and courses.
 2.2 Track student enrollments in courses.
 2.3 Provide a dashboard with school stats.
3. Database: 6 tables(tenants,users,students,teachers,courses,enrollemnts).
4. User Roles:
 3.1 School admins(e.g.,principals or clerks) manage their school's data.
 3.2 Asuper admin (not shown in demo) sets up schools and users.
5. Technology Stack: Laravel (PHP framework),MySQL database, React for UI.
6. Demo Focus: Login, dashboard, data management, enrollments,and switching between schools to show multitenancy.

The projcet is simple yet practical, ideal for learning multitenancy and buliding a SaaS-like application.
