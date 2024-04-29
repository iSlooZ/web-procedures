import { getUserData, type User } from "./authHandler";

export interface Company{
  logo_company: string;
  company_name: string;
  id_user: number;
}

export const getCompanyData = async (): Promise<Company | null> => {
  const userData = await getUserData();
  if (!userData || !userData.id_user) {
    // Si no se puede obtener el ID del usuario, devuelve null
    return null;
  }
  const userId = userData.id_user
  const apiUrl = `http://localhost:8000/knowhow/company/by-user-id/${userId}`;
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
      const userData = await response.json();
      return userData;
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