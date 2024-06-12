import Image from "next/image";
import { loadImageUrls } from "../../shared/Icons";


export const LoadIcons = async () => {
  try {
    const imageUrls = await loadImageUrls();
    return (
      <div>
        {imageUrls.map((url, index) => (
          <Image key={index} src={url} alt={`Icon ${index}`} width={100} height={100} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error loading icons:', error);
    return null;
  }
};