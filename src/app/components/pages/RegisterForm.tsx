'use client'
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  password: string;
}

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      const requestBody = new URLSearchParams();
      requestBody.append("username", data.username);
      requestBody.append("password", data.password);

      const response = await fetch('http://localhost:8000/knowhow/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody.toString()
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login Success:', responseData);
      } else {
        throw new Error('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  return (
    <section className="w-full py-20 flex flex-col justify-center items-center">
      <form
        className="w-[500px] flex flex-col justify-center items-center border border-slate-200 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className="w-56 py-8" src="/logotest.png" alt="Logo" />
        <legend className="text-2xl font-medium tracking-wider pb-8">Hola nuevamente</legend>
        <section className="w-full flex flex-col justify-center items-center gap-8">
          <fieldset className="w-full relative flex flex-col justify-center items-center">
            <input
              className={`inputLoginForm border border-slate-200 h-12 rounded-xl w-[70%] px-4 ${errors.username ? 'has-error' : ''}`}
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
              className={`inputLoginForm border border-slate-200 h-12 rounded-xl w-[70%] px-4 ${errors.password ? 'has-error' : ''}`}
              type="password"
              placeholder="Password"
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
        <button
          className="w-[70%] bg-blue-500 px-4 py-3 text-white rounded-3xl my-12"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </section>
  );
};
