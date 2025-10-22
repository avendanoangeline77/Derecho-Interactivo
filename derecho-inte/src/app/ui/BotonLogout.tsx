'use client';

import { login } from '@/app/actions/auth';

import { logout } from '@/app/actions/auth';
import { useActionState } from 'react';

export default function BotonLogot() {
  return (
   <div>
   
           {/* Logout button */}
           <button onClick={()=>logout()} className="w-full bg-red-700 hover:bg-red-800 transition-colors py-2 rounded-lg font-semibold">
             Cerrar sesión
           </button>
         </div>
  );
}
