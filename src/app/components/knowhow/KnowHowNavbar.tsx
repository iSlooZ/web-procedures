'use client'
import { useEffect, useState } from "react";
import { getOwnerData, Owner } from "./authHandler";
import Link from "next/link";
import Image from "next/image";

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
          <Link className="" href="/knowhow/welcome">
            <Image className="min-w-[80px] aspect-radio" src="/Logo_knowhow.svg" alt="KnowHow Logo" width={80} height={80} />
          </Link>
          <li>
            <Link href="/knowhow/welcome">Inicio</Link>
          </li>
          <li>
            <Link href="/knowhow/procedures">Procedimientos</Link>
          </li>
          <li>
            <Link href="/knowhow/account">Mi cuenta</Link>
          </li>
        </ul>
        <div className="w-1/3 flex justify-end items-center gap-2">
          {owner && (
            <div className="">
              <Image
                width={50} height={50}
                className="mr-8 aspect-square object-contain"
                src={owner.holding && owner.holding.logo_holding ? owner.holding.logo_holding : owner.company.logo_company}
                alt="Company Logo"
              />
            </div>
          )}
          <Image width={20} height={20} src="/Capa_1.png" alt="" />
          <span>ES</span>
        </div>
      </nav>
    </header>
  );
};
