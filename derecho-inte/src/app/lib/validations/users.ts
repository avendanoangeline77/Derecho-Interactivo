import { z } from 'zod'

export const userFormSchema = z.object({
  
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  role:  z.enum(["docente", "estudiante"])
})

export const userEditFormSchema = z.object({
  
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  role:  z.enum(["docente", "estudiante"]),

  
   username: z
    .string()
    /*.regex(/[a-zA-Z]/, { message: 'como minimo debe tener mas de una letra.' })
   .regex(/[0-9]/, { message: 'como minimo debe tener mas un numero.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'como minimo un caracter.',
    })*/
    .trim(),
})