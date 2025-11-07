"use client";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import Link from "next/link";
import { cambiarEstado } from "../actions/foro";

import { useActionState } from "react";

export default function ProyectoCard({ proyecto }) {
  const [estado, setEstado] = useState(proyecto.estado || "pendiente");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const { currentUser } = useUser()


  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const id = formData.get("id");
      const estado = formData.get("estado");

      console.log("Datos enviados:", { id, estado });

      const res = await cambiarEstado(id, estado);
      console.log(res)

      if (res) {
        setEstado(estado)
      }
    },
    null
  );
  const coloresEstado = {
    validado: "bg-green-600 text-white",
    pendiente: "bg-yellow-500 text-black",
    invalido: "bg-red-600 text-white",
  };

  const handleEstadoChange = async (nuevoEstado) => {
    const res = await setEstado(proyecto.id, nuevoEstado)

    console.log(res)
    // 👉 Aquí podrías llamar a PocketBase o tu API para guardar el cambio
    // await pb.collection('proyectos').update(proyecto.id, { estado: nuevoEstado })
  };

  return (
    <div
      className="border border-gray-700 rounded-lg p-3 bg-gray-900 hover:bg-gray-800 transition relative"
    >
      {/* Título con link */}
      <Link href={"/foro/" + proyecto.id}>
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
        {/* Dentro del card, debajo del autor */}
        <div className="flex flex-wrap gap-1 mt-2">
          {proyecto.expand.areas?.map((area) => (
            <span
              key={area.id}
              className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full truncate max-w-[120px]"
              title={area.nombre} // tooltip completo
            >
              {area.nombre}
            </span>
          ))}
        </div>
         {/* Tag de estado */}
      {currentUser?.role === "docente" && (
        <>
          {/* Tag de estado */}
          <span
            className={`flex items-center px-2 rounded-full text-xs ${coloresEstado[estado]}`}
          >
            {estado.toUpperCase()}
          </span>

          {/* Botón de edición */}
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
        <form
          action={action}
          key={proyecto.id}
          onSubmit={(e) => {
            const form = e.currentTarget;
            const estadoInput = form.querySelector('input[name="estado"]');
            // 👇 opcionalmente podés verificar algo antes de enviar
          }}
        >
          <div className="absolute top-8 right-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg p-2 text-sm z-10">
            <p className="text-gray-300 mb-1">Cambiar estado:</p>

            <input type="hidden" name="id" value={proyecto.id} />
            <input type="hidden" name="estado" />

            <button
              type="button"
              className="block w-full text-left px-2 py-1 hover:bg-green-600 rounded"
              onClick={(e) => {
                const form = e.currentTarget.form!;
                form.querySelector('input[name="estado"]').value = "validado";
                form.requestSubmit(); // 🚀 envía el form con el valor actualizado
              }}
            >
              ✅ Validado
            </button>

            <button
              type="button"
              className="block w-full text-left px-2 py-1 hover:bg-yellow-500 hover:text-black rounded"
              onClick={(e) => {
                const form = e.currentTarget.form!;
                form.querySelector('input[name="estado"]').value = "pendiente";
                form.requestSubmit();
              }}
            >
              ⏳ Pendiente
            </button>

            <button
              type="button"
              className="block w-full text-left px-2 py-1 hover:bg-red-600 rounded"
              onClick={(e) => {
                const form = e.currentTarget.form!;
                form.querySelector('input[name="estado"]').value = "invalido";
                form.requestSubmit();
              }}
            >
              ❌ Inválido
            </button>
          </div>
        </form>


      )}
    </div>

  );
}

// función para formatear fecha (puedes mantener la tuya)
function formDate(fecha) {
  return new Date(fecha).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
