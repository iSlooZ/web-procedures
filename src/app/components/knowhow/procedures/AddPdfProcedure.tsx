'use client'
import { useState } from 'react';
import { SHA256 } from 'crypto-js';

// Biblioteca para calcular SHA-256 hashes

export const AddPdfProcedure = () => {
  const [mainPdf, setMainPdf] = useState<File | null>(null);
  const [samplePdf, setSamplePdf] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const generateUniqueName = (file: File): string => {
    const timestamp = Date.now().toString(); // Marca de tiempo actual
    const hash = SHA256(file.name + timestamp); // Calcula el hash SHA-256 del nombre del archivo y la marca de tiempo
    return hash + '.pdf'; // Devuelve el nombre único con extensión PDF
  };

  const handleMainPdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setMainPdf(event.target.files[0]);
    }
  };

  const handleSamplePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSamplePdf(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!mainPdf || !samplePdf) {
      setMessage('Por favor, seleccione ambos archivos PDF.');
      return;
    }

    const mainPdfName = generateUniqueName(mainPdf);
    const samplePdfName = generateUniqueName(samplePdf);

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mainPdf">Archivo PDF principal:</label>
          <input type="file" id="mainPdf" accept=".pdf" onChange={handleMainPdfChange} />
        </div>
        <div>
          <label htmlFor="samplePdf">Archivo PDF de muestra:</label>
          <input type="file" id="samplePdf" accept=".pdf" onChange={handleSamplePdfChange} />
        </div>
        <button type="submit">Subir PDFs</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
