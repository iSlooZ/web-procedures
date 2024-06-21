'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const TutorialCarousel = () => {
  const [active, setActive] = useState<number>(0);

  const nextSlide = () => {
    setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleRadioChange = (index: number) => {
    setActive(index);
  };

  const slides = [
    { 
      src: "/welcome_1.svg",
      alt: "Slide 1",
      text: "En KnowHow estamos emocionados de proporcionarle una solución integral para la administración y visualización de los procedimientos en su empresa.",
      title:"¡Bienvenidos a una forma más inteligente de gestionar sus procesos!"
    },
    { 
      src: "/welcome_2.svg", 
      alt: "Slide 2", 
      text: "Desde ahora, podrán subir y compartir fácilmente los procedimientos de su empresa, permitiendo a los colaboradores acceder a ellos de manera rápida y eficiente. Además, podrán mantener un registro detallado de quién ha revisado cada procedimiento, garantizando así la transparencia y el cumplimiento en su organización",
      title:"Gestiona tus procedimientos con eficiencia y transparencia"
    },
    { 
      src: "/welcome_3.svg", 
      alt: "Slide 3", 
      text: "Tienes la capacidad de definir quién puede subir procedimientos y quiénes solo pueden leer e interactuar con ellos, ofrecemos un control total sobre el acceso a la información. Nuestra política de privacidad está diseñada para proteger la información sensible de tu organización, brindándote la tranquilidad que necesitas al utilizar nuestra plataforma.",
      title: "Gestiona tus procedimientos de forma segura"
    },
    { 
      src: "/welcome_4.svg", 
      alt: "Slide 4", 
      text: "En nuestra plataforma, creemos en adaptarnos a tus necesidades. Con la capacidad de subir una variedad de tipos de archivos, incluyendo Word, Excel, PDF y más. Te ofrecemos la libertad de elegir el formato que mejor se ajuste a tu proceso.",
      title: "Flexibilidad en la gestión de documentos"
    },
  ];

  return (
    <section className="w-full flex flex-col justify-center items-center relative mt-20">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center items-center gap-8 primary-color-text text-3xl font-bold">
            <Image src="/Logo_knowhow.svg" width={80} height={80} alt="" />
            <h1>{slides[active].title}</h1>
          </div>
          <Image src={slides[active].src} alt={slides[active].alt} width={700} height={700} />
          <p className="w-[70%] h-20 text-xl font-extralight text-center">{slides[active].text}</p>

        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-4 my-4 bottom-10 absolute top-[100px]">
        <button className="absolute left-10" onClick={prevSlide}>
          <Image src="/left_icon.svg" alt="" width={50} height={50} />
        </button>
        <button className="absolute right-10" onClick={nextSlide}>
          <Image src="/right_icon.svg" alt="" width={50} height={50} />
        </button>
      </div>
      <div className="w-full flex justify-center items-center gap-4 my-4  bottom-10">
        {slides.map((slide, index) => (
          <input
            key={index}
            className="radioButton"
            type="radio"
            name="radio"
            id={`radio${index}`}
            checked={active === index}
            onChange={() => handleRadioChange(index)}
          />
        ))}
        
      </div>
      {active === slides.length - 1 && (
        <Link className="bg-[#012CFD] text-white rounded-xl px-4 py-2" href="/welcome">Ir a mi empresa</Link>
      )}
    </section>
  );
};
