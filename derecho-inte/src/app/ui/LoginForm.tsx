
'use client'

import { useUser } from '@/app/context/UserContext'
import { login } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function LoginForm() {
  const { setUser } = useUser() as any

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await login(prevState, formData)
console.log(res)
      if (!res.errors) {
        setUser({
          username: res.username,
          email: res.email,
          id: res.id,
          role: res.role
        })
        // opcional: redirigir
        window.location.href = '/dashboard'
      }

      return res
    },
    null
  )

  return (
    <div >
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
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
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
              {state.errors.password.map((error: string) => (
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
