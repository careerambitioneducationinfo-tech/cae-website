import Topbar from '@/components/shared/Topbar'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import ClientProviders from '@/components/shared/ClientProviders'
import { NavProvider } from '@/lib/nav-context'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <Topbar />
      <Navbar />
      {children}
      <Footer />
      <ClientProviders />
    </NavProvider>
  )
}
