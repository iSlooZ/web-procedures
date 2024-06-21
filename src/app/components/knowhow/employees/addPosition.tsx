'use client'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { getOwnerData } from '../authHandler';
import Image from 'next/image';

type PositionFormData = {
  position: string;
  id_company: number | null; // Add id_company field to the form data
};

export const AddPositionForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PositionFormData>();
  const [companyId, setCompanyId] = useState<number | null>(null); // State to store the company id
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control showing the confirmation screen

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerData = await getOwnerData();
        if (ownerData && ownerData.company) {
          const idCompany = ownerData.company.id_company;
          setCompanyId(idCompany);
        }
      } catch (error) {
        console.error('Error fetching owner data:', error);
      }
    };

    fetchOwnerData();
  }, []);

  const onSubmit = async (data: PositionFormData) => {
    try {
      // Add id_company to the form data
      data.id_company = companyId;

      const response = await axios.post('https://backend-procedures-production.up.railway.app/knowhow/position/add', data);
      if (response.status === 200) {
        setShowConfirmation(true); // Mostrar la pantalla de confirmación si la solicitud fue exitosa
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleAccept = () => {
    window.location.href = 'https://web-procedures-production.up.railway.app/employees';
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {!showConfirmation ? (
        <form className="w-[400px] p-4 flex flex-col justify-center items-center bg-stone-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col justify-center items-center">
            <input className="w-[70%] border border-black rounded-xl px-4 py-1" placeholder="Nombre del cargo" id="name" type="text" {...register('position', { required: true })} />
            {errors.position && <span>Este campo es requerido</span>}
          </div>

          <button className="w-[150px] bg-blue-500 rounded-xl px-4 py-1 mt-4 text-white" type="submit">
            Guardar
          </button>
        </form>
      ) : (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col justify-center items-center">
            <Image src="/add-colaborator-success.svg" width={150} height={150} alt="Confirmation Image" className="w-48 h-48 mb-4 z-10" />
            <p className="text-lg font-bold mb-4">¡Cargo agregado exitosamente!</p>
            <button
              className="bg-blue-500 rounded-xl px-4 py-2 text-white"
              onClick={handleAccept}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
