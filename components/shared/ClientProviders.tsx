'use client'

import dynamic from 'next/dynamic'
import { Toaster } from '@/components/ui/sonner'
import FloatingWidget from '@/components/shared/FloatingWidget'

const PopupController = dynamic(
  () => import('@/components/forms/PopupController'),
  { ssr: false }
)

export default function ClientProviders() {
  return (
    <>
      <PopupController />
      <FloatingWidget />
      <Toaster position="bottom-center" richColors />
    </>
  )
}
