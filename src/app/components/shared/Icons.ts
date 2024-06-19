export async function fetchImages(): Promise<string[]> {
  const images: string[] = [];

  for (let i = 0; i < 231; i++) {
    const response = await fetch(`https://backend-procedures-production.up.railway.app/uploads/icons/icon-${i + 1}.png`);
    if (response.ok) {
      images.push(response.url);
    } else {
      console.error(`Failed to fetch image ${i + 1}`);
    }
  }

  return images;
}

export async function loadImageUrls(): Promise<string[]> {
  try {
    const imageUrls: string[] = await fetchImages();
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
