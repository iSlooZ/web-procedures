'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getOwnerData } from '../authHandler';


interface EmployeeFormData {
  email_employee: string;
  password_employee: string;
  phone_employee: string;
  name_employee: string;
  id_section: number | null;
  id_company: number | null;
  id_position: number;
}

export const AddEmployeeForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EmployeeFormData>();
  const [sections, setSections] = useState<{ id: number; name: string }[]>([]);
  const [positions, setPositions] = useState<{ id_position: number; position: string; id_company: number }[]>([]);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.company) {
          const idCompany = ownerData.company.id_company;
          setCompanyId(idCompany);
          
          // Obtener las posiciones con el ID de la empresa
          const response = await fetch(`http://localhost:8000/knowhow/positions/by-company-id/${idCompany}`);
          if (response.ok) {
            const positionsData = await response.json();
            setPositions(positionsData);
          } else {
            console.error('Error al obtener las posiciones:', response.statusText);
          }
  
          if (Array.isArray(ownerData.sections)) {
            const sectionsData = ownerData.sections.filter(section => section.id_company === idCompany);
            setSections(sectionsData.map(section => ({ id: section.id_section, name: section.name_section })));
          } else {
            console.error('La propiedad sections no es un array:', ownerData.sections);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching owner data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      data.id_company = companyId;
      const response = await fetch('http://localhost:8000/knowhow/employee/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      console.log(data)
      if (response.ok) {
        console.log('Empleado agregado correctamente');
      } else {
        console.error('Error al agregar empleado:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <form 
        className='w-[450px] bg-stone-200 rounded-xl p-4 flex flex-col justify-center items-center gap-4'
        onSubmit={handleSubmit(onSubmit)}>
            <legend className='text-xl font-semibold'>Agregar un empleado</legend>

            <input className='w-[80%] py-2 px-4 rounded-xl' placeholder='Nombre del empleado' type="text" {...register('name_employee', { required: true })} />
            {errors.name_employee && <span>Nombre es requerido</span>}

            <input className='w-[80%] py-2 px-4 rounded-xl' placeholder='Contraseña' type="password" {...register('password_employee', { required: true })} />
            {errors.password_employee && <span>Contraseña es requerida</span>}

            <input className='w-[80%] py-2 px-4 rounded-xl' placeholder='Celular del empleado' type="tel" {...register('phone_employee', { required: true })} />
            {errors.phone_employee && <span>Teléfono es requerido</span>}

            <input className='w-[80%] py-2 px-4 rounded-xl' placeholder='Email del empleado' type="text" {...register('email_employee', { required: true })} />
            {errors.email_employee && <span>Email es requerido</span>}
          
            <select {...register('id_section')} className="w-[80%] py-2 px-4 rounded-xl appearance-none border border-gray-300 focus:outline-none focus:border-indigo-500">
              <option value="">Seleccione el área del empleado</option>
              {sections.map(section => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
            </select>

      {positions.length > 0 ? (
        <>
          <select {...register('id_position')} className="w-[80%] py-2 px-4 rounded-xl appearance-none border border-gray-300 focus:outline-none focus:border-indigo-500">
            <option value="">Seleccione el cargo del empleado</option>
            {positions.map((position, index) => (
              <option key={index} value={position.id_position}>{position.position}</option>
            ))}
          </select>
        </>
      ) : (
        <p className='w-full text-center text-2xl text-red-600 my-8'>Recuerda crear cargos antes de crear empleados</p>
      )}

      <button 
        className='bg-stone-400 rounded-xl px-4 py-2 hover:bg-stone-300 shadow-black shadow-md cursor-pointer' 
        type="submit" 
        disabled={loading || positions.length === 0}>
        Agregar Empleado
      </button>
    </form>
    </section>
    
  );
};
