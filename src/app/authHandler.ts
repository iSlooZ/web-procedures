
export interface User {
  id_user: number;
  name_user: string;
  email_user: string;
  phone_user: string;
}

export const getUserData = async (): Promise<User | null> => {
  const apiUrl = 'http://localhost:8000/knowhow/users/me';
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

