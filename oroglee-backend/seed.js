const mongoose = require("mongoose");
const Dentist = require("./models/Dentist");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/oroglee";

const dentists = [
  {
    name: "Dr. Pooja Reddy",
    qualification: "MD Dermatologist | Laser Science & Hair Restoration Expert",
    yearsOfExperience: "5",
    clinicName: "Nuowin Skin & Hair Care Clinic",
    address: "La Palazzo, Durgam Cheruvu Road Near Inorbit Mall, Madhapur, HITEC City",
    location: "Hyderabad",
    specialization: "Dermatologist",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQHdYJErtxdaxg/profile-displayphoto-scale_400_400/B56ZsMKi01H8Ak-/0/1765435650271?e=1775088000&v=beta&t=q-SjOOu06PMyMrAaRfgJp6_p72Gy9G0AG1PM1a8c0eg",
  },
  {
    name: "Dr. Srithika Naidu",
    qualification: "BDS, MDS (Endodontics)",
    yearsOfExperience: 8,
    clinicName: "Mehta Dental Centre",
    address: "45, Davangare 5th Block",
    location: "Bangalore",
    specialization: "Root Canal & Endodontics",
    photo: "/photos/Dr.Srithika.jpg",
  },
  {
    name: "Dr. Sree Leela",
    qualification: "BDS, MDS (Periodontics)",
    yearsOfExperience: 12,
    clinicName: "Bright Smile Dental Studio",
    address: "78, Jubilee Hills Road No. 10",
    location: "Hyderabad",
    specialization: "Gum & Periodontal Treatment",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSpWsgSQ_UD-_J8I5wMjLiv42DI-PtJSCpXoV8_czMfkhW8tJ52OCgPUJtAGRnQi0ld_HuLbAoPPYao5A1b4UGYMjpqCwKnIqD17CRK1O8Q&s=10",
  },
  {
    name: "Dr. Kurapati Saiteja",
    qualification: "BDS, MDS (Prosthodontics)",
    yearsOfExperience: 15,
    clinicName: "Verma Dental Experts",
    address: "503001, Vinayak Nagar, Block C",
    location: "Nizamabad",
    specialization: "Implants & Prosthodontics",
    photo: "/photos/Dr.Kurapati.jpg",
  },
  {
    name: "Dr. Vishnu Vardhan Reddy",
    qualification: "BDS, Fellowship in Cosmetic Dentistry",
    yearsOfExperience: 6,
    clinicName: "PearlWhite Dental Spa",
    address: "Pragathi Nagar, 2nd Avenue",
    location: "Hyderabad",
    specialization: "Cosmetic Dentistry",
    photo: "/photos/Dr.Vishnu.jpg",
  },
  {
    name: "Dr. Neha Nimmu",
    qualification: "BDS, MDS (Oral Surgery)",
    yearsOfExperience: 9,
    clinicName: "Kulkarni Dental Hospital",
    address: "503001, FCI Road, Vinayaknagar",
    location: "Nizamabad",
    specialization: "Oral Surgery & Extractions",
    photo: "/photos/Dr.Neha.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    // Clear existing dentists
    await Dentist.deleteMany({});
    console.log("Cleared existing dentist records.");

    // Insert new seed data
    const inserted = await Dentist.insertMany(dentists);
    console.log(`Successfully seeded ${inserted.length} dentists.`);

    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
