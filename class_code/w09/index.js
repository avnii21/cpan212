import express from "express"; // create server
import mongoose from "mongoose"; // connect to DB
import dotenv from "dotenv"; // read sensitive file

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_CONNECTION)
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB");
});
db.on("error", (err) => {
    console.log("DB Error");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})



import Book from "./models/book.js"
app.get("/books/all", async (req, res) => {
    try {
        const result = await Book.find();
        res.json(result);
    } catch (error) {
        console.log(error)
        return
    }
})