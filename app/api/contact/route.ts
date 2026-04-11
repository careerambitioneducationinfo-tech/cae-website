import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { transporter } from '@/lib/mailer'
import { SITE } from '@/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten((i) => i.message) },
        { status: 400 },
      )
    }

    const { name, phone, email, subject, message } = parsed.data

    const emailBody = `
New Contact Message — Career Ambition Education
================================================
Name:     ${name}
Phone:    ${phone}
Email:    ${email || '—'}
Subject:  ${subject}
Message:  ${message}
Time:     ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
================================================
    `.trim()

    try {
      await transporter.sendMail({
        from:    `"CAE Contact" <${process.env.GMAIL_USER}>`,
        to:      process.env.SMTP_TO ?? SITE.email,
        subject: `New Contact: ${subject} | ${name} | ${phone}`,
        text:    emailBody,
      })
    } catch (mailError) {
      console.error('Contact email send error:', mailError)
      // Return success to user — message was received, just email notification failed
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
