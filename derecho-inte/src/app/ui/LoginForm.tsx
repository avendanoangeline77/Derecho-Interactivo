'use client'
import { useUser } from '@/app/context/UserContext'
import { login } from '@/app/actions/auth'
import { useActionState } from 'react'

// --- Tipos auxiliares ---

// Representa los posibles errores que puede devolver el servidor
interface LoginErrors {
  email?: string[]
  password?: string[]
  general?: string[]
}

// Representa los datos del usuario autenticado
interface UserData {
  id: string
  username: string
  email: string
  role: string
}

// Representa la respuesta del servidor tras intentar loguear
interface LoginResponse extends UserData {
  errors?: LoginErrors
}

// Tipo que define el contexto de usuario
interface UserContextType {
  setUser: (user: UserData) => void
}

// --- Componente principal ---

export default function LoginForm() {
  // Tipar el contexto
  const { setUser } = useUser() as UserContextType
const [state, formAction, isPending] = useActionState<
  Awaited<ReturnType<typeof login>> | null,
  FormData
>(
  async (_prevState, formData) => {
    const res = await login(_prevState, formData)

    if (!res.errors && res.id && res.username && res.email && res.role) {
      setUser({
        id: res.id,
        username: res.username,
        email: res.email,
        role: res.role,
      })
      window.location.href = '/dashboard'
    }

    return res
  },
  null
)


  return (
    <div>
      <form action={formAction} className="space-y-4">
        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="correo electrónico"
            className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.errors?.email && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.email.join(', ')}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="contraseña"
            className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.errors?.password && (
            <div className="mt-2 text-sm text-red-600">
              <p>La contraseña debe:</p>
              <ul className="list-disc list-inside">
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 transition-colors py-2 rounded-lg font-semibold"
        >
          {isPending ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
