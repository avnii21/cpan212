import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import book_router from "./routers/book_router.js"
import user_router from "./routers/user_router.js"


dotenv.config();

// variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/book", book_router);

// Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("MongoDB connection error:", error));

// Catch all Route
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
