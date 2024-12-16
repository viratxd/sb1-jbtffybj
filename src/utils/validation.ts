import { MAX_FILE_SIZE, SUPPORTED_MIME_TYPES } from './constants';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validatePDFFile(file: File): void {
  if (!file) {
    throw new ValidationError('No file selected');
  }

  if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
    throw new ValidationError('Invalid file type. Please select a PDF file');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError('File size exceeds 100MB limit');
  }
}