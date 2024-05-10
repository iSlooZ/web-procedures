'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getOwnerData } from '../authHandler';

export interface ProcedureFormData {
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
  const { register, handleSubmit, formState: { errors } } = useForm<ProcedureFormData>();
  const [companyId, setCompanyId] = useState<number>();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('');

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

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
  
    if (file) {
      setPdfFile(file);
      setPdfFileName(file.name); // Mostrar el nombre del archivo PDF en la consola
    }
  };

  const onSubmit = async (data: ProcedureFormData) => {
    try {
      console.log('Datos del procedimiento a enviar:', data);

      data.id_company = companyId ?? 0;

      const formData = new FormData();
      if (pdfFile !== null) {
        formData.append('file', pdfFile);
      }

      const uploadResponse = await fetch('http://localhost:8000/knowhow/file-uploads/', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Error al cargar el PDF');
      }

      const fileNameData = await uploadResponse.json();
      const fileName = fileNameData.file_name;

      data.procedure_pdf = fileName;

      const response = await fetch('http://localhost:8000/knowhow/procedure/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log(`Se ha agregado el área ${data.procedure_name} correctamente.`);
      } else {
        throw new Error('Error al agregar la sección');
      }
    } catch (error) {
      console.error('Error al agregar la sección:', error);
    }
  };

  return (
    <section className='w-full flex justify-center items-center'>
      <form 
        className='mt-16 w-[50%] h-64 flex flex-col justify-center items-center gap-4'
        onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='w-full h-full py-32 flex flex-col justify-center items-center'>
          {pdfFileName && <p>Nombre del archivo PDF: {pdfFileName}</p>}
        </fieldset>
        <fieldset className='w-full flex justify-center items-center'>
          <input
            className='rounded-lg w-[50%] px-4 py-2 border border-black' 
            placeholder='Nombre del procedimiento'
            type="text" {...register('procedure_name', { required: true })} />
          {errors.procedure_name && <span>Este campo es requerido</span>}
        </fieldset>
        <fieldset className='w-full flex flex-col justify-center items-center'>
          <label className='w-[300px] text-center cursor-pointer px-10 py-2 bg-blue-500 rounded-xl text-white'>
            Seleccionar PDF
            <input
              className='opacity-0 w-0'
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
            />
          </label>
        </fieldset>
        <button
          className='px-20 py-2 rounded-xl text-white font-bold bg-stone-400 shadow-lg shadow-gray-400 hover:bg-stone-200' 
          type="submit">Agregar Procedimiento</button>
      </form>
    </section>
  );
};
