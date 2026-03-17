# OroGlee – Dentist Appointment Booking Platform

A full-stack MERN application that allows users to browse dentists, book appointments, and manage them through an admin panel.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React.js (Functional Components + Hooks) |
| Styling   | Tailwind CSS                        |
| HTTP      | Axios                               |
| Backend   | Node.js + Express.js                |
| Database  | MongoDB + Mongoose                  |
| Routing   | React Router DOM v6                 |

---

## Project Structure

```
oroglee/
├── backend/
│   ├── models/
│   │   ├── Dentist.js          # Dentist schema
│   │   └── Appointment.js      # Appointment schema
│   ├── routes/
│   │   ├── dentistRoutes.js    # GET /api/dentists, POST /api/dentists
│   │   └── appointmentRoutes.js# GET /api/appointments, POST /api/appointments
│   ├── server.js               # Express app entry point
│   ├── seed.js                 # Seed script for sample dentist data
│   ├── .env                    # Environment variables
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── index.js        # Axios API helper functions
    │   ├── components/
    │   │   ├── Navbar.js       # Top navigation bar
    │   │   ├── DentistCard.js  # Single dentist card component
    │   │   └── BookAppointment.js  # Booking modal with form
    │   ├── pages/
    │   │   ├── DentistList.js  # Main dentist listing page
    │   │   └── AdminPanel.js   # Admin appointments table
    │   ├── App.js              # Root component with routing
    │   ├── index.js            # React entry point
    │   └── index.css           # Tailwind directives + custom styles
    ├── .env
    └── package.json
```

---

## Architecture Overview

The application follows a standard client-server architecture:

- The **React frontend** communicates with the backend via RESTful API calls using Axios. It is split into reusable components (Navbar, DentistCard, BookAppointment modal) and page-level components (DentistList, AdminPanel).
- The **Express backend** exposes four API endpoints (GET/POST dentists, GET/POST appointments) and handles validation before writing to the database.
- **MongoDB** stores two collections: `dentists` and `appointments`. The Appointment document holds a reference (ObjectId) to the Dentist document, and Mongoose `populate()` is used to join them when fetching appointments.

---

## Setup Instructions

### Prerequisites

- Node.js v18 or above
- MongoDB running locally on port `27017`, or a MongoDB Atlas URI

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/oroglee.git
cd oroglee
```

---

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/oroglee
```

Seed the database with sample dentists:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The server will run at `http://localhost:5000`.

---

### 3. Set up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React app:

```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## API Reference

### Dentist Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/dentists`      | Fetch all dentists       |
| GET    | `/api/dentists?search=term` | Search dentists by name/location/specialty |
| POST   | `/api/dentists`      | Add a new dentist        |

**POST /api/dentists – Request Body:**
```json
{
  "name": "Dr. Priya Sharma",
  "qualification": "BDS, MDS (Orthodontics)",
  "yearsOfExperience": 10,
  "clinicName": "SmileCare Dental Clinic",
  "address": "12, MG Road, Near City Mall",
  "location": "Bangalore",
  "specialization": "Orthodontics",
  "photo": "https://..."
}
```

---

### Appointment Endpoints

| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| GET    | `/api/appointments`             | Fetch all appointments (paginated) |
| POST   | `/api/appointments`             | Create a new appointment       |
| PATCH  | `/api/appointments/:id/status`  | Update appointment status      |

**POST /api/appointments – Request Body:**
```json
{
  "patientName": "Rahul Gupta",
  "age": 28,
  "gender": "Male",
  "appointmentDate": "2025-04-10",
  "dentistId": "<MongoDB ObjectId>"
}
```

---

## Features

### User Features
- Browse dentists with photo, qualifications, experience, clinic, and location
- Search dentists by name, location, or specialization
- Book an appointment via a modal form with client-side validation
- Success confirmation after booking

### Admin Features
- View all appointments in a responsive table
- Summary count by status (Booked / Completed / Cancelled)
- Update appointment status inline
- Pagination for large datasets

### Bonus Features Implemented
- Dentist search and filter
- Appointment status management (Booked / Completed / Cancelled)
- Pagination on admin panel
- Form validation with error messages
- Loading and error states throughout

---

## Deployment

### Backend – Render / Railway

1. Push your `backend/` folder to GitHub
2. Create a new Web Service on [Render](https://render.com) or [Railway](https://railway.app)
3. Set the environment variable: `MONGO_URI=<your MongoDB Atlas URI>`
4. Set start command: `node server.js`

### Frontend – Netlify / Vercel

1. Push your `frontend/` folder to GitHub
2. Connect the repo to [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
3. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`
4. Set build command: `npm run build`, publish directory: `build`

---

## License

This project was built as part of the OroGlee MERN Stack Assignment.
