import { Button } from "../shared/Button"
export const Hero = () => {
  return (
    <section className="w-[60%] min-w-[1200px] h-[600px] flex justify-center items-center gap-4">
    <div className="w-1/2 h-full flex flex-col justify-center items-center">
      <h1 className="w-full text-left font-medium text-7xl tracking-wider mb-8">Sube tus procedimientos con nosotros</h1>
      <h2 className="w-full text-left tracking-wider font-medium text-xl">Empiza con nosotros ahora</h2>
      <h2 className="w-full text-left tracking-wider font-medium text-xl">Toda tu empresa te lo agradecerá</h2>
      <div className="w-full flex justify-start items-center">
      <Button 
        buttonText="Empieza ahora"
        buttonLink="#"
        buttonStyles="bg-blue-500 text-white px-12 py-4 rounded-full my-8"        
      />
      </div>
    </div>
    <div className="w-1/2 flex justify-center items-center">
      <img className="w-[700px] rounded-3xl" src="/1.png" alt="" />
    </div>
  </section>
  )
}