'use client'

import { getSectionById, SectionData } from "@/app/components/knowhow/sections/GetSectionById";
import { useEffect, useState } from "react";

interface Params {
  id: number;
}

export default function SectionDetailPage({ params }:{params:Params}) {
  const [section, setSection] = useState<SectionData | null>(null);

  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        if (params.id) {
          const data = await getSectionById(params.id);
          setSection(data);
        }
      } catch (error) {
        console.error('Error fetching procedure:', error);
        setSection(null);
      }
    };

    fetchProcedure();
  }, [params.id]);

  if (!section) { 
    return <div>Cargando...</div>;
  }
  return (
    <section className='w-full flex flex-col justify-center items-center '>
      <div className='w-[50%] bg-stone-300 flex flex-col justify-center items-center rounded-xl p-4'>
        <h2 className='text-xl py-2 font-bold'>Identificador del área: {section.id_section}</h2>
        <img className="w-[150px] aspect-video object-contain" src={`${section.logo_section}`} alt="" />
        <h3 className='text-2xl font-normal tracking-wide'>Nombre del área: {section.name_section}</h3>
      </div>
    </section>
  );
};
