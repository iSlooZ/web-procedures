'use client'

import { useEffect, useState } from 'react';
import { getProcedureById, ProcedureData } from '@/app/components/knowhow/procedures/getProcedureById';

export default function ProcedureDetailPage({ params }) {
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
    <div>
      <h2>{procedure.id_procedure}</h2>
      <h1>{procedure.procedure_name}</h1>
      <h3>{procedure.procedure_description}</h3>
      <h3>{procedure.procedure_sample_pdf}</h3>
      <h3>{procedure.procedure_pdf}</h3>
      <h3>{procedure.id_business_line}</h3>
      <h3>{procedure.id_company}</h3>
      <h3>{procedure.id_section}</h3>
    </div>
  );
};
