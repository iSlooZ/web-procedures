import { FooterItem } from "../../footer/FooterItem"


export const Footer = () => {
  return (
    <footer className="w-full h-[300px] flex justify-center items-center p-8">
      <div className="w-1/4 flex flex-col justify-center items-center">
        <img className="w-80" src="/logotest.png" alt="logo test" />
        <ul className="flex justify-center items-center">
          <li><a href=""><img className="w-10" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-10" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-10" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-10" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-10" src="/ig.svg" alt="" /></a></li>
        </ul>
      </div>
      <div className="w-3/4 flex justify-center items-center">
        <FooterItem />
        <FooterItem />
        <FooterItem />
      </div>
    </footer>
  )
}