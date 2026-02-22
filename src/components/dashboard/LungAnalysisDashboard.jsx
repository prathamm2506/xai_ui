"use client";

import { useState, useCallback } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { ImageUploader } from "./ImageUploader";
import { AnalysisResults } from "./AnalysisResult";
import { VisualizationPanel } from "./VisualizationPanel";
import { ReportSection } from "./ReportSection";
import { AnalysisLoading } from "./AnalysisLoading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { analyzeImage } from "@/lib/analysis";
import { generatePDF } from "@/lib/pdf-generator";
import { RefreshCw, ImageIcon, AlertCircle } from "lucide-react";

export function LungAnalysisDashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [geminiReport, setGeminiReport] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = useCallback(async (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setResults(null);
    setError(null);

    try {
      const analysisResults = await analyzeImage(imageUrl);
      setResults(analysisResults);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setResults(null);
    setGeminiReport(null);
    setError(null);
    setIsAnalyzing(false);
  }, [uploadedImage]);

  const handleDownloadPDF = useCallback(async () => {
    if (results && uploadedImage) {
      await generatePDF(results, uploadedImage, geminiReport);
    }
  }, [results, uploadedImage, geminiReport]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Initial Upload State */}
        {!uploadedImage && !isAnalyzing && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Upload CT Scan for Analysis
              </h2>
              <p className="text-gray-500">
                Upload a lung CT scan image to receive AI-powered classification, 
                heatmap visualization, and a detailed diagnostic report.
              </p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { title: "AI Classification", desc: "Multi-class cancer detection" },
                { title: "GradCAM Visualization", desc: "Visual attention mapping" },
                { title: "PDF Reports", desc: "Downloadable analysis" },
              ].map((feature) => (
                <Card key={feature.title} className="bg-white/50 border-gray-200">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-sm font-semibold text-gray-700">{feature.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={uploadedImage || ""}
                    alt="Uploaded CT Scan"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Processing Image</h3>
                  <p className="text-sm text-gray-500">Analysis in progress...</p>
                </div>
              </div>
              <Button variant="ghost" onClick={handleReset} className="text-gray-500 hover:text-gray-700">
                Cancel
              </Button>
            </div>
            <AnalysisLoading />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800">Analysis Failed</h3>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                  <div className="mt-4 flex gap-3">
                    <Button 
                      onClick={handleReset} 
                      variant="outline" 
                      className="border-red-300 text-red-700 hover:bg-red-100"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results State */}
        {results && uploadedImage && !isAnalyzing && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-100 border border-violet-200">
                  <ImageIcon className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Analysis Complete</h2>
                  <p className="text-sm text-gray-500">
                    Report ID: {results.reportId}
                  </p>
                </div>
              </div>
              <Button onClick={handleReset} variant="outline" className="gap-2 bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100">
                <RefreshCw className="w-4 h-4" />
                New Analysis
              </Button>
            </div>

            {/* Results Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Column - Visualizations */}
              <div className="space-y-6">
                <VisualizationPanel originalImage={uploadedImage} results={results} />
                <AnalysisResults results={results} />
              </div>

              {/* Right Column - Report */}
              <div>
                <ReportSection 
                  results={results} 
                  onDownloadPDF={handleDownloadPDF}
                  geminiReport={results.geminiReport}
                  setGeminiReport={setGeminiReport}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-gray-500">
            LungCare AI is for educational and research purposes only. 
            Not intended for clinical diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
}
