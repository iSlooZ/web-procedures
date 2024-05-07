import { getOwnerData } from "./authHandler";


export interface Company{
  logo_company: string;
  company_name: string;
  id_owner: number;
  id_company: number;
}

export const getCompanyData = async (): Promise<Company | null> => {
  const ownerData = await getOwnerData();
  if (!ownerData) {
    // Si no se puede obtener el ID del usuario, devuelve null
    return null;
  }
  const ownerId = ownerData.entity.id_owner
  const apiUrl = `http://localhost:8000/knowhow/company/by-owner-id/${ownerId}`;
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token almacenado, devuelve null
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const ownerData = await response.json();
      return ownerData;
    } else if (response.status === 401) {
      // Si no está autorizado, devuelve null
      return null;
    } else {
      throw new Error('Error en el servidor.');
    }
  } catch (error) {
    console.error('Error: ', error);
    // Maneja el error aquí si es necesario
    return null;
  }
};