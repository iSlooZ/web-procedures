'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { loginSchema } from "../login/zodSchema";

interface FormData {
  email: string;
  password: string;
}


export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section className="w-full py-20 flex flex-col justify-center items-center">
      <form
        className="w-[500px] flex flex-col justify-center items-center border border-slate-200 rounded-xl " 
        onSubmit={handleSubmit(onSubmit)}
      >
        <img className="w-56 py-8" src="/logotest.png"/>
        <legend className="text-2xl font-medium tracking-wider pb-8">Hola nuevamente</legend>
        <section
          className="w-full flex flex-col justify-center items-center gap-8"
        >
          <fieldset className="w-full relative flex flex-col justify-center items-center">
            <input
              className={`inputLoginForm border border-slate-200 h-12 rounded-xl w-[70%] px-4 ${watch("email") && 'has-content'}`}
              {...register("email")} 
              placeholder="Email" 
            />
            <span className="absolute -top-3 left-24 bg-white z-10 w-fit labelInput">Correo</span>
            {errors.email && <p>{errors.email.message}</p>}
          </fieldset>

            <fieldset className="w-full relative flex flex-col justify-center items-center">
            <input
              className={`inputLoginForm border border-slate-200 h-12 rounded-xl w-[70%] px-4 ${watch("password") && 'has-content'}`}
              {...register("password")}
              type="password" 
              placeholder="Password" />
            {errors.password && <p>{errors.password.message}</p>} 
            <span className="absolute -top-3 left-24 bg-white z-10 w-fit labelInput">Clave</span>
          </fieldset>

        </section>
        <button
          className="w-[70%] bg-blue-500 px-4 py-3 text-white rounded-3xl my-12" 
          type="submit">Entrar</button>
      </form>
    </section>
  );
};
