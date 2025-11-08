/*
  This is your complete server/index.js file for Day 3.
*/
const express = require('express');
const cors = require('cors');

// --- Day 3 Additions ---
const fs = require('fs');         // Node.js File System module
const path = require('path');       // Node.js Path module
const { v4: uuidv4 } = require('uuid'); // For unique IDs
// --- End Day 3 Additions ---

const app = express();
const PORT = 3001;

// --- Day 3: Path to our JSON database file ---
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// server/index.js (Additions)
const PDFDocument = require('pdfkit');
// ... add this endpoint *before* app.listen()

// Endpoint to GET a PDF for a specific submission
app.get('/api/report/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading database.');

    const db = JSON.parse(data);
    const submission = db.find(item => item.id === id);

    if (!submission) {
      return res.status(404).send('Submission not found.');
    }

    // --- Create PDF ---
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=request-${submission.id}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content
    doc.fontSize(18).text('Risk Assessment Request Confirmation', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(12);
    doc.text(`Request ID: ${submission.id}`);
    doc.text(`Timestamp: ${new Date(submission.timestamp).toLocaleString()}`);
    doc.moveDown();

    doc.text(`Company: ${submission.companyName}`);
    doc.text(`Contact Person: ${submission.contactPerson}`);
    doc.text(`Email: ${submission.email}`);
    doc.text(`Location: ${submission.location}`);
    doc.text(`Activity: ${submission.activity}`);
    doc.text(`Hazards: ${submission.hazards}`);
    doc.text(`Timeframe: ${submission.timeframe}`);

    // Finalize the PDF
    doc.end();
  });
});

// Our endpoint
app.post('/api/submit', (req, res) => {
  console.log('Received data:', req.body);

  // --- Day 3: Create a new submission object with ID and Timestamp ---
  const newSubmission = {
    id: uuidv4(), // Give it a unique ID
    timestamp: new Date().toISOString(),
    ...req.body
  };

  // --- Day 3: Save to the JSON file ---

  // 1. Read the file
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      // If the file doesn't exist or can't be read, log error and stop.
      console.error('Error reading database:', err);
      return res.status(500).send('Error reading database.');
    }

    let db;
    try {
      db = JSON.parse(data); // 2. Parse the JSON string into an array
    } catch (parseErr) {
      console.error('Error parsing db.json:', parseErr);
      return res.status(500).send('Error parsing database.');
    }
    
    db.push(newSubmission); // 3. Add the new data to the array

    // 4. Write the file back
    fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to database:', writeErr);
        return res.status(500).send('Error writing to database.');
      }

      console.log('Data saved successfully.');
      
      // 5. Send back the *newly created* submission
      // This is important so the frontend knows the new ID.
      res.status(200).json(newSubmission);
    });
  });
});

app.get('/api/requests', (req, res) => {
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading database.');
    const db = JSON.parse(data);
    res.status(200).json(db);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});