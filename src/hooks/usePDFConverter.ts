import { useState } from 'react';
import { convertPDFToImages } from '../utils/pdfUtils';
import { validatePDFFile } from '../utils/validation';
import type { PDFPage, ConversionProgress } from '../types/pdf';

export function usePDFConverter() {
  const [pages, setPages] = useState<PDFPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const convertFile = async (file: File) => {
    try {
      setError(null);
      setIsConverting(true);
      setProgress({ current: 0, total: 0 });

      // Validate file before processing
      validatePDFFile(file);
      
      const images = await convertPDFToImages(file, (progress) => {
        setProgress(progress);
      });
      
      // Convert to PDFPage format
      const pdfPages: PDFPage[] = images.map((imageUrl, index) => ({
        pageNumber: index + 1,
        imageUrl,
        width: 0, // These will be set when the image loads
        height: 0,
      }));
      
      setPages(pdfPages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to convert PDF. Please try again with a different file.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsConverting(false);
      setProgress(null);
    }
  };

  return {
    pages,
    error,
    progress,
    isConverting,
    convertFile,
  };
}