import type { Metadata } from 'next'
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Topbar from '@/components/shared/Topbar'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import ClientProviders from '@/components/shared/ClientProviders'
import { NavProvider } from '@/lib/nav-context'

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

export const metadata: Metadata = {
  title: 'Career Ambition Education — Best Admission Consultancy in Bihar',
  description:
    'Get expert guidance for B.Tech, MBBS, MBA admissions. 17+ years, 10,000+ successful admissions, 20 offices across Bihar. Free counseling available.',
  metadataBase: new URL('https://careerambition.com'),
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
        <NavProvider>
          <Topbar />
          <Navbar />
          {children}
          <Footer />
          <ClientProviders />
        </NavProvider>

        {/* CAE AI Chatbot — Railway backend */}
        <Script id="cae-chatbot-config" strategy="beforeInteractive">
          {`window.CAE_SERVER_URL = "https://web-production-a532a.up.railway.app";`}
        </Script>
        <Script
          src="https://web-production-a532a.up.railway.app/embed-widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
