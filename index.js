import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Third party middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

//user Routes
app.use("/api", userRoutes);
app.get("/check-me", (_, res) => {
  res.json({ message: `Hello World!` });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
