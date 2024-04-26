


export const WelcomeHero = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-[50%] mt-12">
        <h1 className="text-6xl my-4 text-center font-bold">Bienvenido Nombre Apellido a tus áreas</h1>
        <div className="w-full">
          <div className="flex my-4 justify-center items-center">
            <img className="w-60" src="/logotest.png" alt="" />
          </div>
          <div className="w-full flex flex-wrap justify-center items-center">
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
            <img className="w-72 rounded-xl m-2" src="/imagetest.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}