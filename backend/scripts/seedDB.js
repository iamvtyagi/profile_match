import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Account from "../models/Account.js";

// Load environment variables
dotenv.config();

const mongo_url =
  process.env.MONGODB_URI ||
  "mongodb+srv://naukari:uATWkN2oHc6AoBib@cluster0.4xs5n.mongodb.net/naukaridotcom";

// Connect to MongoDB
mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// Sample company data
const companyData = [
  { companyName: "Tech Innovations Inc.", matchScore: 85, status: "Target" },
  { companyName: "Global Solutions Corp", matchScore: 72, status: "Target" },
  { companyName: "Digital Futures LLC", matchScore: 94, status: "Target" },
  { companyName: "Pinnacle Systems", matchScore: 68, status: "Not Target" },
  { companyName: "Elite Enterprises", matchScore: 79, status: "Not Target" },
  { companyName: "Nexus Group", matchScore: 90, status: "Target" },
  { companyName: "Axion Partners", matchScore: 55, status: "Not Target" },
  { companyName: "Vortex Industries", matchScore: 42, status: "Not Target" },
  { companyName: "Summit Technologies", matchScore: 81, status: "Target" },
  { companyName: "Quantum Dynamics", matchScore: 63, status: "Not Target" },
  { companyName: "Atlas Corporation", matchScore: 38, status: "Not Target" },
  { companyName: "Horizon Ventures", matchScore: 87, status: "Target" },
];

// Demo user
const demoUser = {
  username: "user1",
  password: "pass123",
};

// Seed database
const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Account.deleteMany({});

    // Create demo user
    // Let the User model's pre-save hook handle password hashing
    await User.create({
      username: demoUser.username,
      password: demoUser.password,
    });

    console.log("Demo user created with username:", demoUser.username);

    // Create accounts
    await Account.insertMany(companyData);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

// Execute seed function
seedDB();
