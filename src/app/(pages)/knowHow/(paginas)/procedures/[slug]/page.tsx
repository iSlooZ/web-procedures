'use client'

import { useEffect, useState } from 'react';
import { getProcedureById, ProcedureData } from '@/app/components/knowhow/procedures/getProcedureById';
import Link from 'next/link';

interface Params {
  slug: string;
}

export default function ProcedureDetailPage({ params }:{params:Params}) {
  const [procedure, setProcedure] = useState<ProcedureData | null>(null);

  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        if (params.slug) {
          const data = await getProcedureById(params.slug);
          setProcedure(data);
        }
      } catch (error) {
        console.error('Error fetching procedure:', error);
        setProcedure(null);
      }
    };

    fetchProcedure();
  }, [params.slug]);

  if (!procedure) { 
    return <div>Cargando...</div>;
  }
  console.log(procedure)
  return (
    <section className='w-full flex flex-col justify-center items-center '>
      <div className='w-[50%] bg-stone-300 flex flex-col justify-center items-center rounded-xl p-4'>
        <h2 className='text-xl py-2 font-bold'>Identificador de procedimiento: {procedure.id_procedure}</h2>
        <h1 className='text-3xl py-2'>Nombre del Procedimiento: {procedure.procedure_name}</h1>
        <h3 className='text-2xl font-normal tracking-wide'>Descripción del procedimiento: {procedure.procedure_description}</h3>
        <h3 className='text-2xl font-normal'>Linea de negocio: {procedure.id_business_line}</h3>
        <h3 className='text-2xl font-normal'>Empresa: {procedure.id_company}</h3>
        <h3 className='text-2xl font-normal'>Área: {procedure.id_section}</h3>
        <div className='w-full flex gap-4 justify-center items-center'>
          <Link 
            target='_blank'
            className='border border-black p-2 rounded-xl text-xl'
            href={`http://localhost:8000/pdfs/${procedure.procedure_sample_pdf}`}>Descargar PDF Ejemplo</Link>
          <Link
            target='_blank'
            className='border border-black p-2 rounded-xl text-xl'
            href={`http://localhost:8000/pdfs/${procedure.procedure_pdf}`}>Descargar PDF</Link>
        </div>
      </div>
    </section>
  );
};
