import Link from "next/link"

import '../shared/styles.css'
import { Button } from "../shared/Button"

export const KnowhowNavbarForms = () => {
  return (
    <header className="w-full flex justify-center items-center h-48 ">
      <nav className="w-full flex justify-center items-center" >
        <div className="w-2/3 flex justify-center items-center">
          <Link href="/">
          <img
            className="w-[80px] aspect-square"
            src="/Logo_knowhow.svg" 
            alt="Logo de KnowHow" 
          />
          </Link>
          <ul className="w-1/3 flex justify-center items-center gap-8">
          <li>
            <Link href="/">
              KH para holdings
            </Link>
          </li>
          <li>
            <Link href="/aboutUs">
              KH para empresas
            </Link>
          </li>
          <li className="list-item">
            <div className="dropdown">
              <Link className="flex justify-center items-center text-color" href="#">
                Más información
                <img className="icon" src="/arrow_down_black.svg"/>
                <img className="icon-hide" src="/arrow_down_white.svg"/>
              </Link>
              <div className="dropdown-content">
                <Link href="#">Quiénes somos</Link>
                <Link href="#">Lo que ofrecemos</Link>
                <Link href="/etesetch">Cómo funciona KH</Link>
                <Link href="/elpepe">Ayuda</Link>
              </div>
            </div>
          </li>
        </ul>
        </div>
        
        <div className="w-1/3 flex justify-start items-center gap-8">
          <div className="w-1/3 flex justify-start items-center gap-2">
            <img className="w-[30px] h-[30px]" src="/Layer_2.png" alt="" />
            <span className="primary-color-text">ES</span>
          </div>
        </div>
      </nav>
    </header>
  )
}