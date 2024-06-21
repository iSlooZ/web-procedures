'use client'
import { Owner, getOwnerData } from "@/app/components/knowhow/authHandler";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const loadingImageSrc = "/loading.gif"; // Ruta de la imagen de carga

export const EmployeesMain = () => {
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [sections, setSections] = useState<Owner["sections"] | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerData = await getOwnerData();
        setOwner(ownerData);
        if (ownerData && ownerData.sections) {
          setSections(ownerData.sections);
        }
        setIsLoading(false); // Marcar como finalizada la carga de datos
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false); // Aunque ocurra un error, marcamos como finalizada la carga
      }
    };

    fetchData();
  }, []);

  const selectedSectionData = selectedSection === "" ? sections : sections?.find(section => section.id_section === parseInt(selectedSection));

  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Image width={150} height={150} src={loadingImageSrc} alt="Loading..." unoptimized/>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center mb-28">
        <h1 className="text-4xl text-center font-semibold">{companyName}</h1>
      </div>
      <div className="w-[50%] flex justify-center items-center gap-[16%]">
        <h2 className="primary-color-text text-xl w-[200px] font-bold">Colaboradores</h2>
        <Link href="/employees/position" className="primary-color text-white flex justify-center items-center px-4 py-2 rounded-2xl gap-2 min-w-fit">Agregar Cargo <Image width={20} height={20} src="/iconoxd.svg" alt="" /></Link>
        <Link href="/employees/add" className="primary-color text-white flex justify-center items-center px-4 py-2 rounded-2xl gap-2 min-w-fit">Agregar Colaborador <Image width={20} height={20} src="/add-colaborator.svg" alt="" /></Link>
      </div>
      <div className="w-[50%] flex justify-center items-center flex-wrap gap-8 mt-28 mb-14">
        {Array.isArray(selectedSectionData) ? selectedSectionData.map((section: Owner["sections"][0] | null) => (
          <Link href={`/employees/section/${section?.id_section}`} style={{ backgroundColor: section?.color_section }} key={section?.id_section} className="h-[150px] w-[300px] rounded-xl flex justify-center items-center relative p-3">
            <div className="w-1/4 m-2">
              <Image
                className="object-contain"
                width={100}
                height={100}
                src={section?.logo_section || ""}
                alt=""
              />
            </div>
            <div className="w-2/4 h-full flex justify-center items-center text-white text-xl font-bold">
              <h4>{section?.name_section}</h4>
            </div>
            <div className="w-1/4 flex justify-center items-center">
              <Image width={50} height={50} src="/right-arrow-svgrepo-com.svg" alt="" />
            </div>
          </Link>
        )) : (
          <div
            className="w-72 h-36 rounded-xl flex justify-end items-start relative"
          >
            <Link className="hover:opacity-45 w-full" href={`/employees/section/${selectedSectionData?.id_section}`}>
              <Image
                className="rounded-xl h-36 w-72 object-cover"
                src={selectedSectionData ? cachedImages[selectedSectionData.id_section.toString()] : ""}
                alt=""
              />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xl font-bold bg-black bg-opacity-50 rounded-xl">
                {selectedSectionData?.name_section}
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
