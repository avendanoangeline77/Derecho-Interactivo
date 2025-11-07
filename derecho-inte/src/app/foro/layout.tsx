'use server'

import  pb  from '@/app/database/db'
import GetUser from '../ui/GetUser'
import { getUser } from '../actions/users'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const user = await getUser()


   //const user = pb.authStore.model // usuario actual
   //console.log(user, 'hhhola')
   
  return (
    <div className=" flex flex-col ">
    <GetUser user={user} />
     
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}