'use client';

import { login } from '@/app/actions/auth';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [state, action, pending] = useFormState(login, undefined);

  return (
    <form action={action} className="space-y-4">
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
        disabled={pending}
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 transition-colors py-2 rounded-lg font-semibold"
      >
        {pending ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
