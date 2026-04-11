import { createClient } from '@supabase/supabase-js'

const supabaseUrl         = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnon        = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl)         throw new Error('[Startup] Missing env var: NEXT_PUBLIC_SUPABASE_URL')
if (!supabaseAnon)        throw new Error('[Startup] Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY')
if (!supabaseServiceRole) throw new Error('[Startup] Missing env var: SUPABASE_SERVICE_ROLE_KEY')

/** Public client — browser-safe, INSERT only via RLS */
export const supabase = createClient(supabaseUrl, supabaseAnon)

/** Admin client — server-side only (API routes), bypasses RLS */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole)
