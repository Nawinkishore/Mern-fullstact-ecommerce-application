import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth-routes.js";
import adminRouter from "./routes/admin/products-route.js";
import dotenv from "dotenv";
dotenv.config();
// Create a database connection
mongoose
  .connect(
    "mongodb+srv://nawinthedeveloper:nawinthedeveloper@cluster0.pb2rk.mongodb.net/"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use("/api/auth", authRouter);
app.use("/api/admin/product", adminRouter);
