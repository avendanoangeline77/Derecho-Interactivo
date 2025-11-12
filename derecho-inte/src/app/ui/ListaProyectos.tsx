'use client'
import { useEffect } from 'react'
import { set } from 'zod';
import Link from 'next/link';

import { useUser } from '@/app/context/UserContext';

import ProyectoCard from './ProyectoCard';

export default function ListaProyectos({proyectos: p}) {
const {setProyectos, currentUser,proyectos,setUser } = useUser();



useEffect(() => {
 setProyectos(p)
}, [])

function formDate(date){
  const fecha = new Date(date);
  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
  weekday: 'long',  // día de la semana (lunes, martes...)
  year: 'numeric',
  month: 'long',    // mes en texto
  day: 'numeric'
});
  return fechaFormateada
}

  return (
    <div >
      
           <div className="space-y-3 p-2 border border-gray-800 rounded-lg">
          {proyectos.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">
              No hay proyectos aún.
            </p>
          ) : (
            proyectos.map((proyecto, i) => (
              
              <ProyectoCard proyecto={proyecto} key={i}></ProyectoCard>
            ))
          )}
        </div>
    

    </div>
  )
}