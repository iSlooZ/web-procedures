import Link from "next/link"

interface LinkProps{
  nameLink:string;
  link:string;
}

export const LinkComponent = ({nameLink, link}:LinkProps) => {
  return (<Link className="border border-primary-color w-[300px] h-[150px] rounded-xl flex justify-center items-center primary-color-text hover:bg-[#012CFD] hover:text-white" href={link}>{nameLink}</Link>)
}