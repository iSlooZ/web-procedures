import { poppins } from "@/app/(home)/layout"
import { Button } from "../shared/Button"
export const Hero = () => {
  return (
    <section className="w-[60%] min-w-[1200px] h-[600px] flex justify-center items-center gap-4">
    <div className="w-1/2 h-full flex flex-col justify-center items-start">
    <h1 className={`titleWelcome ${poppins.className} flex flex-col justify-start items-start text-left mb-8`}>
          <span>Bienvenido a la</span>
          <span>nueva forma de</span>
          <span>crear procedimientos</span>
        </h1>
      <h2 className={`w-full ${poppins.className} subtitleWelcome`}>Agiliza tu tiempo y el de tus</h2>
      <h2 className={`w-full ${poppins.className} subtitleWelcome`}>colaboradores sin complicaciones</h2>
      <div className="w-full flex justify-start items-center">
      <Button 
        buttonText="Empieza"
        buttonLink="#"
        buttonStyles="primary-color text-white px-20 py-4 rounded-full my-8"        
      />
      </div>
    </div>
    <div className="w-[50%] flex justify-end items-center">
      <img className="w-[100%] rounded-3xl" src="/Group2.svg" alt="" />
    </div>
  </section>
  )
}