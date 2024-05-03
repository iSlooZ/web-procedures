'use client'
import { useSession } from "@/app/components/knowhow/api";
import { WelcomeHero } from "@/app/components/knowhow/welcome/Hero";


export default function WelcomePage() {
  const isAuthenticated = useSession(); // Llamada sin argumentos

  return (
    <>
      {isAuthenticated && <WelcomeHero />}
    </>
  );
}
