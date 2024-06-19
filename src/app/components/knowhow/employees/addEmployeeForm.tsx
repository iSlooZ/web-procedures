'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getOwnerData } from '../authHandler';
import { AddEmployeeSuccess } from './AddEmployeeSuccess';
import Image from 'next/image';


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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.company) {
          const idCompany = ownerData.company.id_company;
          setCompanyId(idCompany);
          
          // Obtener las posiciones con el ID de la empresa
          const response = await fetch(`https://backend-procedures-production.up.railway.app/knowhow/positions/by-company-id/${idCompany}`);
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
      const response = await fetch('https://backend-procedures-production.up.railway.app/knowhow/employee/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        console.error('Error al agregar empleado:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      {!success ? (
      <form 
        className='w-[450px] flex flex-col justify-center items-center gap-4'
        onSubmit={handleSubmit(onSubmit)}>
            <Image src="/more_section.svg" alt="" width={125} height={125}/>
            <legend className='text-xl font-semibold'>Agregar un empleado</legend>

            <input className='w-[80%] border border-primary-color py-2 px-4 rounded-xl' placeholder='Nombre del empleado' type="text" {...register('name_employee', { required: true })} />
            {errors.name_employee && <span>Nombre es requerido</span>}

            <input className='w-[80%] border border-primary-color py-2 px-4 rounded-xl' placeholder='Contraseña' type="password" {...register('password_employee', { required: true })} />
            {errors.password_employee && <span>Contraseña es requerida</span>}

            <input className='w-[80%] border border-primary-color py-2 px-4 rounded-xl' placeholder='Celular del empleado' type="tel" {...register('phone_employee', { required: true })} />
            {errors.phone_employee && <span>Teléfono es requerido</span>}

            <input className='w-[80%] border border-primary-color py-2 px-4 rounded-xl' placeholder='Email del empleado' type="text" {...register('email_employee', { required: true })} />
            {errors.email_employee && <span>Email es requerido</span>}

            <div className='w-[80%] relative'>
            
              <select {...register('id_section')} className="w-full border border-primary-color py-2 px-4 rounded-xl appearance-none focus:outline-none focus:border-indigo-500">
                <option value="">Área</option>
                {sections.map(section => (
                  <option key={section.id} value={section.id}>{section.name}</option>
                ))}
              </select>
              <Image src="/arrow_down_blue.svg" width={30} height={30} alt="" className="absolute right-3 bottom-2 w-[25px]"/>
            </div>


      {positions.length > 0 ? (

        <div className='w-[80%] relative'>
          <select {...register('id_position')} className="w-full z-10 border border-primary-color py-2 px-4 rounded-xl appearance-none focus:outline-none focus:border-indigo-500">
            <option value="">Cargo</option>
            {positions.map((position, index) => (
              <option key={index} value={position.id_position}>{position.position}</option>
            ))}
          </select>
          <Image src="/arrow_down_blue.svg" width={30} height={30} alt="" className="absolute right-3 bottom-2 w-[25px]"/>
        </div>
      ) : (
        <p className='w-full text-center text-2xl text-red-600 my-8'>Recuerda crear cargos antes de crear empleados</p>
      )}

      <button 
        className='primary-color text-white mt-10 rounded-full px-20 py-2 hover:bg-stone-300 shadow-black shadow-md cursor-pointer' 
        type="submit" 
        disabled={loading || positions.length === 0}>
        Agregar Empleado
      </button>
    </form>
     ) : (
      <AddEmployeeSuccess />
     )}
    </section>
    
  );
};
