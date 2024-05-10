'use client'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getOwnerData } from "../authHandler";

interface ProcedureFormData {
  id_procedure: string;
  procedure_name: string;
  procedure_description: string;
  id_business_line: number;
  id_company: number;
  id_section: number;
  procedure_sample_pdf: File | null;
  procedure_pdf: File | null;
}

export const AddProcedure = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProcedureFormData>();
  const [submitting, setSubmitting] = useState(false);
  const [companyId, setCompanyId] = useState<number>();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<ProcedureFormData | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState<string>('');

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.company && ownerData.company.id_company) {
          const companyId = ownerData.company?.id_company; 
          if (companyId !== undefined) {
            setCompanyId(companyId);
            console.log('ID de la compañía:', companyId);
          } else {
            console.error('No se pudo obtener la ID de la compañía');
          }
        } else {
          console.error('No se pudo obtener la ID de la compañía');
        }
      } catch (error) {
        console.error('Error al obtener la ID de la compañía:', error);
      }
    };
  
    fetchOwnerData();
  }, []);

  const onSubmit = async (data: ProcedureFormData) => {
    try {
      console.log('Datos del procedimiento a enviar:', data); // Aquí se muestra la data que se intenta enviar
      data.id_company = companyId ?? 0;
  
      // Solo agregamos el nombre del archivo PDF al objeto de datos
      if (pdfFile !== null && pdfFile.length > 0) {
        data.procedure_pdf = pdfFile[0].name;
      }
  
      const response = await fetch('http://localhost:8000/knowhow/procedure/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        setMensaje(`Se ha agregado el área ${data.procedure_name} correctamente.`);
      } else {
        throw new Error('Error al agregar la sección');
      }
    } catch (error) {
      console.error('Error al agregar la sección:', error);
    }
  };
  
  
  return (
    <section className="w-full flex justify-center items-center">
      <form
        className="w-[50%] flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <legend className="text-2xl">Crea un procedimiento</legend>
        <fieldset className="w-full flex flex-col justify-center items-center gap-4">
          <input
            placeholder="Identificador del procedimiento"
            className="w-[50%] px-4 py-2 rounded-xl border border-black"
            type="text"
            {...register("id_procedure", { required: true })}
          />
          {errors.id_procedure && <span>Este campo es obligatorio</span>}

          <input
            className="w-[50%] px-4 py-2 rounded-xl border border-black"
            placeholder="Nombre del procedimiento"
            type="text"
            {...register("procedure_name", { required: true })}
          />
          {errors.procedure_name && <span>Este campo es obligatorio</span>}

          <textarea
            className="w-[50%] p-4 h-48 rounded-xl border border-black"
            placeholder="Descripción del procedimiento"
            {...register("procedure_description", { required: true })}
          />
          {errors.procedure_description && <span>Este campo es obligatorio</span>}

          <input
            className="w-[50%] px-4 py-2 rounded-xl border border-black"
            placeholder="Línea de negocio"
            type="number"
            {...register("id_business_line", { required: true })}
          />
          {errors.id_business_line && <span>Este campo es obligatorio</span>}

          <input
            className="w-[50%] px-4 py-2 rounded-xl border border-black"
            placeholder="Empresa"
            type="number"
            {...register("id_company", { required: true })}
          />
          {errors.id_company && <span>Este campo es obligatorio</span>}

          <input
            className="w-[50%] px-4 py-2 rounded-xl border border-black"
            placeholder="Área"
            type="number"
            {...register("id_section", { required: true })}
          />
          {errors.id_section && <span>Este campo es obligatorio</span>}

          <input
            className="w-[50%] px-4 py-2 rounded-xl border border-black"
            type="file"
            accept=".pdf"
            {...register("procedure_pdf", { required: false })}
          />
          {errors.procedure_pdf && <span>Por favor, sube el archivo PDF principal</span>}

          <input
            className="w-[50%] px-4 py-2 rounded-xl border border-black"
            type="file"
            accept=".pdf"
            {...register("procedure_sample_pdf", { required: false })}
          />
          {errors.procedure_sample_pdf && <span>Por favor, sube el archivo PDF de muestra</span>}
        </fieldset>
      
        <button 
          className="px-20 py-2 rounded-xl text-white font-bold bg-stone-400 shadow-lg shadow-gray-400 hover:bg-stone-200"
          type="submit" disabled={submitting}>Agregar Procedimiento</button>
        {submissionError && <p>Error: {submissionError}</p>}
      </form>
    </section>
  );
};
