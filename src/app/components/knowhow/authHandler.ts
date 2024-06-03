'use client'

export interface Owner {
  entity: {
    name_owner: string;
    email_owner: string;
    phone_owner: string;
    id_owner: number;
  };
  holding:{
    holding_name: string;
    logo_holding:string;
    id_holding:number;
    id_owner:number;
  };
  companies_in_holding:Array<{
    company_name:string;
    logo_company:string;
    id_company:string;
    id_owner:string;
  }>;
  company: {
    company_name: string;
    logo_company:string;
    id_company:number;
    id_owner:number;
  };
  sections: Array<{
    name_section:string;
    id_section:number;
    logo_section:string;
    id_company:number;
  }>;
  positions:{
    id_position:number;
    position:string;
    id_company:number;
  }
}



export const getOwnerData = async (): Promise<Owner | null> => {
  if (typeof window === 'undefined') {
    // Si no estamos en el navegador, devuelve null
    return null;
  }

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
    } else{
      window.location.href = '/knowhow/login';
      throw new Error('Error en el servidor.');
    }
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
};