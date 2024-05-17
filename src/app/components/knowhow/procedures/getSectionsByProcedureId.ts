import axios from 'axios';

export interface SectionData {
  id_section: number;
  name_section: string;
  logo_section: string;
  id_company: number;
}

export async function getSectionsByProcedureId(procedureId: string): Promise<SectionData[]> {
  try {
    // Hacer una solicitud HTTP para obtener las secciones correspondientes al ID del procedimiento
    const response = await axios.get(`http://localhost:8000/knowhow/sections/by-procedure-id/${procedureId}`);
    // Devolver los datos de las secciones
    return response.data;
  } catch (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
}
