
import { WelcomeNavbar } from "@/app/components/welcome/WelcomeNavbar";
import "../../../(home)/globals.css";


export const metadata = {
  title: 'Bienvenido a KnowHow',
  description: 'Crea, edita o comparte tus procedimientos.',
}

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WelcomeNavbar/>
        <main>
          {children}
        </main>
    </>
  );
}

