'use client'

import { useEffect, useState } from "react";
import { Owner, getOwnerData } from "../authHandler";
import { Company, getCompanyData } from "../company-by-owner";


export const WelcomeHero = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  console.log(company,'la empresa es:')
  useEffect(() => {
    const fetchOwner= async () => {
      try {
        const ownerData = await getOwnerData(); // Obtener los datos del usuario
        setOwner(ownerData); // Establecer los datos del usuario en el estado
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchOwner(); // Llamar a la función para obtener los datos del usuario al cargar el componente
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
        <h1 className="text-6xl my-4 text-center font-bold">Bienvenido {owner?.name_owner} a tus áreas</h1>
        <div className="w-full">
          <div className="flex my-4 justify-center items-center">
            <img className="w-44 aspect-square" src={company?.logo_company} alt="" />
          </div>
          <div className="w-full flex flex-wrap justify-center items-center gap-4">
            <div className="w-72 h-36 border border-black rounded-xl flex justify-end items-start">
              <a className="hover:opacity-45" href="/knowhow/sections/add"><img className="rounded-full m-2 w-10" src="/plus.png" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-8">
          <a className="px-20 py-2 rounded-xl text-white font-bold bg-stone-400 shadow-lg shadow-gray-400 hover:bg-stone-200" href="#">Subir un procedimiento</a>
      </div>
    </section>
  )
}
