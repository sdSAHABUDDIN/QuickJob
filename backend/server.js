import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRouter);

app.use(express.json());// Middleware to parse JSON request body

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection failed:", error.message));
  
});