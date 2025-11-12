'use client'
import { useEffect } from 'react'
import { useUser } from '@/app/context/UserContext'
import { set } from 'zod';

export default function GetUser({user}:{user:any}) {

const { currentUser,setUser } = useUser();
  
useEffect(() => {
  setUser(user);
}, [user])

  return (
    <div >
      
    
    </div>
  )
}