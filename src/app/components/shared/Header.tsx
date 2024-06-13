import Link from "next/link"
import { Button } from "./Button"
import './styles.css'
import Image from "next/image"

export const Header = () => {
  return (
    <header className="w-full flex justify-center items-center h-48 ">
      <nav className="w-full flex justify-center items-center" >
        <div className="w-2/3 w-min-[1000px] flex justify-center items-center">
          <Image
            className="aspect-square mr-8"
            src="/Logo_knowhow.svg" 
            alt="Logo de KnowHow" 
            width={80}
            height={80}
          />
          <ul className="w-1/3 min-w-[500px] flex justify-center items-center gap-8">
          <li>
            <Link className="whitespace-nowrap" href="/">
              KH para holdings
            </Link>
          </li>
          <li>
            <Link className="whitespace-nowrap" href="/aboutUs">
              KH para empresas
            </Link>
          </li>
          <li className="list-item">
            <div className="dropdown">
              <Link className="whitespace-nowrap flex justify-center items-center text-color w-[150px]" href="#">
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
        
        <div className="w-1/3 flex justify-start items-center gap-8 mr-16">
          <Button 
            buttonText="Entrar"
            buttonLink="/knowhow/login"
            buttonStyles="px-8 py-2 rounded-2xl primary-color-text"
          />
          <Button 
            buttonText="Empieza aquí"
            buttonLink="/knowhow/register"
            buttonStyles="primary-color text-white px-10 py-4 rounded-full min-w-[181px]"        
          />
          <div className="w-1/3 flex justify-start items-center gap-2">
            <Image src="/Layer_2.png" width={30} height={30} alt="" />
            <span className="primary-color-text">ES</span>
          </div>
        </div>
      </nav>
    </header>
  )
}