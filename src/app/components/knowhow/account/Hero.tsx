'use client'
import { getOwnerData } from "@/app/components/knowhow/authHandler";
import React, { useEffect, useState } from "react";
import { LinkComponent } from "../../shared/LinkComponent";



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
      <div className="w-[50%] flex justify-center items-center gap-[16%]">
        <h2 className="primary-color-text text-xl w-[85%] text-start font-bold">Mi cuenta</h2>
      </div>
      <div className="w-[50%] flex justify-center items-center flex-wrap gap-16 mt-32">
        <LinkComponent link="/welcome" nameLink="Mis áreas"/>
        <LinkComponent link="/employees" nameLink="Colaboradores"/>
        <LinkComponent link="/procedures" nameLink="Procedimientos"/>
        <LinkComponent link="#" nameLink="Formularios"/>
        <LinkComponent link="#" nameLink="Información de la cuenta"/>
        <LinkComponent link="#" nameLink="Actividad"/>
      </div>
    </section>
  );
}
