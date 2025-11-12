'use client'

import { useEffect } from 'react'
import { useUser } from '@/app/context/UserContext'

// 🧩 Tipo de un área individual
interface Area {
  id: string
  nombre: string
}

// 🧠 Props esperadas por el componente
interface SelectAreasProps {
  areas: string[] // lista de IDs seleccionados
  handleAreasChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  opcionesAreas: Area[] // lista completa de áreas disponibles
}

export default function SelectAreas({
  areas,
  handleAreasChange,
  opcionesAreas,
}: SelectAreasProps) {
  const { currentUser, setUser } = useUser() as {
    currentUser: {
      id: string
      username: string
      email: string
      role: string
      verified?: boolean
    } | null
    setUser: (user: any) => void
  }

  useEffect(() => {
    console.log(currentUser, 'Alert User')
    setUser(currentUser)
  }, [currentUser, setUser])

  console.log(currentUser, 'Alert User')

  return (
    <div>
      {/* Áreas */}
      <div>
        <label className="block text-sm mb-1">Áreas</label>
        <select
          multiple
          value={areas}
          onChange={handleAreasChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
        >
          {opcionesAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-1">
          (Mantén presionada Ctrl o Cmd para seleccionar varias)
        </p>
      </div>
    </div>
  )
}
