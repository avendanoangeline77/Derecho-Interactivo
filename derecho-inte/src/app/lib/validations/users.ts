import { z } from 'zod'

export const userFormSchema = z.object({
  
  email: z.string().email({ message: 'Formato de email invalido.' }).trim(),
  role:  z.enum(["docente", "estudiante"])
})

export const userEditFormSchema = z.object({
  
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(30, "El nombre de usuario debe tener máximo 30 caracteres"),
  email: z
    .string()
    .email("El correo electrónico no es válido"),
  role: z.enum(["docente", "estudiante"], "Debes seleccionar un rol válido"),
})