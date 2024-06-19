export interface SectionData {
  id_section: number;
  id_company: number;
  logo_section: string;
  name_section: string;

}

export const getSectionById = async (id: number): Promise<SectionData | null> => {
  try {
    const response = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/section/${id}`);
    if (response.ok) {
      const data: SectionData = await response.json();
      return data;
    } else {
      console.error('Error fetching procedure:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching procedure:', error);
    return null;
  }
};