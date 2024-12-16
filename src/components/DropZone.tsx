import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { clsx } from 'clsx';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function DropZone({ onFileSelect, disabled = false }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    disabled,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg font-medium text-gray-900">
        {isDragActive ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
      </p>
      <p className="mt-2 text-sm text-gray-500">or click to select a file</p>
      <p className="mt-1 text-xs text-gray-400">Only PDF files are supported</p>
    </div>
  );
}