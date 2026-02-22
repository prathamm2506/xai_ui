"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function AnalysisLoading() {
  return (
    <div className="space-y-6">
      {/* Loading Animation */}
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
          <Loader2 className="w-8 h-8 text-violet-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Analyzing Image</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Our AI model is processing your CT scan. This may take a few moments...
          </p>
        </div>
      </div>

      {/* Skeleton Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/50 border-gray-200">
          <CardHeader className="pb-3">
            <Skeleton className="h-4 w-32 bg-gray-200" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-48 bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
          </CardContent>
        </Card>

        <Card className="bg-white/50 border-gray-200">
          <CardHeader className="pb-3">
            <Skeleton className="h-4 w-40 bg-gray-200" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32 bg-gray-200" />
                  <Skeleton className="h-4 w-12 bg-gray-200" />
                </div>
                <Skeleton className="h-2 w-full bg-gray-200" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-8 py-4">
        {["Preprocessing", "Feature Extraction", "Classification", "Visualization"].map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              index <= 1 ? "bg-violet-600 animate-pulse" : "bg-gray-300"
            }`} />
            <span className={`text-xs ${
              index <= 1 ? "text-gray-700" : "text-gray-400"
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
