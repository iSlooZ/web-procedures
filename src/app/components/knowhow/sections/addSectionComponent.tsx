'use client'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.entity && ownerData.entity.id_owner) {
          // Si se pudo obtener la ID del propietario, entonces obtén la ID de la compañía y actualiza el estado
          const companyId = ownerData.company?.id_company; // Usando optional chaining
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
    const file = event.target.files?.[0]; // Obtener el primer archivo seleccionado
  
    // Verificar si hay un archivo seleccionado
    if (file) {
      setLogoFile(file);
    }
  };

  const onSubmit = async (data: SectionData) => {
    try {
      data.id_company = companyId ?? 0;

      // Crear FormData y agregar el archivo
      const formData = new FormData();
      if (logoFile !== null) {
        formData.append('file', logoFile);
      }

      // Enviar la solicitud POST a la URL de carga de archivos
      const uploadResponse = await fetch('http://localhost:8000/knowhow/upload/', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Error al cargar el logo');
      }

      // Obtener el nombre del archivo cargado desde la respuesta
      const fileNameData = await uploadResponse.json();
      const fileName = fileNameData.file_name;

      // Agregar el nombre del archivo cargado al objeto de datos de la sección
      data.logo_section = fileName;

      // Realizar la solicitud para agregar la sección con los datos y el nombre del logo
      const response = await fetch('http://localhost:8000/knowhow/section/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Manejar la respuesta según sea necesario
    } catch (error) {
      console.error('Error al agregar la sección:', error);
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
          Seleccione el Logo:
          <input
            type="file"
            accept=".png, .jpeg, .jpg, .webp"
            onChange={handleLogoChange}
          />
        </label>
        <button type="submit">Agregar Sección</button>
      </form>
    </div>
  );
};
