import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/sessions'
import { cookies } from 'next/headers'
import pb from './app/database/db'

// 1. Specify protected an/d public routes
const protectedRoutes = ['/', '/dashboard', '/foro', '/dinamicas', '/comentarios']
const publicRoutes = ['/auth', 'login', 'signup',]
const adminRoutes = ['/admin']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.some(route => path.includes(route))
  const isAdminRoute = adminRoutes.includes(path)
  const cookie = await cookies()
  const cookieValue = cookie.get('session')?.value
  let session;

  if (cookieValue) session = await decrypt(cookieValue)


  console.log(session)
  console.log('Path:', path)
  console.log('Is Protected Route:', isProtectedRoute)
  console.log('Is Public Route:', isPublicRoute)
  console.log('Is Admin Route:', isAdminRoute)

  /* if(session){
  console.log('Session ID:', session.id)
  try {
          const user = await pb.collection('users').getOne(session.id)

          if (user.verified === false) {

            await pb.collection('users').requestVerification(session.email)

          }



  } catch (error) {
    console.log('Error al obtener el usuario:', error)
  }
} */

  if (isPublicRoute && cookieValue) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  console.log()
  if (isProtectedRoute && !cookieValue) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }



  if (isAdminRoute && !cookieValue && session?.role !== 'admin') {
    return NextResponse.redirect(new URL('/notallowed', req.nextUrl))
  }
  
    //  Solo estudiantes pueden acceder a /foro
  if (path === '/foro' && session?.role !== 'estudiante') {
    return NextResponse.redirect(new URL('/notallowed', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.[png|ts|img|svg]$).*)'],
}