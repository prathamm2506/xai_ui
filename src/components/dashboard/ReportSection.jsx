"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Calendar, User, Stethoscope, AlertCircle, CheckCircle, Brain, Loader2 } from "lucide-react";
import { generateGeminiReport } from "@/lib/analysis";

export function ReportSection({ results, onDownloadPDF, geminiReport, setGeminiReport }) {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState(null);

  // Check if Gemini report is already available from API response
  const hasGeminiReport = results?.geminiReport && results.geminiReport.length > 0;
  const displayReport = geminiReport || results?.geminiReport || null;

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleGenerateAIReport = async () => {
    setIsGeneratingReport(true);
    setReportError(null);
    
    try {
      const report = await generateGeminiReport(results);
      setGeminiReport(report.report);
    } catch (error) {
      console.error("Error generating report:", error);
      setReportError("Failed to generate AI explanation. Please try again.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Parse markdown-like headings for better rendering
  const renderReportText = (text) => {
    if (!text) return null;
    
    // Split by double newlines to get paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, idx) => {
      // Check for headings
      if (paragraph.startsWith('## ')) {
        return (
          <h5 key={idx} className="text-lg font-bold text-gray-800 mt-4 mb-2">
            {paragraph.replace('## ', '')}
          </h5>
        );
      }
      
      if (paragraph.startsWith('### ')) {
        return (
          <h6 key={idx} className="text-md font-semibold text-gray-700 mt-3 mb-2">
            {paragraph.replace('### ', '')}
          </h6>
        );
      }
      
      // Check for bullet points
      if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
        const lines = paragraph.split('\n').filter(line => line.trim());
        return (
          <ul key={idx} className="list-disc list-inside space-y-1 my-2">
            {lines.map((line, lineIdx) => (
              <li key={lineIdx} className="text-sm text-gray-600">
                {line.replace(/^-\s*/, '')}
              </li>
            ))}
          </ul>
        );
      }
      
      // Check for numbered lists
      if (paragraph.match(/^\d+\./)) {
        const lines = paragraph.split('\n').filter(line => line.trim());
        return (
          <ol key={idx} className="list-decimal list-inside space-y-1 my-2">
            {lines.map((line, lineIdx) => (
              <li key={lineIdx} className="text-sm text-gray-600">
                {line.replace(/^\d+\.\s*/, '')}
              </li>
            ))}
          </ol>
        );
      }
      
      // Bold text
      let processedText = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return (
        <p 
          key={idx} 
          className="text-sm text-gray-600 leading-relaxed my-2"
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
      );
    });
  };

  return (
    <Card className="bg-white/50 border-gray-200" id="report-content">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Diagnostic Report
          </CardTitle>
          <Button
            onClick={onDownloadPDF}
            size="sm"
            className="bg-violet-600 text-white hover:bg-violet-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Header */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-gray-800">
            LungCare AI Analysis Report
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{currentDate} at {currentTime}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <User className="w-4 h-4" />
              <span>Report ID: {results.reportId}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Primary Finding */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-violet-600" />
            Primary Finding
          </h4>
          <div className={`p-4 rounded-lg border ${
            results.classification === "Normal" 
              ? "bg-violet-50 border-violet-200" 
              : "bg-orange-50 border-orange-200"
          }`}>
            <div className="flex items-start gap-3">
              {results.classification === "Normal" ? (
                <CheckCircle className="w-5 h-5 text-violet-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
              )}
              <div>
                <p className="font-semibold text-gray-800">
                  {results.classification}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Classification confidence: {results.confidence.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Detailed Analysis</h4>
          <div className="text-sm text-gray-500 space-y-2 leading-relaxed">
            <p>{results.analysis.summary}</p>
            <p>{results.analysis.details}</p>
          </div>
        </div>

        {/* Class Distribution */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Classification Distribution</h4>
          <div className="grid grid-cols-2 gap-2">
            {results.classes.map((cls) => (
              <div key={cls.name} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">{cls.name}</p>
                <p className="text-lg font-bold text-gray-800">{cls.probability.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regions of Interest */}
        {results.regions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">Regions of Interest</h4>
            <p className="text-sm text-gray-500">
              {results.regions.length} region(s) of interest identified with varying attention intensities.
              The highest attention region shows {(Math.max(...results.regions.map(r => r.intensity)) * 100).toFixed(0)}% 
              activation intensity.
            </p>
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Recommendations</h4>
          <ul className="text-sm text-gray-500 space-y-2">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-violet-600 mt-1">{"•"}</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Explanation Section */}
        <Separator className="bg-gray-200" />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Brain className="w-4 h-4 text-violet-600" />
              Easy-to-Understand Explanation
            </h4>
            {/* Show regenerate button only when report is already displayed */}
            {displayReport && !isGeneratingReport && (
              <Button
                onClick={handleGenerateAIReport}
                size="sm"
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50"
              >
                <Brain className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            )}
          </div>
          
          {isGeneratingReport && (
            <div className="flex items-center justify-center p-6 bg-violet-50 rounded-lg border border-violet-200">
              <Loader2 className="w-5 h-5 text-violet-600 animate-spin mr-2" />
              <span className="text-sm text-violet-700">Generating easy-to-understand explanation...</span>
            </div>
          )}
          
          {reportError && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-600">{reportError}</p>
              <Button
                onClick={handleGenerateAIReport}
                size="sm"
                variant="ghost"
                className="mt-2 text-red-700 hover:bg-red-100"
              >
                Try Again
              </Button>
            </div>
          )}
          
          {displayReport && (
            <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
              <div className="text-sm text-gray-700 space-y-1">
                {renderReportText(displayReport)}
              </div>
            </div>
          )}
          
          {/* Show placeholder only when there's no report and not loading */}
          {!displayReport && !isGeneratingReport && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">
                Generating easy-to-understand explanation from AI analysis...
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-xs text-gray-500">
            <strong className="text-red-600">Disclaimer:</strong> This AI-generated analysis is intended for 
            educational and research purposes only. It should not be used as a substitute for professional 
            medical diagnosis. Always consult with qualified healthcare professionals for medical decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
