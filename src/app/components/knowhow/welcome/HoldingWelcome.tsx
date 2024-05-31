'use client'
import { useEffect, useState } from "react";
import { Owner, getOwnerData } from "../authHandler";
import Link from 'next/link';

export const HoldingWelcome = () => {
  const [owner, setOwner] = useState<Owner | null>(null);


  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-[50%] mt-12">
        <h1 className="text-6xl my-4 text-center font-bold">{owner?.holding.holding_name}</h1>
        <div className="w-full flex justify-center items-center relative mb-16">
          <img src="/lupa_icon.svg" alt="" className="absolute left-[460px] w-[25px]"/>

          <img src="/arrow_down_blue.svg" alt="" className="absolute right-[460px] w-[25px]"/>
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
