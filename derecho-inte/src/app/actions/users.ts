"use server";

import pb from "@/app/database/db";
import { cookies } from "next/headers";
import { decrypt } from "../lib/sessions";
import { userFormSchema, userEditFormSchema } from "../lib/validations/users";
import { sendEmail } from "../lib/mailer";
import { bienvenida } from "../lib/bienvenida";
import { JWTPayload } from "jose";
import type { RecordModel } from "pocketbase"; // Tipo base de registros
import type { z } from "zod";

export interface SessionPayload extends JWTPayload  {
  id: string;
  email: string;
  username: string;
  role: string;
  verified?: boolean;
  expiresAt?: string | Date;

  expiredAt?:Date;

 }

// Tipos derivados de los esquemas de validación
type UserCreateInput = z.infer<typeof userFormSchema>;
type UserEditInput = z.infer<typeof userEditFormSchema>;

// Tipos de respuesta estandarizados
interface ActionResponse<T = unknown> {
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Modelo de usuario básico
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  created?: string;
}


/* ──────────────────────────────
   🧹 DELETE USER
────────────────────────────── */
export async function deleteUser(formData: FormData): Promise<ActionResponse> {
  try {
    const userId = formData.get("id") as string;
    if (!userId) {
      return { errors: { id: ["ID de usuario no proporcionado."] } };
    }

    await pb.collection("users").delete(userId);
    return { message: "success" };
  } catch (error) {
    console.error(error);
    return { errors: { general: ["Error al eliminar el usuario."] } };
  }
}

/* ──────────────────────────────
   ✏️ EDIT USER
────────────────────────────── */
export async function editUser(formData: FormData): Promise<ActionResponse<User>> {
  const userId = formData.get("id") as string;

  const validated = userEditFormSchema.safeParse({
    role: formData.get("role"),
    email: formData.get("email"),
    username: formData.get("username"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, role, username } = validated.data;

  try {
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_USERNAME!,
      process.env.POCKETBASE_PASSWORD!
    );

    const user = await pb.collection("users").update<User & RecordModel>(userId, {
      username,
      email,
      role,
    });

    pb.authStore.clear();

    return {
      message: "success",
      data: {
        id: user.id,
        username,
        email,
        role,
      },
    };
  } catch (err: any) {
    console.error(err?.response || err);
    if (err?.response?.data?.username) {
      return { errors: { username: ["El usuario ya existe."] } };
    }
    return { errors: { general: ["No se pudo editar al usuario."] } };
  }
}

/* ──────────────────────────────
   🔍 GET USER (por cookie)
────────────────────────────── */
export async function getUser(): Promise<SessionPayload | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  const payload = await decrypt(session) as SessionPayload
  if (!payload?.id) return null;

  return payload;
}

/* ──────────────────────────────
   🔎 GET VERIFY USER (fetch completo)
────────────────────────────── */
export async function getVerifyUser(): Promise<User | null> {
  const cookie = await cookies();
  const session = cookie.get("session")?.value;
  if (!session) return null;

  const payload = await decrypt(session) as SessionPayload
  if (!payload?.id) return null;

  const user = await pb
    .collection("users")
    .getOne<User & RecordModel>(payload.id, { cache: "no-store" });

  return user;
}

/* ──────────────────────────────
   📜 GET USERS
────────────────────────────── */
export async function getUsers(): Promise<User[]> {
  try {
    const result = await pb.collection("users").getList<User & RecordModel>(1, 50, {
      sort: "-created",
      fields: "id,username,email,created,role",
    });

    return result.items;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw new Error("No se pudieron obtener los usuarios");
  }
}

/* ──────────────────────────────
   ➕ CREATE USER
────────────────────────────── */
export async function createUser(formData: FormData): Promise<ActionResponse<User>> {
  const generarPassword = (longitud = 8): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&";
    return Array.from({ length: longitud }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const validated = userFormSchema.safeParse({
    role: formData.get("role"),
    email: formData.get("email"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, role } = validated.data;
  const password = generarPassword();
  const username = role + password.slice(0, 5);

  try {
    const user = await pb.collection("users").create<User & RecordModel>({
      username,
      email,
      emailVisibility: true,
      password,
      passwordConfirm: password,
      role,
    });

    await pb.collection("users").requestVerification(email);
    await sendEmail(email, bienvenida(username, password));

    return {
      message: "success",
      data: {
        id: user.id,
        username,
        email,
        role,
      },
    };
  } catch (err: any) {
    console.error(err?.response || err);
    if (err?.response?.data?.email) {
      return { errors: { email: ["Este email ya existe."] } };
    }
    return { errors: { general: ["No se pudo crear al usuario."] } };
  }
}
