"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Layers, RefreshCw } from "lucide-react";

export function VisualizationPanel({ originalImage, results, isLoading }) {
  const [activeTab, setActiveTab] = useState("original");
  const [imageUrls, setImageUrls] = useState({
    original: null,
    heatmap: null,
    gradcam: null,
    overlay: null
  });

  useEffect(() => {
    if (results?.images) {
      setImageUrls({
        original: results.images.original || originalImage,
        heatmap: results.images.heatmap || originalImage,
        gradcam: results.images.gradcam || originalImage,
        overlay: results.images.overlay || originalImage
      });
    } else {
      setImageUrls({
        original: originalImage,
        heatmap: originalImage,
        gradcam: originalImage,
        overlay: originalImage
      });
    }
  }, [results, originalImage]);

  const getImageUrl = (type) => {
    // For simulated mode, add a random param to prevent caching
    if (results?.simulated) {
      return `${imageUrls[type]}?t=${Date.now()}`;
    }
    return imageUrls[type] || originalImage;
  };

  return (
    <Card className="bg-white/50 border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Image Visualizations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 text-violet-600 animate-spin" />
              <span className="text-sm text-gray-500">Generating visualizations...</span>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 mb-4">
              <TabsTrigger 
                value="original" 
                className="flex items-center gap-2 text-xs text-gray-600 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
              >
                <Eye className="w-3 h-3" />
                <span className="hidden sm:inline">Original</span>
              </TabsTrigger>
              <TabsTrigger 
                value="heatmap" 
                className="flex items-center gap-2 text-xs text-gray-600 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
              >
                <Layers className="w-3 h-3" />
                <span className="hidden sm:inline">Heatmap</span>
              </TabsTrigger>
              <TabsTrigger 
                value="gradcam" 
                className="flex items-center gap-2 text-xs text-gray-600 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
              >
                <Layers className="w-3 h-3" />
                <span className="hidden sm:inline">GradCAM</span>
              </TabsTrigger>
              <TabsTrigger 
                value="overlay" 
                className="flex items-center gap-2 text-xs text-gray-600 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
              >
                <Layers className="w-3 h-3" />
                <span className="hidden sm:inline">Overlay</span>
              </TabsTrigger>
            </TabsList>

            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
              <TabsContent value="original" className="m-0 absolute inset-0">
                <img
                  src={getImageUrl('original')}
                  alt="Original CT Scan"
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                />
              </TabsContent>

              <TabsContent value="heatmap" className="m-0 absolute inset-0">
                <div className="relative w-full h-full">
                  <img
                    src={getImageUrl('heatmap')}
                    alt="Heatmap Visualization"
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 rounded px-2 py-1">
                    <div className="w-24 h-2 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-red-500" />
                    <span className="text-[10px] text-gray-500 ml-1">Intensity</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="overlay" className="m-0 absolute inset-0">
                <div className="relative w-full h-full">
                  {results?.simulated ? (
                    // Simulated Overlay with attention regions
                    <>
                      <img
                        src={getImageUrl('overlay')}
                        alt="CT Scan with Overlay"
                        className="w-full h-full object-contain"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent mix-blend-overlay" />
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        {results.regions && results.regions.map((region, i) => (
                          <circle
                            key={i}
                            cx={region.x}
                            cy={region.y}
                            r={region.radius * 2}
                            fill="none"
                            stroke="rgba(147, 51, 234, 0.6)"
                            strokeWidth="2"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </svg>
                    </>
                  ) : (
                    // Real overlay from API
                    <img
                      src={getImageUrl('overlay')}
                      alt="Overlay Visualization"
                      className="w-full h-full object-contain"
                      crossOrigin="anonymous"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 rounded px-2 py-1">
                    <div className="w-24 h-2 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500" />
                    <span className="text-[10px] text-gray-500 ml-1">Attention</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gradcam" className="m-0 absolute inset-0">
                <div className="relative w-full h-full">
                  {results?.simulated ? (
                    // Simulated GradCAM overlay
                    <>
                      <img
                        src={getImageUrl('gradcam')}
                        alt="CT Scan with GradCAM"
                        className="w-full h-full object-contain opacity-70"
                        crossOrigin="anonymous"
                      />
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <defs>
                          {results.regions && results.regions.map((region, i) => (
                            <radialGradient key={`grad-${i}`} id={`gradcam-gradient-${i}`}>
                              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
                              <stop offset="30%" stopColor="rgba(249, 115, 22, 0.6)" />
                              <stop offset="60%" stopColor="rgba(234, 179, 8, 0.4)" />
                              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
                            </radialGradient>
                          ))}
                        </defs>
                        {results.regions && results.regions.map((region, i) => (
                          <circle
                            key={i}
                            cx={region.x}
                            cy={region.y}
                            r={region.radius * 2}
                            fill={`url(#gradcam-gradient-${i})`}
                          />
                        ))}
                      </svg>
                    </>
                  ) : (
                    // Real GradCAM from API
                    <img
                      src={getImageUrl('gradcam')}
                      alt="GradCAM Visualization"
                      className="w-full h-full object-contain"
                      crossOrigin="anonymous"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 rounded px-2 py-1">
                    <div className="w-24 h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" />
                    <span className="text-[10px] text-gray-500 ml-1">Attention</span>
                  </div>
                </div>
              </TabsContent>
            </div>

            <div className="mt-3 text-xs text-gray-500 text-center">
              {activeTab === "original" && "Original uploaded CT scan image"}
              {activeTab === "heatmap" && (
                <span>
                  {results?.simulated 
                    ? "Heatmap visualization of attention regions" 
                    : "Raw Grad-CAM heatmap showing model attention intensity"}
                </span>
              )}
              {activeTab === "gradcam" && (
                <span>
                  {results?.simulated 
                    ? "Gradient-weighted Class Activation Mapping (GradCAM)" 
                    : "GradCAM visualization showing model attention areas"}
                </span>
              )}
              {activeTab === "overlay" && (
                <span>
                  {results?.simulated 
                    ? "Attention overlay highlighting regions of interest" 
                    : "Overlay visualization combining GradCAM with original image"}
                </span>
              )}
            </div>

            {results?.simulated && (
              <div className="mt-2 text-xs text-orange-500 text-center">
                <span className="bg-orange-100 px-2 py-1 rounded">
                  Using simulated visualization (API unavailable)
                </span>
              </div>
            )}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

