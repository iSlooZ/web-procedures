export interface SectionDataByIdCompany {
  id_section: number;
  id_company: number;
  logo_section: string;
  name_section: string;

}

export const getSectionByIdCompany = async (id: number): Promise<SectionDataByIdCompany | null> => {
  try {
    const response = await fetch(`http://localhost:8000/knowhow/sections/by-company-id/${id}`);
    if (response.ok) {
      const data: SectionDataByIdCompany = await response.json();
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