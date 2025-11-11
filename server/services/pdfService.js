const PDFDocument = require("pdfkit");
/**
 * generatePdfReport
 * Creates a structured PDF for a submission and streams it to the response.
 * @param {object} submission
 * @param {object} res
 */
function generatePdfReport(submission, res) {
  const doc = new PDFDocument({ margin: 50, layout: "portrait", size: "A4" });
  doc.on("error", (err) => {
    console.error("PDF generation error (doc stream):", err);
    if (!res.headersSent) {
      res.status(500).send("Error generating PDF report.");
    }
  });

  res.on("error", (err) => {
    console.error("Response stream error:", err);
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=risk-request-${submission.id}.pdf`
  );

  doc.pipe(res);

  const generateHr = (y) => {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  };

  const generateSectionHeader = (text) => {
    doc.font("Helvetica-Bold").fontSize(14).text(text);
    doc.moveDown(0.5);
  };

  const generateLabelValue = (label, value) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(`${label} `, { continued: true });
    doc.font("Helvetica").text(value || "N/A");
    doc.moveDown(0.5);
  };

  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("Risk Assessment Request", { align: "center" });
  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`Request ID: ${submission.id}`, { align: "right" });
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`Submitted On: ${new Date(submission.timestamp).toLocaleString()}`, {
      align: "right",
    });
  doc.moveDown(2);

  generateSectionHeader("Company & Site Information");
  generateHr(doc.y);
  doc.moveDown(1);

  const sectionTop = doc.y;
  const leftColumnX = 50;
  const rightColumnX = 320;

  generateLabelValue("Company Name:", submission.companyName);
  generateLabelValue("Industry:", submission.industry);
  generateLabelValue("Job Site Location:", submission.location);

  doc.y = sectionTop;
  doc.x = rightColumnX;
  generateLabelValue("Contact Person:", submission.contactPerson);
  generateLabelValue("Contact Email:", submission.email);

  doc.x = leftColumnX;
  doc.moveDown(2);

  generateSectionHeader("Assessment Details");
  generateHr(doc.y);
  doc.moveDown(1);

  generateLabelValue("Type of Activity to Assess:", submission.activity);

  doc.font("Helvetica-Bold").fontSize(12).text("Known Specific Hazards: ");
  doc
    .font("Helvetica")
    .text(submission.hazards || "No specific hazards were listed.");
  doc.moveDown(0.5);

  generateLabelValue(
    "Preferred Timeframe:",
    submission.timeframe
      ? new Date(submission.timeframe).toLocaleDateString()
      : "ASAP"
  );

  const bottomMarginY = doc.page.height - 50;

  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, bottomMarginY)
    .lineTo(550, bottomMarginY)
    .stroke();

  const footerY = bottomMarginY + 10;

  doc
    .font("Helvetica-Oblique")
    .fontSize(9)
    .text(`Generated on ${new Date().toLocaleDateString()}`, 50, footerY, {
      align: "center",
      width: 500,
    });

  doc.end();
}

module.exports = {
  generatePdfReport,
};
