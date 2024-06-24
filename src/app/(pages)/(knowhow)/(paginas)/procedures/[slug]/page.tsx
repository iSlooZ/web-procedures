'use client'
import { getCompanyNameById } from '@/app/components/knowhow/procedures/getCompanyNameById';
import { ProcedureData, getProcedureById } from '@/app/components/knowhow/procedures/getProcedureById';
import { getSectionsByProcedureId } from '@/app/components/knowhow/procedures/getSectionsByProcedureId';

import { SectionData } from '@/app/components/knowhow/sections/GetSectionById';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const poppins = Poppins({
  weight: ['200', '300','400','500','600'],
  subsets: ['latin'],
})

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
    return <div className='w-full flex justify-center items-center'><Image width={150} height={150} src="/loading.gif" alt="loading" unoptimized/></div>;
  }

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <div className='w-[50%] shadow-sm shadow-gray-500 flex flex-col justify-center items-center rounded-xl p-4'>
        {procedure && (
          <>
            <h2 className='text-xl py-2 font-bold text-left w-full'>{procedure.id_procedure}</h2>
            <h1 className={`text-3xl py-2 font-bold mb-4 ${poppins.className}`}>{procedure.procedure_name}</h1>
            {sections.length > 0 && (
                <h3 className={`text-2xl font-normal mb-8 ${poppins.className}`}>Dirigido a: {sections.map(section => section.name_section).join(', ')}</h3>
            )}
            <h3 className={`text-xl font-light tracking-wide ${poppins.className}`}>{procedure.procedure_description}</h3>
            <h3 className={`text-2xl font-normal w-full text-right ${poppins.className}`}>Empresa: {companyName}</h3>
            <div className='w-full flex flex-col gap-4 justify-center items-center'>

              <h3 className={`text-xl w-full text-right font-light ${poppins.className}`}>Subido por: {procedure.procedure_uploaded_by}</h3>
              <div className='w-full flex gap-4 justify-center items-center'>
                {procedure.procedure_sample_pdf && (
                  <a
                    target='_blank'
                    className={`px-4 py-2 rounded-xl text-lg font-medium primary-color text-white ${poppins.className}`}
                    href={`https://knowhow-files-uploads.s3.amazonaws.com/pdfs/${procedure.procedure_sample_pdf}`}>
                    Descargar {procedure.procedure_sample_pdf}
                  </a>
                )}
                {procedure.procedure_pdf && (
                  <a
                    target='_blank'
                    className={`px-4 py-2 rounded-xl text-lg font-medium primary-color text-white ${poppins.className}`}
                    href={`https://knowhow-files-uploads.s3.amazonaws.com/pdfs/${procedure.procedure_pdf}`}>
                    Descargar {procedure.procedure_pdf}
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
