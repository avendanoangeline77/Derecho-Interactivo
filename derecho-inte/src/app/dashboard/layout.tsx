"use client"

import { getUser } from '../actions/users'
import  pb  from '@/app/database/db'

import EmailVerificationPopup from '../ui/EmailVerification'

const user = await getUser()


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  

   //const user = pb.authStore.model // usuario actual
   //console.log(user, 'hhhola')
   
  return (
    <div className="min-h-screen flex flex-col">
      <EmailVerificationPopup user ={user}> </EmailVerificationPopup>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}