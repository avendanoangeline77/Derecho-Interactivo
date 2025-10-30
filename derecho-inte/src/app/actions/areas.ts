import pb from "../database/db"



export async function getAreas() {
  try {
    const result = await pb.collection('areas').getList(1, 50, {
      sort: '-created',
      fields: 'id,nombre',
    })
    return result.items
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}