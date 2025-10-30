
import UploadProyectoModal from "@/app/ui/MarkdownModal";
import ListaProyectos from "../ui/ListaProyectos";
import { getProyectos } from "../actions/foro";
import { getAreas } from "../actions/areas";

import Link from "next/link"

import { ArrowLeft } from "lucide-react";

export default async function ForoPage() {

  const proyectos = await getProyectos()


  const areas = await getAreas()

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
       
       {/* Flechita para volver atras */}
      <Link
        href="/dashboard"
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-800 transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white" />
      </Link>

       
      {/* Botón para abrir modal */}
      <UploadProyectoModal initAreas={areas}/>

      {/* Lista de proyectos */}
      <section className="mt-8 w-full max-w-md">
        <h2 className="text-sm text-gray-400 mb-2">LISTADO DE PROYECTOS</h2>
       <ListaProyectos proyectos={proyectos}></ListaProyectos>
      </section>
    </main>
  );
}
