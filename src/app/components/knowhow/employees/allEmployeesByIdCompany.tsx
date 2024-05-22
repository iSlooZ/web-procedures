'use client'
import React, { useState, useEffect } from 'react';
import { Owner, getOwnerData } from '../authHandler';

export const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [sections, setSections] = useState<{ [key: number]: string }>({});
  const [selectedSection, setSelectedSection] = useState<number | null>(null); // Estado para almacenar la sección seleccionada

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerData: Owner | null = await getOwnerData();
        if (ownerData) {
          const companyId = ownerData.company.id_company;
          const response = await fetch(`http://localhost:8000/knowhow/employees/by-company-id/${companyId}`);
          if (!response.ok) {
            throw new Error('Error al cargar los datos');
          }
          const data = await response.json();
          setEmployees(data);
          setCompanyName(ownerData.company.company_name);

          // Convertir el array de positions a un objeto
          if (Array.isArray(ownerData.positions)) {
            const positionsObj: { [key: number]: string } = {};
            ownerData.positions.forEach((position) => {
              positionsObj[position.id_position] = position.position;
            });
            setPositions(positionsObj);
          }

          // Convertir el array de sections a un objeto
          if (Array.isArray(ownerData.sections)) {
            const sectionsObj: { [key: number]: string } = {};
            ownerData.sections.forEach((section) => {
              sectionsObj[section.id_section] = section.name_section;
            });
            setSections(sectionsObj);
          }
        } else {
          console.error('No se pudo obtener los datos del propietario.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrar empleados por sección seleccionada
  const filteredEmployees = selectedSection
    ? employees.filter((employee: any) => employee.id_section === selectedSection)
    : employees;

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='text-xl font-semibold'>Empleados de la compañía {companyName}</h1>
      <div className='w-full flex flex-col gap-4 justify-center items-center'>
        {/* Selector de sección */}
        <select
          className='p-2 bg-stone-300 rounded-xl'
          value={selectedSection || ''}
          onChange={(e) => setSelectedSection(parseInt(e.target.value))}
        >
          <option value=''>Todas las áreas</option>
          {Object.entries(sections).map(([sectionId, sectionName]) => (
            <option key={sectionId} value={sectionId}>
              {sectionName}
            </option>
          ))}
        </select>

        {/* Lista de empleados */}
        {filteredEmployees.map((employee: any) => (
          <div className='w-full flex justify-center items-center gap-4'>
            <div className='p-4 bg-stone-300 w-fit rounded-xl' key={employee.id_employee}>
              Nombre: {employee.name_employee} | Correo: {employee.email_employee} | Cargo: {positions[employee.id_position]} | Area: {sections[employee.id_section]}
            </div>
            <a className='px-4 py-2 bg-yellow-600 rounded-xl' href="#">Editar</a>
            <a className='px-4 py-2 bg-red-500 rounded-xl' href="#">Eliminar</a>
          </div>
        ))}
      </div>
    </div>
  );
};
