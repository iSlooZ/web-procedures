export interface CompanyData {
  id_company: number;
  logo_company: string;
  company_name: string;
  id_holding: number
}

export const getCompanyById = async (id: number): Promise<CompanyData | null> => {
  try {
    const response = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/company/${id}`);
    if (response.ok) {
      const data: CompanyData = await response.json();
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