'use client'

import { useState } from 'react';
import { FormCompany } from '../register/FormCompany';
import { FormHolding } from '../register/FormHolding';
import Image from 'next/image';

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
                <Image className='my-8' src="/Logo_knowhow.svg" alt="" width={150} height={150}/>
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
            name_owner="Nombre completo"
            email_owner="Correo"
            phone_owner="Número telefónico"
            password_owner="Contraseña"
            nameHolding="Nombre de su Holding"
        /> : ''}
        </section>
    );
};