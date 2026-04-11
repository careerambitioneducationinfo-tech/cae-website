import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validations'
import { supabaseAdmin } from '@/lib/supabase'
import { transporter } from '@/lib/mailer'
import { SITE } from '@/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten((i) => i.message) },
        { status: 400 }
      )
    }

    const data = parsed.data

    // 1. Save to Supabase — use admin client (bypasses RLS, faster insert)
    const { error: dbError } = await supabaseAdmin.from('leads').insert({
      name: data.name,
      phone: data.phone,
      course: data.course,
      status: data.status,
      city: data.city,
      email: data.email ?? null,
      source_page: data.source_page ?? null,
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // 2. Fire email in background — do NOT await, never block the response
    const emailBody = `
New Lead — Career Ambition Education
=====================================
Name:         ${data.name}
Phone:        ${data.phone}
Course:       ${data.course}
Status:       ${data.status}
City:         ${data.city}
Email:        ${data.email}
Source Page:  ${data.source_page || '—'}
Time:         ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
=====================================
    `.trim()

    void transporter.sendMail({
      from: `"CAE Leads" <${process.env.GMAIL_USER}>`,
      to: process.env.SMTP_TO ?? SITE.email,
      subject: `New Lead: ${data.name} | ${data.course} | ${data.city}`,
      text: emailBody,
    }).catch((mailError: unknown) => {
      console.error('Email send error:', mailError)
    })

    // Return immediately after DB insert — email sends in background
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Leads API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
