'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getUsers, createUser, editUser, deleteUser } from '@/app/actions/users'

// 🧩 Tipos base
export type User = {
  id: string
  username: string
  email: string
  role: string
}
interface ActionResponse<T = unknown> {
  message?: string;
  data?:  User;
  errors?: Record<string, string[]>;
}

// 🧩 Posible respuesta del servidor
type ServerResponse = {
  message?: string
  data?: User
  errors?: Record<string, string[]>
}

export default function UserAdminPanel() {
  const [response, setResponse] = useState<ServerResponse | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<string>('')

  // 🔹 Cargar lista de usuarios al iniciar
  useEffect(() => {
    async function fetchUsers() {
      const usersList = await getUsers()
      setUsers(usersList)
    }
    fetchUsers()
  }, [])

  // 🔹 Crear o editar usuario
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const userResponse: ServerResponse = editingUser
      ? await editUser(formData)
      : await createUser(formData)

    setResponse(userResponse)

    if (userResponse.message && userResponse.data) {
      const { data } = userResponse

      if (editingUser) {
        // Actualizar usuario existente
        const updatedUsers = users.map((u) =>
          u.id === data.id ? { ...u, username, email, role } : u
        )
        setUsers(updatedUsers)
      } else {
        // Agregar nuevo usuario
        setUsers((prev) => [data, ...prev])
      }

      setIsModalOpen(false)
      setEditingUser(null)
      setUsername('')
      setEmail('')
      setRole('')
    }
  }

  // 🔹 Abrir modal (modo crear o editar)
  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setUsername(user.username)
      setEmail(user.email)
      setRole(user.role)
    } else {
      setEditingUser(null)
      setUsername('')
      setEmail('')
      setRole('docente')
    }
    setIsModalOpen(true)
  }

  // 🔹 Eliminar usuario
  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este usuario?')) {
      const formData = new FormData()
      formData.append('id', id)

      const resp = await deleteUser(formData)
      console.log(resp)

      setUsers(users.filter((u) => u.id !== id))
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración de Usuarios</h1>

      {/* 🔙 Flecha para volver */}
      <Link
        href="/dashboard"
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-800 transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white" />
      </Link>

      {/* 🔹 Botón agregar */}
      <button
        onClick={() => handleOpenModal()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + Agregar Usuario
      </button>

      {/* 🔹 Tabla de usuarios */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Correo</th>
              <th className="py-3 px-4 text-left">Rol</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
            </h2>

            <form onSubmit={handleSubmit}>
              {editingUser && (
                <input type="hidden" name="id" value={editingUser.id} />
              )}

              <input
                type="text"
                placeholder="Nombre"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {response?.errors?.username && (
                <p className="mt-1 text-sm text-red-600">
                  {response.errors.username}
                </p>
              )}

              <input
                type="email"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {response?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {response.errors.email}
                </p>
              )}

              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="docente">Docente</option>
                <option value="estudiante">Estudiante</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
