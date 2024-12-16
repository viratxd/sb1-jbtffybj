import React from 'react';
import type { ConversionProgress } from '../types/pdf';

interface ProgressBarProps {
  progress: ConversionProgress;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const percentage = (progress.current / progress.total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          Converting pages ({progress.current}/{progress.total})
        </span>
        <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}