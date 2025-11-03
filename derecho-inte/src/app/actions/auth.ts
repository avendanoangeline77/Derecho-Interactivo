"use server";

import { deleteSession } from "@/app/lib/sessions";
import pb from "@/app/database/db";
import { redirect } from "next/navigation";
import { loginFormSchema, FormState } from "@/app/lib/validations/auth";
import { createSession, decrypt } from "@/app/lib/sessions";
import { cookies } from "next/headers";

export async function login(state: FormState, formData: FormData) {
  try {
    // 1️⃣ Validar campos
    const validatedFields = loginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;

    // 2️⃣ Intentar autenticación en PocketBase
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    console.log(authData);
    if (!authData?.record) {
      return {
        errors: { general: ["No se pudo autenticar al usuario."] },
      };
    }

    // 3️⃣ Crear sesión (ej. guardada en cookie)
    const user = {
      id: authData.record.id,
      email: authData.record.email,
      username: authData.record.username,
      role: authData.record.role,
      verified: authData.record.verified,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    };
    // 3️⃣ Crear sesión (ej. guardada en cookie)
    await createSession(user);

    return user;

    // 4️⃣ Redirigir al dashboard
  } catch (error) {
    // 🧠 PocketBase lanza un error con un mensaje legible
    console.error("Error al autenticar:", error);
    console.error("Error al autenticar:", error.response);

    // Si el error viene de PocketBase
    if (error?.status === 400) {
      return {
        errors: {
          email: ["Email o contraseña incorrectos."],
          password: ["Email o contraseña incorrectos."],
        },
      };
    }

    // Otro tipo de error
    return {
      errors: {
        general: ["Ocurrió un error inesperado. Intenta de nuevo."],
      },
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}

export async function sendVerification(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    console.log(email);
    const verification = await pb
      .collection("users")
      .requestVerification(email);
    console.log(verification);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
