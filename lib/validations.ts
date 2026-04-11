import { z } from 'zod'

export const leadSchema = z.object({
  name:        z.string().min(2, 'कृपया अपना नाम डालें'),
  phone:       z.string().regex(/^\d{10}$/, { message: 'Phone number 10 digits का होना चाहिए' }),
  email:       z.string().email({ message: 'Valid email डालें' }),
  course:      z.string().min(1, 'कृपया course चुनें'),
  status:      z.string().min(1, 'कृपया अपनी status चुनें'),
  city:        z.string().min(2, 'कृपया अपना शहर बताएं'),
  source_page: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>

export const contactSchema = z.object({
  name:    z.string().min(2, 'कृपया अपना नाम डालें'),
  phone:   z.string().regex(/^\d{10}$/, { message: 'Phone number 10 digits का होना चाहिए' }),
  email:   z.string().email().optional().or(z.literal('')),
  subject: z.string().min(1, 'कृपया topic चुनें'),
  message: z.string().min(10, 'कृपया अपना message लिखें (कम से कम 10 characters)'),
})

export type ContactFormData = z.infer<typeof contactSchema>
