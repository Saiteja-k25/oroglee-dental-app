import axios from "axios";

const API = axios.create({
  baseURL: "https://oroglee-dental-app.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Dentist API calls
export const fetchDentists = (search = "") => {
  const params = search ? { search } : {};
  return API.get("/dentists", { params });
};

export const addDentist = (data) => {
  return API.post("/dentists", data);
};

// Appointment API calls
export const fetchAppointments = (page = 1, limit = 10) => {
  return API.get("/appointments", { params: { page, limit } });
};

export const createAppointment = (data) => {
  return API.post("/appointments", data);
};

export const updateAppointmentStatus = (id, status) => {
  return API.patch(`/appointments/${id}/status`, { status });
};

export default API;
