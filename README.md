# Apartment Booking and Management App AKAGURIRO

This app allows users to add apartments, manage bookings, and chat with apartment owners. It is built using Expo for the frontend and PostgreSQL for the backend.

## Features

- **Apartment Listing**: Owners can list their apartments with details such as name, price, location, and availability.
- **Booking Management**: Users can make reservations for available apartments and manage their bookings.
- **Chat Functionality**: Users can chat with the apartment owner regarding any queries or information.
- **User Roles**: Normal users can make reservations and view apartments, while owners can manage their listings and bookings.

## Tech Stack

- **Frontend**: Expo (React Native),TypeScript and Tailwind
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens) / bcryptJs for secure user authentication
- **Real-time Chat**: Stream Chat.
- **Images**: upload images from Firebase.

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

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the app:
   ```bash
   pnpm expo start
   ```
   This will start the development server and open the app in Expo Go or a simulator.

### Backend Setup (Node.js + PostgreSQL)

1. Navigate to the backend directory:

   ```bash
     pnpm install
   ```

2. Install migrations dependencies:

   ```bash
   pnpm install
   ```

3. Set up PostgreSQL database:

   - Create a new PostgreSQL database.
   - Set up the required tables (`users`, `apartments`, `bookings`, `chats`, etc.).
   - Update the database configuration in the backend environment variables.

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
3. **Search Apartments**: Filter available apartments by Location,name,rooms
4. **Make a Reservation**: Select an apartment and reserve it for your desired dates.
5. **User Dashboard**: Manage your reservation delete and update.
6. **Chat with Owner**: Send messages to the apartment owner about your booking.

### Owner

1. **Sign Up/Log In**: Create an owner account or log in.
2. **Add Apartment**: List new apartments with details like name, price, and availability.
3. **Manage Bookings**: View and manage incoming reservations.
4. **Chat with Users**: Respond to users' messages and address their queries.
5. **Owner Dashboard**: Manage All Apartments delete and update.

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
