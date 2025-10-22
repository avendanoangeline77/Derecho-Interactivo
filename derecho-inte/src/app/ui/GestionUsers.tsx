
'use client'

import Link from 'next/link'
import { useUser } from '@/app/context/UserContext'
import { login } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function GestionUsers() {
  const { currentUser } = useUser() as any



  return (
    <div >
     {currentUser?.role == "admin" && ( 
            <Link href="/admin/users"> <button
              className="bg-gray-700 hover:bg-gray-600 transition-all p-3 rounded-xl text-center border border-gray-600"
            >
              <h3 className="text-sm font-semibold mb-1">Gestion de Usuarios</h3>
              <p className="text-xs text-gray-300">Gestiona los usuarios en el panel de control</p>
              
            </button></Link>
           )}

    </div>
  )
}
