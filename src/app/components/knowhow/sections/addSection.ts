import { getCompanyData } from "../company-by-owner";

export interface Section {
  section_name: string;
  id_company: number;
}

export const AddSection = async (nameSection: string): Promise<Section | null> => {
  const companyData = await getCompanyData();
  if (!companyData || !companyData.id_company) {
    // Si no se puede obtener el ID de la compañía, devuelve null
    return null;
  }
  const companyId = companyData.id_company;
  const apiUrl = `http://localhost:8000/knowhow/section/add`;
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token almacenado, devuelve null
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Asegúrate de incluir 'Bearer' antes del token
      },
      body: JSON.stringify({
        id_company: 1,
        name_section: "el pepe",
      })
    });

    if (response.ok) {
      const sectionData = await response.json();
      return sectionData;
    } else {
      const errorResponse = await response.json(); // Obtener detalles del error desde el servidor
      console.error('Error en el servidor:', errorResponse);
      throw new Error('Error en el servidor: ' + JSON.stringify(errorResponse)); // Lanzar el error para capturarlo en el catch
    }
  } catch (error) {
    console.error('Error: ', error);
    // Maneja el error aquí si es necesario
    return null;
  }
};
