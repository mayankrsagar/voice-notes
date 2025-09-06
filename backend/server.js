import "dotenv/config";

import cors from "cors";
import express from "express";

import connectDB from "./src/config/db.js";
import errorHandler from "./src/middleware/error.middleware.js";
import noteRoutes from "./src/routes/notes.routes.js";

const app = express();
// Initialize Express

// Load environment variables
// dotenv.config();
// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("GPT ka dil toot gaya... API key nahi mili 💔");
// }

// // Check OpenAI API Key
// console.log(
//   "🔑 OpenAI Key:",
//   process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌"
// );

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Health Check
app.get("/health", (_req, res) => res.send("OK"));

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server ready on http://localhost:${PORT}`)
);
