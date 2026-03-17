# OroGlee - Dentist Appointment Booking Platform

A full-stack MERN application for booking dentist appointments.
Browse dentists, book appointments, and manage them through an admin panel.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18 (Functional Components + Hooks) |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router DOM v6 |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |

---

## Project Structure
```
oroglee-dental-app/
├── oroglee-backend/
│   ├── models/
│   │   ├── Dentist.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── dentistRoutes.js
│   │   └── appointmentRoutes.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
└── oroglee-frontend/
    ├── public/
    │   └── photos/
    ├── src/
    │   ├── api/index.js
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── DentistCard.js
    │   │   └── BookAppointment.js
    │   ├── pages/
    │   │   ├── DentistList.js
    │   │   └── AdminPanel.js
    │   └── App.js
    └── package.json
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repo
git clone https://github.com/Saiteja-k25/oroglee-dental-app.git
cd oroglee-dental-app

### 2. Backend setup
cd oroglee-backend
npm install

Create a .env file inside oroglee-backend/:
PORT=5000
MONGO_URI=mongodb://localhost:27017/oroglee

Seed sample data and start the server:
npm run seed
npm run dev

Backend runs at http://localhost:5000

### 3. Frontend setup
cd oroglee-frontend
npm install

Create a .env file inside oroglee-frontend/:
REACT_APP_API_URL=http://localhost:5000/api

Start the app:
npm start

Frontend runs at http://localhost:3000

---

## API Reference

### Dentist Endpoints
GET  /api/dentists            - Fetch all dentists
GET  /api/dentists?search=    - Search dentists
POST /api/dentists            - Add a dentist

### Appointment Endpoints
GET   /api/appointments          - Fetch all appointments
POST  /api/appointments          - Book an appointment
PATCH /api/appointments/:id/status - Update status

---

## Architecture

The React frontend communicates with the backend via RESTful API calls using Axios. The Express backend handles all business logic and validation before writing to MongoDB. The Appointment document holds a reference to the Dentist document using MongoDB ObjectId, and Mongoose populate() is used to join them when fetching appointments.

---

## Bonus Features Implemented

- Dentist search and filter by name, location, specialization
- Appointment status management (Booked / Completed / Cancelled)
- Pagination on admin panel
- Form validation with field-level error messages
- Loading, error and empty states on every page

---

Built for OroGlee Assignment
