
import { decrypt } from '@/app/lib/sessions'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard','/foro','/dinamicas','/comentarios']
const publicRoutes = ['/auth','login', 'signup', ]
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

  if(cookie){
    session = decrypt(cookieValue)
  }




  if(isPublicRoute && cookieValue){
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  if(isProtectedRoute && !cookieValue){
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }


  if(isAdminRoute && !cookieValue && session?.role !== 'admin'){
    return NextResponse.redirect(new URL('/notallowed', req.nextUrl))
  }


  // 3. Decrypt the session from the cookie
 
/*   // 4. Redirect to /login if the user is not authenticated
   if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    session?.id 
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  } 
  */
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.\.png$).*)'],
}