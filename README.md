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
