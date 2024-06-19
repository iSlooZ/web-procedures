'use client'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { getOwnerData } from '../authHandler';

type PositionFormData = {
  position: string;
  id_company: number | null; // Add id_company field to the form data
};

export const AddPositionForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PositionFormData>();
  const [companyId, setCompanyId] = useState<number | null>(null); // State to store the company id

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
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <form className="w-[400px] p-4 flex flex-col justify-center items-center bg-stone-100" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col justify-center items-center">
          <input className="w-[70%] border border-black rounded-xl px-4 py-1" placeholder="Nombre del cargo" id="name" type="text" {...register("position", { required: true })} />
          {errors.position && <span>Este campo es requerido</span>}
        </div>

        <button className="w-[150px] bg-blue-500 rounded-xl px-4 py-1 mt-4 text-white" type="submit">Guardar</button>
      </form>
    </section>
  );
};
