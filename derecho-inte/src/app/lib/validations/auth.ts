import { z } from 'zod'
 
export const loginFormSchema = z.object({
  
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'debe de tener 8 caracteres como minimo' })
    /*.regex(/[a-zA-Z]/, { message: 'como minimo debe tener mas de una letra.' })
   .regex(/[0-9]/, { message: 'como minimo debe tener mas un numero.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'como minimo un caracter.',
    })*/
    .trim(),
})
export type FormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
        role?: string[]
      }
      message?: string
    }
  | undefined