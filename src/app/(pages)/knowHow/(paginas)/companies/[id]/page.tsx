'use client'
import { Owner, getOwnerData } from "@/app/components/knowhow/authHandler";
import { CompanyData, getCompanyById } from "@/app/components/knowhow/companies/CompanyById";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Params {
  id: number;
}

export default function DetailCompanyPage({ params }: { params: Params }) {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [sections, setSections] = useState<Owner["sections"] | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyById(params.id);
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerData = await getOwnerData();
        setOwner(ownerData);
        if (ownerData && ownerData.sections) {
          setSections(ownerData.sections);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="w-full flex flex-col justify-center items-center">
        {company ? (
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl">Empresa: {company.company_name}</h1>
            <img src={company.logo_company} alt="Company Logo" />
            {/* Aquí puedes mostrar otros detalles de la compañía si es necesario */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="w-full">
        <div className="w-full flex flex-wrap justify-center items-center gap-4">
          {Array.isArray(sections) ? (
            sections.map((section: Owner["sections"][0] | null) => (
              <div
                key={section?.id_section}
                className="w-72 h-36 rounded-xl flex justify-end items-start relative"
              >
                <Link href={`/knowhow/sections/${section?.id_section}`}>

                    <img
                      className="rounded-xl h-36 w-72 object-cover"
                      src=""
                      alt=""
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xl font-bold bg-black bg-opacity-50 rounded-xl">
                      {section?.name_section}
                    </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No sections available.</p>
          )}
          <div className="w-72 h-36 border border-primary-color rounded-xl flex justify-end items-start">
            <Link href={`/knowhow/sections/add`}>
              <img className="rounded-full m-2 w-10" src="/more_section.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
