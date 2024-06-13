'use client'
import { Owner, getOwnerData } from "@/app/components/knowhow/authHandler";
import { CompanyData, getCompanyById } from "@/app/components/knowhow/companies/CompanyById";
import { SectionDataByIdCompany, getSectionByIdCompany } from "@/app/components/knowhow/sections/getSections";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Params {
  id: number;
}

export default function DetailCompanyPage({ params }: { params: Params }) {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [sections, setSections] = useState<SectionDataByIdCompany[] | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyById(params.id);
        setCompany(data);
  
        // Llamar a la función para obtener las secciones
        const sectionsData = await getSectionByIdCompany(params.id);
        if (sectionsData) {
          setSections(Array.isArray(sectionsData) ? sectionsData : [sectionsData]); // Asegúrate de que sectionsData sea un array
        } else {
          setSections([]); // Si no hay secciones, establecer un array vacío
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
  
    fetchCompanyData();
  }, [params.id]);


  return (
    <section>
      <div className="w-full flex flex-col justify-center items-center">
        {company ? (
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl">Empresa: {company.company_name}</h1>
            <Image width={150} height={150} src={company.logo_company} alt="Company Logo" />
          </div>
        ) : (
          <Image width={150} height={150} src="/loading.gif" alt="loading" unoptimized/>
        )}
      </div>
      <div className="w-full">
        <div className="w-full flex flex-wrap justify-center items-center gap-4">
        {Array.isArray(sections) ? (
              sections.map((section: SectionDataByIdCompany | null, index: number) => (
                <div
                  key={section?.id_section ?? index}
                  className="w-72 h-36 rounded-xl flex justify-end items-start relative"
                >
                  <Link href={`/knowhow/sections/${section?.id_section}`}>
                    <Image width={288} height={144}
                      className="rounded-xl object-cover"
                      src={`http://localhost:8000/uploads/${section?.logo_section}`}
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
          <Link href={`/knowhow/sections/addSection?id=${company?.id_company}`}>
            <Image width={40} height={40} className="rounded-full m-2 " src="/more_section.svg" alt="" />
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

