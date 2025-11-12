"use client"

import { useUser } from "../context/UserContext"
import { Dispatch, useEffect, useState } from "react"
import Link from "next/link"
import { cambiarEstado } from "../actions/foro"
import { useActionState } from "react"

// 🧩 Tipos auxiliares

type EstadoProyecto = "validado" | "pendiente" | "invalido"

interface Area {
  id: string
  nombre: string
}

interface Autor {
  id: string
  username: string
}

interface Proyecto {
  id: string
  titulo: string
  estado?: EstadoProyecto
  anonimo?: boolean
  created: string
  expand: {
    autor?: Autor
    areas?: Area[]
  }
}

interface User {
  id: string
  email: string
  username: string
  role: string
}

interface UserContextType {
  currentUser: User | null
  setProyectos: Dispatch<any[]>
  proyectos: any[]
}

// Lo que devuelve la acción cambiarEstado
interface CambiarEstadoResponse {
  success: boolean
  newEstado?: EstadoProyecto
  error?: string
}

// 🧠 Componente principal

export default function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  const [estado, setEstado] = useState<EstadoProyecto>(
    proyecto.estado || "pendiente"
  )
    const { currentUser, setProyectos, proyectos } = useUser() as UserContextType

   // 🔁 Mantener sincronizado el estado local con las props
useEffect(() => {
  setEstado(proyecto.estado || "pendiente")
}, [proyecto.estado, proyectos])
  console.log(estado)
  const [mostrarPopup, setMostrarPopup] = useState(false)


  // Acción del servidor (react server action)
  const [state, action, isPending] = useActionState<
   Promise <boolean> | null,
    FormData
  >(
    async (_prevState, formData) => {
      const id = formData.get("id") as string
      const nuevoEstado = formData.get("estado") as EstadoProyecto
     
      console.log("Datos enviados:", { id, nuevoEstado })

      const res = await cambiarEstado(id, nuevoEstado)
      console.log(res)

      if (res) {
       setProyectos(proyectos.map((proyecto)=>{
        console.log(proyecto.id,id,'no')
        if(proyecto.id == id) return {
          ...proyecto,
          estado: nuevoEstado
        }
        return proyecto
       }))
      }

      return res
    },
    null
  )

  const coloresEstado: Record<EstadoProyecto, string> = {
    validado: "bg-green-600 text-white",
    pendiente: "bg-yellow-500 text-black",
    invalido: "bg-red-600 text-white",
  }

  // 🔧 (No se usa ahora, pero te lo dejo tipado por si lo querés reutilizar)
  const handleEstadoChange = async (nuevoEstado: EstadoProyecto) => {
    const res = await cambiarEstado(proyecto.id, nuevoEstado)
    console.log(res)
  }

  return (
    <div className="border border-gray-700 rounded-lg p-3 bg-gray-900 hover:bg-gray-800 transition relative">
      {/* Título con link */}
      <Link href={`/foro/${proyecto.id}`}>
        <h3 className="text-blue-400 font-semibold text-sm mb-1">
          {proyecto.titulo}
        </h3>
      </Link>

      {/* Autor y fecha */}
      <p className="text-gray-400 text-xs mb-1">
        <span className="font-medium text-gray-300">Autor:</span>{" "}
        {proyecto.anonimo ? "Anónimo" : proyecto.expand.autor?.username}
      </p>
      <p className="text-gray-500 text-xs mb-2">
        <span className="font-medium text-gray-400">Publicado:</span>{" "}
        {formDate(proyecto.created)}
      </p>

      <div className="flex justify-between">
        {/* Áreas */}
        <div className="flex flex-wrap gap-1 mt-2">
          {proyecto.expand.areas?.map((area) => (
            <span
              key={area.id}
              className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full truncate max-w-[120px]"
              title={area.nombre}
            >
              {area.nombre}
            </span>
          ))}
        </div>

        {/* Tag de estado y botón de edición */}
        {currentUser?.role === "docente" && (
          <>
            <span
              className={`flex items-center px-2 rounded-full text-xs ${coloresEstado[estado]}`}
            >
              {estado.toUpperCase()}
            </span>

            <button
              onClick={() => setMostrarPopup(!mostrarPopup)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-sm"
            >
              ⚙️
            </button>
          </>
        )}
      </div>

      {/* Popup */}
      {mostrarPopup && (
        <form action={action} key={proyecto.id}>
          <div className="absolute top-8 right-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg p-2 text-sm z-10">
            <p className="text-gray-300 mb-1">Cambiar estado:</p>

            <input type="hidden" name="id" value={proyecto.id} />
            <input type="hidden" name="estado" />

            <button
              type="button"
              className="block w-full text-left px-2 py-1 hover:bg-green-600 rounded"
              onClick={(e) => {
                const form = e.currentTarget.form!
                form.querySelector<HTMLInputElement>('input[name="estado"]')!.value =
                  "validado"
                form.requestSubmit()
              }}
            >
              ✅ Validado
            </button>

            <button
              type="button"
              className="block w-full text-left px-2 py-1 hover:bg-yellow-500 hover:text-black rounded"
              onClick={(e) => {
                const form = e.currentTarget.form!
                form.querySelector<HTMLInputElement>('input[name="estado"]')!.value =
                  "pendiente"
                form.requestSubmit()
              }}
            >
              ⏳ Pendiente
            </button>

            <button
              type="button"
              className="block w-full text-left px-2 py-1 hover:bg-red-600 rounded"
              onClick={(e) => {
                const form = e.currentTarget.form!
                form.querySelector<HTMLInputElement>('input[name="estado"]')!.value =
                  "invalido"
                form.requestSubmit()
              }}
            >
              ❌ Inválido
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// 🕒 función para formatear fecha
function formDate(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
