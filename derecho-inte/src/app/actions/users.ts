"use server"
import pb from "../database/db";
import { cookies } from "next/headers";
import { decrypt } from "../lib/sessions";
import { userFormSchema, userEditFormSchema} from "../lib/validations/users";
import { FormState } from "../lib/validations/auth";
import { sendEmail } from "../lib/mailer";

import { bienvenida } from "../lib/bienvenida";
import { errors } from "jose";

export async function deleteUser(formData: FormData) {
 try {
  const userId = formData.get('id')
  console.log(userId)
  console.log(formData)
  await pb.collection('users').delete(userId);
return{
  message: "success"
}
 } catch (error) {
  console.log(errors)
 }
   
}


export async function editUser(formData: FormData) {
 console.log("hola") 
 const userId = formData.get('id')
 const validatedFields = userEditFormSchema.safeParse({
      role: formData.get('role'),
      email: formData.get('email'),
      username: formData.get('username'),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
    console.log(validatedFields)


const {  email,role,username } = validatedFields.data
 

    try {
 // 2️⃣ Crear usuario en PocketBase
  console.log(userId)
  const user = await pb.collection('users').update(userId, {
  username,
  email,
  role
});
 console.log(user)
    return {
        message: "success",
        data: {
          id: user.id,
           username,
           email,
           role
        }
    }

    }
    catch(errors){
        console.log(errors)
        return {
            errors: { general: ['No se pudo crear al usuario.'] },
        }
    }
}


export async function getUser() {
 
    const session  = cookies().get('session')?.value || ''

    const payload = await decrypt( session )

    if(!payload?.id) return null

    return payload
    
}

  export async function getUsers() {
  try {
    const result = await pb.collection('users').getList(1, 50, {
      sort: '-created',
      fields: 'id,username,email,created,role',
    })
    return result.items
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios')
  }
}

export async function createUser(formData: FormData) {

function generarPassword(longitud = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&"
  let password = ""
  for (let i = 0; i < longitud; i++) {
    const randomIndex = Math.floor(Math.random()* chars.length)
    password += chars[randomIndex]
  }
  return password
}
 const validatedFields = userFormSchema.safeParse({
      role: formData.get('role'),
      email: formData.get('email'),
      
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    console.log("abuela")

const {  email,role } = validatedFields.data

    console.log('➡️ Registrando usuario:', email)
    
    const password = generarPassword()
    const username = role+password.slice(0,5)

    try {
 // 2️⃣ Crear usuario en PocketBase
 

    const user = await pb.collection('users').create({
      username,
      email,
      emailVisibility: true,
      password,
      passwordConfirm: password,
      role
        })
    const html = ``
    await sendEmail("uba.avendanoangelina@gmail.com", bienvenida(username, password))
    return {
        message: "success",
        data: {
          id: user.id,
           username,
           email,
           role
        }
    }

    }
    catch(errors){
        console.log(errors)
        return {
            errors: { general: ['No se pudo crear al usuario.'] },
        }
    }
}
