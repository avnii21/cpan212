import express from "express";
import { uploadFunction } from "../middleware/multer.js";

const router = express.Router();

router.post("/single", uploadFunction.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
        message: "File uploaded successfully",
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
    });
});

router.post("/multiple", uploadFunction.array("files", 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    const filePaths = req.files.map(file => `/uploads/${file.filename}`);

    res.status(200).json({
        message: "Files uploaded successfully",
        path: filePaths,
    });
});



export default router;