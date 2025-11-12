'use server'

import { any } from "zod"
import pb from "../database/db"
import { proyectoCreateSchema } from "../lib/validations/foroEstudiantes"

 export async function agregarProyecto(state:any,formData: FormData) {
  console.log(formData,'holaaa')

  const validatedFields = proyectoCreateSchema.safeParse({
    
    titulo: formData.get('titulo'),
    autor: formData.get('autor'),
    descripcion: formData.get('descripcion'),
    areas: formData.get('areas'),
    anonimo: formData.get('anonimo')


  })
  const areas = formData.get('areas') ||[]

  const archivo = formData.get('archivo')


  if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }


  const { titulo,autor,descripcion} = validatedFields.data


  try {
    // 2️⃣ Crear proyecto en PocketBase


    const user = await pb.collection('proyecto_de_leyes').create({
      titulo,
      autor,
      descripcion,
      areas: areas.map((area)=>{
         return area.toString()
      }),
      anonimo: any,
      estado: 'pendiente',
      archivo

    })

 
  }
  catch (errors:any) {
    console.log(errors.response)

  }
} 



export async function getProyectos(filtros:any| null) {
  try {
  let queryFilter = [];

// Filtrar por estados (array)
if (filtros?.estados?.length > 0) {
  const estadosFilter = filtros?.estados.map(e => `estado = "${e}"`).join(" || ");
  queryFilter.push(`(${estadosFilter})`);
}

// Filtrar por áreas (array de IDs relacionados)
if (filtros?.areas?.length > 0) {
  const areasFilter = filtros?.areas.map(a => `areas.id ?= "${a}"`).join(" || ");
  queryFilter.push(`(${areasFilter})`);
}

// Filtrar por autor (texto)
if (filtros?.autor) {
  if (filtros.autor === 'anonimo') {
    queryFilter.push('anonimo = true');
  } else {
    queryFilter.push(`autor.nombre ~ "${filtros.autor}"`);
  }
}


// Unir todo con AND
const filterString = queryFilter.join(" && ");
console.log(filterString)
// Consulta final
const result = await pb.collection('proyecto_de_leyes').getList(1, 10, {
  expand: 'autor,areas',
  sort: '-created',
  filter: filterString
});

    return result.items
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}

export async function getProyecto(id:string) {
  try {
const result = await pb.collection('proyecto_de_leyes').getOne(id, {
  expand: 'autor,areas'
})
    console.log(result)
    return result
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}


export async function cambiarEstado(id:string,estado:string) {

  try {
    
    const result = await pb.collection('proyecto_de_leyes').update(id,{estado})
    
    console.log(result)
    return true
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}