"use client";
import React,  {useState}   from "react";
import Link from "next/link";


export default function ForoProyectosLey() {
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert ()
    if (!file) return;

    const formData = new FormData();

    formData.append('file', file);
    formData.append('author', author);
    formData.append('title', title);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    console.log(res);
    const data = await res.json();
    
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-6">
      {/* Contenedor principal */}
      <section className="max-w-md w-full border border-gray-700 rounded-2xl p-4">
        {/* Encabezado */}
        <h2 className="text-center text-sm text-gray-300">
          Facultad de Derecho - Universidad de Buenos Aires
        </h2>
        <h1 className="text-center text-lg font-semibold mt-2">
          Foro de proyectos de leyes
        </h1>
        <p className="text-center text-gray-400 text-sm mt-1">
          Un espacio para que los estudiantes suban sus propuestas de leyes
        </p>

        {/* Botón principal */}
        <div className="flex justify-center mt-4">
          <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white text-sm">
            Subir Proyecto
          </button>
        </div>

        {/* Video explicativo (placeholder) */}
        <div className="mt-6 border border-gray-600 rounded-xl h-32 flex items-center justify-center text-gray-400 text-sm text-center">
          Video explicativo para subir una propuesta
        </div>

        {/* Listado de proyectos */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2 text-gray-200">
            LISTADO DE PROYECTOS
          </h3>

          {/* Proyecto 1 */}
          <Link
            href="/foro/fomento-envases"
            className="block border border-blue-500 rounded-lg p-3 text-sm hover:bg-gray-900 transition mb-3"
          >
            <p className="font-semibold text-white">
              Proyecto de Ley de Fomento a la Reutilización de Envases Plásticos
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Área: Derecho Ambiental, Derecho Administrativo, Derecho del
              Consumidor <br />
              Autor: Anónimo <br />
              Publicado: 18-06-2025 - 15:19
            </p>
          </Link>

          {/* Proyecto 2 */}
          <Link
            href="/foro/teletrabajo-administracion"
            className="block border border-blue-500 rounded-lg p-3 text-sm hover:bg-gray-900 transition"
          >
            <p className="font-semibold text-white">
              Proyecto de Ley para la Regulación del Teletrabajo en la Administración
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Área: Derecho Laboral, Derecho Administrativo <br />
              Autor: Juan Quintana <br />
              Publicado: 13-06-2025 - 09:30
            </p>
          </Link>
        </div>
      </section>

      {/* Formulario */}
      <section className="mt-8 max-w-md w-full border border-gray-700 rounded-2xl p-4">
        <h2 className="text-center text-lg font-semibold mb-3">Formulario</h2>

        <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="anónimo / nombre de usuario"
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="Título del proyecto"
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 text-sm"
          />

          <input
            type="file"
            className="text-gray-300 text-sm"

            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 rounded-md px-4 py-2 text-sm mt-2"
          >
            Subir Proyecto
          </button>
        </form>
      </section>
    </main>
  );
}
