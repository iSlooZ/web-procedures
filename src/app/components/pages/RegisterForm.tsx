'use client'

import { useState } from 'react';
import { FormCompany } from '../register/FormCompany';
import { FormHolding } from '../register/formHolding';

export const RegisterForm = () => {
    const [mostrarFormUsuario, setMostrarFormUsuario] = useState(true);

    const handleBotonUsuarioClick = () => {
        setMostrarFormUsuario(true);
    };

    const handleBotonEmpresaClick = () => {
        setMostrarFormUsuario(false);
    };

    return (
        <section className='w-full flex flex-col justify-center items-center'>
            <div className='w-full flex justify-center items-center'>
                <img className='w-[150px]' src="/logoknowhow3.webp" alt="" />
            </div>
            <div className='w-fit bg-gray-200 px-2 py-2 rounded-full flex gap-4 justify-center items-center'>
                <button 
                    className={`text-xl font-medium px-10 rounded-full ${mostrarFormUsuario ? 'bg-white' : ''}`}
                    onClick={handleBotonUsuarioClick}>Empresa</button>
                <button
                    className={`text-xl font-medium px-10 rounded-full ${!mostrarFormUsuario ? 'bg-white' : ''}`}
                    onClick={handleBotonEmpresaClick}>Holding</button>
            </div>
        {mostrarFormUsuario ? <FormCompany
            nameOwner="Nombre completo"
            email="Correo"
            phoneNumber="Número telefónico"
            password="Contraseña"
            nameCompany='Razón social'
        /> : ''}
        {!mostrarFormUsuario ? <FormHolding
            nameHolding="Nombre completo"
            email="Correo"
            phoneNumber="Número telefónico"
            password="Contraseña"
        /> : ''}
        </section>
    );
};