'use client'

// Importa useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOwnerData } from '../authHandler';

export interface SectionData {
  id_company: number;
  name_section: string;
  id_section: number;
  logo_section: File | null; 
}

export const AddSectionComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SectionData>();
  const [companyId, setCompanyId] = useState<number>();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>(''); // URL del logo seleccionado
  const [mensaje, setMensaje] = useState<string>('');

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.entity && ownerData.entity.id_owner) {
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
  
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
  
    if (file) {
      setLogoFile(file);
      // Crear la URL local para mostrar la imagen
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: SectionData) => {
    try {
      data.id_company = companyId ?? 0;

      const formData = new FormData();
      if (logoFile !== null) {
        formData.append('file', logoFile);
      }

      const uploadResponse = await fetch('http://localhost:8000/knowhow/upload/', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Error al cargar el logo');
      }

      const fileNameData = await uploadResponse.json();
      const fileName = fileNameData.file_name;

      data.logo_section = fileName;

      const response = await fetch('http://localhost:8000/knowhow/section/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMensaje(`Se ha agregado el área ${data.name_section} correctamente.`);
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
        className='w-[50%] h-64 flex flex-col justify-center items-center gap-4 mt-16 '
        onSubmit={handleSubmit(onSubmit)}>
        {logoUrl ? (
          <img src={logoUrl} alt="Logo seleccionado" className='w-[150px] h-[150px] object-cover aspect-square' />
        ) : (
          <div className="w-[500px] py-[75px]"></div>
        )}
        <fieldset className='w-full flex flex-col justify-center items-center'>
          <input
            className='rounded-lg w-[50%] px-4 py-2 border border-black' 
            placeholder='Nombre del área'
            type="text" {...register('name_section', { required: true })} />
          {errors.name_section && <span>Este campo es requerido</span>}
        </fieldset>
        <fieldset className='w-full flex justify-center items-center'>
          <label className='w-[300px] text-center cursor-pointer px-10 py-2 bg-blue-500 rounded-xl text-white'>
            Seleccionar Logo
            <input
              className='opacity-0 w-0'
              type="file"
              accept=".png, .jpeg, .jpg, .webp"
              onChange={handleLogoChange}
            />
          </label>
        </fieldset>
        {/* Muestra la imagen del logo con un tamaño fijo */}
        
        <button
          className='px-20 py-2 rounded-xl text-white font-bold bg-stone-400 shadow-lg shadow-gray-400 hover:bg-stone-200' 
          type="submit">Agregar Sección</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </section>
  );
};
