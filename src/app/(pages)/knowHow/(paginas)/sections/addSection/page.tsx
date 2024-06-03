'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SHA256 } from 'crypto-js';
import { useSearchParams } from 'next/navigation';


export interface SectionData {
  id_company: number;
  name_section: string;
  id_section: number;
  logo_section: File | null; 
}

export default function AddSectionHoldingComponent (){
  const { register, handleSubmit, formState: { errors } } = useForm<SectionData>();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>(''); // URL del logo seleccionado
  const [mensaje, setMensaje] = useState<string>('');
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  

  
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
  
    if (file) {
      setLogoFile(file);
      // Crear la URL local para mostrar la imagen
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const generateUniqueName = (file: File): string => {
    const timestamp = Date.now().toString(); // Marca de tiempo actual
    const hash = SHA256(file.name + timestamp).toString(); // Convertir el hash a cadena
    const fileExtension = getFileExtension(file.name); // Obtener la extensión del archivo original
    return hash + '.' + fileExtension; // Devuelve el nombre único con la extensión original del archivo
  };

  const getFileExtension = (fileName: string): string => {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  const onSubmit = async (data: SectionData) => {
    try {
      data.id_company = id ? parseInt(id) : 0;

      const formData = new FormData();
      if (logoFile !== null) {
        const uniqueFileName = generateUniqueName(logoFile); // Obtener el nombre encriptado único
        formData.append('file', logoFile, uniqueFileName);
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