export interface PDFPage {
  pageNumber: number;
  imageUrl: string;
  width: number;
  height: number;
}

export interface ConversionProgress {
  current: number;
  total: number;
}