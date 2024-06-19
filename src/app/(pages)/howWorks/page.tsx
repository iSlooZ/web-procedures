'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post<{ file_name: string }>('https://backend-procedures-production.up.railway.app/knowhow/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
