'use client'
import { WelcomeHero } from "@/app/components/welcome/Hero";
import { useSession } from '@/app/api';

export default function WelcomePage() {
  const isAuthenticated = useSession(); // Llamada sin argumentos

  return (
    <>
      {isAuthenticated && <WelcomeHero />}
    </>
  );
}
