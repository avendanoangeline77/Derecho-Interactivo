"use server"

import { deleteSession } from '@/app/lib/sessions'
import pb from '../database/db';
import { redirect } from "next/navigation";
import { loginFormSchema, FormState } from '@/app/lib/validations/auth'
import { createSession, decrypt } from '@/app/lib/sessions'
import { cookies } from 'next/headers'

export async function login(state: FormState, formData: FormData) {
  try {
    // 1️⃣ Validar campos
    const validatedFields = loginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email, password } = validatedFields.data

    // 2️⃣ Intentar autenticación en PocketBase
    const authData = await pb.collection('users').authWithPassword(email, password)

    if (!authData?.record) {
      return {
        errors: { general: ['No se pudo autenticar al usuario.'] },
      }
    }
     console.log(authData.record)
    // 3️⃣ Crear sesión (ej. guardada en cookie)
    await createSession({
      id: authData.record.id,
      email: authData.record.email,
      username: authData.record.username,
      role: authData.record.role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    })

    // 4️⃣ Redirigir al dashboard
   
  } catch (error: any) {
    // 🧠 PocketBase lanza un error con un mensaje legible
    console.error('Error al autenticar:', error)

    // Si el error viene de PocketBase
    if (error?.status === 400) {
      return {
        errors: {
          email: ['Email o contraseña incorrectos.'],
          password: ['Email o contraseña incorrectos.'],
        },
      }
    }

    // Otro tipo de error
    return {
      errors: {
        general: ['Ocurrió un error inesperado. Intenta de nuevo.'],
      },
    }
  }

   redirect('/dashboard')
}


export async function logout() {
  await deleteSession()
  redirect('/auth/login')
}