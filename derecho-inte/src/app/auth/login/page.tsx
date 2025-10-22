'use client'

import LoginForm from "../../ui/LoginForm";
import { useEffect, useState } from "react";


import Image from "next/image";

export default function Login() {
  
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  setTimeout(
    () => {
      setIsLoading(false)

    },1000
  )
    
   }, [])

 if (isLoading){
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-300 animate-pulse">
        Cargando...
      </p>
    </div>

  )

 }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-80 text-center border border-gray-700">
        {/* Encabezado */}
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12 border-gray-400 rounded-full mr-3">
            <Image
          className="dark:invert"
          src="/uba.png"
          alt="Next.js logo"
          height={100}
          width={100}
          priority
        />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold">Facultad de Derecho</h3>
            <p className="text-xs text-gray-400">Universidad de Buenos Aires</p>
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Logo circular o ícono */}
        <div className="w-16 h-16 border-gray-500 rounded-full mx-auto mb-4">
          <Image
          className="dark:invert"
          src="/uba.png"
          alt="Next.js logo"
          height={100}
          width={100}
          priority
        />
        </div>

        {/* Título */}
        <h2 className="text-lg font-semibold mb-1">Derecho Interactivo</h2>
        <p className="text-xs text-gray-400 mb-6">
          Acceso restringido para estudiantes y docentes de 1er año.
        </p>

       <LoginForm></LoginForm>

      </div>
    </div>
  );
}
