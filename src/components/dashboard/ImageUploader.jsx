"use client";

import { useCallback } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageUploader({ onImageUpload, isAnalyzing }) {
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-[280px] rounded-xl border-2 border-dashed border-gray-200 bg-white/50 transition-all duration-300",
        "hover:border-violet-400 hover:bg-white/80",
        isAnalyzing && "pointer-events-none opacity-50"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        disabled={isAnalyzing}
      />
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="p-4 rounded-full bg-violet-100 border border-violet-200">
          <Upload className="w-8 h-8 text-violet-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Upload Lung CT Scan
          </h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Drag and drop your CT scan image here, or click to browse
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <ImageIcon className="w-4 h-4" />
          <span>Supports PNG, JPG, JPEG, DICOM</span>
        </div>
      </div>
    </div>
  );
}
