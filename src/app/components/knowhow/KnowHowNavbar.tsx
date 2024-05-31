'use client'
import { useEffect, useState } from "react";
import { getOwnerData, Owner } from "./authHandler";

export const KnowHowNavbar = () => {
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerData = await getOwnerData();
        setOwner(ownerData);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchOwnerData();
  }, []);

  return (
    <header className="w-full flex justify-center items-center p-8">
      <nav className="w-full flex justify-center items-center">
        <ul className="w-1/3 flex justify-start items-center gap-16">
          <a href="">
          <img className="w-[80px] aspect-radio" src="/Logo_knowhow.svg" alt="" />
          </a>
          <li>
            <a href="/knowhow/welcome">Inicio</a>
          </li>
          <li>
            <a href="/knowhow/procedures">Procedimientos</a>
          </li>
          <li>
            <a href="/knowhow/employees">Trabajadores</a>
          </li>
          <li>
            <a href="/knowhow/account">Mi cuenta</a>
          </li>
        </ul>
        <div className="w-1/3 flex justify-end items-center gap-2">
          {owner && (
            <img
              className="w-[100px] m-4 aspect-square object-cover"
              src={owner.holding && owner.holding.logo_holding ? owner.holding.logo_holding : owner.company.logo_company}
              alt="Company Logo"
            />
          )}
          <img className="w-[20px] h-[20px]" src="/Capa_1.png" alt="" />
          <span>ES</span>
        </div>
      </nav>
    </header>
  );
};
