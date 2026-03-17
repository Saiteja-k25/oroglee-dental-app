const express = require("express");
const router = express.Router();
const Dentist = require("../models/Dentist");

// GET /api/dentists - fetch all dentists
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    // If search query is provided, filter by name, location, or clinic name
    if (search && search.trim() !== "") {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { clinicName: { $regex: search, $options: "i" } },
          { specialization: { $regex: search, $options: "i" } },
        ],
      };
    }

    const dentists = await Dentist.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: dentists });
  } catch (error) {
    console.error("Error fetching dentists:", error.message);
    res.status(500).json({ success: false, message: "Server error. Could not fetch dentists." });
  }
});

// GET /api/dentists/:id - fetch single dentist
router.get("/:id", async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id);

    if (!dentist) {
      return res.status(404).json({ success: false, message: "Dentist not found." });
    }

    res.status(200).json({ success: true, data: dentist });
  } catch (error) {
    console.error("Error fetching dentist:", error.message);
    res.status(500).json({ success: false, message: "Server error. Could not fetch dentist." });
  }
});

// POST /api/dentists - add a new dentist
router.post("/", async (req, res) => {
  try {
    const { name, qualification, yearsOfExperience, clinicName, address, location, photo, specialization } = req.body;

    if (!name || !qualification || !yearsOfExperience || !clinicName || !address || !location) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    const newDentist = new Dentist({
      name,
      qualification,
      yearsOfExperience,
      clinicName,
      address,
      location,
      photo: photo || "",
      specialization: specialization || "General Dentistry",
    });

    const saved = await newDentist.save();
    res.status(201).json({ success: true, data: saved, message: "Dentist added successfully." });
  } catch (error) {
    console.error("Error adding dentist:", error.message);
    res.status(500).json({ success: false, message: "Server error. Could not add dentist." });
  }
});

module.exports = router;
