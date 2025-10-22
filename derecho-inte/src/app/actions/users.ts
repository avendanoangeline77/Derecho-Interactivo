"use server"
import pb from '@/app/database/db';
import { cookies } from "next/headers";
import { decrypt } from "../lib/sessions";
import { userFormSchema, userEditFormSchema } from "../lib/validations/users";
import { FormState } from "../lib/validations/auth";
import { sendEmail } from "../lib/mailer";

import { bienvenida } from "../lib/bienvenida";
import { errors } from "jose";

export async function deleteUser(formData: FormData) {
  try {
    const userId = formData.get('id')
   
   
    await pb.collection('users').delete(userId);
    return {
      message: "success"
    }
  } catch (error) {
    console.log(errors)
  }

}


export async function editUser(formData: FormData) {
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


  const { email, role, username } = validatedFields.data


  try {

  await pb.admins.authWithPassword(process.env.POCKETBASE_USERNAME, process.env.POCKETBASE_PASSWORD)
  
    // 2️⃣ Crear usuario en PocketBase
    const user = await pb.collection('users').update(userId, {
      username,
      email,
      role,
    });
    
    pb.authStore.clear()

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
  catch (errors) {
    console.log(errors.response)

    if (errors.response.data.username) {
      const message = errors.response.data.username.message
      console.log(errors.response)
      return {
        errors: { username: ['El usuario ya existe'] },
      }


    }
    return {
      errors: { dataBase: ['No se pudo editar al usuario.'] },
    }

  }
}


export async function getUser() {
 
  const session = (await cookies()).get('session')?.value
  

    const payload = await decrypt(session )

    
    console.log(payload,"holaaaa")
    if(!payload?.id) return null
    //const user = await pb.collection('users').getOne(payload?.id, { cache: 'no-store' });
 //console.log(user)
    return payload

}

export async function getVerifyUser() {
 
  const cookie = await cookies()
  const session = cookie.get('session')?.value


    const payload = await decrypt(session )

    if(!payload?.id) return null


      const user = await pb.collection('users').getOne(payload?.id, { cache: 'no-store',  $cancelKey: null, // ✅ disables auto-cancellation
  });


    return user

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
      const randomIndex = Math.floor(Math.random() * chars.length)
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


  const { email, role } = validatedFields.data


  const password = generarPassword()
  const username = role + password.slice(0, 5)

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
    await pb.collection('users').requestVerification(email)

    const html = ``
    await sendEmail(email, bienvenida(username, password))
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
  catch (errors) {
    console.log(errors.response)
    if(errors.response.data.email){

      return  {
      errors: { email: ['Este email ya existe.'] },
    }
    }
    console.log(errors)
    return {
      errors: { general: ['No se pudo crear al usuario.'] },
    }
  }
}
