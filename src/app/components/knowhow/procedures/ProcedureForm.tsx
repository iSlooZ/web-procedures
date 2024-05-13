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
    <div>
      <h2>Crear nuevo procedimiento</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id_procedure">ID del procedimiento:</label>
          <input type="text" id="id_procedure" {...register('id_procedure', { required: true })} />
          {errors.id_procedure && <p>Este campo es obligatorio</p>}
        </div>
        <div>
          <label htmlFor="procedure_name">Nombre del procedimiento:</label>
          <input type="text" id="procedure_name" {...register('procedure_name', { required: true })} />
          {errors.procedure_name && <p>Este campo es obligatorio</p>}
        </div>
        <div>
          <label htmlFor="procedure_description">Descripción del procedimiento:</label>
          <textarea id="procedure_description" {...register('procedure_description', { required: true })} />
          {errors.procedure_description && <p>Este campo es obligatorio</p>}
        </div>
        <div>
          <label htmlFor="procedure_sample_pdf">PDF de muestra:</label>
          <input type="file" id="procedure_sample_pdf" accept=".pdf" ref={samplePdfRef} />
        </div>
        <div>
          <label htmlFor="procedure_pdf">PDF del procedimiento:</label>
          <input type="file" id="procedure_pdf" accept=".pdf" ref={mainPdfRef} />
        </div>
        <div>
          <label htmlFor="id_business_line">ID de la línea de negocio:</label>
          <input type="number" id="id_business_line" {...register('id_business_line', { required: true })} />
          {errors.id_business_line && <p>Este campo es obligatorio</p>}
        </div>
        <div>
          <label htmlFor="id_company">ID de la compañía:</label>
          <input type="number" id="id_company" {...register('id_company', { required: true })} />
          {errors.id_company && <p>Este campo es obligatorio</p>}
        </div>
        <div>
          <label htmlFor="id_section">ID de la sección:</label>
          <input type="number" id="id_section" {...register('id_section', { required: true })} />
          {errors.id_section && <p>Este campo es obligatorio</p>}
        </div>
        <button type="submit">Crear Procedimiento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );

};
