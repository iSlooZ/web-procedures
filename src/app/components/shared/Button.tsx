import Link from "next/link";




interface buttonProps {
  buttonText: string;
  buttonLink: string;
  buttonStyles: string;
}

export const Button = ({buttonText, buttonLink, buttonStyles}:buttonProps) => {
  return (
    <Link className={buttonStyles} href={buttonLink}>{buttonText}</Link>
  )
}