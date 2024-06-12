'use client'
import { getOwnerData } from "@/app/components/knowhow/authHandler";
import React, { useEffect, useState } from "react";
import { LinkComponent } from "./LinkComponent";
import Link from "next/link";


export const AccountPage = () => {
  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.company) {
          setCompanyName(ownerData.company.company_name);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center mb-28">
        <h1 className="text-4xl text-center font-semibold">{companyName}</h1>
      </div>
      <div className="w-[50%] flex justify-center items-center gap-[16  %]">
        <Link href="/knowhow/employees/all" className="primary-color-text text-xl w-[200px] font-bold"><h2>Colaboradores</h2></Link>
        <Link href="/knowhow/employees/position" className="primary-color text-white flex justify-center items-center px-4 py-2 rounded-2xl gap-2 min-w-fit">Agregar Cargo <img src="/iconoxd.svg" alt="" /></Link>
        <Link href="/knowhow/employees/add" className="primary-color text-white flex justify-center items-center px-4 py-2 rounded-2xl gap-2 min-w-fit">Agregar Colaborador <img src="/add-colaborator.svg" alt="" /></Link>
      </div>
      <div className="w-[50%] flex justify-center items-center flex-wrap gap-16 mt-32">
        <LinkComponent nameLink="Mis empresas"/>
        <LinkComponent nameLink="Colaboradores"/>
        <LinkComponent nameLink="Procedimientos"/>
        <LinkComponent nameLink="Formularios"/>
        <LinkComponent nameLink="Información de la cuenta"/>
        <LinkComponent nameLink="Actividad"/>
      </div>
    </section>
  );
}
