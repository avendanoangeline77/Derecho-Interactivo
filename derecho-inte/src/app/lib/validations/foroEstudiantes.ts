import { z } from 'zod'


export const proyectoCreateSchema= z.object({
  titulo: z
    .string()
    .min(1, "El título es obligatorio.")
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(100, "El título no puede superar los 100 caracteres.")
    ,

  descripcion: z
    .string()
    .min(1, "La descripción es obligatoria.")
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(500, "La descripción no puede superar los 500 caracteres.")
    .regex(
      /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,:;!?()'"-]+$/,
      "La descripción contiene caracteres no permitidos."
    ),

  /* areas: z
    .array(
      z.string().min(1, "El ID del área no puede estar vacío.")
    )
    .min(1, "Debe haber al menos un área seleccionada.")
    .max(10, "No puede haber más de 10 áreas."),
 */


  autor: z
    .string()
    .min(1, "El autor es obligatorio.")
    .min(3, "El nombre del autor debe tener al menos 3 caracteres.")
    .max(80, "El nombre del autor no puede superar los 80 caracteres.")
    
});



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