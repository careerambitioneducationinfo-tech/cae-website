'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from '@/components/ui/sonner'
import FloatingWidget from '@/components/shared/FloatingWidget'

const PopupController = dynamic(
  () => import('@/components/forms/PopupController'),
  { ssr: false }
)

type CAEWindow = Window & {
  CAE_SERVER_URL?: string
  __CAEWidgetLoaded?: boolean
}

export default function ClientProviders() {
  useEffect(() => {
    // React StrictMode runs useEffect twice (mount → cleanup → mount).
    // The widget script sets window.__CAEWidgetLoaded = true on first run
    // and bails out on subsequent runs. If we remove the script in cleanup,
    // the second mount injects the script again but __CAEWidgetLoaded is
    // still true — so the widget never renders. Guard here instead.
    if ((window as CAEWindow).__CAEWidgetLoaded) return

    ;(window as CAEWindow).CAE_SERVER_URL =
      'https://web-production-a532a.up.railway.app'

    const script = document.createElement('script')
    script.src = 'https://web-production-a532a.up.railway.app/embed-widget.js'
    script.async = true
    document.body.appendChild(script)

    // No cleanup — widget is a global singleton that must persist for the
    // full page lifetime. Removing the script tag breaks the StrictMode cycle.
  }, [])

  return (
    <>
      <PopupController />
      <FloatingWidget />
      <Toaster position="bottom-center" richColors />
    </>
  )
}
