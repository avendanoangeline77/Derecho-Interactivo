'use client';

import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// ✅ Tipado del usuario
export type User = {
  id: string;
  email: string;
  username: string;
  role: string;
  verified?: boolean;
};

// ✅ Tipado del contexto (puede ser null inicialmente)
type UserContextType = {
  currentUser: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  proyectos: any[];
  setProyectos: Dispatch<SetStateAction<any[] | null>>;
};

// ✅ Crear el contexto con tipo seguro
const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ Provider
export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User | null;
}) {
  const [currentUser, setUser] = useState<User | null>(user || null);
   const [proyectos, setProyectos] = useState <any[]>([]);

  return (
    <UserContext.Provider value={{ currentUser, setUser,proyectos, setProyectos }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ Hook personalizado (con control de seguridad)
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
}
