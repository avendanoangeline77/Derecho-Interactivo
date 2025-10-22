'use client';
import { useUser } from '../context/UserContext';

export default function WelcomeUser() {
  const {currentUser} = useUser()

  return (
    <div>
  {/* Nombre de usuario y rol a la izquierda */}
  <p className="text-sm text-left mt-1 mb-2">Bienvenido {currentUser?.username} {currentUser?.role}</p>
  
  {/* Título centrado */}
  <h2 className="text-lg font-semibold text-center mb-6">Derecho Interactivo</h2>
</div>
  );
}
