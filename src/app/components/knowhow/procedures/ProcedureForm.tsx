'use client'
import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  id_procedure: string;
  procedure_name: string;
  procedure_description: string;
  procedure_sample_pdf: string;
  procedure_pdf: string;
  id_business_line: number;
  id_company: number;
  id_section: number;
}

export const ProcedureForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState<string>('');
  const mainPdfRef = useRef<HTMLInputElement>(null);
  const samplePdfRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (!mainPdfRef.current?.files?.[0] || !samplePdfRef.current?.files?.[0]) {
        setMessage('Por favor, seleccione ambos archivos PDF.');
        return;
      }

      const mainPdfName = `${data.id_procedure}_main.pdf`;
      const samplePdfName = `${data.id_procedure}_sample.pdf`;

      const formData = new FormData();
      formData.append('main_pdf', mainPdfRef.current?.files?.[0] as File, mainPdfName);
      formData.append('sample_pdf', samplePdfRef.current?.files?.[0] as File, samplePdfName);

      const pdfResponse = await fetch('http://localhost:8000/knowhow/upload-pdf/', {
        method: 'POST',
        body: formData,
      });

      if (!pdfResponse.ok) {
        const pdfResponseData = await pdfResponse.json();
        throw new Error(`Error al subir los PDFs: ${pdfResponseData.message}`);
      }

      const { main_pdf_encrypted_name, sample_pdf_encrypted_name } = await pdfResponse.json();

      const procedureData = {
        ...data,
        procedure_pdf: mainPdfName,
        procedure_sample_pdf: samplePdfName,
      };

      const procedureResponse = await fetch('http://localhost:8000/knowhow/procedure/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(procedureData),
      });

      if (procedureResponse.ok) {
        setMessage('Procedimiento creado correctamente');
      } else {
        const procedureResponseData = await procedureResponse.json();
        throw new Error(`Error al agregar el procedimiento: ${procedureResponseData.message}`);
      }
    } catch (error) {
      return;
    }
  };


  return (
    <div className='w-full flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl'>Crear nuevo procedimiento</h2>
      <form 
        className='w-[70%] flex flex-col justify-center items-center mt-8'
        onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='w-full flex justify-center items-center flex-col gap-4'>
          <input className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg' placeholder='Id del Procedimiento' type="text" id="id_procedure" {...register('id_procedure', { required: true })} />
          {errors.id_procedure && <p>Este campo es obligatorio</p>}

          <input className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg' type="text" id="procedure_name" placeholder='Nombre del procedimiento' {...register('procedure_name', { required: true })} />
          {errors.procedure_name && <p>Este campo es obligatorio</p>}

          <textarea className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg' id="procedure_description" placeholder='Descripción del procedimiento' {...register('procedure_description', { required: true })} />
          {errors.procedure_description && <p>Este campo es obligatorio</p>}

          <input className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg' type="number" id="id_business_line" placeholder='Linea de negocio' {...register('id_business_line', { required: true })} />
          {errors.id_business_line && <p>Este campo es obligatorio</p>}

          <input className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg' type="number" id="id_company" placeholder='Id de la compañia' {...register('id_company', { required: true })} />
          {errors.id_company && <p>Este campo es obligatorio</p>}

          <input className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg' type="number" id="id_section" placeholder='Id del área' {...register('id_section', { required: true })} />
          {errors.id_section && <p>Este campo es obligatorio</p>}

          <fieldset className='w-[500px] flex justify-center items-center gap-3'>
            <input className='w-1/2' type="file" id="procedure_sample_pdf" accept=".pdf" ref={samplePdfRef} />
            <input className='w-1/2' type="file" id="procedure_pdf" accept=".pdf" ref={mainPdfRef} />
          </fieldset>
        </fieldset>
        <button className='border border-black rounded-xl px-3 py-2 bg-stone-400 hover:bg-stone-200' type="submit">Crear Procedimiento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );

};
