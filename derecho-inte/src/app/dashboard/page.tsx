"use client"
import  pb  from '@/app/database/db'
import { getUser } from '../actions/users';

import React, {useState, useEffect} from "react";
import { logout } from "../actions/auth";

import Link from "next/link"

import Image from 'next/image';
//const user = await getUser()




export default function HomeScreen() {
const [user, setUser] = useState<any>(null)
useEffect(() => {
    async function fetchUser() {
   /*    const usersList = await getUsers()
      console.log(usersList,"Users List")
      setUsers(usersList) */
      const response = await getUser()
      console.log(response)
      setUser(response)
      
    }
    fetchUser()
  }, [])
 
 
  const modules = [
    {
      title: "Historia Institucional",
      desc: "Descubre la trayectoria de tu Facultad.",
    },
    {
      title: "Plan de Estudio (1er Año)",
      desc: "Conoce tus asignaturas fundamentales.",
    },
    {
      title: "Herramientas Tecnológicas",
      desc: "Utilidades para tu formación.",
    },
    {
      title: "Biblioteca Digital",
      desc: "Material de estudio con recursos judiciales.",
    },
    {
      title: "Recorrido Virtual",
      desc: "Explora los espacios de la Facultad.",
    },
    {
      title: "Contenido Dinámico",
      desc: "Noticias y análisis jurídicos actualizados.",
    },
    {
      title: "Comunidad Discord",
      desc: "Intercambia ideas y participa en debates.",
    },
    {
      title: "Foro de Proyectos de Ley",
      desc: "Sube y debate tus propuestas de ley.",
    },
    {
      title: "Boletín de Notas",
      desc: "Consulta tu historial académico.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-80 border border-gray-700">
        {/* Header */}
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 border-gray-400 rounded-full mr-3">
            <Image
                      className="dark:invert"
                      src="/uba.png"
                      alt="Next.js logo"
                      height={100}
                      width={100}
                      priority
                    />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Facultad de Derecho</h3>
            <p className="text-xs text-gray-400">Universidad de Buenos Aires</p>
          </div>
        </div>

        <hr className="border-gray-700 mb-4" />
<div>
  {/* Nombre de usuario y rol a la izquierda */}
  <p className="text-sm text-left mt-1 mb-2">Bienvenido {user?.username} {user?.role}</p>
  
  {/* Título centrado */}
  <h2 className="text-lg font-semibold text-center mb-6">Derecho Interactivo</h2>
</div>

        {/* Modules */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {modules.map((mod, index) => (
            <button
              key={index}
              className="bg-gray-700 hover:bg-gray-600 transition-all p-3 rounded-xl text-center border border-gray-600"
            >
              <h3 className="text-sm font-semibold mb-1">{mod.title}</h3>
              <p className="text-xs text-gray-300">{mod.desc}</p>
            </button>
          ))}
          
          {user?.role == "admin" && ( 
            <Link href="/admin/users"> <button
              className="bg-gray-700 hover:bg-gray-600 transition-all p-3 rounded-xl text-center border border-gray-600"
            >
              <h3 className="text-sm font-semibold mb-1">Gestion de Usuarios</h3>
              <p className="text-xs text-gray-300">Gestiona los usuarios en el panel de control</p>
              
            </button></Link>
           )}
          
        </div>

        {/* Logout button */}
        <button onClick={()=>logout()} className="w-full bg-red-700 hover:bg-red-800 transition-colors py-2 rounded-lg font-semibold">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
