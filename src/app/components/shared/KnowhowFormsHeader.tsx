import Link from "next/link"

import '../shared/styles.css'
import { Button } from "../shared/Button"
import Image from "next/image"


export const KnowhowNavbarForms = () => {
  return (
    <header className="w-full flex justify-center items-center h-48 ">
      <nav className="w-full flex justify-center items-center" >
        <div className="w-2/3 flex justify-center items-center gap-4">
          <Link href="/">
          <Image
            className="aspect-square"
            src="/Logo_knowhow.svg" 
            alt="Logo de KnowHow" 
            width={80}
            height={80}
          />
          </Link>
          <ul className="w-1/3 flex justify-center items-center gap-8">
          <li className="min-w-fit">
            <Link href="/">
              KH para holdings
            </Link>
          </li>
          <li className="min-w-fit">
            <Link href="/aboutUs">
              KH para empresas
            </Link>
          </li>
          <li className="list-item min-w-fit">
            <div className="dropdown">
              <Link className="flex justify-center items-center text-color" href="#">
                Más información
                <Image alt="" width={30} height={30} className="icon" src="/arrow_down_black.svg"/>
                <Image alt="" width={30} height={30} className="icon-hide" src="/arrow_down_white.svg"/>
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
            <Image src="/Layer_2.png" width={30} height={30} alt="" />
            <span className="primary-color-text">ES</span>
          </div>
        </div>
      </nav>
    </header>
  )
}