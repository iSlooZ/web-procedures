

export const DownloadPdfButton = ({ fileName }: { fileName: string }) => {
  const handleDownload = () => {
    window.open(`http://localhost:8000/knowhow/download-pdf/${fileName}`);
  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};