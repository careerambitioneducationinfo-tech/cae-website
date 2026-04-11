import nodemailer from 'nodemailer'

const gmailUser = process.env.GMAIL_USER
const gmailPass = process.env.GMAIL_APP_PASSWORD

if (!gmailUser)  throw new Error('[Startup] Missing env var: GMAIL_USER')
if (!gmailPass)  throw new Error('[Startup] Missing env var: GMAIL_APP_PASSWORD')

/** Nodemailer transporter — Gmail SMTP, server-side only */
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
})
