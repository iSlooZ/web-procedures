import Link from "next/link"

interface LinkProps{
  nameLink:string;
}

export const LinkComponent = ({nameLink}:LinkProps) => {
  return (<Link className="border border-primary-color w-[300px] h-[150px] rounded-xl flex justify-center items-center primary-color-text hover:bg-[#012CFD] hover:text-white" href="#">{nameLink}</Link>)
}