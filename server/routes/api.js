const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { generatePdfReport } = require("../services/pdfService");

const router = express.Router();

const DB_PATH = path.join(__dirname, "..", "db.json");

router.post("/submit", (req, res) => {
  console.log("Received data:", req.body);
  const newSubmission = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    ...req.body,
  };

  fs.readFile(DB_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database:", err);
      return res.status(500).send("Error reading database.");
    }
    const db = JSON.parse(data);
    db.push(newSubmission);

    fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to database:", writeErr);
        return res.status(500).send("Error writing to database.");
      }
      console.log("Data saved successfully.");
      res.status(200).json(newSubmission);
    });
  });
});

router.get("/report/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Generating PDF for request ID: ${id}`);

  fs.readFile(DB_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database:", err);
      return res.status(500).send("Error reading database.");
    }

    const db = JSON.parse(data);
    const submission = db.find((item) => item.id === id);

    if (!submission) {
      return res.status(404).send("Submission not found.");
    }
    generatePdfReport(submission, res);
  });
});

router.get("/requests", (req, res) => {
  console.log("Admin request: Fetching all submissions.");
  fs.readFile(DB_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database:", err);
      return res.status(500).send("Error reading database.");
    }
    const db = JSON.parse(data);
    res.status(200).json(db.reverse());
  });
});

module.exports = router;
