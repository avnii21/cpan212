import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all events
router.get("/events", async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../mockData/ticketmasterEvents.json"),
      "utf-8"
    );
    const events = JSON.parse(data);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load Ticketmaster events" });
  }
});

// Get single event by ID
router.get("/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const data = await fs.readFile(
      path.join(__dirname, "../mockData/ticketmasterEvents.json"),
      "utf-8"
    );
    const events = JSON.parse(data);

    const event = events.find(
      (e) => e.id === eventId || e._id === eventId
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load event" });
  }
});

export default router;
