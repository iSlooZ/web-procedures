



interface buttonProps {
  buttonText: string;
  buttonLink: string;
  buttonStyles: string;
}

export const Button = ({buttonText, buttonLink, buttonStyles}:buttonProps) => {
  return (
    <a className={buttonStyles} href={buttonLink}>{buttonText}</a>
  )
}