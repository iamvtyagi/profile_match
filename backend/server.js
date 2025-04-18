import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import authRoutes from "./routes/auth.js";
import accountRoutes from "./routes/accounts.js";

// Load environment variables
dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5002; // Changed port to 5002

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongo_url =
  process.env.MONGODB_URI ||
  "mongodb+srv://naukari:uATWkN2oHc6AoBib@cluster0.4xs5n.mongodb.net/naukaridotcom";

mongoose
  .connect(mongo_url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api", authRoutes);
app.use("/api", accountRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Target Account Matching API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
