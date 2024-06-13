'use client'
import { useEffect, useState } from 'react';
import { getOwnerData } from '../authHandler';

interface Section {
  id_section: number;
  name_section: string;
}

export interface Procedure {
  id_procedure: string;
  procedure_name: string;
  procedure_description: string;
}

export const GetProceduresList = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [filteredProcedures, setFilteredProcedures] = useState<Procedure[]>([]);
  const [sectionFilter, setSectionFilter] = useState<number | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchProceduresAndSections = async () => {
      const ownerData = await getOwnerData();
      if (ownerData && ownerData.company) {
        const companyId = ownerData.company.id_company;

        try {
          // Fetch procedures
          const proceduresResponse = await fetch(`http://localhost:8000/knowhow/procedures/by-company-id/${companyId}`);
          if (!proceduresResponse.ok) {
            throw new Error('Error al obtener los procedimientos.');
          }
          const proceduresData = await proceduresResponse.json();
          setProcedures(proceduresData);

          // Fetch sections
          const sectionsResponse = await fetch(`http://localhost:8000/knowhow/sections/by-company-id/${companyId}`);
          if (!sectionsResponse.ok) {
            throw new Error('Error al obtener las secciones.');
          }
          const sectionsData = await sectionsResponse.json();
          setSections(sectionsData);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error here if necessary
        }
      }
    };

    fetchProceduresAndSections();
  }, []);

  useEffect(() => {
    const fetchFilteredProcedures = async (selectedSection: number) => {
      try {
        const response = await fetch(`http://localhost:8000/knowhow/procedures-for-sections/by-section/${selectedSection}`);
        if (!response.ok) {
          throw new Error('Error al obtener los procedimientos para la sección seleccionada.');
        }
        const data = await response.json();
        // Extract procedure ids associated with the selected section
        const procedureIds = data.map((item: any) => item.id_procedure);
        // Filter procedures based on the extracted ids
        const filteredProcedures = procedures.filter(procedure => procedureIds.includes(procedure.id_procedure));
        setFilteredProcedures(filteredProcedures);
      } catch (error) {
        console.error('Error fetching filtered procedures:', error);
        // Handle error here if necessary
      }
    };

    // Filter procedures based on section filter
    let filtered = procedures;
    if (sectionFilter !== null) {
      fetchFilteredProcedures(sectionFilter);
    } else {
      setFilteredProcedures(filtered);
    }
  }, [procedures, sectionFilter]);

  return (
    <section className='2-full flex flex-col justify-center items-center'>
      <h1 className='w-full text-center text-2xl'>Procedimientos de la compañía</h1>
      <div className="flex justify-center space-x-4 my-4">
        {/* Section Filter */}
        <select
          className="p-2 border border-gray-300 rounded"
          value={sectionFilter || ""}
          onChange={(e) => setSectionFilter(parseInt(e.target.value) || null)}
        >
          <option value="">Todas las secciones</option>
          {sections.map(section => (
            <option key={section.id_section} value={section.id_section}>{section.name_section}</option>
          ))}
        </select>
      </div>
      {filteredProcedures.length === 0 ? ( // Verifica si no hay procedimientos filtrados
        <p className="text-center text-red-500">Aún no tienes procedimientos.</p>
      ) : (
        <div className='w-[70%] flex flex-wrap justify-center items-center gap-4'>
          {filteredProcedures.map((procedure: Procedure) => (
            <a
              href={`http://localhost:3000/knowhow/procedures/${procedure.id_procedure}`}
              key={procedure.id_procedure}
              className='w-[400px] bg-stone-400 rounded-xl p-4 overflow-hidden cursor-pointer hover:bg-stone-300' 
            >
              <h2 className='text-xl overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold'>{procedure.procedure_name}</h2>
              <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>{procedure.procedure_description}</p>
              <h3 className='text-sm w-full text-right font-bold m-2'>{procedure.id_procedure}</h3>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};
