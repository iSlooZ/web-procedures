import Image from "next/image"
import Link from "next/link"



export const AddEmployeeSuccess = () => {
  return(

    <section className="w-full flex flex-col justify-center items-center gap-12">
      <Image width={300} height={300} src="/add-colaborator-success.svg" alt="" />
      <h3 className="font-bold text-5xl text-black">Colaborador agregado con éxito</h3>
      <Link href="/knowhow/welcome" className="primary-color text-white px-28 py-2 rounded-2xl min-w-fit">Listo</Link>
    </section>

  )
}