'use client'
import { getCompanyNameById } from '@/app/components/knowhow/procedures/getCompanyNameById';
import { ProcedureData, getProcedureById } from '@/app/components/knowhow/procedures/getProcedureById';
import { getSectionsByProcedureId } from '@/app/components/knowhow/procedures/getSectionsByProcedureId';

import { SectionData } from '@/app/components/knowhow/sections/GetSectionById';
import { useEffect, useState } from 'react';

interface Params {
  slug: string;
}

export default function ProcedureDetailPage({ params }: { params: Params }) {
  const [procedure, setProcedure] = useState<ProcedureData | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        if (params.slug) {
          const data = await getProcedureById(params.slug);
          if (data) {
            setProcedure(data);
            const sectionsData = await getSectionsByProcedureId(data.id_procedure);
            setSections(sectionsData);
            const companyName = await getCompanyNameById(data.id_company); // Obtener el nombre de la empresa
            setCompanyName(companyName);
          } else {
            throw new Error('No se encontraron datos para el procedimiento');
          }
        }
      } catch (error) {
        console.error('Error fetching procedure:', error);
        setProcedure(null);
      }
    };

    fetchProcedure();
  }, [params.slug]);

  if (!procedure || sections.length === 0 || !companyName) {
    return <div>Cargando...</div>;
  }

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <div className='w-[50%] bg-stone-300 flex flex-col justify-center items-center rounded-xl p-4'>
        {procedure && (
          <>
            <h2 className='text-xl py-2 font-bold'>Identificador de procedimiento: {procedure.id_procedure}</h2>
            <h1 className='text-3xl py-2'>Nombre del Procedimiento: {procedure.procedure_name}</h1>
            <h3 className='text-2xl font-normal tracking-wide'>Descripción del procedimiento: {procedure.procedure_description}</h3>
            <h3 className='text-2xl font-normal'>Empresa: {companyName}</h3>
            <div className='w-full flex flex-col gap-4 justify-center items-center'>
              {sections.length > 0 && (
                <h3 className='text-2xl font-normal'>Dirigido a: {sections.map(section => section.name_section).join(', ')}</h3>
              )}
              <h3 className='text-xl'>Subido por: {procedure.procedure_uploaded_by}</h3>
              <div className='w-full flex gap-4 justify-center items-center'>
                <a
                  target='_blank'
                  className='border border-black p-2 rounded-xl text-xl'
                  href={`http://localhost:8000/pdfs/${procedure.procedure_sample_pdf}`}>Descargar PDF Ejemplo</a>
                <a
                  target='_blank'
                  className='border border-black p-2 rounded-xl text-xl'
                  href={`http://localhost:8000/pdfs/${procedure.procedure_pdf}`}>Descargar PDF</a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
