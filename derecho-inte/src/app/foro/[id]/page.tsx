'use server'
import React from "react";
import { getProyecto } from "@/app/actions/foro";
import pb from "@/app/database/db";
import ProyectoDetalle from "@/app/ui/ProyectoDetalle";


const PropuestaLey = async({
  params,

}

) => {
    const {id } = await params

    const proyecto = await getProyecto(id)
    
    console.log(id)
    console.log(proyecto)
    const isAnonimo = proyecto.expand.autor.anonimo
    const autor = proyecto.expand.autor.username
    const areas = proyecto.expand.areas.map((area)=>{
      return area.nombre
    }).join(", ")

    function formDate(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
  const baseUrl = pb.baseUrl; // "https://tu-servidor.pockethost.io/"
  const archivoUrl = `${baseUrl}/api/files/${proyecto.collectionId}/${proyecto.id}/${proyecto.archivo}`;
  return (
  
    <main className="bg-gray-900 text-gray-100 flex justify-center px-4 py-10">
      <article className="max-w-3xl w-full bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        {/* Encabezado */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            Propuesta de Ley: {proyecto.titulo} 
          </h1>
          <h2 className="text-lg italic text-gray-300 mb-4">
            Título Corto: Ley "Menos Plástico en la Calle"
          </h2>
          

          <div className="text-sm text-gray-400 space-y-1">
            <p><span className="font-semibold text-gray-300">Autor:</span>{isAnonimo?"anonimo": autor}</p>
            <p><span className="font-semibold text-gray-300">Áreas:</span> {areas}</p>
            <p><span className="font-semibold text-gray-300">Publicado:</span>{formDate(proyecto.created)} </p>
          </div>
        </header>
          
        {/* Contenido */}
        <section className="space-y-6 leading-relaxed">
        <ProyectoDetalle archivo={archivoUrl}></ProyectoDetalle>
        
        </section>
      </article>
    </main>
  );
};

export default PropuestaLey;
