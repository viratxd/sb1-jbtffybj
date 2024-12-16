import React from 'react';
import { FileWarning } from 'lucide-react';
import { DropZone } from './DropZone';
import { ProgressBar } from './ProgressBar';
import { ImagePreview } from './ImagePreview';
import { usePDFConverter } from '../hooks/usePDFConverter';

export default function PDFConverter() {
  const { pages, error, progress, isConverting, convertFile } = usePDFConverter();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            PDF to Image Converter
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Convert your PDF files to high-quality images right in your browser
          </p>
        </div>

        {/* Drop Zone */}
        <div className="max-w-xl mx-auto mb-8">
          <DropZone onFileSelect={convertFile} disabled={isConverting} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-xl mx-auto mb-8 bg-red-50 p-4 rounded-md">
            <div className="flex items-center">
              <FileWarning className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {progress && (
          <div className="max-w-xl mx-auto mb-8">
            <ProgressBar progress={progress} />
          </div>
        )}

        {/* Image Preview Grid */}
        {pages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page, index) => (
              <ImagePreview key={index} page={page} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}