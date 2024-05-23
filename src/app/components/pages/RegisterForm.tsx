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
        <section className='w-full flex flex-col justify-center items-center mt-16'>
            <div className='w-full flex justify-center items-center'>
                <img className='w-[150px] h-[150px] my-8' src="/logoknowhow.svg" alt="" />
            </div>
            <div className='w-fit bg-white shadow-gray-400 shadow-lg rounded-full flex gap-4 justify-center items-center'>
                <button 
                    className={`text-xl font-medium px-10 py-1 rounded-full primary-color-text ${mostrarFormUsuario ? 'primary-color secondary-color-text' : ''}`}
                    onClick={handleBotonUsuarioClick}>Empresa</button>
                <button
                    className={`text-xl font-medium px-10 py-1 rounded-full primary-color-text ${!mostrarFormUsuario ? 'primary-color secondary-color-text' : ''}`}
                    onClick={handleBotonEmpresaClick}>Holding</button>
            </div>
        {mostrarFormUsuario ? <FormCompany
            nameOwner="Nombre completo"
            email="Correo"
            phoneNumber="Número telefónico"
            password="Contraseña"
            nameCompany='Nombre de la empresa'
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