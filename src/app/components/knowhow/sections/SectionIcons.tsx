'use client'
import React, { useEffect, useState } from 'react';
import { getOwnerData } from '../authHandler';

export const LogoSelector: React.FC = () => {
  const [selectedLogoPath, setSelectedLogoPath] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [companyId, setCompanyId] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<string>('#000000'); // Color por defecto negro
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

  const handleLogoSelect = (logoPath: string) => {
    console.log('Logo seleccionado:', logoPath);
    setSelectedLogoPath(logoPath);
    setMenuOpen(false); // Cerrar el menú después de seleccionar el logo
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
    console.log('Color seleccionado:', event.target.value);
  };

 
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
      } else {
        console.error('Error al enviar los datos del formulario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar los datos del formulario:', error);
    }
  };

  const logos = Array.from({ length: 231 }, (_, i) => `http://localhost:8000/uploads/icons/icon-${i + 1}.png`);
  return (
    <section className='w-full flex flex-col justify-center items-center'>

      {menuOpen && (
        <ul className='w-[600px] h-[300px] overflow-y-auto bg-gray-100 p-6 flex flex-wrap justify-center items-center gap-10'>
          {logos.map((logoPath, index) => (
            <li className='' key={index}>
              <button onClick={() => handleLogoSelect(logoPath)}>
                <img src={logoPath} alt={`Logo ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedLogoPath && (
        <img
          src={selectedLogoPath}
          alt={`Logo ${selectedLogoPath}`}
          style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
        />
      )}
      <button onClick={() => setMenuOpen(!menuOpen)}>Seleccionar Logo</button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ingrese un nombre"
        style={{ marginTop: '10px' }}
      />
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
      />
      <button onClick={enviarFormulario}>Enviar Formulario</button>
    </section>
  );
};


