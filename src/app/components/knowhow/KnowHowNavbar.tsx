'use client'

import { getOwnerData } from "./authHandler";



export const KnowHowNavbar = () => {
  getOwnerData();
  return (
    <header className="w-full flex justify-center items-center p-8">
      <nav className="w-full flex justify-center items-center">
        <div className="w-1/3 flex justify-center items-center">
          <img className="w-[200px]" src="/logotest.png" alt="" />
        </div>
        <ul className="w-1/3 flex justify-center items-center gap-8">
          <li><a href="/knowhow/welcome">Inicio</a></li>
          <li><a href="/knowhow/procedures">Procedimientos</a></li>
          <li><a href="/knowhow/employees">Trabajadores</a></li>
          <li><a href="/knowhow/account">Mi cuenta</a></li>
        </ul>
        <div className="w-1/3 flex justify-start items-center gap-2">
          <img className="w-[20px] h-[20px]" src="/Capa_1.png" alt="" />
          <span>ES</span>
        </div>
      </nav>
    </header>
  )
}