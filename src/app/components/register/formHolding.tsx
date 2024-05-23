import Link from "next/link";

interface FormProps{
  nameHolding:string;
  email:string;
  phoneNumber: string;
  password: string;
}

export const FormHolding = ({nameHolding,email, phoneNumber, password}:FormProps) => {
  return (
    <section className="w-full flex justify-center items-center">
        <form className="w-[400px] flex flex-col justify-center items-center">
          <legend className="text-xl  font-bold mt-4">Abre tu cuenta en simples pasos</legend>
          <h2 className="text-lg text-stone-500 font-light">Agiliza tu tiempo y el de tus colaboradores</h2>
          {/* Campos del formulario para el usuario */}
          <fieldset className="w-full flex flex-col justify-center items-center gap-2 my-8">
            <input className="w-[80%] border border-primary-color px-6 py-2 rounded-xl" type="text" placeholder={nameHolding} />
            <input className="w-[80%] border border-primary-color px-6 py-2 rounded-xl" type="email" placeholder={email} />
            <input className="w-[80%] border border-primary-color px-6 py-2 rounded-xl" type="text" placeholder={phoneNumber} />
            <input className="w-[80%] border border-primary-color px-6 py-2 rounded-xl" type="password" placeholder={password} />
          </fieldset>
          {/* Otros campos del formulario */}
          <div className="w-full flex flex-col justify-center items-center">
            <button className="w-[80%] rounded-full my-2 py-3 primary-color text-white font-bold" type="submit">Crear cuenta</button>
            <Link className="w-[80%] rounded-full py-3 bg-white border border-primary-color primary-color-text flex justify-center items-center font-bold"  href={"/knowhow/login"}>Ya tengo cuenta</Link>
          </div>
        </form>
    </section>
  )
}

