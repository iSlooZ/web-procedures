'use client'
import { useEffect, useState } from "react";
import { Owner, getOwnerData } from "../authHandler";
import Link from 'next/link';

export const CompanyWelcome = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [sections, setSections] = useState<Owner["sections"] | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const [selectedSection, setSelectedSection] = useState<string>("");

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

  useEffect(() => {
    // Almacenar las imágenes en caché una vez que se carguen las secciones
    if (Array.isArray(sections)) {
      const images: { [key: string]: string } = {};
      sections.forEach((section) => {
        images[section.id_section.toString()] = `http://localhost:8000/uploads/${section.logo_section}`;
      });
      setCachedImages(images);
    }
  }, [sections]);

  // Obtener la sección seleccionada o todas las secciones si "Mostrar Todas" está seleccionado
  const selectedSectionData = selectedSection === "" ? sections : sections?.find(section => section.id_section === parseInt(selectedSection));

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-[50%] flex flex-col justify-center items-center mt-12">
        <h1 className="text-6xl my-4 text-center font-bold">{owner?.company.company_name}</h1>
        <div className="w-[400px] relative flex justify-center items-center mb-16">
          <img src="/lupa_icon.svg" alt="" className="absolute left-[350px] w-[25px]"/>
          <select
            name=""
            id=""
            className="w-[400px] rounded-lg py-2 primary-color-text text-center border border-primary-color appearance-none"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value=""> Mostrar Todas</option>
            {Array.isArray(sections) &&
              sections.map((section) => (
                <option key={section.id_section} value={section.id_section}>
                  {section.name_section}
                </option>
              ))}
          </select>
          <img src="/arrow_down_blue.svg" alt="" className="absolute right-[320px] w-[25px]"/>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-wrap justify-center items-center gap-4">
          {Array.isArray(selectedSectionData) ? selectedSectionData.map((section: Owner["sections"][0] | null) => (
          <div
            key={section?.id_section}
            className="w-72 h-36 rounded-xl flex justify-end items-start relative"
          >
            <Link className="hover:opacity-45 w-full" href={`/knowhow/sections/${section?.id_section}`}>
              <img
                className="rounded-xl h-36 w-72 object-cover"
                src={section ? cachedImages[section.id_section.toString()] : ""}
                alt=""
              />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xl font-bold bg-black bg-opacity-50 rounded-xl">
                {section?.name_section}
              </div>
            </Link>
          </div>
        )) : (
          <div
            className="w-72 h-36 rounded-xl flex justify-end items-start relative"
          >
            <Link className="hover:opacity-45 w-full" href={`/knowhow/sections/${selectedSectionData?.id_section}`}>
              <img
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
            <div className="w-72 h-36 border border-primary-color rounded-xl flex justify-end items-start">
              <Link className="hover:opacity-45" href="/knowhow/sections/add">
                <img className="rounded-full m-2 w-10" src="/more_section.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-8">
        <Link
          className="px-20 py-2 rounded-xl text-white font-bold primary-color shadow-lg shadow-gray-400 hover:opacity-75"
          href="/knowhow/procedures/add"
        >
          Subir un procedimiento
        </Link>
      </div>
    </section>
  );
}
