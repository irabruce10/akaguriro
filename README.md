<!-- ## Full-Stack Apartment Management Application

## AKAGURIRO

# This project is a Full-Stack Apartment Management Application developed using Expo for the frontend and a backend powered by technologies such as Node.js and PostgreSQL. The application aims to simplify the management of apartment details, tenant information, and Bookings .

### Features

User Authentication: User can log in and manage apartments.
Apartment Management: Add, update, and delete apartment details.
Tenant Management: Add tenants, track rent payments, and view tenant profiles.
Maintenance Requests: Submit and manage maintenance issues reported by tenants.
Responsive Design: Designed with Expo to work seamlessly on mobile devices.
Backend: REST API built with Node.js and Express, interacting with a database for storing apartment and tenant information.

## Tech Stack

### Frontend

Expo: For building a cross-platform mobile app.
React Native: For building the mobile app UI.
React Navigation: For handling navigation in the app.

### Backend

Node.js: JavaScript runtime for building the server-side application.
RESTful API.
PostgreSQL: SQL database to store apartment, tenant, and Bookings.
JWT (JSON Web Tokens): For user authentication.

### Tools

Android Studio
Git: For version control.
Firebase: For deploying the Images .

### Installation

Prerequisites
Node.js and pnpm installed.
Expo CLI installed.
PostgreSQL database setup (local or cloud-based).
Frontend Setup
Clone this repository:

bash
Copy code
git clone https://github.com/irabruce10/akaguriro
cd akaguriro
Install dependencies:

bash
Copy code
pnpm install
Start the Expo project:

bash
Copy code
expo start
Scan the QR code with the Expo Go app (available on iOS and Android) to run the application.

Backend Setup
Navigate to the backend folder:

bash
Copy code
cd database
cd migrations
Install dependencies:

Usage
Sign Up/Login: Owner users can sign up and log in to access the dashboard for apartment,Chat, tenant management and Bookings .
Manage Apartments: Add, update, and delete apartment information.
Tenant Management: Add and view tenant profiles, including rental payment status.
Maintenance Requests: Tenants can report issues, and admins can track and resolve them.
Admin Dashboard: A simple dashboard for managing the entire apartment complex.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -am 'Add new feature').
Push to your branch (git push origin feature/your-feature).
Open a pull request.
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Your Name - Your GitHub
Email - [Your Email]

## Technologies

- React Native
- Expo
- PostgreSQL -->

# Apartment Booking and Management App AKAGURIRO

This app allows users to add apartments, manage bookings, and chat with apartment owners. It is built using Expo for the frontend and PostgreSQL for the backend.

## Features

- **Apartment Listing**: Owners can list their apartments with details such as name, price, location, and availability.
- **Booking Management**: Users can make reservations for available apartments and manage their bookings.
- **Chat Functionality**: Users can chat with the apartment owner regarding any queries or information.
- **User Roles**: Normal users can make reservations and view apartments, while owners can manage their listings and bookings.

## Tech Stack

- **Frontend**: Expo (React Native)
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication
- **Real-time Chat**: Stream Chat
- **Images**: upload images from firabase

## Installation

### Prerequisites

Before running this app, ensure you have the following installed:

- Node.js (LTS version)
- Expo CLI
- PostgreSQL database

### Frontend Setup (Expo)

1. Clone the repository:
   ```bash
   git clone https://github.com/irabruce10/akaguriro
   cd akaguriro
   ```

````

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the app:
   ```bash
   expo start
   ```
   This will start the development server and open the app in Expo Go or a simulator.

### Backend Setup (Node.js + PostgreSQL)

1. Navigate to the backend directory:

   ```bash
   cd database
   ```

2. Install backend dependencies:

   ```bash
   pnpm install
   ```

3. Set up PostgreSQL database:

   - Create a new PostgreSQL database.
   - Set up the required tables (`users`, `apartments`, `bookings`, `chats`, etc.).
   - Update the database configuration in the backend environment variables.

4. Run the backend server:
   ```bash
   pnpm run dev
   ```

### Environment Variables

You will need to set the following environment variables in your `.env` file:

- `DB_HOST`: PostgreSQL host (e.g., localhost)
- `DB_USER`: PostgreSQL user
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: PostgreSQL database name

## Usage

### User

1. **Sign Up/Log In**: Create an account or log in to access the features.
2. **Browse Apartments**: View available apartments listed by owners.
3. **Make a Reservation**: Select an apartment and reserve it for your desired dates.
4. **Chat with Owner**: Send messages to the apartment owner about your booking.

### Owner

1. **Sign Up/Log In**: Create an owner account or log in.
2. **Add Apartment**: List new apartments with details like name, price, and availability.
3. **Manage Bookings**: View and manage incoming reservations.
4. **Chat with Users**: Respond to users' messages and address their queries.

## API Endpoints

### Authentication

- `POST /auth/signup`: User registration
- `POST /auth/login`: User login

### Apartments

- `GET /apartments`: Get a list of all available apartments
- `POST /apartments`: Add a new apartment (owner only)
- `PUT /apartments/:id`: Update apartment details (owner only)
- `DELETE /apartments/:id`: Delete an apartment listing (owner only)

### Bookings

- `POST /bookings`: Create a new booking
- `GET /bookings`: Get all bookings (user-specific)
- `DELETE /bookings/:id`: Cancel a booking

### Chat

- `POST /messages`: Send a message to the apartment owner
- `GET /messages/:ownerId`: Get all messages between user and owner

## Contributing

We welcome contributions! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## Acknowledgments

- Expo documentation for mobile app development.
- PostgreSQL for the database.
- Node.js and Express for the backend.
- Open-source libraries and resources used in the app development.

```

Feel free to modify and expand on this template as needed for your specific project!
```

````
