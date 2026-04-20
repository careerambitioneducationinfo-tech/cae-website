'use client'

import { useState } from 'react'

const STATUS_OPTIONS  = ['All', 'New', 'Contacted', 'Follow-Up', 'Enrolled'] as const
const COURSE_OPTIONS  = ['All', 'MBBS Abroad', 'Medical', 'Engineering', 'Law', 'BSCC Loan'] as const

type Status = (typeof STATUS_OPTIONS)[number]
type Course = (typeof COURSE_OPTIONS)[number]
type UIState = 'idle' | 'loading' | 'success' | 'error'

export default function LeadsDashboard() {
  const [status,    setStatus]    = useState<Status>('All')
  const [course,    setCourse]    = useState<Course>('All')
  const [uiState,   setUiState]   = useState<UIState>('idle')
  const [errorMsg,  setErrorMsg]  = useState('')
  const [doneAt,    setDoneAt]    = useState('')

  async function handleDownload() {
    setUiState('loading')
    setErrorMsg('')
    setDoneAt('')

    try {
      const params = new URLSearchParams()
      params.set('secret', process.env.NEXT_PUBLIC_EXPORT_SECRET ?? '')
      if (status !== 'All') params.set('status', status)
      if (course !== 'All') params.set('course', course)

      const res = await fetch(`/api/leads/export?${params.toString()}`)

      if (!res.ok) {
        const json = await res.json() as { error?: string }
        throw new Error(json.error ?? `Server error ${res.status}`)
      }

      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      const date = new Date().toISOString().slice(0, 10)
      a.href     = url
      a.download = `cae-leads-${date}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      setDoneAt(now)
      setUiState('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Download failed')
      setUiState('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-[#1A56DB] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">Leads Export</h1>
              <p className="text-white/70 text-xs mt-0.5">Career Ambition Education — Admin</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-5">

          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value as Course)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COURSE_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter summary */}
          <p className="text-xs text-gray-400">
            {status === 'All' && course === 'All'
              ? 'All leads will be exported'
              : `Filtering by: ${[status !== 'All' && `Status = ${status}`, course !== 'All' && `Course ≈ ${course}`].filter(Boolean).join(' · ')}`
            }
          </p>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={uiState === 'loading'}
            className="w-full flex items-center justify-center gap-2.5 py-3 bg-[#1A56DB] hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            {uiState === 'loading' ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating Excel…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Latest Excel
              </>
            )}
          </button>

          {/* Feedback messages */}
          {uiState === 'success' && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Downloaded at {doneAt}
            </div>
          )}

          {uiState === 'error' && (
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
          <p className="text-xs text-gray-400 text-center">
            Data sourced from Supabase · Session expires in 24h
          </p>
        </div>
      </div>
    </div>
  )
}
