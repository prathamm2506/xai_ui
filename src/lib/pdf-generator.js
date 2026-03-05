export async function generatePDF(results, imageUrl, geminiReport = null) {
  // Dynamically import jsPDF
  const { default: jsPDF } = await import("jspdf");
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  // Helper function to add text with word wrap and return new Y position
  const addWrappedText = (text, x, y, maxWidth, lineHeight = 7) => {
    if (!text) return y;
    const lines = doc.splitTextToSize(text, maxWidth);
    const textHeight = lines.length * lineHeight;
    doc.text(lines, x, y);
    return y + textHeight;
  };

  // Helper function to add space
  const addSpace = (space) => {
    yPos += space;
  };

  // ============================================
  // Report Header
  // ============================================
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("LungVision AI - Analysis Report", margin, yPos);

  yPos += 10;

  // Report metadata
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(`Report ID: ${results.reportId}`, margin, yPos);
  doc.text(`Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, pageWidth - margin - 60, yPos);

  yPos += 15;

  // Divider line
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  yPos += 15;

  // ============================================
  // Primary Finding
  // ============================================
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Primary Finding:", margin, yPos);
  
  yPos += 8;
  
  doc.setFontSize(16);
  doc.text(results.classification, margin, yPos);

  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text(`Confidence: ${results.confidence.toFixed(1)}%`, margin + 70, yPos);

  yPos += 15;

  // ============================================
  // Classification Distribution
  // ============================================
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Classification Distribution:", margin, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  results.classes.forEach((cls) => {
    doc.setTextColor(40, 40, 40);
    doc.text(`${cls.name}: ${cls.probability.toFixed(1)}%`, margin, yPos);
    yPos += 6;
  });

  yPos += 10;

  // ============================================
  // Summary
  // ============================================
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Summary:", margin, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  
  yPos = addWrappedText(results.analysis.summary, margin, yPos, contentWidth);

  yPos += 10;

  // ============================================
  // Recommendations
  // ============================================
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Recommendations:", margin, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  
  results.recommendations.forEach((rec) => {
    const bullet = "- ";
    const wrappedLines = doc.splitTextToSize(bullet + rec, contentWidth - 5);
    doc.text(wrappedLines, margin, yPos);
    yPos += wrappedLines.length * 5 + 2;
  });

  yPos += 10;

  // ============================================
  // Gemini AI Report (if available)
  // ============================================
  
  if (geminiReport && geminiReport.trim().length > 0) {
    // Check if we need a new page (keep it under 2 pages)
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("AI-Powered Explanation:", margin, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    
    // Process the gemini report - remove markdown headers for PDF
    let cleanReport = geminiReport
      .replace(/## /g, '')
      .replace(/### /g, '')
      .replace(/\*\*/g, '');
    
    yPos = addWrappedText(cleanReport, margin, yPos, contentWidth);
    
    yPos += 10;
  }

  // ============================================
  // Disclaimer
  // ============================================
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Disclaimer:", margin, yPos);
  
  yPos += 6;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const disclaimer = "This analysis is for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis. Always consult with qualified healthcare professionals for medical decisions.";
  yPos = addWrappedText(disclaimer, margin, yPos, contentWidth, 5);

  // ============================================
  // Footer
  // ============================================
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("Generated by LungVision AI", margin, 280);

  // Save the PDF
  doc.save(`LungVision_Report_${results.reportId}.pdf`);
}

