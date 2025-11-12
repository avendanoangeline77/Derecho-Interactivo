"use client";
import { useState, useMemo, useEffect } from "react";
import UploadProyectoModal from "@/app/ui/MarkdownModal";
import ListaProyectos from "../ui/ListaProyectos";
import { getProyectos } from "../actions/foro";
import Link from "next/link";
import { ArrowLeft, Filter, X } from "lucide-react";

import FiltroAreas from "./SelectAreasMultiples";
import { RecordModel } from "pocketbase";
import { useUser } from "../context/UserContext";

// Tipos básicos
interface Proyecto {
  id: string;
  titulo: string;
  estado: "pendiente" | "valido" | "invalido";
  areas: string[];
}

interface Area {
  id: string;
  nombre: string;
}

interface Props {
  proyectos: Proyecto[];
  areas: Area[];
}




export default function ForoPageClient({ proyectos , areas }: Props) {
const [filtros, setFiltros] = useState({
  estados: [] as string[],
  areas: [] as string[],
  autor: "", // nuevo campo
});


  const [mostrarModal, setMostrarModal] = useState(false);
  const UserContext = useUser()
  
  useEffect(() => {
   const fetchProyectos = async () => {
    UserContext.setProyectos(await getProyectos(filtros))
   }
  fetchProyectos()
    return () => {
      
    }
  }, [filtros])
  

  // Filtrado dinámico
/*  const proyectosFiltrados = useMemo(() => {
  return proyectos.filter((p) => {
    const cumpleEstado =
      filtros.estados.length === 0 || filtros.estados.includes(p.estado);
    const cumpleArea =
      filtros.areas.length === 0 ||
      p.areas.some((a) => filtros.areas.includes(a));
    const cumpleAutor =
      !filtros.autor ||
      p.autor?.toLowerCase().includes(filtros.autor.toLowerCase());
    return cumpleEstado && cumpleArea && cumpleAutor;
  });
}, [filtros, proyectos]); */


const filtrarProyectos = async() =>{
    try {
        console.log(filtros)
        const res = await getProyectos(filtros)
        if(!res) return
        UserContext.setProyectos(res)
    } catch (error) {
        
    }
}

  // Manejo de filtros
  const toggleEstado = (estado: string) => {
    setFiltros((prev) => ({
      ...prev,
      estados: prev.estados.includes(estado)
        ? prev.estados.filter((e) => e !== estado)
        : [...prev.estados, estado],
    }));
  };

  const toggleArea = (areaId: string) => {
    setFiltros((prev) => ({
      ...prev,
      areas: prev.areas.includes(areaId)
        ? prev.areas.filter((a) => a !== areaId)
        : [...prev.areas, areaId],
    }));
  };

  const removeFiltro = async(tipo: "estado" | "area", valor: string) => {
     
    setFiltros((prev) => ({
      ...prev,
      [tipo === "estado" ? "estados" : "areas"]: prev[
        tipo === "estado" ? "estados" : "areas"
      ].filter((v) => v !== valor),
    }));
      
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center relative">
      {/* Encabezado */}
      <div className="bg-gray-700 hover:bg-gray-600 transition-all p-3 rounded-xl w-full max-w-md">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Foro de proyectos de leyes</h1>
          <p className="text-gray-400 text-sm">
            Un espacio para que los estudiantes suban sus propuestas
          </p>
        </header>

        {/* Flecha para volver atrás */}
        <Link
          href="/dashboard"
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white" />
        </Link>

        {/* Botones */}
        <div className="flex justify-center gap-3 mb-4">
          <UploadProyectoModal initAreas={areas} />
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Tags de filtros activos */}
        {(filtros.estados.length > 0 || filtros.areas.length > 0 || filtros.autor.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {filtros.estados.map((e) => (
              <span
                key={e}
                className="bg-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                Estado: {e}
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => removeFiltro("estado", e)}
                />
              </span>
            ))}
            {filtros.areas.map((aId) => {
              const area = areas.find((a) => a.id === aId);
              return (
                <span
                  key={aId}
                  className="bg-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  Área: {area?.nombre}
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => removeFiltro("area", aId)}
                  />
                </span>
              );
            })}
          {filtros.autor && (
  <span className="bg-purple-700 px-2 py-1 rounded-full text-sm flex items-center gap-1">
    Autor: {filtros.autor}
    <X
      className="w-4 h-4 cursor-pointer"
      onClick={() => setFiltros((prev) => ({ ...prev, autor: "" }))}
    />
  </span>
)}
         </div>
        )}
      
       

        {/* Lista de proyectos */}
        <section className="mt-4 w-full">
          <h2 className="text-center text-gray-400 mb-2">
            LISTADO DE PROYECTOS 
          </h2>
          <ListaProyectos proyectos={proyectos} />
        </section>
      </div>

      {/* Modal de filtros */}
     {/* Modal de filtros */}
{mostrarModal && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-gray-800 rounded-xl p-6 w-80 relative">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
        onClick={() => setMostrarModal(false)}
      >
        <X className="w-5 h-5" />
      </button>

      <h3 className="text-lg font-semibold mb-4">Filtrar proyectos</h3>
      
      {UserContext.currentUser?.role === "docente" && (
      <div className="mb-4">
        <h4 className="text-gray-300 font-medium mb-2">Estado</h4>
        {["pendiente", "validado", "invalido"].map((estado) => (
          <label key={estado} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filtros.estados.includes(estado)}
              onChange={() => toggleEstado(estado)}
            />
            {estado}
          </label>
        ))}
      </div>
)}

      {/* FILTRO ÁREAS */}
      <div className="mb-4">
        <h4 className="text-gray-300 font-medium mb-2">Áreas</h4>
        <div className="max-h-32 overflow-y-auto">
          <FiltroAreas
            areas={areas}
            selectedAreas={filtros.areas}
            onChange={(values) =>
              setFiltros((prev) => ({ ...prev, areas: values }))
            }
          />
        </div>
      </div>

      {/* FILTRO AUTOR */}
      <div className="mb-4">
        <h4 className="text-gray-300 font-medium mb-2">Autor</h4>
        <input
          type="text"
          placeholder="Buscar por autor..."
          value={filtros.autor || ""}
          onChange={(e) =>
            setFiltros((prev) => ({ ...prev, autor: e.target.value }))
          }
          className="w-full px-2 py-1 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <button
        onClick={async() => { 
            await filtrarProyectos ()
            setMostrarModal(false)
        }}
        className="bg-blue-700 hover:bg-blue-600 w-full py-2 rounded-lg"
      >
        Aplicar filtros
      </button>
    </div>
  </div>
)}
    </main>
  );
}
