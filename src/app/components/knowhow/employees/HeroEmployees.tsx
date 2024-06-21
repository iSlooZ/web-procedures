import Link from "next/link"


export const HeroEmployees = () => {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <Link className="text-center w-[180px] px-4 py-2 bg-stone-400 rounded-xl shadow-lg shadow-black hover:bg-stone-200" href="/employees/all">Ver mis empleados</Link>
        <Link className="text-center w-[180px] px-4 py-2 bg-stone-400 rounded-xl shadow-lg shadow-black hover:bg-stone-200" href="/employees/add">Agregar empleado</Link>
        <Link className="text-center w-[180px] px-4 py-2 bg-stone-400 rounded-xl shadow-lg shadow-black hover:bg-stone-200" href="/employees/position">Agregar cargo</Link>
      </div>
    </section>
  )
}


