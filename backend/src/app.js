import cors from "cors";
import express from "express";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";
import noteRoutes from "./routes/notes.routes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.get("/health", (_req, res) => res.send("OK 👍"));
app.use(errorHandler);

export default app;
