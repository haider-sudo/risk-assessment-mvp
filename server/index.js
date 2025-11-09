/*
  This is your complete, FINAL server/index.js file for Day 3, 4, and 5.
*/
const express = require('express');
const cors = require('cors');
const fs = require('fs');         
const path = require('path');       
const { v4: uuidv4 } = require('uuid'); 

// --- Day 4: Import pdfkit ---
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// --- Endpoint 1: Submit a New Request (Day 3) ---
app.post('/api/submit', (req, res) => {
  console.log('Received data:', req.body);
  const newSubmission = {
    id: uuidv4(), 
    timestamp: new Date().toISOString(),
    ...req.body
  };

  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database:', err);
      return res.status(500).send('Error reading database.');
    }
    const db = JSON.parse(data); 
    db.push(newSubmission); 

    fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to database:', writeErr);
        return res.status(500).send('Error writing to database.');
      }
      console.log('Data saved successfully.');
      res.status(200).json(newSubmission);
    });
  });
});

// --- Endpoint 2: Get a PDF Report (Day 4) ---
app.get('/api/report/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Generating PDF for request ID: ${id}`);

  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database:', err);
      return res.status(500).send('Error reading database.');
    }
    
    const db = JSON.parse(data);
    const submission = db.find(item => item.id === id);

    if (!submission) {
      return res.status(404).send('Submission not found.');
    }

    // --- Create PDF ---
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=risk-request-${submission.id}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content
    doc.fontSize(20).font('Helvetica-Bold').text('Risk Assessment Request', { align: 'center' });
    doc.moveDown(1.5);

    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('Request ID: ', { continued: true }).font('Helvetica').text(submission.id);
    doc.text('Submitted On: ', { continued: true }).font('Helvetica').text(new Date(submission.timestamp).toLocaleString());
    doc.moveDown(1);
    
    doc.font('Helvetica-Bold').text('Company: ', { continued: true }).font('Helvetica').text(submission.companyName);
    doc.font('Helvetica-Bold').text('Industry: ', { continued: true }).font('Helvetica').text(submission.industry);
    doc.font('Helvetica-Bold').text('Location: ', { continued: true }).font('Helvetica').text(submission.location);
    doc.moveDown(0.5);

    doc.font('Helvetica-Bold').text('Contact: ', { continued: true }).font('Helvetica').text(`${submission.contactPerson} (${submission.email})`);
    doc.moveDown(1.5);
    
    doc.rect(doc.x, doc.y, 510, 1).fill('#cccccc');
    doc.moveDown(0.5);

    doc.fontSize(14).font('Helvetica-Bold').text('Assessment Details');
    doc.moveDown(0.5);
    
    doc.fontSize(12).font('Helvetica-Bold').text('Type of Activity: ', { continued: true }).font('Helvetica').text(submission.activity);
    doc.moveDown(0.5);
    
    doc.font('Helvetica-Bold').text('Known Hazards:');
    doc.font('Helvetica').text(submission.hazards || 'None specified.');
    doc.moveDown(0.5);

    doc.font('Helvetica-Bold').text('Preferred Timeframe: ', { continued: true }).font('Helvetica').text(submission.timeframe ? new Date(submission.timeframe).toLocaleDateString() : 'ASAP');

    // Finalize the PDF
    doc.end();
  });
});

// --- Endpoint 3: Get All Requests (Day 5 - Admin) ---
app.get('/api/requests', (req, res) => {
  console.log('Admin request: Fetching all submissions.');
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database:', err);
      return res.status(500).send('Error reading database.');
    }
    const db = JSON.parse(data);
    // Send in reverse order so newest are first
    res.status(200).json(db.reverse()); 
  });
});


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});