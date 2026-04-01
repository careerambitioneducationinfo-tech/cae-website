# /db-schema

Generate or reference the Supabase PostgreSQL schema for CAE.

## Usage
```
/db-schema [table-name]
```

---

## Core Tables

### `leads` — All form submissions
```sql
CREATE TABLE leads (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  course         TEXT        NOT NULL,
  status         TEXT        NOT NULL,
  city           TEXT        NOT NULL,
  email          TEXT,
  message        TEXT,
  budget         TEXT,
  source_page    TEXT,                       -- which page the form was on
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries by phone and course
CREATE INDEX leads_phone_idx  ON leads (phone);
CREATE INDEX leads_course_idx ON leads (course);
CREATE INDEX leads_created_idx ON leads (created_at DESC);
```

### `blog_posts` — SEO blog articles
```sql
CREATE TABLE blog_posts (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,          -- Hinglish title
  slug        TEXT        UNIQUE NOT NULL,   -- English slug
  excerpt     TEXT,
  content     TEXT,
  meta_desc   TEXT,                          -- English only (SEO)
  cover_image TEXT,                          -- path: /images/blog/[slug].webp
  published   BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX blog_slug_idx      ON blog_posts (slug);
CREATE INDEX blog_published_idx ON blog_posts (published, created_at DESC);
```

### `page_visits` — Analytics (optional)
```sql
CREATE TABLE page_visits (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  page        TEXT        NOT NULL,
  referrer    TEXT,
  user_agent  TEXT,
  visited_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Row Level Security (RLS)

Enable RLS on `leads` — allow inserts from anon key, block reads:

```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a lead (form submissions from website)
CREATE POLICY "allow_insert_leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only service role can read leads (server-side only)
CREATE POLICY "allow_read_leads_service"
  ON leads FOR SELECT
  TO service_role
  USING (true);
```

---

## Supabase Client Setup

```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client — for form submissions (INSERT only via RLS)
export const supabase = createClient(supabaseUrl, supabaseAnon)

// Server-only admin client — for reading leads in API routes
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

---

## Zod Validation Schema (matches `leads` table)

```ts
// lib/validations.ts
import { z } from 'zod'

export const leadSchema = z.object({
  name:           z.string().min(2, 'कृपया अपना नाम डालें'),
  phone:          z.string().regex(/^\d{10}$/, 'Phone number 10 digits का होना चाहिए'),
  course:         z.string().min(1, 'कृपया course चुनें'),
  status:         z.string().min(1, 'कृपया अपनी status चुनें'),
  city:           z.string().min(2, 'कृपया अपना शहर बताएं'),
  email:          z.string().email().optional().or(z.literal('')),
  message:        z.string().optional(),
  budget:         z.string().optional(),
  source_page:    z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>
```

---

## Required Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Server-side only — never expose client-side
```

---

## API Route — Insert Lead

```ts
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { leadSchema } from '@/lib/validations'
import { transporter } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    // 1. Save to Supabase
    const { error } = await supabaseAdmin.from('leads').insert(parsed.data)
    if (error) throw error

    // 2. Send email notification
    await transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      process.env.SMTP_TO,
      subject: `New Lead — ${parsed.data.course} | ${parsed.data.name} | ${parsed.data.city}`,
      text: `
Name:    ${parsed.data.name}
Phone:   ${parsed.data.phone}
Course:  ${parsed.data.course}
Status:  ${parsed.data.status}
City:    ${parsed.data.city}
Email:   ${parsed.data.email || '—'}
Budget:  ${parsed.data.budget || '—'}
Message: ${parsed.data.message || '—'}
Source:  ${parsed.data.source_page || '—'}
Time:    ${new Date().toISOString()}
      `.trim()
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```
