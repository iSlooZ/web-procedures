'use client'
import { useEffect, useState } from "react";
import { getUserData, User } from "@/app/authHandler";
import { Company, getCompanyData } from "@/app/company-by-user";


export const WelcomeHero = () => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  console.log(company,'la company es:')
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData(); // Obtener los datos del usuario
        setUser(userData); // Establecer los datos del usuario en el estado
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser(); // Llamar a la función para obtener los datos del usuario al cargar el componente
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await getCompanyData(); // Obtener los datos del usuario
        setCompany(companyData); // Establecer los datos del usuario en el estado
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompany(); // Llamar a la función para obtener los datos del usuario al cargar el componente
  }, []);

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-[50%] mt-12">
        <h1 className="text-6xl my-4 text-center font-bold">Bienvenido {user?.name_user} a tus áreas</h1>
        <div className="w-full">
          <div className="flex my-4 justify-center items-center">
            <img className="w-60" src={company?.logo_company} alt="" />
          </div>
          <div className="w-full flex flex-wrap justify-center items-center">
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
