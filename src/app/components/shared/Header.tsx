import Link from "next/link"
import { Button } from "./Button"


export const Header = () => {
  return (
    <header className="w-full flex justify-center items-center h-24 ">
      <nav className="w-full flex justify-center items-center" >
        <div className="w-1/3 flex justify-center pl-12 items-center">
          <img
            className="w-48"
            src="/logotest.png" 
            alt="Logo de KnowHow" 
          />
        </div>
        <ul className="w-1/3 flex justify-center items-center gap-8">
          <li>
            <Link href="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/aboutUs">
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="#">
              Como funciona
            </Link>
          </li>
          <li>
            <Link href="#">
              Extra
            </Link>
          </li>
        </ul>
        <div className="w-1/3 flex justify-start items-center gap-8">
          <Button 
            buttonText="Entrar"
            buttonLink="/knowhow/login"
            buttonStyles="border border-black px-8 py-2 rounded-2xl"
          />
          <Button 
            buttonText="Empieza ahora"
            buttonLink="/knowhow/register"
            buttonStyles="bg-blue-500 text-white px-8 py-2 rounded-2xl"        
          />
        </div>
      </nav>
    </header>
  )
}