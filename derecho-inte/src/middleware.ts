import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/sessions'
import { cookies } from 'next/headers'

import pb from './app/database/db'
// 1. Specify protected an/d public routes
const protectedRoutes = ['/','/dashboard', '/foro', '/dinamicas', '/comentarios']
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

  if (cookieValue) session = decrypt(cookieValue)


if(isPublicRoute && cookieValue){
   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
 }
 

 if(isProtectedRoute && !cookieValue){
   return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
 }

  if(isAdminRoute && !cookieValue && session?.role !== 'admin'){
   return NextResponse.redirect(new URL('/notallowed', req.nextUrl))
 }


  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.\.[png|ts|img|svg]$).)'],
}