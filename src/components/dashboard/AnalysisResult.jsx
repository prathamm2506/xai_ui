"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertTriangle, CheckCircle, Target } from "lucide-react";

export function AnalysisResults({ results }) {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return "text-violet-600";
    if (confidence >= 60) return "text-orange-500";
    return "text-red-500";
  };

  const getClassificationIcon = (classification) => {
    if (classification === "Normal") {
      return <CheckCircle className="w-5 h-5 text-violet-600" />;
    }
    return <AlertTriangle className="w-5 h-5 text-orange-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Primary Classification */}
      <Card className="bg-white/50 border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Classification Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getClassificationIcon(results.classification)}
              <span className="text-xl font-bold text-gray-800">
                {results.classification}
              </span>
            </div>
            <Badge
              variant={results.classification === "Normal" ? "default" : "destructive"}
              className="text-sm px-3 py-1 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100"
            >
              {results.confidence.toFixed(1)}% Confidence
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Class Probabilities */}
      <Card className="bg-white/50 border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Class Probabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.classes.map((cls, index) => (
            <div key={cls.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {cls.name}
                </span>
                <span className={`text-sm font-bold ${getConfidenceColor(cls.probability)}`}>
                  {cls.probability.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={cls.probability}
                className="h-2 bg-gray-100"
                style={{
                  "--progress-color": index === 0 ? "#7c3aed" : 
                    index === 1 ? "#a78bfa" : 
                    index === 2 ? "#f97316" : "#22c55e"
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
