import { FooterItem } from "../footer/FooterItem"


export const Footer = () => {
  return (
    <footer className="w-full min-h-64 flex justify-center items-center p-8 bg-[#f3f6fa]">
      <div className="w-1/4 flex flex-col justify-center items-center">
        <img className="w-80 pb-4" src="/logotest.png" alt="logo test" />
        {/* <ul className="flex justify-center items-center">
          <li><a href=""><img className="w-6" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-6" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-6" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-6" src="/ig.svg" alt="" /></a></li>
          <li><a href=""><img className="w-6" src="/ig.svg" alt="" /></a></li>
        </ul> */}
      </div>
      <div className="w-2/4 flex justify-start items-center">
        <FooterItem />
        <FooterItem />
        <FooterItem />
      </div>
    </footer>
  )
}