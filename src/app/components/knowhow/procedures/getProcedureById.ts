export interface ProcedureData {
  id_procedure: string;
  procedure_name: string;
  procedure_description:string;
  procedure_sample_pdf: string;
  procedure_pdf: string;
  id_business_line:number;
  id_company:number;
  id_section:number;
  procedure_uploaded_by: string;
}

export const getProcedureById = async (slug: string): Promise<ProcedureData | null> => {
  try {
    const response = await fetch(`http://localhost:8000/knowhow/procedure/${slug}`);
    if (response.ok) {
      const data: ProcedureData = await response.json();
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