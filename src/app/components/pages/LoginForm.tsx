'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [messageError, setMessageError] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const requestBody = new URLSearchParams();
      requestBody.append("username", data.username);
      requestBody.append("password", data.password);

      const response = await fetch('http://localhost:8000/knowhow/owner/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody.toString()
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login Success:', responseData);
        const token = responseData.access_token;
        localStorage.setItem('token', token);
        
        router.push('/knowhow/welcome');

      } else {
        throw new Error('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Login Failed:', error);
      setMessageError(true);
    }
  };

  return (
    <section className="w-full -mt-[50px] flex flex-col justify-center items-center">
      <form
        className="w-[450px] flex flex-col justify-center items-center rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className="w-[500px] aspect-square py-8" src="/welcome_image.svg" alt="Logo" />
        <legend className="text-2xl font-medium tracking-wider pb-8">¡Bienvenido!</legend>
        <section className="w-full flex flex-col justify-center items-center gap-4">
          <fieldset className="w-full relative flex flex-col justify-center items-center">
            <input
              className={`inputLoginForm border border-primary-color h-12 rounded-xl w-[70%] px-4 ${errors.username ? 'has-error' : ''}`}
              type="text"
              placeholder="Correo"
              {...register("username", {
                required: {
                  value:true,
                  message: "El correo es requerido."
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "El correo no es válido.",
                },
                minLength:{
                  value:3,
                  message: "Correo demasiado corto."
                }
              })}
            />
            <span className="absolute -top-3 left-24 bg-white z-10 w-fit labelInput">Correo</span>
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </fieldset>

          <fieldset className="w-full relative flex flex-col justify-center items-center">
            <input
              className={`inputLoginForm border border-primary-color h-12 rounded-xl w-[70%] px-4 ${errors.password ? 'has-error' : ''}`}
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: {
                  value:true,
                  message: "La contraseña es requerida"
                },
                minLength: {
                  value: 3,
                  message: "Contraseña demasiado corta.",
                },
              })}
            />
            <span className="absolute -top-3 left-24 bg-white z-10 w-fit labelInput">Clave</span>
            {errors.password && <span>{errors.password.message}</span>}
          </fieldset>
        </section>
        {messageError && (
          <p className="text-red-500 mt-4">Credenciales incorrectas. Inténtalo de nuevo.</p>
        )}
        <div className='w-full flex flex-col justify-center items-center gap-4 my-8'>
          <button
            className="w-[70%] primary-color px-4 py-3 text-white rounded-3xl hover:opacity-80"
            type="submit"
          >
            Entrar
          </button>
          <button
            className="w-[70%] border border-primary-color px-4 py-3 primary-color-text rounded-3xl hover:bg-[#012CFD] hover:text-white"
            onClick={() => router.push('/knowhow/register')}
          >
            Registrate
          </button>
        </div>
      </form>
    </section>
  );
};
