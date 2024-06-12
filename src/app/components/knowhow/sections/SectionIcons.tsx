'use client'

import React, { useEffect, useState } from 'react';
import { getOwnerData } from '../authHandler';
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['200', '300','400','500','600'],
  subsets: ['latin'],
})

export const LogoSelector: React.FC = () => {
    const [selectedLogoPath, setSelectedLogoPath] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [companyId, setCompanyId] = useState<number>();
    const [selectedColor, setSelectedColor] = useState<string>('#FFFFFFF'); // Color por defecto negro
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
                        console.log('ID de la compañía:', companyId);
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
      const isBlueLogo = logoPath.includes('icons/');
      
      // Si es un logo azul, reemplazarlo por su equivalente blanco
      const whiteLogoPath = isBlueLogo ? logoPath.replace('/icons/', '/icons_white/') : logoPath;
  
      console.log('Logo seleccionado:', whiteLogoPath);
      setSelectedLogoPath(whiteLogoPath);
      setMenuOpen(false); // Cerrar el menú después de seleccionar el logo
  };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
        console.log('Color seleccionado:', event.target.value);
    };

    // Función para cambiar entre los conjuntos de logos
    const handleLogoSetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLogoSet(event.target.value);
    };

    const handleGoToHome = () => {
      router.push('/knowhow/welcome')
  };

    // Obtener el conjunto de logos seleccionado
// Obtener el conjunto de logos seleccionado
  const logosBlue = Array.from({ length: 231 }, (_, i) => `http://localhost:8000/uploads/icons/icon-${i + 1}.png`);
  const logosWhite = logosBlue.map(logo => {
      const whiteLogo = logo.replace('/icons/', '/icons_white/');
      console.log("Logo blanco:", whiteLogo); // Imprimir la ruta del logo blanco en la consola
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

        const response = await fetch('http://localhost:8000/knowhow/section/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sectionData)
        });

        if (response.ok) {
            console.log('Datos del formulario enviados correctamente.');
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
                              <img
                                  src={selectedLogoPath}
                                  alt={`Logo ${selectedLogoPath}`}
                                  style={{ maxWidth: '100px', maxHeight: '100px'}}
                              />
                          ) : (
                              <img
                                  src='/more_section.svg'
                                  alt='Placeholder Logo 1'
                                  className='w-12 absolute right-5 bottom-5'
                              />
                          )}
                      </div>
                      <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                      <div className='w-1/3 flex justify-end items-center'>
                          <img className='w-[50px] h-[50px]' src="/right-arrow-svgrepo-com.svg" alt="" />
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
                          <img
                              src={selectedLogoPath}
                              alt={`Logo ${selectedLogoPath}`}
                              style={{ maxWidth: '100px', maxHeight: '100px'}}
                          />
                      ) : (
                          <img
                              src='/more_section.svg'
                              alt='Placeholder Logo 1'
                              className='w-12 absolute right-5 bottom-5'
                          />
                      )}
                  </div>
                  <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                  <div className='w-1/3 flex justify-end items-center'>
                      <img className='w-[50px] h-[50px]' src="/right-arrow-svgrepo-com.svg" alt="" />
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
                              <img
                                  src={selectedLogoPath}
                                  alt={`Logo ${selectedLogoPath}`}
                                  style={{ maxWidth: '100px', maxHeight: '100px'}}
                              />
                          ) : (
                              <span></span>
                          )}
                        </div>
                        <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                        <div className='w-1/3 flex justify-end items-center'>
                            <img className='w-[50px] h-[50px]' src="/right-arrow-svgrepo-com.svg" alt="" />
                        </div>
                    </div>  
                    <div className='w-full flex justify-center items-center'>
                      <ul className={`w-[70%] h-[300px] overflow-y-auto p-6 flex flex-wrap justify-center items-center gap-10 border border-primary-color rounded-2xl`}>
                        {logos.map((logoPath, index) => (
                          <li className='' key={index}>
                            <button onClick={() => handleLogoSelect(logoPath)}>
                              <img src={logoPath} alt={`Logo ${index}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
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
                            <img
                                src={selectedLogoPath}
                                alt={`Logo ${selectedLogoPath}`}
                                style={{ maxWidth: '100px', maxHeight: '100px'}}
                            />
                        ) : (
                            <img
                                src='/more_section.svg'
                                alt='Placeholder Logo 1'
                                className='w-12 absolute right-5 bottom-5'
                            />
                        )}
                    </div>
                    <h4 className='w-1/3 text-white text-xl text-center'>{inputValue}</h4>
                    <div className='w-1/3 flex justify-end items-center'>
                        <img className='w-[50px] h-[50px]' src="/right-arrow-svgrepo-com.svg" alt="" />
                    </div>
                </div>
                    <button className='w-[300px] py-2 primary-color text-white border rounded-full' onClick={handleGoToHome}>Listo</button>
                </div>
            )}
            
        </section>
    );
};
