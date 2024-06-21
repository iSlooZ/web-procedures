'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Owner, getOwnerData } from '../authHandler';

interface Section {
  id_section: number;
  name_section: string;
}

interface FormData {
  id_procedure: string;
  procedure_name: string;
  procedure_description: string;
  procedure_sample_pdf: string;
  procedure_pdf: string;
  id_business_line: number;
  id_company: number;
  id_section: number;
  procedure_uploaded_by: string;
}

export const ProcedureForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState<string>('');
  const mainPdfRef = useRef<HTMLInputElement>(null);
  const samplePdfRef = useRef<HTMLInputElement>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadedBy, setUploadedBy] = useState<string>('');

  useEffect(() => {
  const fetchCompanyData = async () => {
    const ownerData: Owner | null = await getOwnerData();
    if (ownerData && ownerData.company) {
      setCompanyId(ownerData.company.id_company);
      setUploadedBy(ownerData.entity.name_owner); // Establecer el nombre del propietario
      const sectionsResponse = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/sections/by-company-id/${ownerData.company.id_company}`);
      if (sectionsResponse.ok) {
        const sectionsData = await sectionsResponse.json();
        setSections(sectionsData);
      } else {
        // Si no hay secciones, redirige automáticamente a la página de agregar secciones
        window.location.href = 'https://web-procedures-production.up.railway.app/sections/add';
      }
      setLoading(false);
    }
  };

  fetchCompanyData();
}, []);

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

      const pdfResponse = await fetch('https://backend-procedures-production.up.railway.app/knowhow/aws/upload-pdf/', {
        method: 'POST',
        body: formData,
      });

      if (!pdfResponse.ok) {
        const pdfResponseData = await pdfResponse.json();
        throw new Error(`Error al subir los PDFs: ${pdfResponseData.message}`);
      }

      const procedureData = {
        ...data,
        id_company: companyId,
        procedure_pdf: mainPdfName,
        procedure_sample_pdf: samplePdfName,
        procedure_uploaded_by: uploadedBy, // Establecer el nombre del propietario
      };


      const procedureResponse = await fetch('https://backend-procedures-production.up.railway.app/knowhow/procedure/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(procedureData),
      });

      if (!procedureResponse.ok) {
        const procedureResponseData = await procedureResponse.json();
        throw new Error(`Error al agregar el procedimiento: ${procedureResponseData.message}`);
      }

      const procedureId = data.id_procedure;
      const addProcedureForSectionsPromises = selectedSections.map(async (sectionId) => {
        const procedureForSectionsData = {
          id_procedure: procedureId,
          id_section: sectionId,
        };

        const procedureForSectionsResponse = await fetch(
          'https://backend-procedures-production.up.railway.app/knowhow/procedure-for-sections/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(procedureForSectionsData),
          }
        );

        if (!procedureForSectionsResponse.ok) {
          const procedureForSectionsResponseData = await procedureForSectionsResponse.json();
          throw new Error(
            `Error al agregar el procedimiento a la sección: ${procedureForSectionsResponseData.message}`
          );
        }
      });

      await Promise.all(addProcedureForSectionsPromises);

      setMessage('Procedimiento creado y secciones asociadas correctamente');
    } catch (error) {
      console.error(error);
      setMessage('Error al procesar la solicitud');
    }
  };

  return (
    <div className='w-full flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl'>Crear nuevo procedimiento</h2>
      <form
        className='w-[70%] flex flex-col justify-center items-center mt-8'
        onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='w-full flex justify-center items-center flex-col gap-4'>
          <input
            className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg'
            placeholder='Id del Procedimiento'
            type="text"
            id="id_procedure"
            {...register('id_procedure', { required: true })}
          />
          {errors.id_procedure && <p>Este campo es obligatorio</p>}

          <input
            className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg'
            type="text"
            id="procedure_name"
            placeholder='Nombre del procedimiento'
            {...register('procedure_name', { required: true })}
          />
          {errors.procedure_name && <p>Este campo es obligatorio</p>}

          <textarea
            className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg'
            id="procedure_description"
            placeholder='Descripción del procedimiento'
            {...register('procedure_description', { required: true })}
          />
          {errors.procedure_description && <p>Este campo es obligatorio</p>}

          <fieldset className='w-full flex justify-center items-center flex-col gap-4'>
            <label className="text-lg">Selecciona una o más secciones:</label>
            <div className='flex flex-col gap-2'>
              {sections.map((section) => (
                <label key={section.id_section} className='flex items-center'>
                  <input
                    type="checkbox"
                    value={section.id_section}
                    {...register('id_section', { required: true })}
                    onChange={(e) => {
                      const sectionId = parseInt(e.target.value);
                      if (e.target.checked) {
                        setSelectedSections((prevSelectedSections) => [...prevSelectedSections, sectionId]);
                      } else {
                        setSelectedSections((prevSelectedSections) => prevSelectedSections.filter((id) => id !== sectionId));
                      }
                    }}
                  />
                  <span className='ml-2'>{section.name_section}</span>
                </label>
              ))}
            </div>
            {errors.id_section && <p>Debes seleccionar al menos una sección</p>}
          </fieldset>

          <fieldset className='w-[500px] flex justify-center items-center gap-3'>
            <input className='w-1/2' type="file" id="procedure_sample_pdf" accept=".pdf" ref={samplePdfRef} />
            <input className='w-1/2' type="file" id="procedure_pdf" accept=".pdf" ref={mainPdfRef} />
          </fieldset>
        </fieldset>
        <button className='px-20 py-2 rounded-xl text-white font-bold bg-stone-400 shadow-lg shadow-gray-400 hover:bg-stone-200 mt-8' type="submit">Crear Procedimiento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

