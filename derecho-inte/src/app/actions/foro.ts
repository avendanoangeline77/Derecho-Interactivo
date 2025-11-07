'use server'

import pb from "../database/db"
import { proyectoCreateSchema } from "../lib/validations/foroEstudiantes"

 export async function agregarProyecto(state,formData: FormData) {
  console.log(formData,'holaaa')

  const validatedFields = proyectoCreateSchema.safeParse({
    
    titulo: formData.get('titulo'),
    autor: formData.get('autor'),
    descripcion: formData.get('descripcion'),
    areas: formData.get('areas'),
    anonimo: formData.get('anonimo')


  })


  const archivo = formData.get('archivo')

  if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)

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
    const result = await pb.collection('proyecto_de_leyes').getList(1, 10, {
      expand: 'autor,areas',
      sort: '-created'  
      
    })
   console.log(result)
    return result.items
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}

export async function getProyecto(id) {
  try {
    const result = await pb.collection('proyecto_de_leyes').getOne(id)

    console.log(result)
    return result
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}


export async function cambiarEstado(id,estado) {

  try {
    
    const result = await pb.collection('proyecto_de_leyes').update(id,{estado})
    
    console.log(result)
    return true
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}