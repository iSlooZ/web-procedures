'use client'
import { useEffect, useState } from "react";
import { Owner, getOwnerData } from "../authHandler";
import Link from 'next/link';

export const WelcomeHero = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [sections, setSections] = useState<Owner["sections"] | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});

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

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-[50%] mt-12">
        <h1 className="text-6xl my-4 text-center font-bold">Bienvenido {owner?.entity.name_owner} a tus áreas</h1>
        <div className="w-full">
          <div className="flex my-4 justify-center items-center">
            <img className="w-44 aspect-square" src={owner?.company.logo_company} alt="" />
          </div>
          <div className="w-full flex flex-wrap justify-center items-center gap-4">
            {Array.isArray(sections) && sections.map((section) => (
              <div key={section.id_section} className="w-72 h-36 rounded-xl flex justify-end items-start relative">
                <Link className="hover:opacity-45 w-full" href={`/knowhow/sections/${section.id_section}`}>
                  <img className="rounded-xl h-36 w-72 object-cover" src={cachedImages[section.id_section.toString()]} alt="" />
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xl font-bold bg-black bg-opacity-50 rounded-xl">{section.name_section}</div>
                </Link>
              </div>
            ))}
            <div className="w-72 h-36 border border-black rounded-xl flex justify-end items-start">
              <Link className="hover:opacity-45" href="/knowhow/sections/add"><img className="rounded-full m-2 w-10" src="/plus.png" alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-8">
        <Link className="px-20 py-2 rounded-xl text-white font-bold bg-stone-400 shadow-lg shadow-gray-400 hover:bg-stone-200" href="/knowhow/procedures/add">Subir un procedimiento</Link>
      </div>
    </section>
  );
}
