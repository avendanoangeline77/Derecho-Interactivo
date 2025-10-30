"use client";

import React, { useState ,useEffect, useActionState} from "react";
import dynamic from "next/dynamic";
import { getAreas } from "../actions/areas";
import { agregarProyecto } from "../actions/foro";


interface Proyecto {
  autor: string;
  titulo: string;
  fecha: string;
  anonimo: boolean;
  areas: string[];
}

interface Props {
  setProyectos: React.Dispatch<React.SetStateAction<Proyecto[]>>;
}

export default function UploadProyectoModal({initAreas}) {
  const [showModal, setShowModal] = useState(false);
  const [autor, setAutor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);

  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await agregarProyecto(prevState, formData)
    console.log(res)
      if (!res.errors) {
        console.log(res?.errors)
      }

      return res
    },
    null
  )

 useEffect(() => {
  
}, [])
 
  // lista de áreas simulada (deberías reemplazar por las IDs reales de PocketBase)
  const opcionesAreas = initAreas;



  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all"
      >
        Subir Proyecto
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-[#1E1E1E] text-gray-100 w-[90%] max-w-md rounded-2xl p-6 relative border border-gray-700 shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>

            <h2 className="text-center text-xl font-semibold mb-6">
              Formulario
            </h2>
            

            
            <form action={action} className="flex flex-col gap-4">
              {/* Autor */}

              <input 
                type="hidden" 
                name='autor'  
                value={"fyicu44juw1xqxg"}            
              
              
              />

              {/* Anónimo */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonimo"
                  className="w-4 h-4 accent-blue-600"
                  name='anonimo'
                />
                <label htmlFor="anonimo" className="text-sm">
                  Publicar como anónimo
                </label>
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm mb-1">Título del proyecto</label>
                <input
                  type="text"
                  placeholder="Ej: Ley de Fomento a la Reutilización"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name='titulo'
                />
              </div>

              <div>
               <label className="block text-sm mb-1">Descripcion</label>

                <textarea
                  name='descripcion'
                  placeholder="Escribe o edita el contenido Markdown..."
                  className="w-full h-32 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Áreas */}
              <div>
                <label className="block text-sm mb-1">Áreas</label>
                <select
                  name='areas'
                  multiple
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

              {/* Archivo Markdown */}
               <div>
                <label className="block text-sm mb-1">
                  Subir archivo / extraerlo
                </label>
                <input
                  name='archivo'
                  type="file"
                  accept=".md"
                  className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 p-2 mb-2"
                />
                
              </div> 

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  Subir Proyecto
                </button>
                
              </div>
            </form>

           
          </div>
        </div>
      )}
    </>
  );
}
