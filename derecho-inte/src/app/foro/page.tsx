"use client";

import React, { useState } from "react";
import UploadProyectoModal from "@/app/ui/MarkdownModal";

export default function ForoPage() {
  const [proyectos, setProyectos] = useState<
    { autor: string; titulo: string; fecha: string }[]
  >([]);

  return (
    <main className="min-h-screen bg-black text-gray-100 p-6 flex flex-col items-center">
      {/* Encabezado */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold">
          Foro de proyectos de leyes
        </h1>
        <p className="text-gray-400 text-sm">
          Un espacio para que los estudiantes suban sus propuestas
        </p>
      </header>

      {/* Botón para abrir modal */}
      <UploadProyectoModal setProyectos={setProyectos} />

      {/* Lista de proyectos */}
      <section className="mt-8 w-full max-w-md">
        <h2 className="text-sm text-gray-400 mb-2">LISTADO DE PROYECTOS</h2>
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
      </section>
    </main>
  );
}
