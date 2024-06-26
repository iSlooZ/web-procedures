'use client'

import React, { useEffect, useState } from 'react';
import { getOwnerData } from '../authHandler';
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'
import Image from 'next/image';

const poppins = Poppins({
  weight: ['200', '300','400','500','600'],
  subsets: ['latin'],
})

export const LogoSelector: React.FC = () => {
    const [selectedLogoPath, setSelectedLogoPath] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [companyId, setCompanyId] = useState<number>();
    const [selectedColor, setSelectedColor] = useState<string>('#000'); // Color por defecto negro
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [selectedLogoSet, setSelectedLogoSet] = useState<string>('blue');
    const [step, setStep] = useState<number>(1);
    const router = useRouter()

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const ownerData = await getOwnerData();
                if (ownerData && ownerData.entity && ownerData.entity.id_owner) {
                    const companyId = ownerData.company?.id_company;
                    if (companyId !== undefined) {
                        setCompanyId(companyId);
                    } else {
                        console.error('No se pudo obtener la ID de la compañía');
                    }
                } else {
                    console.error('No se pudo obtener la ID de la compañía');
                }
            } catch (error) {
                console.error('Error al obtener la ID de la compañía:', error);
            }
        };

        fetchOwnerData();
    }, []);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleLogoSelect = (logoPath: string) => {
      // Verificar si el logo seleccionado es azul o blanco
      const isBlueLogo = logoPath.includes('icons-blue/');
      
      // Si es un logo azul, reemplazarlo por su equivalente blanco
      const whiteLogoPath = isBlueLogo ? logoPath.replace('/icons-blue/', '/icons/') : logoPath;
  
      setSelectedLogoPath(whiteLogoPath);
      setMenuOpen(false); // Cerrar el menú después de seleccionar el logo
  };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
    };

    // Función para cambiar entre los conjuntos de logos
    const handleLogoSetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLogoSet(event.target.value);
    };

    const handleGoToHome = () => {
      router.push('/welcome')
  };

  const logosBlue = Array.from({ length: 231 }, (_, i) => `https://knowhow-files-uploads.s3.amazonaws.com/icons-blue/icon-${i + 1}.png`);
  const logosWhite = logosBlue.map(logo => {
      const whiteLogo = logo.replace('/icons-blue/', '/icons/');

      return whiteLogo;
  });
  const logos = selectedLogoSet === 'blue' ? logosBlue : logosWhite;


  const enviarFormulario = async () => {
    try {
        const sectionData = {
            id_company: companyId,
            name_section: inputValue,
            logo_section: selectedLogoPath,
            color_section: selectedColor
        };

        const response = await fetch('https://backend-procedures-production.up.railway.app/knowhow/section/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sectionData)
        });

        if (response.ok) {
            handleNextStep();
        } else {
            console.error('Error al enviar los datos del formulario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar los datos del formulario:', error);
    }
};

    return (
        <section className='w-full flex flex-col justify-center items-center '>

{step === 1 && (
                <div className='w-full flex flex-col gap-4 justify-center items-center'>
                    <h2 className={`text-3xl ${poppins.className} font-medium`}>Crea tu área</h2>
                    <h3 className={`text-xl font-extralight ${poppins.className}`}>Personaliza tu área, puedes cambiar los datos cuando quieras.</h3>
                    <div className='w-[300px] h-[150px] flex justify-center items-center gap-4 rounded-3xl p-4 border border-primary-color relative mb-8' style={{ backgroundColor: selectedColor }}>
                      <div className='w-1/3 '>
                          {selectedLogoPath ? (
                              <Image
                                  src={selectedLogoPath}
                                  alt={`Logo ${selectedLogoPath}`}
                                  width={100} height={100}
                                  style={{ width: 'auto', height: 'auto' }}
                              />
                          ) : (
                              <Image
                                  src='/more_section.svg'
                                  alt='Placeholder Logo 1'
                                  className='absolute right-5 bottom-5'
                                  width={50} height={50}
                              />
                          )}
                      </div>
                      <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                      <div className='w-1/3 flex justify-end items-center'>
                          <Image width={50} height={50} src="/right-arrow-svgrepo-com.svg" alt="" />
                      </div>
                  </div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Nombre de área"
                        style={{ marginTop: '10px' }}
                        className='w-[300px] border border-primary-color px-4 py-2 rounded-xl mb-8'
                    />
                    <button className='w-[300px] py-2 primary-color text-white border rounded-full' onClick={handleNextStep}>Siguiente</button>
                </div>
            )}
            {step === 2 && (
                <div className='w-full flex flex-col gap-4 justify-center items-center'>
                  <h2 className={`text-3xl ${poppins.className} font-medium`}>Selecciona un color</h2>
                  <h3 className={`text-xl font-extralight ${poppins.className}`}>Escoge un color que represente a tu área</h3>
                  <div className='w-[300px] h-[150px] flex justify-center items-center gap-4 rounded-3xl p-4 border border-primary-color relative mb-8' style={{ backgroundColor: selectedColor }}>
                  <div className='w-1/3 '>
                      {selectedLogoPath ? (
                          <Image
                              src={selectedLogoPath}
                              alt={`Logo ${selectedLogoPath}`}
                              width={100}
                              height={100}
                          />
                      ) : (
                          <Image
                              src='/more_section.svg'
                              alt='Placeholder Logo 1'
                              className='absolute right-5 bottom-5'
                              width={50}
                              height={50}
                          />
                      )}
                  </div>
                  <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                  <div className='w-1/3 flex justify-end items-center'>
                      <Image  width={50} height={50} src="/right-arrow-svgrepo-com.svg" alt="" />
                  </div>
              </div>
              <div className='w-[300px] flex flex-col justify-center items-center py-8'>
                <input
                    type="color"
                    value={selectedColor}
                    onChange={handleColorChange}
                    className='w-[150px] h-[50px] cursor-pointer '
                />
              </div>
              <div className='w-full flex flex-col justify-center items-center gap-2'>
                  <button className='w-[300px] py-2 primary-color text-white border rounded-full' onClick={handleNextStep}>Siguiente</button>
                  <button className='w-[300px] py-2 primary-color-text border border-primary-color rounded-full' onClick={handlePreviousStep}>Atrás</button>
              </div>
          </div>
            )}
            {step === 3 && (
                <div className='w-full flex flex-col gap-4 justify-center items-center'>
                    <h2 className={`text-3xl ${poppins.className} font-medium`}>Selecciona un ícono</h2>
                    <h3 className={`text-xl font-extralight ${poppins.className}`}>Escoge un ícono que represente a tu área.</h3>
                    <div className='w-[300px] h-[150px] flex justify-center items-center gap-4 rounded-3xl p-4 border border-primary-color relative' style={{ backgroundColor: selectedColor }}>
                      <div className='w-1/3 '>
                        {selectedLogoPath ? (
                        <Image
                        src={selectedLogoPath}
                        alt={`Logo ${selectedLogoPath}`}
                        width={100}
                        height={100}
                        />
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                    <div className='w-1/3 flex justify-end items-center'>
                        <Image width={50} height={50} src="/right-arrow-svgrepo-com.svg" alt="" />
                    </div>
                    </div>  
                    <div className='w-full flex justify-center items-center'>
                      <ul className={`w-[70%] h-[300px] overflow-y-auto p-6 flex flex-wrap justify-center items-center gap-10 border border-primary-color rounded-2xl`}>
                        {logos.map((logoPath, index) => (
                          <li className='' key={index}>
                            <button onClick={() => handleLogoSelect(logoPath)}>
                              <Image src={logoPath} alt={`Logo ${index}`} className='h-[50px] aspect-square object-contain' width={50} height={50}/>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-2'>
                        <button className='w-[300px] py-2 primary-color text-white border rounded-full' onClick={enviarFormulario}>Crear área</button>
                        <button className='w-[300px] py-2 primary-color-text border border-primary-color rounded-full' onClick={handlePreviousStep}>Atrás</button>
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className='w-full flex flex-col gap-4 justify-center items-center'>
                    <h2 className={`text-3xl ${poppins.className} font-medium`}>¡Creación exitosa!</h2>
                    <h3 className={`text-xl font-extralight ${poppins.className}`}>Tu área quedó creada</h3>
                    <div className='w-[300px] h-[150px] flex justify-center items-center gap-4 rounded-3xl p-4 relative mb-8' style={{ backgroundColor: selectedColor }}>
                    <div className='w-1/3 '>
                        {selectedLogoPath ? (
                            <Image
                                src={selectedLogoPath}
                                alt={`Logo ${selectedLogoPath}`}
                                width={100}
                                height={100}
                            />
                        ) : (
                            <Image
                                src='/more_section.svg'
                                alt='Placeholder Logo 1'
                                className='absolute right-5 bottom-5'
                                width={50}
                                height={50}
                            />
                        )}
                    </div>
                    <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                    <div className='w-1/3 flex justify-end items-center'>
                        <Image width={50} height={50}src="/right-arrow-svgrepo-com.svg" alt="" />
                    </div>
                </div>
                    <button className='w-[300px] py-2 primary-color text-white border rounded-full' onClick={handleGoToHome}>Listo</button>
                </div>
            )}
            
        </section>
    );
};
