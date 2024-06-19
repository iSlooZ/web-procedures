

export const DownloadPdfButton = ({ fileName }: { fileName: string }) => {
  const handleDownload = () => {
    window.open(`https://backend-procedures-production.up.railway.app/knowhow/download-pdf/${fileName}`);
  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};