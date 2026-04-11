/**
 * Data for the /about page.
 * All content here — never inline in the component.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimelineItem {
  year: string
  title: string
  desc: string
  icon: string
  highlight: boolean
}

export interface OfficeItem {
  city: string
  tag: string | null
  district: string
}

export interface CoreValue {
  icon: string
  title: string
  titleHindi: string
  desc: string
}

export interface Testimonial {
  initials: string
  name: string
  course: string
  college: string
  city: string
  stars: number
  text: string
}

export interface ServiceBrief {
  icon: string
  name: string
  href: string
  desc: string
}

export interface TrustPoint {
  num: string
  icon: string
  title: string
  titleHindi: string
  desc: string
}

export interface AboutStat {
  value: string
  label: string
  labelHi: string
}

// ─── Founder ──────────────────────────────────────────────────────────────────

export const FOUNDER = {
  name: 'Chandan Sawan',
  title: 'Founder & Director, Career Ambition Education',
  photo: '/images/team/founder.webp',
  photoAlt: 'Chandan Sawan, founder of Career Ambition Education Motihari Bihar',
  quote: '"हर Bihar के student को सही guidance मिलनी चाहिए — चाहे उसका background कुछ भी हो।"',
  bio: [
    '2009 में Motihari, Bihar में Career Ambition Education की नींव रखी।',
    '17+ years में 10,000+ students को उनके सपनों के college में admission दिलाया।',
    'Bihar के students के लिए BSCC loan processing शुरू करने वाले first consultants में से एक।',
    'Champaran क्षेत्र में education awareness के लिए लगातार काम कर रहे हैं।',
  ],
} as const

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const TIMELINE: TimelineItem[] = [
  {
    year: '2009',
    title: 'CAE की शुरुआत',
    desc: 'Chandan Sawan ने Motihari में Career Ambition Education की नींव रखी। पहला office, पहले students।',
    icon: 'School',
    highlight: true,
  },
  {
    year: '2012',
    title: '1,000+ Admissions',
    desc: 'Bihar के अलग-अलग जिलों से students आने लगे। Engineering और Medical guidance में reputation बनी।',
    icon: 'GraduationCap',
    highlight: false,
  },
  {
    year: '2016',
    title: 'BSCC Loan Processing शुरू',
    desc: 'Bihar Government की BSCC scheme launch होते ही CAE ने loan assistance शुरू किया। पहले ही साल 200+ loans।',
    icon: 'Landmark',
    highlight: false,
  },
  {
    year: '2018',
    title: '5,000+ Students · 10 Offices',
    desc: 'Bihar के 10 जिलों में offices खुले। Muzaffarpur, Darbhanga, Patna में expansion।',
    icon: 'Building2',
    highlight: false,
  },
  {
    year: '2021',
    title: 'MBBS Abroad Program',
    desc: 'Russia, Uzbekistan, Kyrgyzstan में MBBS guidance शुरू। NMC approved universities में first batch।',
    icon: 'Globe',
    highlight: false,
  },
  {
    year: '2023',
    title: '20 Offices — Pan Bihar',
    desc: 'Bihar के 20 locations पर offices। 490+ counselors की team। Sugauli, Hajipur, Bettiah भी added।',
    icon: 'MapPin',
    highlight: false,
  },
  {
    year: '2025',
    title: '10,000+ Admissions',
    desc: 'Bihar की सबसे trusted education consultancy। 10,000+ successful admissions। 3,000+ BSCC loans।',
    icon: 'Trophy',
    highlight: true,
  },
]

// ─── Offices ──────────────────────────────────────────────────────────────────

export const OFFICES: OfficeItem[] = [
  { city: 'Motihari',    tag: 'HQ', district: 'East Champaran' },
  { city: 'Patna',       tag: null, district: 'Patna' },
  { city: 'Muzaffarpur', tag: null, district: 'Muzaffarpur' },
  { city: 'Darbhanga',   tag: null, district: 'Darbhanga' },
  { city: 'Bettiah',     tag: null, district: 'West Champaran' },
  { city: 'Sugauli',     tag: null, district: 'East Champaran' },
  { city: 'Hajipur',     tag: null, district: 'Vaishali' },
  { city: 'Sitamarhi',   tag: null, district: 'Sitamarhi' },
  { city: 'Gopalganj',   tag: null, district: 'Gopalganj' },
  { city: 'Chhapra',     tag: null, district: 'Saran' },
  { city: 'Siwan',       tag: null, district: 'Siwan' },
  { city: 'Madhubani',   tag: null, district: 'Madhubani' },
  { city: 'Samastipur',  tag: null, district: 'Samastipur' },
  { city: 'Begusarai',   tag: null, district: 'Begusarai' },
  { city: 'Bhagalpur',   tag: null, district: 'Bhagalpur' },
  { city: 'Gaya',        tag: null, district: 'Gaya' },
  { city: 'Arrah',       tag: null, district: 'Bhojpur' },
  { city: 'Aurangabad',  tag: null, district: 'Aurangabad' },
  { city: 'Nawada',      tag: null, district: 'Nawada' },
  { city: 'Jamui',       tag: null, district: 'Jamui' },
]

// ─── Core Values ──────────────────────────────────────────────────────────────

export const CORE_VALUES: CoreValue[] = [
  {
    icon: 'Gift',
    title: 'Free Counseling',
    titleHindi: 'मुफ्त Guidance',
    desc: 'हर student को free counseling मिलती है। कोई hidden charges नहीं। पहले guidance, फिर सब।',
  },
  {
    icon: 'CheckCircle',
    title: 'Honest Guidance',
    titleHindi: 'ईमानदार Guidance',
    desc: 'Student के marks, budget और interest के हिसाब से सही college suggest करते हैं — commission के लिए नहीं।',
  },
  {
    icon: 'Users',
    title: 'End-to-End Support',
    titleHindi: 'पूरा साथ',
    desc: 'College selection से admission तक, BSCC loan से visa तक — हर step पर साथ।',
  },
  {
    icon: 'Leaf',
    title: 'Bihar Rooted',
    titleHindi: 'Bihar का अपना',
    desc: '17+ years से Bihar में। Champaran के मिट्टी से जुड़े हैं — students को समझते हैं।',
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'RK',
    name: 'Rahul Kumar',
    course: 'B.Tech CSE',
    college: 'SRM University',
    city: 'Motihari, Bihar',
    stars: 5,
    text: 'CAE की help से मुझे SRM University में B.Tech CSE में admission मिला। BSCC loan भी 12 days में आ गया। पूरा process बहुत smooth था!',
  },
  {
    initials: 'PS',
    name: 'Priya Singh',
    course: 'MBBS',
    college: 'Tashkent Medical, Uzbekistan',
    city: 'Darbhanga, Bihar',
    stars: 5,
    text: 'MBBS Abroad के बारे में बहुत doubts थे। CAE ने सब explain किया — Tashkent Medical में admission हो गया! NMC approved है, India में valid।',
  },
  {
    initials: 'AM',
    name: 'Amit Mahato',
    course: 'MBA',
    college: 'LPU, Punjab',
    city: 'Muzaffarpur, Bihar',
    stars: 5,
    text: 'घर की financial situation ठीक नहीं थी। CAE ने BSCC loan में free में help किया। ₹4 lakh मिले, 0% interest। अब LPU में MBA कर रहा हूं।',
  },
  {
    initials: 'SK',
    name: 'Sunita Kumari',
    course: 'B.Sc Nursing',
    college: 'Haridwar University',
    city: 'Bettiah, Bihar',
    stars: 5,
    text: 'CAE की guidance से nursing में admission हुआ। BSCC loan भी मिले। Counselor ने पूरा process free में handle किया। Bahut helpful!',
  },
  {
    initials: 'VR',
    name: 'Vikash Ranjan',
    course: 'B.Tech',
    college: 'GNIOT, Greater Noida',
    city: 'Champaran, Bihar',
    stars: 5,
    text: '12th के बाद बहुत confused था। CAE के expert ने aptitude test करके Engineering suggest किया। GNIOT में BSCC loan से admission हुआ।',
  },
  {
    initials: 'NC',
    name: 'Neha Chauhan',
    course: 'BBA',
    college: 'Mangalmay Group, Noida',
    city: 'Hajipur, Bihar',
    stars: 5,
    text: 'Parent inquire करने आई थी। CAE ने बहुत detailed guidance दी। BSCC loan process भी free में handle हुआ। Highly recommend!',
  },
]

// ─── Services Brief ───────────────────────────────────────────────────────────

export const SERVICES_BRIEF: ServiceBrief[] = [
  { icon: 'GraduationCap', name: 'College Admission',  href: '/courses',      desc: 'Free counseling, shortlisting, form filling' },
  { icon: 'Globe',         name: 'MBBS Abroad',        href: '/study-abroad', desc: '6 countries, NMC approved, end-to-end' },
  { icon: 'Landmark',      name: 'BSCC Loan',          href: '/bscc-loan',    desc: '₹4L · 0% interest · Free processing' },
  { icon: 'BrainCircuit',  name: 'Career Counseling',  href: '/courses',      desc: 'Aptitude test · career path mapping' },
  { icon: 'FileText',      name: 'Entrance Guidance',  href: '/courses',      desc: 'JEE, NEET, CAT coaching referrals' },
  { icon: 'Bot',           name: 'AI Career Chatbot',  href: '/#chatbot',     desc: '24/7 Hindi + English support' },
]

// ─── Trust Points ─────────────────────────────────────────────────────────────

export const TRUST_POINTS: TrustPoint[] = [
  {
    num: '01',
    icon: 'Gift',
    title: 'Completely Free Service',
    titleHindi: 'पूरी तरह Free',
    desc: 'Counseling, college shortlisting, BSCC loan processing, form filling — सब free। कोई commission नहीं।',
  },
  {
    num: '02',
    icon: 'Trophy',
    title: '17+ Years Local Trust',
    titleHindi: '17 साल का भरोसा',
    desc: '2009 से Champaran में। Thousands of families CAE पर trust करती हैं — word of mouth से बना reputation।',
  },
  {
    num: '03',
    icon: 'CheckCircle',
    title: '90%+ BSCC Approval',
    titleHindi: '90%+ Loan Approval',
    desc: '3,000+ BSCC loans successfully processed। 90% से ज़्यादा approval rate। Bihar में सबसे high।',
  },
  {
    num: '04',
    icon: 'Users',
    title: 'End-to-End Support',
    titleHindi: 'हर Step पर साथ',
    desc: 'College selection से admission तक, BSCC application से DRCC visit तक — CAE हर जगह साथ।',
  },
  {
    num: '05',
    icon: 'Building2',
    title: '20 Offices Pan Bihar',
    titleHindi: 'पूरे Bihar में',
    desc: 'Motihari से Bhagalpur तक — nearest office visit करें या call करें। Door-to-door guidance।',
  },
]

// ─── About Stats ──────────────────────────────────────────────────────────────

export const ABOUT_STATS: AboutStat[] = [
  { value: '10,000+', label: 'Successful Admissions', labelHi: 'सफल नामांकन' },
  { value: '17+',     label: 'Years of Experience',   labelHi: 'वर्षों का अनुभव' },
  { value: '490+',    label: 'Expert Counselors',     labelHi: 'विशेषज्ञ काउंसलर' },
  { value: '20',      label: 'Bihar Offices',         labelHi: 'बिहार कार्यालय' },
  { value: '100+',    label: 'Partner Colleges',      labelHi: 'पार्टनर कॉलेज' },
  { value: '3,000+',  label: 'BSCC Loans Processed',  labelHi: 'BSCC लोन स्वीकृत' },
]
