// app/foro/[id]/page.tsx  (Next.js 13+ con app router)
import React from "react";

const PropuestaLey = async({
  params,
}
) => {
    const { titulo } = await params

    console.log(titulo)
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 flex justify-center px-4 py-10">
      <article className="max-w-3xl w-full bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        {/* Encabezado */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            Propuesta de Ley: { titulo } 
          </h1>
          <h2 className="text-lg italic text-gray-300 mb-4">
            Título Corto: Ley "Menos Plástico en la Calle"
          </h2>

          <div className="text-sm text-gray-400 space-y-1">
            <p><span className="font-semibold text-gray-300">Autor:</span> Ana López</p>
            <p><span className="font-semibold text-gray-300">Áreas:</span> Derecho Ambiental, Derecho del Consumidor</p>
            <p><span className="font-semibold text-gray-300">Publicado:</span> 05-10-2025</p>
          </div>
        </header>

        {/* Contenido */}
        <section className="space-y-6 leading-relaxed">
          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Artículo 1: Objeto y Propósito</h3>
            <p>
              El propósito de esta ley es reducir la contaminación generada por las bolsas plásticas de un solo uso 
              en comercios minoristas y supermercados, y motivar a la población a utilizar alternativas reutilizables 
              para proteger el medio ambiente.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Artículo 2: Aplicación y Definiciones</h3>
            <p>
              A partir de la entrada en vigor de esta ley, se establece un cargo obligatorio por cada bolsa plástica de un solo uso 
              entregada por cualquier supermercado, tienda de conveniencia o comercio minorista al cliente.
            </p>
            <p className="mt-2">
              Se entenderá por "bolsa plástica de un solo uso" cualquier bolsa con asas, fabricada total o parcialmente de plástico, 
              que no esté diseñada para ser reutilizada (por ejemplo, bolsas de la compra desechables).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Artículo 3: El Cargo Mínimo</h3>
            <p>
              El cargo mínimo obligatorio por bolsa plástica de un solo uso será de $0.10 (diez centavos de dólar) o su equivalente 
              en la moneda local. Este monto deberá ser cobrado por el comercio y aparecer claramente en el recibo de compra.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Artículo 4: Uso de los Fondos Recaudados</h3>
            <p>
              Los fondos netos recaudados por el cargo (después de cubrir los costos mínimos de la bolsa) deberán destinarse 
              a un Fondo Ambiental Local. Este fondo será utilizado para financiar programas de reciclaje, educación ambiental, 
              y la distribución gratuita de bolsas reutilizables en zonas de bajos ingresos.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Artículo 5: Incentivo de Bolsas Reutilizables</h3>
            <p>
              Los comercios deberán ofrecer bolsas reutilizables duraderas para su venta a un precio accesible para los clientes.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default PropuestaLey;
