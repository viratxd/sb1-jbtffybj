import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function convertPDFToImages(
  file: File,
  onProgress?: (progress: { current: number; total: number }) => void
): Promise<string[]> {
  try {
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const images: string[] = [];

    // Process each page
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      // Update progress
      onProgress?.({ current: pageNum, total: numPages });

      // Get page
      const page = await pdf.getPage(pageNum);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Set canvas dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page to canvas
      await page.render({
        canvasContext: ctx,
        viewport: viewport,
      }).promise;

      // Convert canvas to image
      const image = canvas.toDataURL('image/png');
      images.push(image);
    }

    return images;
  } catch (error) {
    console.error('Error converting PDF:', error);
    throw new Error('Failed to convert PDF. Please try again with a different file.');
  }
}