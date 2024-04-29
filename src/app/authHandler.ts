'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/app/api";

interface Props{
  token:string;
}

// Componente personalizado para manejar la autenticación
export const AuthHandler = ({ token }:Props) => {
  const router = useRouter();

  // Efecto secundario para verificar si hay token y redirigir si no lo hay
  useEffect(() => {
    if (!token) {

    }
  }, [token, router]);

  // Efecto secundario para llamar a la función Session si hay token
  useEffect(() => {
    if (token) {
      useSession({ token });
    }
  }, [token]);

  return null;
}