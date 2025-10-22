
import  pb  from '@/app/database/db'
import { getUser } from '../actions/users';

import { getVerifyUser } from '../actions/users';

import { logout } from "../actions/auth";

import Link from "next/link"

import Image from 'next/image';
//const user = await getUser()

import WelcomeUser from '../ui/WelcomeUser';
import BotonLogot from '../ui/BotonLogout';
import GestionUsers from '../ui/GestionUsers';

export default async function HomeScreen() {


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

        <WelcomeUser></WelcomeUser>

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
          
      <GestionUsers></GestionUsers>
          
        </div>

        {/* Logout button */}
       <BotonLogot></BotonLogot>
      </div>
    </div>
  );
}
