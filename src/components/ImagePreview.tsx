import React from 'react';
import type { PDFPage } from '../types/pdf';

interface ImagePreviewProps {
  page: PDFPage;
}

export function ImagePreview({ page }: ImagePreviewProps) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img
        src={page.imageUrl}
        alt={`Page ${page.pageNumber}`}
        className="w-full h-auto object-contain bg-white"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-3 py-2 text-sm">
        Page {page.pageNumber}
      </div>
    </div>
  );
}