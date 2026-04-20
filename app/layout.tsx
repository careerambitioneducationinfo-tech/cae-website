import type { Metadata, Viewport } from 'next'
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-hindi',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Career Ambition Education',
  description:
    'Get expert guidance for B.Tech, MBBS, MBA admissions. 17+ years, 10,000+ successful admissions, 20 offices across Bihar. Free counseling available.',
  metadataBase: new URL('https://careerambitioneducation.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hi"
      className={`${poppins.variable} ${notoSansDevanagari.variable}`}
    >
      <body className="font-sans antialiased bg-[#F5F5F8]">
        {children}
      </body>
    </html>
  )
}
