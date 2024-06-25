'use client'
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const poppins = Poppins({
  weight: ['200', '300','400','500','600'],
  subsets: ['latin'],
})

interface Procedure {
  id_procedure: number;
  procedure_name: string;
  procedure_description: string;
  procedure_pdf: string;
  procedure_sample_pdf: string;
  procedure_uploaded_by: string;
}

interface Params {
  id: number;
}

export default function ProcedureBySectionId({ params }: { params: Params }) {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const response = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/procedures/by-section-id/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProcedures(data); // Guarda los procedimientos obtenidos en el estado
        setIsLoading(false); // Marca la carga como completada
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Marca la carga como completada en caso de error
      }
    };

    fetchProcedures();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Image src="/loading.gif" alt="Loading..." width={50} height={50} unoptimized />
      </div>
    );
  }

  console.log(procedures)
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <h1 className={`w-[50%] text-left primary-color-text text-xl font-bold ${poppins.className} my-8`}>Mis procedimientos</h1>
      <div className="w-[50%] flex flex-wrap justify-center items-center gap-16">

        {procedures.map(procedure => (
          <Link href={`/procedures/${procedure.id_procedure}`} key={procedure.id_procedure} className="border border-primary-color rounded-xl p-6 w-[350px] h-[125px] flex flex-col">
            <h2 className={`${poppins.className} font-bold overflow-hidden whitespace-nowrap overflow-ellipsis`}>{procedure.procedure_name}</h2>
            <h4 className={`${poppins.className} font-light overflow-hidden whitespace-nowrap overflow-ellipsis`}>{procedure.procedure_description}</h4>
            <h3 className={`${poppins.className} font-bold w-full text-right`}>{procedure.id_procedure}</h3>
          </Link >
        ))}
      </div>
    </section>
  );
}
