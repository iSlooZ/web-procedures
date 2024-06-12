'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Owner, getOwnerData } from '../authHandler';

interface Section {
  id_section: number;
  name_section: string;
}

interface FormData {
  id_procedure: string;
  procedure_name: string;
  procedure_description: string;
  procedure_sample_pdf: string;
  procedure_pdf: string;
  id_business_line: number;
  id_company: number;
  id_section: number;
  procedure_uploaded_by: string;
}

export const AddProcedureHolding = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState<string>('');
  const mainPdfRef = useRef<HTMLInputElement>(null);
  const samplePdfRef = useRef<HTMLInputElement>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadedBy, setUploadedBy] = useState<string>('');
  const [holdingCompanySections, setHoldingCompanySections] = useState<{ [key: string]: string[] }>({});
  const [holdingCompanies, setHoldingCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('company');

  useEffect(() => {
    const fetchData = async () => {
      const ownerData: Owner | null = await getOwnerData();
      if (ownerData && ownerData.holding) {
        console.log("Companies del holding actual:", ownerData.holding.holding_name, ownerData.companies_in_holding.map(company => company.company_name));
    
        // Obtener todas las secciones de todas las compañías del holding actual
        const allSections: { [key: string]: string[] } = {};
        ownerData.companies_in_holding.forEach(company => {
          const companySections = company.sections.map(section => section.name_section);
          allSections[company.company_name] = companySections;
        });
        console.log("Todas las secciones del holding actual:", allSections);
        setHoldingCompanySections(allSections);
      }
    };
  
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Resto del código de onSubmit
  };

  return (
    <div className='w-full flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl'>Crear nuevo procedimiento</h2>
      <form
        className='w-[70%] flex flex-col justify-center items-center mt-8'
        onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='w-full flex justify-center items-center flex-col gap-4'>
          <select
            className='border border-black w-[500px] px-4 py-2 rounded-xl text-lg'
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="company">Filtrar por: Company</option>
            <option value="section">Filtrar por: Section</option>
          </select>

          {filterBy === 'company' && (
            <div className='flex gap-4'>
              {holdingCompanies.map(company => (
                <label key={companyId} className='flex items-center'>
                  <input
                    type="checkbox"
                    value={company}
                    checked={selectedCompany === company}
                    onChange={() => setSelectedCompany(company)}
                  />
                  <span className='ml-2'>{company}</span>
                </label>
              ))}
            </div>
          )}

{holdingCompanies.map(company => (
  selectedCompany === company && (
    <div key={company} className='flex flex-col gap-4'>
      <h3>{company}</h3>
      {holdingCompanySections[company].map(section => (
        <label key={`${company}-${section}`} className='flex items-center'>
          <input
            type="checkbox"
            value={section}
            checked={selectedSection === section}
            onChange={() => setSelectedSection(section)}
          />
          <span className='ml-2'>{section}</span>
        </label>
      ))}
    </div>
  )
))}


          <fieldset className='w-[500px] flex justify-center items-center gap-3'>
            <input className='w-1/2' type="file" id="procedure_sample_pdf" accept=".pdf" ref={samplePdfRef} />
            <input className='w-1/2' type="file" id="procedure_pdf" accept=".pdf" ref={mainPdfRef} />
          </fieldset>
        </fieldset>
        <button className='px-20 py-2 rounded-xl text-white font-bold bg-stone-400 shadow-lg shadow-gray-400 hover:bg-stone-200 mt-8' type="submit">Crear Procedimiento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
