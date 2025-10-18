"use client";
import { editUser, getUsers, deleteUser

 } from "@/app/actions/users";
import { createUser } from "@/app/actions/users";
import { userFormSchema } from "@/app/lib/validations/users";
import { useState } from "react";
import { useActionState ,useEffect} from 'react'

type User = {
  username: string
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserAdminPanel() {
// const users = await getUsers()

const [response, setResponse] = useState(null);
  
 //const [state, action, pending] = useActionState(createUser, undefined)
 const [id, setId] = useState<string | null>(null); 
 const [state, setState] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "User" });
  
  const [username, setUsername] = useState<string>("")
  

  const [users, setUsers] = useState<any[]>([])
  
  const [email, setEmail] = useState<string>("")
  const [role, setRole] = useState<string>("")
  useEffect(() => {

    async function fetchUsers() {
      const usersList = await getUsers()
      setUsers(usersList)
    }
    fetchUsers()
  }, [])

 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const user =editingUser ?  await editUser(formData) : await createUser(formData); // llama a la server action manualmente  console.log(user)
  console.log(user)

  setResponse(user)
  if (user.message) {
    if (editingUser){
      const users1 = users.map((user1: any) =>
      user1.id === user.data.id ? { ...user1,username, email, role } : user1
    );
    console.log(users1)


    

    setUsers(users1);
    
    setIsModalOpen(false)
    
    }

    else {
     

      setUsers(prev => [{
      id: user.data.id,
      username: user.data.username,
      email: user.data.email,
      role: user.data.role
    }, ...prev]);
        
    setIsModalOpen(false)

    }
   
  }

}

  const handleOpenModal = (user?: User) => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      setEditingUser(user);
      //setForm({ name: user.name, email: user.email, role: user.role });
    } else {
      setEditingUser(null);
     // setForm({ name: "", email: "", role: "User" });
    }
    setIsModalOpen(true);
  };

 

  
const handleDelete = async(id: number) => {
    if (confirm("¿Eliminar este usuario?")) {

    const formData = new FormData();
    formData.append("id",id.toString())
  
    console.log(formData)
    const response = await deleteUser(formData)
    console.log(response)
      setUsers(users.filter(u => u.id !== id));
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración de Usuarios</h1>

      <button
        onClick={() => handleOpenModal()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + Agregar Usuario
      </button>

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
            {users.map(user => (
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? "Editar Usuario" : "Agregar Usuario"}
            </h2>
            <form onSubmit={handleSubmit}>
              {
                editingUser && (
                   <input type="hidden" value={
                    editingUser.id

                   } 
                   name="id"
                
                   />

                )
              }
              {
                editingUser && (
                <div>
                   <input 
                     type="text"
              placeholder="Nombre"

              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              
              {response?.errors?.username && (

            <p className="mt-1 text-sm text-red-600">{response.errors.username}</p>
          )}
          </div>


                )
              }
           
                 <input
              type="email"
              placeholder="Correo"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {response?.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{response.errors.email}</p>
          )}
            <select 
            name="role"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="docente">Docente</option>
              <option value="estudiante">Estudiante</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
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
  );
}
