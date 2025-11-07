'use client'

import Link from 'next/link'

import { useUser } from '@/app/context/UserContext'

export default function ForoProyectoEstudiante() {
  const { currentUser } = useUser() as any

  return (
    <div>
      {(currentUser?.role === "estudiante" || currentUser?.role === "docente") && (
        <Link href="/foro">
          <button className="bg-gray-700 hover:bg-gray-600 transition-all p-3 rounded-xl text-center border border-gray-600">
            <h3 className="text-sm font-semibold mb-1">Foro de Proyectos de Ley</h3>
            <p className="text-xs text-gray-300">
              Sube y debate tus propuestas de ley.
            </p>
          </button>
        </Link>
      )}
    </div>
  )
}
