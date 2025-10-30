'use client'
import { useEffect } from 'react'
import { useUser } from '@/app/context/UserContext'
import { set } from 'zod';


export default function ListaProyectos({proyectos}) {

const { currentUser,setUser } = useUser();
  
useEffect(() => {
 
}, [])

  return (
    <div >
      
           <div className="max-h-[400px] overflow-y-auto space-y-3 p-2 border border-gray-800 rounded-lg">
          {proyectos.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">
              No hay proyectos aún.
            </p>
          ) : (
            proyectos.map((proyecto, i) => (
              <div
                key={i}
                className="border border-gray-700 rounded-lg p-3 bg-gray-900 hover:bg-gray-800 transition"
              >
                <h3 className="text-blue-400 font-semibold text-sm mb-1">
                  {proyecto.titulo}
                </h3>
                <p className="text-gray-400 text-xs mb-1">
                  <span className="font-medium text-gray-300">Autor:</span>{" "}
                  {proyecto.autor || "Anónimo"}
                </p>
                <p className="text-gray-500 text-xs">
                  <span className="font-medium text-gray-400">Publicado:</span>{" "}
                  {proyecto.fecha}
                </p>
              </div>
            ))
          )}
        </div>
    
    </div>
  )
}