'use client'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export interface SectionData {
  id_company: number;
  name_section: string;
  id_section: number;
}

export const AddSectionComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SectionData>();
  const [serverError, setServerError] = useState<string>('');

  const onSubmit = async (data: SectionData) => {
    try {
      const response = await fetch('http://localhost:8000/knowhow/section/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const sectionData = await response.json();
        console.log('Sección agregada:', sectionData);
        // Realizar cualquier acción necesaria después de agregar la sección
      } else {
        const errorResponse = await response.json();
        console.error('Error en el servidor:', errorResponse);
        setServerError('Error en el servidor: ' + JSON.stringify(errorResponse));
      }
    } catch (error) {
      console.error('Error al agregar la sección:', error);
      setServerError('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h1>Agregar Sección</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre de la Sección:
          <input type="text" {...register('name_section', { required: true })} />
          {errors.name_section && <span>Este campo es requerido</span>}
        </label>
        <label>
          ID de la Compañía:
          <input type="number" {...register('id_company', { required: true })} />
          {errors.id_company && <span>Este campo es requerido</span>}
        </label>
        <label>
          ID de la Sección:
          <input type="number" {...register('id_section', { required: true })} />
          {errors.id_section && <span>Este campo es requerido</span>}
        </label>
        <button type="submit">Agregar Sección</button>
        {serverError && <div>{serverError}</div>}
      </form>
    </div>
  );
};
