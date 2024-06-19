export const getCompanyNameById = async (companyId: number): Promise<string | null> => {
  try {
    const response = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/company/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const companyData = await response.json();
      return companyData?.company_name || null;
    } else {
      throw new Error('Error al obtener el nombre de la empresa');
    }
  } catch (error) {
    console.error('Error fetching company name:', error);
    return null;
  }
};