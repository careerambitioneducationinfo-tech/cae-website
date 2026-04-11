'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Loader2, GraduationCap } from 'lucide-react'
import { leadSchema, type LeadFormData } from '@/lib/validations'
import { COURSE_OPTIONS, STATUS_OPTIONS } from '@/lib/constants'
import { markLeadSubmitted, markPopupShown } from '@/lib/popup'
import { buttonTap } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface LeadFormProps {
  sourcePage?: string
  onSuccess?: () => void
  compact?: boolean
  className?: string
}

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ind/40 focus:border-ind transition-colors'

const errorCls = 'mt-1 text-xs text-red-500 font-hindi'

const selectCls = cn(inputCls, 'appearance-none cursor-pointer')

export default function LeadForm({
  sourcePage,
  onSuccess,
  compact = false,
  className,
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { source_page: sourcePage },
  })

  const onSubmit = async (data: LeadFormData) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source_page: sourcePage }),
      })
      if (!res.ok) throw new Error('Submit failed')
      toast.success(`धन्यवाद ${data.name}! हम 2 घंटे में call करेंगे। 🎓`)
      if (onSuccess) { markLeadSubmitted() } else { markPopupShown() }
      reset()
      onSuccess?.()
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const grid2 = !compact ? 'sm:grid-cols-2' : 'grid-cols-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-3', className)} noValidate>

      {/* Row 1: Name + Phone */}
      <div className={cn('grid grid-cols-1 gap-3', grid2)}>
        <div>
          <input
            {...register('name')}
            placeholder="आपका नाम *"
            className={inputCls}
            aria-label="Your name"
            autoComplete="name"
          />
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('phone')}
            placeholder="Phone Number *"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className={inputCls}
            aria-label="Phone number"
            autoComplete="tel"
          />
          {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Row 2: Email */}
      <div>
        <input
          {...register('email')}
          placeholder="Email Address *"
          type="email"
          className={inputCls}
          aria-label="Email address"
          autoComplete="email"
        />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </div>

      {/* Row 3: Course + Status */}
      <div className={cn('grid grid-cols-1 gap-3', grid2)}>
        <div>
          <select
            {...register('course')}
            className={selectCls}
            aria-label="Course interest"
            defaultValue=""
          >
            <option value="" disabled>Course Interest *</option>
            {COURSE_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.course && <p className={errorCls}>{errors.course.message}</p>}
        </div>
        <div>
          <select
            {...register('status')}
            className={selectCls}
            aria-label="Current status"
            defaultValue=""
          >
            <option value="" disabled>Current Status *</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.status && <p className={errorCls}>{errors.status.message}</p>}
        </div>
      </div>

      {/* Row 4: City */}
      <div>
        <input
          {...register('city')}
          placeholder="आपका शहर *"
          className={inputCls}
          aria-label="Your city"
          autoComplete="address-level2"
        />
        {errors.city && <p className={errorCls}>{errors.city.message}</p>}
      </div>

      {/* Submit */}
      <motion.div whileTap={buttonTap}>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Submit free counseling form"
          className="w-full bg-ind text-white font-semibold rounded-lg py-2.5 px-4 text-sm flex items-center justify-center gap-2 hover:bg-ind/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
          ) : (
            <><GraduationCap className="w-4 h-4" /> Free Counseling लें →</>

          )}
        </button>
      </motion.div>

      <p className="text-center text-[11px] text-gray-400">
        🔒 आपकी जानकारी पूरी तरह safe है।
      </p>
    </form>
  )
}
