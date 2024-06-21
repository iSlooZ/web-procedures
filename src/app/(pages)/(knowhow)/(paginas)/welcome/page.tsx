'use client'
import { useEffect, useState } from 'react';
import { CompanyWelcome } from "@/app/components/knowhow/welcome/CompanyWelcome";
import { HoldingWelcome } from "@/app/components/knowhow/welcome/HoldingWelcome";
import { Owner, getOwnerData } from '@/app/components/knowhow/authHandler';
import { useRouter } from 'next/navigation';


export default function WelcomePage() {
  const [ownerData, setOwnerData] = useState<Owner | null>(null);
  const [hasHolding, setHasHolding] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    const fetchOwnerData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const data = await getOwnerData();
        setOwnerData(data);
        setHasHolding(data?.holding.id_holding ? true : false);
      } else {
        router.push('/login'); // Redirigir al inicio de sesión si no hay token
      }
    };
  
    fetchOwnerData();
  }, [router]);

  // Renderizar HoldingWelcome si hasHolding es true, de lo contrario renderizar CompanyWelcome
  return (
    <>
      {hasHolding ? <HoldingWelcome /> : <CompanyWelcome />}
    </>
  );
}
