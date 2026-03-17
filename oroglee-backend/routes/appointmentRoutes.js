const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Dentist = require("../models/Dentist");

// GET /api/appointments - fetch all appointments
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Appointment.countDocuments();

    const appointments = await Appointment.find()
      .populate("dentist", "name clinicName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ success: false, message: "Server error. Could not fetch appointments." });
  }
});

// POST /api/appointments - create a new appointment
router.post("/", async (req, res) => {
  try {
    const { patientName, age, gender, appointmentDate, dentistId } = req.body;

    // Validate required fields
    if (!patientName || !age || !gender || !appointmentDate || !dentistId) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }

    // Check dentist exists
    const dentist = await Dentist.findById(dentistId);
    if (!dentist) {
      return res.status(404).json({ success: false, message: "Selected dentist not found." });
    }

    // Validate appointment date is not in the past
    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ success: false, message: "Appointment date cannot be in the past." });
    }

    const newAppointment = new Appointment({
      patientName: patientName.trim(),
      age: parseInt(age),
      gender,
      appointmentDate: selectedDate,
      dentist: dentistId,
    });

    const saved = await newAppointment.save();

    // Populate dentist info before responding
    await saved.populate("dentist", "name clinicName");

    res.status(201).json({
      success: true,
      data: saved,
      message: "Appointment booked successfully!",
    });
  } catch (error) {
    console.error("Error creating appointment:", error.message);
    res.status(500).json({ success: false, message: "Server error. Could not book appointment." });
  }
});

// PATCH /api/appointments/:id/status - update appointment status (bonus)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Booked", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("dentist", "name clinicName");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    res.status(200).json({ success: true, data: updated, message: "Status updated." });
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).json({ success: false, message: "Server error. Could not update status." });
  }
});

module.exports = router;
