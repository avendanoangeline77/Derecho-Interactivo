"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

interface Props {
  setProyectos: React.Dispatch<
    React.SetStateAction<{ autor: string; titulo: string; fecha: string }[]>
  >;
}

export default function UploadProyectoModal({ setProyectos }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [autor, setAutor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [markdown, setMarkdown] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setMarkdown(text);
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return alert("Debes ingresar un título");

    const fecha = new Date().toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setProyectos((prev) => [
      ...prev,
      {
        autor: autor || "Anónimo",
        titulo,
        fecha,
      },
    ]);

    // limpiar campos
    setAutor("");
    setTitulo("");
    setMarkdown("");
    setShowModal(false);
  };

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

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-1">Autor</label>
                <input
                  type="text"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="anónimo / nombre de usuario"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Título de proyecto</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Ley de Fomento a la Reutilización"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Subir archivo / extraerlo
                </label>
                <input
                  type="file"
                  accept=".md"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 p-2 mb-2"
                />
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="Escribe o edita el contenido Markdown..."
                  className="w-full h-32 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              >
                Subir Proyecto
              </button>
            </form>

            {/* Vista previa */}
            {markdown && (
              <div className="mt-5 border-t border-gray-700 pt-3">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">
                  Vista previa:
                </h3>
                <div className="bg-gray-900 p-3 rounded-lg h-40 overflow-y-auto border border-gray-700 text-sm">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
