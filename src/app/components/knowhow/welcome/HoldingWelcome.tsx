'use client'
import { useEffect, useState } from "react";
import { Owner, getOwnerData } from "../authHandler";
import Link from 'next/link';
import Image from "next/image";

export const HoldingWelcome = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [companies, setCompanies] = useState<Owner["company"][] | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerData = await getOwnerData();
        setOwner(ownerData);

        const companiesData = ownerData?.companies_in_holding.map(company => ({
          ...company,
          id_company: parseInt(company.id_company),
          id_owner: parseInt(company.id_owner)
        })) || [];
        setCompanies(companiesData);

        const cachedImagesFromStorage = localStorage.getItem("cachedImages");
        if (cachedImagesFromStorage) {
          setCachedImages(JSON.parse(cachedImagesFromStorage));
        }
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cachedImages", JSON.stringify(cachedImages));
  }, [cachedImages]);

  const filteredCompanies = selectedCompany ? companies?.filter(company => company.id_company === parseInt(selectedCompany)) : companies;

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-[50%] flex flex-col justify-center items-center mt-12">
        <h1 className="text-6xl my-4 text-center font-bold">{owner?.holding.holding_name}</h1>
        <div className="w-[400px] relative flex justify-center items-center mb-16">
          <img src="/lupa_icon.svg" alt="" className="absolute left-[20px] w-[25px] h-[25px]"/>
          <select
            name=""
            id=""
            className="w-[400px] rounded-lg py-2 primary-color-text text-center border border-primary-color appearance-none"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">Mostrar Todas</option>
            {Array.isArray(companies) &&
              companies.map((company) => (
                <option key={company.id_company} value={company.id_company}>
                  {company.company_name}
                </option>
              ))}
          </select>
          <img src="/arrow_down_blue.svg" alt="" className="absolute right-[20px] w-[30px]"/>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-wrap justify-center items-center gap-4">
            {Array.isArray(filteredCompanies) ? filteredCompanies.map((company) => (
              <div
                key={company.id_company}
                className="w-72 h-36 rounded-xl flex justify-end items-start relative"
              >
                <Link className="hover:opacity-45 w-full" href={`/knowhow/companies/${company.id_company}`}>
                  <div className="rounded-xl h-36 w-72 object-cover">
                    <Image
                      width={72}
                      height={36}
                      src={cachedImages[company.id_company] || company.logo_company}
                      alt={company.company_name}
                      className="rounded-xl object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-xl font-bold bg-black bg-opacity-50 rounded-xl">
                      {company.company_name}
                    </div>
                  </div>
                </Link>
              </div>
            )) : null}
            <div className="w-72 h-36 border border-primary-color rounded-xl flex justify-end items-start">
              <Link className="hover:opacity-45" href="/knowhow/companies/add">
                <img className="rounded-full m-2 w-10" src="/more_section.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-8">
        <Link
          className="px-20 py-2 rounded-xl text-white font-bold primary-color shadow-lg shadow-gray-400 hover:opacity-75"
          href="/knowhow/procedures/add"
        >
          Subir un procedimiento
        </Link>
      </div>
    </section>
  );
}
