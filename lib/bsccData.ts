import type {
  EligibilityCriterion,
  DocumentCategory,
  ProcessStep,
  EligibleCourseStream,
} from '@/types'

export const BSCC_SCHEME = {
  fullName:     'Bihar Student Credit Card (BSCC)',
  scheme:       'Mukhyamantri Nishchay Swayam Sahayata Bhatta Yojana (MNSSBY)',
  department:   'शिक्षा विभाग, योजना एवं विकास एवं श्रम संसाधन विभाग, बिहार',
  launched:     'October 2, 2016 (Gandhi Jayanti)',
  officialSite: 'https://www.7nishchay-yuvaupmission.bihar.gov.in',
  helpline:     '1800-3456-444',
  loanAmount:   '₹4,00,000 (max)',
  interestRate: '4% p.a. (general) | 1% for girl / Divyang / transgender students',
  latestUpdate: '0% effective interest after Sept 2025 cabinet decision (interest subvention)',
  repayment:    'Course duration + 1 year moratorium, then up to 15 years',
  drccFullForm: 'District Registration and Counseling Centre',
  approvalTime: '10–15 working days',
  disbursement: 'Direct to college account (fee structure-based)',
  caeStats: {
    loansProcessed: '3,000+',
    approvalRate:   '90%+',
    service:        'Free — no charges to student',
  },
} as const

export const ELIGIBILITY: EligibilityCriterion[] = [
  {
    id:    'domicile',
    label: 'Bihar Domicile',
    desc:  'Must be permanent resident of Bihar state',
  },
  {
    id:    'class12',
    label: '12th Pass / Appearing',
    desc:  '12th passed or appearing — any board (Bihar, CBSE, ICSE)',
  },
  {
    id:    'admission',
    label: 'College Admission',
    desc:  'Admission in a recognized / BSCC-approved college or university',
  },
  {
    id:    'age',
    label: 'Age: 25 or below',
    desc:  'Must be 25 years of age or below at time of application',
  },
  {
    id:    'noother',
    label: 'No Other Loan',
    desc:  'Should not be availing any other education loan / scholarship simultaneously',
  },
  {
    id:    'income',
    label: 'Income Certificate',
    desc:  'Income certificate required — no strict income ceiling mentioned',
  },
]

export const DOCUMENTS: DocumentCategory[] = [
  {
    category: 'Identity',
    items: ['Aadhar Card (mandatory)', '10th Marksheet', '12th Marksheet'],
  },
  {
    category: 'Domicile',
    items: ['Bihar Domicile Certificate', 'Bihar Residential Proof'],
  },
  {
    category: 'Income',
    items: ['Income Certificate (issued by BDO/SDO)', 'Family income proof'],
  },
  {
    category: 'Education',
    items: [
      'Admission Letter from College',
      'College Fee Structure / Bonafide Letter',
      'Enrollment Number',
    ],
  },
  {
    category: 'Bank',
    items: ['Bank Account Passbook (student)', 'Bank Account Details (for disbursement)'],
  },
  {
    category: 'Photos',
    items: ['Passport size photographs (2–4)', 'Self-attested copies of all documents'],
  },
]

export const LOAN_USAGE = [
  { label: 'Tuition Fees',   desc: 'College / university fee structure' },
  { label: 'Hostel Fees',    desc: 'Hostel / accommodation expenses' },
  { label: 'Laptop / Books', desc: 'Laptop, stationery, books, study materials' },
  { label: 'Travel Expenses',desc: 'Travel to and from college' },
  { label: 'Lab / Exam Fees',desc: 'Lab fees, exam fees, project costs' },
  { label: 'Uniform / Tools',desc: 'Uniform, equipment for technical/medical courses' },
]

export const ELIGIBLE_COURSES: EligibleCourseStream[] = [
  { stream: 'Engineering',    courses: ['B.Tech / B.E.', 'Diploma / Polytechnic', 'M.Tech'] },
  { stream: 'Medical',        courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Sc Nursing', 'GNM', 'ANM', 'BPT', 'MLT'] },
  { stream: 'Management',     courses: ['MBA', 'BBA', 'BCA', 'MCA'] },
  { stream: 'Arts & Science', courses: ['B.A', 'B.Sc', 'B.Com', 'M.A', 'M.Sc', 'M.Com'] },
  { stream: 'Law',            courses: ['LLB', 'BA LLB', 'BBA LLB', 'LLM'] },
  { stream: 'Agriculture',    courses: ['B.Sc Agriculture', 'B.Sc Horticulture'] },
  { stream: 'Pharmacy',       courses: ['B.Pharma', 'D.Pharma', 'Pharm.D'] },
  { stream: 'Hotel & Others', courses: ['Hotel Management', 'Fashion Technology', 'B.Ed', 'Computer Applications'] },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step:       1,
    title:      'Online Registration',
    titleHindi: 'Online Registration करें',
    desc:       'Official MNSSBY portal पर new applicant registration। Email, mobile, Aadhar details fill करें।',
    time:       'Day 1',
    link:       'https://www.7nishchay-yuvaupmission.bihar.gov.in',
    caeHelp:    'CAE आपको registration में guide करेगा',
  },
  {
    step:       2,
    title:      'Fill BSCC Application Form',
    titleHindi: 'Application Form भरें',
    desc:       'Personal info, co-applicant details, college details, course — सब fill करें। PDF download करें।',
    time:       'Day 1–2',
    caeHelp:    'CAE सारे form fill करने में help करता है',
  },
  {
    step:       3,
    title:      'Documents Prepare करें',
    titleHindi: 'Documents Ready करें',
    desc:       'Aadhar, income certificate, domicile, admission letter, fee structure, bank passbook — सब self-attest करें।',
    time:       'Day 2–3',
    caeHelp:    'CAE document checklist और format बताएगा',
  },
  {
    step:       4,
    title:      'DRCC Office Visit',
    titleHindi: 'DRCC Office जाएं',
    desc:       'Allocated date पर अपने district के DRCC office जाएंगे। Token लें, TPA को documents submit करें।',
    time:       'Day 4–7',
    caeHelp:    'CAE DRCC visit में साथ आता है',
  },
  {
    step:       5,
    title:      'Verification & Approval',
    titleHindi: 'Verification होगी',
    desc:       'TPA verification (15 days max), Education Dept approval, Bank assessment। SMS और email आएगा।',
    time:       'Day 8–12',
    caeHelp:    'CAE follow-up करता है — आपको tension नहीं',
  },
  {
    step:       6,
    title:      'Loan Sanctioned!',
    titleHindi: 'Loan मिल गया!',
    desc:       'Student Credit Card + sanction letter DRCC से collect करें। Bank जाएं, documentation complete करें। Disbursement शुरू।',
    time:       'Day 13–15',
    caeHelp:    '3,000+ students को CAE ने यहां तक पहुंचाया है',
  },
]

export const DRCC_DISTRICTS = [
  'Motihari (East Champaran)',
  'Bettiah (West Champaran)',
  'Patna',
  'Muzaffarpur',
  'Darbhanga',
  'Sitamarhi',
  'Hajipur (Vaishali)',
  'Gopalganj',
  'Sugauli',
  'Saran (Chapra)',
  'Madhubani',
  'Samastipur',
]

export const FAQS = [
  {
    q: 'BSCC loan ke liye income limit kya hai?',
    a: 'BSCC mein koi strict income limit nahi hai. Lekin income certificate zaroori hai jo BDO ya SDO se milta hai. CAE free mein document process mein help karta hai.',
  },
  {
    q: 'BSCC loan ka repayment kab start hoga?',
    a: 'Course complete hone ke 1 saal baad repayment start hogi. Total repayment period 15 saal tak ho sakti hai. September 2025 ke cabinet decision ke baad loan practically interest-free ho gaya hai.',
  },
  {
    q: 'Kya private college mein bhi BSCC milega?',
    a: 'Haan, lekin college BSCC-approved aur government recognized hona chahiye. CAE ke sare 100+ partner colleges BSCC eligible hain. CAE college choose karne mein help karta hai.',
  },
  {
    q: 'DRCC kya hota hai aur kahan hai?',
    a: 'DRCC matlab District Registration and Counseling Centre. Har district mein ek DRCC hota hai. Motihari mein bhi DRCC hai. CAE aapko DRCC visit mein guide karega aur saath jayega.',
  },
  {
    q: 'Kya MBBS Abroad ke liye bhi BSCC milta hai?',
    a: 'BSCC primarily India ke approved colleges ke liye hai. MBBS Abroad ke liye alag financial planning hoti hai. CAE dono options mein guidance deta hai — free counseling lo.',
  },
  {
    q: 'CAE ki BSCC service mein kya kya include hai aur fees kya hai?',
    a: 'CAE ki BSCC service completely FREE hai. Eligibility check, document preparation, DRCC visit guidance, follow-up — sab free. 3,000+ students ko CAE ne successfully loan dilwaya hai.',
  },
  {
    q: 'Girl students ke liye interest rate alag hai kya?',
    a: 'Haan! Girl students, Divyang (differently-abled), aur transgender students ke liye interest rate sirf 1% p.a. hai. General students ke liye 4% — but government subsidy ke baad practically near-zero.',
  },
  {
    q: 'BSCC application reject ho jaye to?',
    a: 'Rejection aksar documents mein problem ya ineligible college ki wajah se hoti hai. CAE sahi documents aur approved college ensure karta hai — isliye 90%+ approval rate hai hamare pass.',
  },
]
