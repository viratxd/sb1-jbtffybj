// PDF.js configuration
export const PDF_WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${(window as any).pdfjsLib?.version || '4.0.379'}/pdf.worker.min.js`;

// Validation
export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const SUPPORTED_MIME_TYPES = ['application/pdf'];

// Conversion settings
export const DEFAULT_SCALE = 1.5;
export const IMAGE_FORMAT = 'image/png';