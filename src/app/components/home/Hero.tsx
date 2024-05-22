import { Button } from "../shared/Button"
export const Hero = () => {
  return (
    <section className="w-[60%] min-w-[1200px] h-[600px] flex justify-center items-center gap-4">
    <div className="w-[60%] h-full flex flex-col justify-center items-center">
      <h1 className="w-full text-left font-bold text-7xl tracking-wider mb-8">Bienvenido a la nueva forma de crear procedimientos</h1>
      <h2 className="w-full text-left tracking-wider font-light text-2xl">Agiliza tu tiempo y el de tus</h2>
      <h2 className="w-full text-left tracking-wider font-light text-2xl">colaboradores sin complicaciones</h2>
      <div className="w-full flex justify-start items-center">
      <Button 
        buttonText="Empieza"
        buttonLink="#"
        buttonStyles="primary-color text-white px-20 py-4 rounded-full my-8"        
      />
      </div>
    </div>
    <div className="w-1/2 flex justify-center items-center">
      <img className="w-[700px] rounded-3xl" src="/Group2.svg" alt="" />
    </div>
  </section>
  )
}