'use client'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormData {
  nameCompany: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const FormCompany = ({ nameCompany, email, phoneNumber, password }: FormData) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('http://localhost:8000/knowhow/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_user: data.email,
          phone_user: data.phoneNumber,
          id_sub_holding: 1,
          id_holding: 1,
          name_user: data.nameCompany,
          id_user: 1,
          password_user: data.password,
          id_position_user: 1
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
        router.push('/');
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <section className="w-full flex justify-center items-center">
      <form className="w-[400px] flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <legend className="text-xl font-bold mt-4">Abre tu cuenta en simples pasos</legend>
        <h2 className="text-lg text-stone-500 font-light">Agiliza tu tiempo y el de tus colaboradores</h2>
        <fieldset className="w-full flex flex-col justify-center items-center gap-2 my-8">
          <input
            className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
            type="text"
            placeholder={nameCompany}
            {...register('nameCompany', { required: true })}
          />
          {errors.nameCompany && <span>Este campo es obligatorio</span>}
          <input
            className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
            type="email"
            placeholder={email}
            {...register('email', { required: true })}
          />
          {errors.email && <span>Este campo es obligatorio</span>}
          <input
            className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
            type="text"
            placeholder={phoneNumber}
            {...register('phoneNumber', { required: true })}
          />
          {errors.phoneNumber && <span>Este campo es obligatorio</span>}
          <input
            className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
            type="password"
            placeholder={password}
            {...register('password', { required: true })}
          />
          {errors.password && <span>Este campo es obligatorio</span>}
        </fieldset>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <button className="w-[80%] rounded-xl py-3 bg-black text-white font-bold" type="submit">
            Crear Cuenta
          </button>
          <Link className="w-[80%] rounded-xl py-3 bg-white border border-black flex justify-center items-center font-bold" href={"/knowhow/login"}>
            Ya tengo cuenta
          </Link>
        </div>
      </form>
    </section>
  );
};
