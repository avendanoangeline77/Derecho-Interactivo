'use client'
import { useEffect } from 'react'
import { useUser } from '@/app/context/UserContext'
import { set } from 'zod';

export default function GetUser({user}) {

const { currentUser,setUser } = useUser();
  
useEffect(() => {
  console.log(user,"Alert User")
  setUser(user);
}, [user])

console.log(user,"Alert User")
  return (
    <div >
      
    
    </div>
  )
}