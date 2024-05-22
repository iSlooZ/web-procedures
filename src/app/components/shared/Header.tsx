import Link from "next/link"
import { Button } from "./Button"
import './styles.css'

export const Header = () => {
  return (
    <header className="w-full flex justify-center items-center h-48 ">
      <nav className="w-full flex justify-center items-center" >
        <div className="w-2/3 flex justify-center items-center">
          <img
            className="w-[54px] h-[62px]"
            src="/logoknowhow.svg" 
            alt="Logo de KnowHow" 
          />
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
          <li>
            <Link href="#">
              Más información
            </Link>
          </li>
        </ul>
        </div>
        
        <div className="w-1/3 flex justify-start items-center gap-8">
          <Button 
            buttonText="Entrar"
            buttonLink="/knowhow/login"
            buttonStyles="px-8 py-2 rounded-2xl primary-color-text"
          />
          <Button 
            buttonText="Empieza aquí"
            buttonLink="/knowhow/register"
            buttonStyles="primary-color text-white px-10 py-4 rounded-full"        
          />
          <div className="w-1/3 flex justify-start items-center gap-2">
            <img className="w-[30px] h-[30px]" src="/Layer_2.png" alt="" />
            <span className="primary-color-text">ES</span>
          </div>
        </div>
      </nav>
    </header>
  )
}