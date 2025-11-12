

import {getProyectos } from "../actions/foro";
import { getAreas } from "../actions/areas";
import ForoPageClient from "../ui/ForoPage";
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


// Versión servidor (para mantener compatibilidad con tus actions)
export default async function ForoPage() {
  const proyectos = await getProyectos(null);
  const areas = await getAreas();

  return <ForoPageClient proyectos={proyectos} areas={areas} />;
}
