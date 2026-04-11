import { POPUP } from '@/lib/constants'

const LEAD_KEY = 'cae_lead_submitted'

/** Returns true if the popup should be shown (not shown in last 24h, and lead not submitted) */
export function shouldShowPopup(): boolean {
  if (typeof window === 'undefined') return false
  if (localStorage.getItem(LEAD_KEY)) return false
  const raw = localStorage.getItem(POPUP.storageKey)
  if (!raw) return true
  const shownAt = parseInt(raw, 10)
  return Date.now() - shownAt > POPUP.ttlMs
}

/** Call after successful form submit or popup close */
export function markPopupShown(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(POPUP.storageKey, String(Date.now()))
}

/** Call after a successful lead form submit — permanently suppresses popup */
export function markLeadSubmitted(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LEAD_KEY, '1')
  markPopupShown()
}

/** Returns true if the user has already submitted a lead */
export function hasSubmittedLead(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(LEAD_KEY) === '1'
}
