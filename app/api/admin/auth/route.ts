import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { password?: string }
    const { password } = body

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const cookieSecret = process.env.ADMIN_COOKIE_SECRET
    if (!cookieSecret) {
      console.error('ADMIN_COOKIE_SECRET env var not set')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const res = NextResponse.json({ success: true })
    res.cookies.set('cae_admin', cookieSecret, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/admin',
      maxAge: 86400, // 24 hours
    })

    return res
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
