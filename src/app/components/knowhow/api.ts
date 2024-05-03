import { useEffect, useState } from "react";

const apiUrl = 'http://localhost:8000/knowhow/session/me';

export const useSession = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchData = async () => {
      try {
        if (!token) {
          // No hay token, no está autenticado
          setIsAuthenticated(false);
          return;
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          // El usuario está autenticado
          setIsAuthenticated(true);
        } else if (response.status === 401) {
          // Redirigir a la página de inicio de sesión
          window.location.href = '/knowhow/login'; // Cambia '/login' por la ruta correcta a tu página de inicio de sesión
        } else {
          throw new Error('Error en el servidor.');
        }
      } catch (error) {
        console.error('Error: ', error);
        // Maneja el error aquí si es necesario
      }
    };

    fetchData();
  }, []);

  return isAuthenticated;
};
