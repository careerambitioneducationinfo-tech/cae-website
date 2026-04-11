/**
 * Site-wide constants for Career Ambition Education (CAE).
 * All contact info, taglines, and stats must come from here — never hardcoded in components.
 */

export const SITE = {
  name: 'Career Ambition Education',
  shortName: 'CAE',
  domain: 'careerambition.com',
  url: 'https://careerambition.com',
  phone: '+91-9973774459',
  whatsapp: '919973774459', // no + for wa.me links
  email: 'contact@careerambitioneducation.com',
  address: 'Ram Saraan Gate, Chandmari, Motihari, Bihar 845401',
  hours: 'Monday–Saturday, 9AM–7PM',
  founded: 2009,
} as const

export const SOCIAL = {
  facebook: 'https://www.facebook.com/careereducation.info',
  instagram: 'https://www.instagram.com/careerambitioneducation/',
  youtube: '', // to be added
  whatsapp: `https://wa.me/919973774459`,
} as const

/** Official taglines — use verbatim, never paraphrase */
export const TAGLINES = {
  T1: 'आपके सपनों के College में Admission — हम करेंगे आसान!',
  T2_line1: '17 वर्षों से चंपारण की सबसे विश्वसनीय संस्था',
  T2_line2: '10,000+ छात्रों का विभिन्न पाठ्यकर्मों में सफल नामांकन',
  T3_hook: 'कभी सोंचा है',
  T3_bold: '12 के बाद क्या ?',
  T4: 'अब fees की tension क्यों जब DRCC है साथ में!',
} as const

/** Key statistics — use exactly as shown */
export const STATS = [
  { value: '10,000+', label: 'Successful Admissions', labelHi: 'सफल नामांकन' },
  { value: '17+', label: 'Years of Experience', labelHi: 'वर्षों का अनुभव' },
  { value: '490+', label: 'Expert Counselors', labelHi: 'विशेषज्ञ काउंसलर' },
  { value: '20', label: 'Bihar Offices', labelHi: 'बिहार कार्यालय' },
  { value: '100+', label: 'Partner Colleges', labelHi: 'पार्टनर कॉलेज' },
  { value: '3,000+', label: 'BSCC Loans Processed', labelHi: 'BSCC लोन स्वीकृत' },
  { value: '90%+', label: 'BSCC Loan Approval Rate', labelHi: 'लोन अनुमोदन दर' },
] as const

export const COURSE_OPTIONS = [
  'B.Tech / Engineering',
  'MBBS India',
  'MBBS Abroad',
  'MBA',
  'BBA',
  'BCA/MCA',
  'BAMS/BDS',
  'B.Pharma',
  'B.Sc Nursing',
  'B.Sc Agriculture',
  'LLB',
  'BSCC Loan',
  'Other',
] as const

export const STATUS_OPTIONS = [
  'Appearing in 12th (2026)',
  '12th Pass (2025)',
  'Gap Year',
  'Graduation Lateral',
  'Parent inquiring',
] as const

export const BUDGET_OPTIONS = [
  'Under ₹5 Lakh',
  '₹5–10 Lakh',
  '₹10–20 Lakh',
  '₹20–40 Lakh',
  'Above ₹40 Lakh',
] as const

/** MBBS Abroad country data */
export const MBBS_COUNTRIES = [
  { name: 'Russia', fee: '₹35–40L', duration: '6 Years' },
  { name: 'Uzbekistan', fee: '₹20–30L', duration: '6 Years' },
  { name: 'Kyrgyzstan', fee: '₹20–25L', duration: '6 Years' },
  { name: 'Kazakhstan', fee: '₹20–30L', duration: '6 Years' },
  { name: 'Bangladesh', fee: '₹20–35L', duration: '5.5 Years' },
  { name: 'Nepal', fee: '₹25–45L', duration: '5.5 Years' },
] as const

/** BSCC Loan facts */
export const BSCC = {
  maxAmount: '₹4,00,000',
  interest: '0%',
  timeline: '10–15 days',
  loansProcessed: '3,000+',
  approvalRate: '90%+',
} as const

/** Popup localStorage keys and delays */
export const POPUP = {
  storageKey: 'cae_popup_shown',
  ttlMs: 24 * 60 * 60 * 1000, // 24 hours
  delayHome: 0,
  delayOther: 2000,
} as const
