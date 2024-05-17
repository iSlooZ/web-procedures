'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getOwnerData } from '../authHandler';


interface EmployeeFormData {
  email_employee: string;
  password_employee: string;
  phone_employee: string;
  name_employee: string;
  id_section: number | null; // Agregamos el campo id_section
}

export const AddEmployeeForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EmployeeFormData>();
  const [sections, setSections] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.company) {
          // Obtenemos el ID de la empresa del propietario
          const companyId = ownerData.company.id_company;
          // Verificamos si ownerData.sections es un array antes de filtrar
          if (Array.isArray(ownerData.sections)) {
            // Filtramos las secciones disponibles para esa empresa
            const sectionsData = ownerData.sections.filter(section => section.id_company === companyId);
            setSections(sectionsData.map(section => ({ id: section.id_section, name: section.name_section })));
          } else {
            console.error('La propiedad sections no es un array:', ownerData.sections);
          }
        }
      } catch (error) {
        console.error('Error fetching owner data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOwnerData();
  }, []);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      // Aquí puedes enviar los datos del formulario a la API
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input type="text" {...register('email_employee', { required: true })} />
      {errors.email_employee && <span>Email es requerido</span>}

      <label>Contraseña</label>
      <input type="password" {...register('password_employee', { required: true })} />
      {errors.password_employee && <span>Contraseña es requerida</span>}

      <label>Teléfono</label>
      <input type="tel" {...register('phone_employee', { required: true })} />
      {errors.phone_employee && <span>Teléfono es requerido</span>}

      <label>Nombre</label>
      <input type="text" {...register('name_employee', { required: true })} />
      {errors.name_employee && <span>Nombre es requerido</span>}

      <label>Área</label>
      <select {...register('id_section')}>
        <option value="">Seleccione el área del empleado</option>
        {sections.map(section => (
          <option key={section.id} value={section.id}>{section.name}</option>
        ))}
      </select>

      <button type="submit" disabled={loading}>Agregar Empleado</button>
    </form>
  );
};

