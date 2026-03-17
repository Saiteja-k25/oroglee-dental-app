import React, { useState } from "react";
import { createAppointment } from "../api";

const initialForm = {
  patientName: "",
  age: "",
  gender: "",
  appointmentDate: "",
};

function BookAppointment({ dentist, onClose, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  // Get today's date string for min date restriction
  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const newErrors = {};

    if (!form.patientName.trim()) {
      newErrors.patientName = "Patient name is required.";
    } else if (form.patientName.trim().length < 2) {
      newErrors.patientName = "Name must be at least 2 characters.";
    }

    if (!form.age) {
      newErrors.age = "Age is required.";
    } else if (parseInt(form.age) < 1 || parseInt(form.age) > 120) {
      newErrors.age = "Please enter a valid age (1–120).";
    }

    if (!form.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!form.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createAppointment({
        patientName: form.patientName.trim(),
        age: parseInt(form.age),
        gender: form.gender,
        appointmentDate: form.appointmentDate,
        dentistId: dentist._id,
      });
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Book Appointment</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              with {dentist.name} · {dentist.clinicName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {submitted ? (
            // Success state
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Appointment Booked!
              </h3>
              <p className="text-gray-500 text-sm mb-1">
                Your appointment with <strong>{dentist.name}</strong> has been confirmed.
              </p>
              <p className="text-gray-400 text-xs mb-6">
                Date:{" "}
                {new Date(form.appointmentDate).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <button
                onClick={onClose}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                Done
              </button>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  {apiError}
                </div>
              )}

              {/* Patient Name */}
              <div>
                <label className="label" htmlFor="patientName">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="patientName"
                  name="patientName"
                  type="text"
                  value={form.patientName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={`input-field ${errors.patientName ? "border-red-400 focus:ring-red-400" : ""}`}
                />
                {errors.patientName && (
                  <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>
                )}
              </div>

              {/* Age + Gender row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label" htmlFor="age">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="e.g. 28"
                    min="1"
                    max="120"
                    className={`input-field ${errors.age ? "border-red-400 focus:ring-red-400" : ""}`}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label className="label" htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`input-field bg-white ${errors.gender ? "border-red-400 focus:ring-red-400" : ""}`}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Appointment Date */}
              <div>
                <label className="label" htmlFor="appointmentDate">
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="appointmentDate"
                  name="appointmentDate"
                  type="date"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  min={today}
                  className={`input-field ${errors.appointmentDate ? "border-red-400 focus:ring-red-400" : ""}`}
                />
                {errors.appointmentDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
