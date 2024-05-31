'use client'
import { getOwnerData } from "@/app/components/knowhow/authHandler";
import React, { useEffect, useState } from "react";
import { LinkComponent } from "./LinkComponent";


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
      <div className="w-full flex justify-center items-center">
        <h1 className="text-4xl text-center font-semibold">{companyName}</h1>
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
