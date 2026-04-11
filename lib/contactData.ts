/**
 * Data for the /contact page.
 * All contact details come from SITE constants — never hardcoded here.
 */

export interface ContactChannel {
  id: string
  iconName: string
  label: string
  subtext: string
  href: string
  bg: string
  borderColor: string
  ctaText: string
  ctaBg: string
  ctaText2?: string
  external?: boolean
}

export interface NearbyOffice {
  city: string
  tag: string | null
  note: string
}

export interface ContactFaq {
  q: string
  a: string
}

export interface SocialChannel {
  platform: string
  handle: string
  desc: string
  iconName: string
  color: string
  borderColor: string
  textColor: string
  href: string
  cta: string
  external: boolean
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'phone',
    iconName: 'Phone',
    label: 'Call करें',
    subtext: 'Mon–Sat · 9AM–7PM',
    href: 'tel:+919973774459',
    bg: 'bg-[#eeedf8]',
    borderColor: '#2E2567',
    ctaText: 'Call करें →',
    ctaBg: 'bg-ind text-white',
  },
  {
    id: 'whatsapp',
    iconName: 'MessageCircle',
    label: 'WhatsApp करें',
    subtext: 'Instant reply · Hindi + English',
    href: 'https://wa.me/919973774459',
    bg: 'bg-[#E1F5EE]',
    borderColor: '#25D366',
    ctaText: 'WhatsApp खोलें →',
    ctaBg: 'bg-[#25D366] text-white',
    external: true,
  },
  {
    id: 'email',
    iconName: 'Mail',
    label: 'Email करें',
    subtext: 'Reply within 24 hours',
    href: 'mailto:contact@careerambitioneducation.com',
    bg: 'bg-[#F5F5F8]',
    borderColor: '#644A9E',
    ctaText: 'Email भेजें →',
    ctaBg: 'bg-pur text-white',
  },
  {
    id: 'visit',
    iconName: 'MapPin',
    label: 'Office Visit करें',
    subtext: 'Ram Saraan Gate, Chandmari, Motihari',
    href: 'https://maps.google.com/?q=Motihari+Bihar+845401',
    bg: 'bg-[#fffbdf]',
    borderColor: '#FBD207',
    ctaText: 'Map खोलें →',
    ctaBg: 'bg-yel text-ind',
    external: true,
  },
]

export const NEARBY_OFFICES: NearbyOffice[] = [
  { city: 'Motihari',    tag: 'HQ', note: 'Main Office' },
  { city: 'Bettiah',     tag: null, note: 'West Champaran' },
  { city: 'Sugauli',     tag: null, note: 'Near Motihari' },
  { city: 'Muzaffarpur', tag: null, note: 'North Bihar Hub' },
  { city: 'Patna',       tag: null, note: 'Capital Office' },
  { city: 'Darbhanga',   tag: null, note: 'Mithila Region' },
  { city: 'Hajipur',     tag: null, note: 'Vaishali' },
  { city: 'Sitamarhi',   tag: null, note: 'North Bihar' },
]

export const FAQS_CONTACT: ContactFaq[] = [
  {
    q: 'Office visit ke liye appointment chahiye?',
    a: 'Nahi! Walk-in welcome hai। Mon–Sat, 9AM–7PM kabhi bhi aa sakte ho। Lekin busy season mein (June–August) call karke aana better hai।',
  },
  {
    q: 'WhatsApp pe kya kya pooch sakte hain?',
    a: 'Koi bhi question — college admission, BSCC loan, MBBS Abroad, course selection। Hindi mein bhi pooch sakte ho, English mein bhi।',
  },
  {
    q: 'Counseling ke liye fees lagti hai?',
    a: 'Bilkul nahi! CAE ki basic counseling completely free hai। Phone pe, WhatsApp pe, ya office visit — sab free।',
  },
  {
    q: 'Reply kitni jaldi milegi?',
    a: 'WhatsApp pe usually 30–60 minutes mein reply। Email pe 24 hours। Phone pe Mon–Sat 9AM–7PM seedha baat kar sakte ho।',
  },
]

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    platform: 'Facebook',
    handle: '@careereducation.info',
    desc: 'Success stories, college updates, BSCC news',
    iconName: 'Share2',
    color: 'bg-[#E6F1FB]',
    borderColor: '#185FA5',
    textColor: 'text-[#0C447C]',
    href: 'https://www.facebook.com/careereducation.info',
    cta: 'Follow करें →',
    external: true,
  },
  {
    platform: 'Instagram',
    handle: '@careerambitioneducation',
    desc: 'Student reels, campus tours, admission tips',
    iconName: 'Camera',
    color: 'bg-[#FBEAF0]',
    borderColor: '#993556',
    textColor: 'text-[#72243E]',
    href: 'https://www.instagram.com/careerambitioneducation/',
    cta: 'Follow करें →',
    external: true,
  },
  {
    platform: 'WhatsApp',
    handle: 'Direct Message',
    desc: '24/7 quick help · Hindi + English',
    iconName: 'MessageCircle',
    color: 'bg-[#E1F5EE]',
    borderColor: '#25D366',
    textColor: 'text-[#085041]',
    href: 'https://wa.me/919973774459',
    cta: 'Message करें →',
    external: true,
  },
]

export const SUBJECT_OPTIONS = [
  'College Admission',
  'MBBS Abroad',
  'BSCC Loan',
  'Career Counseling',
  'Entrance Exam',
  'Other',
] as const
