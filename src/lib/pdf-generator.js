export async function generatePDF(results, imageUrl, geminiReport = null) {
  // Dynamically import jsPDF
  const { default: jsPDF } = await import("jspdf");
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
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

  // Helper function to check if we need a new page and add one if needed
  const checkAndAddPage = (requiredSpace, addHeader = true) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Helper function to add space
  const addSpace = (space) => {
    yPos += space;
  };

  // Helper function to draw a horizontal line
  const addDivider = (y) => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    return y + 10;
  };

  // ============================================
  // PAGE 1: Report Header and Main Findings
  // ============================================
  
  // Header
  doc.setFillColor(20, 30, 50);
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("LungVision AI", margin, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Lung Cancer Image Analysis Report", margin, 30);

  // Report metadata
  yPos = 50;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text(`Report ID: ${results.reportId}`, margin, yPos);
  doc.text(`Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, pageWidth - margin - 60, yPos);

  // Divider
  yPos = addDivider(yPos + 5);

  // Primary Finding Section
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Primary Finding", margin, yPos);
  
  yPos += 10;
  
  // Check for page overflow
  checkAndAddPage(30);
  
  doc.setFontSize(18);
  const isNormal = results.classification === "Normal";
  doc.setTextColor(isNormal ? 34 : 234, isNormal ? 197 : 179, isNormal ? 94 : 8);
  doc.text(results.classification, margin, yPos);

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Confidence: ${results.confidence.toFixed(1)}%`, margin + 80, yPos);

  addSpace(20);

  // Classification Distribution - Simplified (text only, no progress bars)
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Classification Distribution", margin, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  // Calculate height needed for class distribution
  const classDistHeight = results.classes.length * 12 + 10;
  checkAndAddPage(classDistHeight);
  
  results.classes.forEach((cls) => {
    doc.setTextColor(60, 60, 60);
    doc.text(`${cls.name}: ${cls.probability.toFixed(1)}%`, margin, yPos);
    yPos += 12;
  });

  addSpace(15);

  // Summary (Key Findings Only)
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Summary", margin, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  
  // Estimate height for wrapped text - only summary
  const summaryLines = doc.splitTextToSize(results.analysis.summary, contentWidth);
  const summaryHeight = summaryLines.length * 7 + 20;
  checkAndAddPage(summaryHeight);
  
  yPos = addWrappedText(results.analysis.summary, margin, yPos, contentWidth);

  addSpace(15);

  // Recommendations
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Recommendations", margin, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  
  // Calculate recommendations height
  const recHeight = results.recommendations.length * 25 + 10;
  checkAndAddPage(recHeight);
  
  results.recommendations.forEach((rec) => {
    const bullet = "\u2022 ";
    doc.text(bullet, margin, yPos);
    yPos = addWrappedText(rec, margin + 5, yPos, contentWidth - 5);
    yPos += 5;
  });

  // Easy-to-Understand Explanation (Gemini Report)
  if (geminiReport) {
    addSpace(15);
    
    // Estimate height for the gemini report
    const cleanedReport = geminiReport
      .replace(/## /g, '\n')
      .replace(/### /g, '\n')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/- /g, '\u2022 ');
    
    const reportLines = doc.splitTextToSize(cleanedReport, contentWidth);
    const reportHeight = reportLines.length * 7 + 40;
    
    checkAndAddPage(reportHeight);
    
    // Draw background for section
    doc.setFillColor(240, 240, 250);
    doc.rect(margin, yPos - 5, contentWidth, 15, "F");
    
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Easy-to-Understand Explanation (AI Generated)", margin, yPos + 2);
    
    yPos += 20;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    
    yPos = addWrappedText(cleanedReport, margin, yPos, contentWidth);
  }

  addSpace(15);

  // Disclaimer - check if we need a new page
  checkAndAddPage(40);
  
  doc.setFillColor(255, 240, 240);
  doc.rect(margin, yPos - 5, contentWidth, 30, "F");
  
  doc.setFontSize(8);
  doc.setTextColor(150, 50, 50);
  doc.setFont("helvetica", "bold");
  doc.text("DISCLAIMER", margin + 5, yPos + 2);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 50, 50);
  const disclaimer = "This AI-generated analysis is intended for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis. Always consult with qualified healthcare professionals for medical decisions.";
  yPos = addWrappedText(disclaimer, margin + 5, yPos + 8, contentWidth - 10, 5);

  // ============================================
  // Footer on last page
  // ============================================
  
  const footerY = pageHeight - 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.setFont("helvetica", "normal");
  doc.text("Generated by LungVision AI - Advanced Medical Imaging Analysis", margin, footerY);
  
  // Page numbers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 25, footerY);
  }

  // Save the PDF
  doc.save(`LungVision_Report_${results.reportId}.pdf`);
}

