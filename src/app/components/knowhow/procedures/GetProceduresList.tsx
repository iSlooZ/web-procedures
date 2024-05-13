'use client'
import { useEffect, useState } from 'react';
import { getOwnerData } from '../authHandler';

interface Procedure {
  id_procedure: string;
  procedure_name: string;
  procedure_description: string;
  id_business_line: number;
  id_section: number;
}

export const GetProceduresList = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [filteredProcedures, setFilteredProcedures] = useState<Procedure[]>([]);
  const [businessLineFilter, setBusinessLineFilter] = useState<number | null>(null);
  const [sectionFilter, setSectionFilter] = useState<number | null>(null);
  const [businessLines, setBusinessLines] = useState<number[]>([]);
  const [sections, setSections] = useState<number[]>([]);


  useEffect(() => {
    const fetchProcedures = async () => {
      const ownerData = await getOwnerData();
      if (ownerData && ownerData.company) {
        const companyId = ownerData.company.id_company;
        const apiUrl = `http://localhost:8000/knowhow/procedures/by-company-id/${companyId}`;

        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const proceduresData = await response.json();
            setProcedures(proceduresData);

            // Extract distinct business lines and sections from procedures
            const uniqueBusinessLines: number[] = Array.from(new Set(proceduresData.map((procedure:Procedure) => procedure.id_business_line)));
            const uniqueSections: number[] = Array.from(new Set(proceduresData.map((procedure:Procedure) => procedure.id_section)));

            setBusinessLines(uniqueBusinessLines);
            setSections(uniqueSections);
          } else {
            throw new Error('Error al obtener los procedimientos.');
          }
        } catch (error) {
          console.error('Error fetching procedures:', error);
          // Handle error here if necessary
        }
      }
    };

    fetchProcedures();
  }, []);

  useEffect(() => {
    // Filter procedures based on business line and section filters
    let filtered = procedures;
    if (businessLineFilter !== null) {
      filtered = filtered.filter(procedure => procedure.id_business_line === businessLineFilter);
    }
    if (sectionFilter !== null) {
      filtered = filtered.filter(procedure => procedure.id_section === sectionFilter);
    }
    setFilteredProcedures(filtered);
  }, [procedures, businessLineFilter, sectionFilter]);

  return (
    <section className='2-full flex flex-col justify-center items-center'>
      <h1 className='w-full text-center text-2xl'>Procedimientos de la compañía</h1>
      <div className="flex justify-center space-x-4 my-4">
        {/* Business Line Filter */}
        <select
          className="p-2 border border-gray-300 rounded"
          value={businessLineFilter || ""}
          onChange={(e) => setBusinessLineFilter(parseInt(e.target.value) || null)}
        >
          <option value="">Todas las líneas de negocio</option>
          {businessLines.map(line => (
            <option key={line} value={line}>Business Line {line}</option>
          ))}
        </select>

        {/* Section Filter */}
        <select
          className="p-2 border border-gray-300 rounded"
          value={sectionFilter || ""}
          onChange={(e) => setSectionFilter(parseInt(e.target.value) || null)}
        >
          <option value="">Todas las secciones</option>
          {sections.map(section => (
            <option key={section} value={section}>Section {section}</option>
          ))}
        </select>
      </div>
      <ul className='w-[70%] flex flex-wrap justify-center items-center gap-4'>
        {filteredProcedures.map((procedure: Procedure) => (
          <li
            key={procedure.id_procedure}
            className='w-[400px] bg-stone-400 rounded-xl p-4 overflow-hidden cursor-pointer hover:bg-stone-300' 
          >
            <h2 className='text-xl overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold'>{procedure.procedure_name}</h2>
            <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>{procedure.procedure_description}</p>
            <h3 className='text-sm w-full text-right font-bold m-2'>{procedure.id_procedure}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
};
