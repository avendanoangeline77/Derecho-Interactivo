'use server'

import pb from "../database/db"
import { proyectoCreateSchema } from "../lib/validations/foroEstudiantes"

 export async function agregarProyecto(state,formData: FormData) {
  console.log(formData)

  const validatedFields = proyectoCreateSchema.safeParse({
    
    titulo: formData.get('titulo'),
    autor: formData.get('autor'),
    descripcion: formData.get('descripcion'),
    areas: formData.get('areas'),
    anonimo: formData.get('anonimo')


  })


  const archivo = formData.get('archivo')

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }


  const { titulo,autor,descripcion,areas,anonimo} = validatedFields.data


  try {
    // 2️⃣ Crear proyecto en PocketBase


    const user = await pb.collection('proyecto_de_leyes').create({
      titulo,
      autor,
      descripcion,
      areas:['to28s4y2watez1c'],
      anonimo,
      estado: 'validado',
      archivo

    })

 
  }
  catch (errors) {
    console.log(errors.response)

  }
} 


 
export async function getProyectos() {
  try {
    const result = await pb.collection('proyecto_de_leyes').getList(1, 50, {
      sort: '-created',
      fields: 'id,autor,titulo,descripcion,anonimo,estado',
    })
    return result.items
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}