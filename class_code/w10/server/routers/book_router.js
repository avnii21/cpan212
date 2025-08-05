import express from "express";
import Book from "../models/book.js";

const router = express.Router();

// 1 - Read all books
router.get("/all", (req, res) => {
  Book.find()
    .then((results) => res.json(results))
    .catch((error) => res.status(500).json({ message: "Error fetching books", error }));
});

// 2 - Read with filters
router.get("/search", (req, res) => {
  const filters = {};

  if (req.query.title) filters.title = req.query.title;
  if (req.query.author) filters.author = req.query.author;
  if (req.query.pages) filters.pages = req.query.pages;
  if (req.query.genres) filters.genres = req.query.genres;

  if (req.query.date_created) {
    const dateValue = parseFloat(req.query.date_created);
    switch (req.query.date_range) {
      case "lt":
        filters.year = { $lt: dateValue };
        break;
      case "gt":
        filters.year = { $gt: dateValue };
        break;
      case "lte":
        filters.year = { $lte: dateValue };
        break;
      case "gte":
        filters.year = { $gte: dateValue };
        break;
      default:
        filters.year = dateValue;
    }
  }

  Book.find(filters)
    .then((books) => res.json(books))
    .catch((err) => res.status(500).json({ message: "Error applying filters", err }));
});

// 3 - Add new Entry
router.post("/save", (req, res) => {
  const { title, author, pages, genres } = req.body;

  const newBook = new Book({ title, author, pages, genres });

  newBook
    .save()
    .then((savedBook) => res.status(201).json(savedBook))
    .catch((err) => res.status(400).json({ message: "Error saving book", err }));
});

// 4 - Read single book by ID
router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json(book);
    })
    .catch((err) => res.status(500).json({ message: "Error retrieving book", err }));
});

// 5 - Update Entry
router.put("/:id", (req, res) => {
  const { title, author, publishers, pages, release_date, ISBN } = req.body;

  Book.findByIdAndUpdate(
    req.params.id,
    { title, author, publishers, pages, release_date, ISBN },
    { new: true, runValidators: true }
  )
    .then((updatedBook) => {
      if (!updatedBook) return res.status(404).json({ message: "Book not found" });
      res.json({ message: "Book updated successfully", book: updatedBook });
    })
    .catch((error) => res.status(500).json({ message: "Error updating book", error }));
});

// 6 - Delete Entry
router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((deletedBook) => {
      if (!deletedBook) return res.status(404).json({ message: "Book not found" });
      res.json({ message: "Book deleted successfully" });
    })
    .catch((err) => res.status(500).json({ message: "Error deleting book", err }));
});

export default router;
