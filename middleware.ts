import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl

    // Allow the login page and its API through without auth
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
      return NextResponse.next()
    }

    const cookieSecret = process.env.ADMIN_COOKIE_SECRET
    const cookie = req.cookies.get('cae_admin')

    if (!cookie || !cookieSecret || cookie.value !== cookieSecret) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
