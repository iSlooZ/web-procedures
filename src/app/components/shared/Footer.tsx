import Image from "next/image"
import { FooterItem } from "../footer/FooterItem"
import Link from "next/link"


export const Footer = () => {
  return (
    <footer className="w-full min-h-34 flex justify-center items-center p-8 bg-[#012CFD]">
      <div className="w-1/4 flex flex-col justify-center items-center gap-4">
        <Link href="/"><Image width={70} height={70} src="/Logo_white_footer.svg" alt=""/></Link>
        <h4 className="text-white text-lg">Todos los derechos reservados a Knowhow - 2024</h4>
      </div>
    </footer>
  )
}