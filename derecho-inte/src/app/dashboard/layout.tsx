"use client"


import  pb  from '@/app/database/db'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
 

   const user = pb.authStore.model // usuario actual
   console.log(user, 'ange')
   
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}