
export interface Owner {
  id_owner: number;
  name_owner: string;
  email_owner: string;
  phone_owner: string;
}

export const getOwnerData = async (): Promise<Owner | null> => {
  const apiUrl = 'http://localhost:8000/knowhow/session/me';
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

