/**
 * MBBS Abroad country data — single source of truth.
 * All Hinglish content follows CAE language rules.
 */

export interface AdmissionStep {
  step: number
  title: string
  desc: string
}

export interface FAQ {
  q: string
  a: string
}

export interface Benefit {
  icon: string
  title: string
  desc: string
}

export interface FeeRow {
  label: string
  amount: string
  note?: string
}

export interface CountryData {
  slug: string
  name: string
  nameHi: string
  flag: string
  tagline: string
  heroSubtitle: string
  totalFee: string
  tuitionPerYear: string
  livingPerYear: string
  duration: string
  recognition: string[]
  overview: string
  whyChoose: string[]
  highlights: { label: string; value: string }[]
  eligibility: {
    neet: string
    marksGeneral: string
    marksOBC: string
    ageLimit: string
    extra: string[]
  }
  feeTable: FeeRow[]
  feeTotalNote: string
  admissionSteps: AdmissionStep[]
  documents: string[]
  benefits: Benefit[]
  faqs: FAQ[]
  metaTitle: string
  metaDesc: string
  keywords: string
}

const RUSSIA: CountryData = {
  slug: 'russia',
  name: 'Russia',
  nameHi: 'रूस',
  flag: '🇷🇺',
  tagline: 'रूस में MBBS — European Quality, Indian Budget',
  heroSubtitle:
    'Russia में MBBS करें — NMC approved universities, English medium education, और affordable fees के साथ। 10,000+ Indian students पहले से यहाँ पढ़ रहे हैं।',
  totalFee: '₹35–40L',
  tuitionPerYear: '₹4–6L',
  livingPerYear: '₹2.5–3L',
  duration: '6 Years',
  recognition: ['NMC Approved', 'WHO Listed', 'UNESCO Recognized', 'MCI Approved'],
  overview:
    'Russia दुनिया के top MBBS abroad destinations में से एक है। यहाँ 60+ NMC-approved medical universities हैं जो Indian students को world-class European medical education provide करती हैं। Russian MBBS degree globally recognized है और FMGE/NEXT exam देकर India में practice कर सकते हैं। Low tuition fees, no donation, और English medium courses इसे Bihar के students के लिए ideal choice बनाते हैं।',
  whyChoose: [
    'European education system — globally recognized degree',
    'No entrance exam apart from NEET — direct admission',
    'Donation/capitation fees बिल्कुल नहीं',
    '10,000+ Indian students पहले से enrolled',
    'FMGE/NEXT coaching — CAE द्वारा provided',
    'Safe environment, Indian food easily available',
    'Affordable total cost — India के private MBBS से बहुत कम',
  ],
  highlights: [
    { label: 'Total Duration', value: '6 Years' },
    { label: 'Medium', value: 'English' },
    { label: 'Total Cost', value: '₹35–40L' },
    { label: 'NMC Status', value: 'Approved' },
    { label: 'Indian Students', value: '10,000+' },
    { label: 'Intake', value: 'Sep–Oct' },
  ],
  eligibility: {
    neet: 'NEET qualification mandatory — valid scorecard required',
    marksGeneral: '50% marks in PCB (Physics, Chemistry, Biology)',
    marksOBC: '40% marks in PCB for SC/ST/OBC category',
    ageLimit: '17–25 years on or before December 31 of admission year',
    extra: [
      'Valid Indian passport (minimum 18 months validity)',
      'Class 10 & 12 marksheets with PCB subjects',
      'NEET scorecard (valid year)',
      'No criminal record — police clearance certificate',
      'Medical fitness certificate',
    ],
  },
  feeTable: [
    { label: 'Tuition Fee (per year)', amount: '₹4–6 Lakh', note: 'Varies by university' },
    { label: 'Hostel / Accommodation', amount: '₹1–1.5 Lakh/year', note: 'University hostel' },
    { label: 'Food & Living', amount: '₹1.5–2 Lakh/year', note: 'Estimated' },
    { label: 'One-time Registration', amount: '₹50,000–80,000', note: 'First year only' },
    { label: 'Total 6 Years (Estimate)', amount: '₹35–40 Lakh', note: 'All inclusive' },
  ],
  feeTotalNote:
    'यह estimate है। Exact fees university और intake batch पर depend करती है। CAE counselors आपको accurate breakdown देंगे।',
  admissionSteps: [
    { step: 1, title: 'Free Counseling लें', desc: 'CAE experts से consult करें — eligibility check, university selection, और budget planning FREE में।' },
    { step: 2, title: 'Documents तैयार करें', desc: 'Passport, marksheets, NEET scorecard, और medical certificate — सभी documents ready करें।' },
    { step: 3, title: 'University Apply करें', desc: 'CAE आपकी chosen university में application submit करती है। Confirmation 5–7 days में।' },
    { step: 4, title: 'Invitation Letter मिलेगा', desc: 'University से official invitation letter receive करें — visa application के लिए जरूरी।' },
    { step: 5, title: 'Visa Application', desc: 'Russian student visa apply करें। CAE visa process में complete guidance provide करती है।' },
    { step: 6, title: 'Departure & Enrollment', desc: 'Russia travel करें, university में report करें, और अपनी MBBS journey शुरू करें।' },
  ],
  documents: [
    'Valid Indian Passport (18+ months validity)',
    'Class 10 Certificate & Marksheet',
    'Class 12 Certificate & Marksheet (PCB)',
    'NEET Scorecard (current year)',
    'Passport-size Photographs (10–12)',
    'Medical Fitness Certificate',
    'Police Clearance Certificate',
    'HIV Test Report',
    'Birth Certificate',
    'Bank Statement (sponsor)',
  ],
  benefits: [
    { icon: 'GraduationCap', title: 'NMC & WHO Approved', desc: 'सभी universities NMC और WHO listed — India में practice valid रहेगी।' },
    { icon: 'IndianRupee', title: 'No Donation Fee', desc: 'India के private colleges की तरह कोई capitation या donation fee नहीं।' },
    { icon: 'Globe', title: 'Globally Recognized Degree', desc: 'Russian MBBS degree worldwide accepted है — Europe, USA, और India में valid।' },
    { icon: 'BookOpen', title: 'English Medium', desc: 'Classes पूरी तरह English में — Hindi-speaking students के लिए suitable।' },
    { icon: 'Stethoscope', title: 'Modern Hospitals', desc: 'State-of-the-art teaching hospitals और advanced medical labs available।' },
    { icon: 'Users', title: 'Indian Community', desc: 'Large Indian student community — homesickness कम, support ज़्यादा।' },
  ],
  faqs: [
    { q: 'Russia में MBBS valid है India में?', a: 'Haan! Russia की NMC-approved universities से MBBS करने के बाद FMGE/NEXT exam qualify करके India में practice कर सकते हैं। CAE FMGE coaching भी provide करती है।' },
    { q: 'NEET के कितने marks चाहिए?', a: 'General category के लिए PCB में minimum 50% marks और NEET qualify होना जरूरी है। SC/ST/OBC के लिए 40% marks sufficient हैं।' },
    { q: 'Russia में Indian food मिलता है?', a: 'Bilkul! बड़े cities जैसे Moscow, St. Petersburg, Kazan में Indian restaurants और grocery stores readily available हैं। University hostels में Indian students खुद cooking भी करते हैं।' },
    { q: 'Total kitna खर्च आएगा?', a: 'Russia में MBBS का total estimated खर्च ₹35–40 Lakh है 6 साल के लिए। इसमें tuition, hostel, food, और travel सब शामिल है। यह India के private MBBS colleges से काफी कम है।' },
    { q: 'Russia का Weather कैसा है?', a: 'Russia में Winter बहुत cold होता है (−15 to −30°C)। लेकिन universities में proper heating होती है। Students आसानी से adapt कर लेते हैं। गर्मियों में मौसम pleasant रहता है।' },
    { q: 'Admission कब होता है?', a: 'Russia में MBBS का main intake September–October है। Application process June–August के बीच शुरू करना ideal है। CAE April से ही counseling शुरू कर देती है।' },
    { q: 'CAE कैसे help करती है?', a: 'CAE free counseling से शुरू करके university selection, document preparation, application, invitation letter, visa process, travel, और university reporting तक complete hand-holding provide करती है। FMGE coaching भी available है।' },
  ],
  metaTitle: 'Study MBBS in Russia | NMC Approved Universities | Career Ambition Education',
  metaDesc: 'Study MBBS in Russia from NMC & WHO approved universities. Total cost ₹35–40L, English medium, 6-year program. Free counseling from Career Ambition Education Bihar.',
  keywords: 'MBBS in Russia, Russia MBBS fees, Russia MBBS NMC approved, study medicine Russia Bihar, MBBS Russia Indian students',
}

const KYRGYZSTAN: CountryData = {
  slug: 'kyrgyzstan',
  name: 'Kyrgyzstan',
  nameHi: 'किर्गिस्तान',
  flag: '🇰🇬',
  tagline: 'किर्गिस्तान में MBBS — Affordable, Recognized, Reliable',
  heroSubtitle:
    'Kyrgyzstan में MBBS करें — सबसे affordable MBBS abroad destination। NMC approved universities, English medium, और friendly environment।',
  totalFee: '₹20–25L',
  tuitionPerYear: '₹2.5–3.5L',
  livingPerYear: '₹1.5–2L',
  duration: '6 Years',
  recognition: ['NMC Approved', 'WHO Listed', 'ECFMG Recognized', 'Asian Medical Council'],
  overview:
    'Kyrgyzstan Central Asia का एक beautiful country है जो affordable MBBS education के लिए तेजी से popular हो रहा है। यहाँ की medical universities NMC approved और WHO listed हैं। India के Bihar और UP के students के लिए Kyrgyzstan एक ideal MBBS destination है — low fees, English medium education, और Indian-friendly environment। यहाँ का climate भी North India जैसा है, इसलिए students आसानी से adjust कर लेते हैं।',
  whyChoose: [
    'सबसे affordable MBBS abroad — total ₹20–25L only',
    'North India जैसा climate — easy adjustment',
    'Indian food और community easily available',
    'NMC approved universities — India में practice valid',
    'Safe और peaceful country for students',
    'Direct admission — कोई entrance exam नहीं (NEET के अलावा)',
    'Bishkek city — modern infrastructure, student-friendly',
  ],
  highlights: [
    { label: 'Total Duration', value: '6 Years' },
    { label: 'Medium', value: 'English' },
    { label: 'Total Cost', value: '₹20–25L' },
    { label: 'NMC Status', value: 'Approved' },
    { label: 'Climate', value: 'Moderate' },
    { label: 'Intake', value: 'Sep–Oct' },
  ],
  eligibility: {
    neet: 'NEET qualification mandatory — valid scorecard required',
    marksGeneral: '50% marks in PCB (Physics, Chemistry, Biology)',
    marksOBC: '40% marks in PCB for SC/ST/OBC category',
    ageLimit: '17–25 years on or before December 31 of admission year',
    extra: [
      'Valid Indian passport (minimum 18 months validity)',
      'Class 10 & 12 marksheets with PCB subjects',
      'NEET scorecard (current year)',
      'Medical fitness certificate',
      'Police clearance certificate',
    ],
  },
  feeTable: [
    { label: 'Tuition Fee (per year)', amount: '₹2.5–3.5 Lakh', note: 'Varies by university' },
    { label: 'Hostel / Accommodation', amount: '₹60,000–80,000/year', note: 'University hostel' },
    { label: 'Food & Living', amount: '₹80,000–1 Lakh/year', note: 'Estimated' },
    { label: 'One-time Registration', amount: '₹30,000–50,000', note: 'First year only' },
    { label: 'Total 6 Years (Estimate)', amount: '₹20–25 Lakh', note: 'All inclusive' },
  ],
  feeTotalNote:
    'Kyrgyzstan MBBS India के सबसे affordable abroad options में से एक है। Exact fees CAE counselors के साथ consultation में confirm होगी।',
  admissionSteps: [
    { step: 1, title: 'Free Counseling लें', desc: 'CAE के experts से eligibility और best university के बारे में FREE guidance लें।' },
    { step: 2, title: 'Documents Prepare करें', desc: 'Passport, marksheets, NEET scorecard, और required certificates ready करें।' },
    { step: 3, title: 'University Application', desc: 'CAE आपकी preferred Kyrgyz medical university में application submit करती है।' },
    { step: 4, title: 'Offer Letter Receive करें', desc: 'University की official offer letter मिलती है — 7–10 days में।' },
    { step: 5, title: 'Visa Process', desc: 'Kyrgyzstan student visa के लिए apply करें। CAE complete visa assistance provide करती है।' },
    { step: 6, title: 'Departure & Enrollment', desc: 'Bishkek travel करें, university में report करें, और अपनी MBBS शुरू करें।' },
  ],
  documents: [
    'Valid Indian Passport (18+ months validity)',
    'Class 10 Certificate & Marksheet',
    'Class 12 Certificate & Marksheet (PCB)',
    'NEET Scorecard (current year)',
    'Passport-size Photographs (10–12)',
    'Medical Fitness Certificate',
    'Police Clearance Certificate',
    'HIV Test Report',
    'Birth Certificate',
    'Bank Statement (sponsor)',
  ],
  benefits: [
    { icon: 'IndianRupee', title: 'Most Affordable', desc: 'Total ₹20–25L — India के private MBBS की तुलना में 60% less खर्च।' },
    { icon: 'GraduationCap', title: 'NMC & WHO Approved', desc: 'All reputed universities NMC approved — FMGE/NEXT देकर India में practice करें।' },
    { icon: 'Sun', title: 'Familiar Climate', desc: 'North India जैसा मौसम — adjustment बहुत आसान होता है।' },
    { icon: 'BookOpen', title: 'English Medium', desc: 'Entire MBBS program English में — language barrier नहीं।' },
    { icon: 'Shield', title: 'Safe Country', desc: 'Peaceful और student-friendly environment — parents को tension नहीं।' },
    { icon: 'Utensils', title: 'Indian Food Available', desc: 'Bishkek में Indian restaurants और grocery stores आसानी से मिलते हैं।' },
  ],
  faqs: [
    { q: 'Kyrgyzstan MBBS India में valid है?', a: 'Haan! NMC-approved universities से degree लेकर FMGE/NEXT exam qualify करने के बाद India में full medical practice कर सकते हैं।' },
    { q: 'Kyrgyzstan का weather कैसा है?', a: 'Kyrgyzstan का climate temperate है — गर्मियों में 25–30°C और सर्दियों में −5 to −10°C। North India जैसा ही है, students easily adjust कर लेते हैं।' },
    { q: 'Bishkek में Indian community है?', a: 'Bilkul! Bishkek में large Indian student community है। Indian restaurants, temples, और cultural events regularly होते हैं।' },
    { q: 'Total kitna पैसा लगेगा?', a: 'Total 6 साल का estimated खर्च ₹20–25 Lakh है — tuition, hostel, food सब मिलाकर। यह MBBS abroad destinations में सबसे कम है।' },
    { q: 'Admission कब होता है और कैसे?', a: 'Main intake September–October है। CAE April से counseling शुरू करती है। Application, invitation letter, visa — सब CAE handle करती है।' },
    { q: 'Language problem तो नहीं होगी?', a: 'Medical education पूरी English में होती है। Local language (Kyrgyz/Russian) basic level पर सीखनी पड़ती है, जो students 6–12 months में सीख लेते हैं।' },
  ],
  metaTitle: 'Study MBBS in Kyrgyzstan | Affordable NMC Approved | Career Ambition Education',
  metaDesc: 'Study MBBS in Kyrgyzstan at just ₹20–25L total. NMC & WHO approved universities, English medium education. Free counseling from CAE Bihar.',
  keywords: 'MBBS in Kyrgyzstan, Kyrgyzstan MBBS fees, affordable MBBS abroad, Bishkek medical university, MBBS Kyrgyzstan Bihar',
}

const KAZAKHSTAN: CountryData = {
  slug: 'kazakhstan',
  name: 'Kazakhstan',
  nameHi: 'कज़ाकिस्तान',
  flag: '🇰🇿',
  tagline: 'कज़ाकिस्तान में MBBS — Modern Education, Global Recognition',
  heroSubtitle:
    'Kazakhstan में MBBS करें — Central Asia का सबसे developed country। Modern medical universities, excellent infrastructure, और NMC approved education।',
  totalFee: '₹20–30L',
  tuitionPerYear: '₹3–4.5L',
  livingPerYear: '₹2–2.5L',
  duration: '6 Years',
  recognition: ['NMC Approved', 'WHO Listed', 'WFME Accredited', 'ECFMG Recognized'],
  overview:
    'Kazakhstan Central Asia का largest और सबसे developed country है। यहाँ की medical universities world-class infrastructure और modern teaching facilities से equipped हैं। Kazakhstan में MBBS करना उन students के लिए ideal है जो quality education के साथ-साथ modern city lifestyle भी चाहते हैं। Almaty और Astana (Nur-Sultan) जैसे cities में excellent universities हैं जो NMC और WHO approved हैं।',
  whyChoose: [
    'Central Asia का most developed country — modern infrastructure',
    'NMC & WHO approved universities — globally recognized degree',
    'Excellent teaching hospitals और advanced medical labs',
    'Peaceful और multicultural environment',
    'Direct flights from India — Delhi से Almaty 4 hours',
    'Affordable total cost — India के private MBBS से काफी कम',
    'Strong Indian student community — 5,000+ Indian students',
  ],
  highlights: [
    { label: 'Total Duration', value: '6 Years' },
    { label: 'Medium', value: 'English' },
    { label: 'Total Cost', value: '₹20–30L' },
    { label: 'NMC Status', value: 'Approved' },
    { label: 'Infrastructure', value: 'Modern' },
    { label: 'Intake', value: 'Sep–Oct' },
  ],
  eligibility: {
    neet: 'NEET qualification mandatory — valid scorecard required',
    marksGeneral: '50% marks in PCB (Physics, Chemistry, Biology)',
    marksOBC: '40% marks in PCB for SC/ST/OBC category',
    ageLimit: '17–25 years on or before December 31 of admission year',
    extra: [
      'Valid Indian passport (minimum 18 months validity)',
      'Class 10 & 12 marksheets with PCB subjects',
      'NEET scorecard (current year)',
      'Medical fitness certificate from registered doctor',
      'Police clearance certificate',
    ],
  },
  feeTable: [
    { label: 'Tuition Fee (per year)', amount: '₹3–4.5 Lakh', note: 'Varies by university' },
    { label: 'Hostel / Accommodation', amount: '₹80,000–1.2 Lakh/year', note: 'University hostel' },
    { label: 'Food & Living', amount: '₹1–1.5 Lakh/year', note: 'Estimated' },
    { label: 'One-time Registration', amount: '₹40,000–60,000', note: 'First year only' },
    { label: 'Total 6 Years (Estimate)', amount: '₹20–30 Lakh', note: 'All inclusive' },
  ],
  feeTotalNote:
    'Kazakhstan में MBBS quality education और affordable cost का best combination है। Exact fees university और campus पर depend करती है।',
  admissionSteps: [
    { step: 1, title: 'Counseling & University Selection', desc: 'CAE experts से free consultation लें — eligibility check और best university recommend।' },
    { step: 2, title: 'Documents Submit करें', desc: 'सभी required documents prepare करके CAE को submit करें।' },
    { step: 3, title: 'Application Process', desc: 'CAE आपकी chosen Kazakh university में complete application submit करती है।' },
    { step: 4, title: 'Invitation Letter', desc: 'University से official invitation letter प्राप्त करें — 7–14 days में।' },
    { step: 5, title: 'Student Visa Apply करें', desc: 'Kazakhstan student visa process — CAE complete assistance provide करती है।' },
    { step: 6, title: 'University Reporting', desc: 'Almaty या Astana travel करें, university में register करें, MBBS शुरू करें।' },
  ],
  documents: [
    'Valid Indian Passport (18+ months validity)',
    'Class 10 Certificate & Marksheet',
    'Class 12 Certificate & Marksheet (PCB)',
    'NEET Scorecard (current year)',
    'Passport-size Photographs (12–15)',
    'Medical Fitness Certificate',
    'Police Clearance Certificate',
    'HIV & Hepatitis Test Report',
    'Birth Certificate',
    'Bank Statement (financial sponsor)',
  ],
  benefits: [
    { icon: 'Building2', title: 'Modern City Life', desc: 'Almaty और Astana — modern cities with malls, metro, और international standard amenities।' },
    { icon: 'GraduationCap', title: 'WFME Accredited', desc: 'Universities WFME और NMC दोनों से approved — global practice के लिए valid।' },
    { icon: 'Plane', title: 'Easy Connectivity', desc: 'Delhi से direct flights — 4 hours में Almaty। Vacation पर India आना easy है।' },
    { icon: 'BookOpen', title: 'Advanced Curriculum', desc: 'WHO और international standards के according updated medical curriculum।' },
    { icon: 'Stethoscope', title: 'Top Medical Facilities', desc: 'State-of-the-art teaching hospitals, simulation labs, और modern equipment।' },
    { icon: 'Globe', title: 'Multicultural Environment', desc: '5,000+ Indian students — diverse, supportive academic community।' },
  ],
  faqs: [
    { q: 'Kazakhstan MBBS degree India में recognized है?', a: 'Haan! NMC-approved universities की degree valid है। FMGE/NEXT exam qualify करके India में licensed doctor बन सकते हैं।' },
    { q: 'Kazakhstan और Russia में से कौन सा better है?', a: 'Dono excellent options हैं। Kazakhstan में fees slightly कम हैं और climate milder है। Russia में Indian community larger है। CAE experts आपकी profile के basis पर best option recommend करेंगे।' },
    { q: 'Kazakhstan में security कैसी है?', a: 'Kazakhstan एक very safe और stable country है। Almaty और Astana में Indian students का कोई security issue नहीं होता। Indian Embassy भी active है।' },
    { q: 'Language problem होगी?', a: 'Medical education English में होती है। Kazakh और Russian basic level पर 6–12 months में सीख जाते हैं। Indian community से भी बहुत help मिलती है।' },
    { q: 'Admission के लिए age limit क्या है?', a: 'Minimum 17 साल और maximum 25 साल admission year के December 31 को। NEET qualified होना अनिवार्य है।' },
    { q: 'CAE की Kazakhstan में क्या role है?', a: 'CAE university selection से लेकर departure तक — application, invitation letter, visa, pre-departure briefing, और FMGE coaching — सब कुछ handle करती है।' },
  ],
  metaTitle: 'Study MBBS in Kazakhstan | NMC Approved | Career Ambition Education Bihar',
  metaDesc: 'Study MBBS in Kazakhstan from NMC & WHO approved universities. Total cost ₹20–30L, English medium, modern infrastructure. Free counseling from CAE.',
  keywords: 'MBBS in Kazakhstan, Kazakhstan MBBS fees, Almaty medical university, MBBS Kazakhstan Bihar, NMC approved Kazakhstan',
}

const UZBEKISTAN: CountryData = {
  slug: 'uzbekistan',
  name: 'Uzbekistan',
  nameHi: 'उज़्बेकिस्तान',
  flag: '🇺🇿',
  tagline: 'उज़्बेकिस्तान में MBBS — नया Destination, बेहतरीन Future',
  heroSubtitle:
    'Uzbekistan — MBBS abroad का fastest growing destination। Affordable fees, NMC approved universities, और India-friendly environment में world-class medical education।',
  totalFee: '₹20–30L',
  tuitionPerYear: '₹2.5–4L',
  livingPerYear: '₹1.5–2L',
  duration: '6 Years',
  recognition: ['NMC Approved', 'WHO Listed', 'WFME Member', 'Asian Medical Council'],
  overview:
    'Uzbekistan तेजी से MBBS abroad का popular destination बन रहा है। यहाँ की government ने education sector में बड़े reforms किए हैं और international students को attract करने के लिए world-class medical universities develop की हैं। Tashkent (capital city) में excellent infrastructure और modern teaching hospitals हैं। Uzbekistan का culture Indian culture से काफी similar है — यह students को घर जैसा feel देता है।',
  whyChoose: [
    'Fastest growing MBBS destination — government-backed reforms',
    'Indian culture से similar — easy adjustment',
    'NMC approved universities — valid degree for India',
    'Warm और welcoming people — safe environment',
    'Tashkent — modern city, good connectivity',
    'Affordable total cost — ₹20–30L only',
    'No language barrier — English medium education',
  ],
  highlights: [
    { label: 'Total Duration', value: '6 Years' },
    { label: 'Medium', value: 'English' },
    { label: 'Total Cost', value: '₹20–30L' },
    { label: 'NMC Status', value: 'Approved' },
    { label: 'Capital', value: 'Tashkent' },
    { label: 'Intake', value: 'Sep–Oct' },
  ],
  eligibility: {
    neet: 'NEET qualification mandatory — valid scorecard required',
    marksGeneral: '50% marks in PCB (Physics, Chemistry, Biology)',
    marksOBC: '40% marks in PCB for SC/ST/OBC category',
    ageLimit: '17–25 years on or before December 31 of admission year',
    extra: [
      'Valid Indian passport (minimum 18 months validity)',
      'Class 10 & 12 marksheets with PCB subjects',
      'NEET scorecard (current year)',
      'Medical fitness certificate',
      'Police clearance certificate',
    ],
  },
  feeTable: [
    { label: 'Tuition Fee (per year)', amount: '₹2.5–4 Lakh', note: 'Varies by university' },
    { label: 'Hostel / Accommodation', amount: '₹60,000–1 Lakh/year', note: 'University hostel' },
    { label: 'Food & Living', amount: '₹80,000–1.2 Lakh/year', note: 'Estimated' },
    { label: 'One-time Registration', amount: '₹30,000–50,000', note: 'First year only' },
    { label: 'Total 6 Years (Estimate)', amount: '₹20–30 Lakh', note: 'All inclusive' },
  ],
  feeTotalNote:
    'Uzbekistan में MBBS सबसे नए और affordable options में से एक है। CAE counselors exact breakdown और best university recommend करेंगे।',
  admissionSteps: [
    { step: 1, title: 'Free Counseling लें', desc: 'CAE experts NEET score और budget के basis पर best Uzbek university suggest करेंगे।' },
    { step: 2, title: 'Documents Ready करें', desc: 'Passport, marksheets, NEET scorecard — सभी documents एक साथ तैयार करें।' },
    { step: 3, title: 'Application Submit करें', desc: 'CAE आपकी chosen university में application और documents submit करती है।' },
    { step: 4, title: 'Acceptance Letter मिलेगा', desc: 'University से official acceptance/offer letter 5–10 days में receive होगा।' },
    { step: 5, title: 'Visa Application', desc: 'Uzbekistan student visa apply करें — CAE complete documentation support करती है।' },
    { step: 6, title: 'Tashkent Departure', desc: 'Tashkent travel करें, university orientation attend करें, MBBS journey शुरू करें।' },
  ],
  documents: [
    'Valid Indian Passport (18+ months validity)',
    'Class 10 Certificate & Marksheet',
    'Class 12 Certificate & Marksheet (PCB)',
    'NEET Scorecard (current year)',
    'Passport-size Photographs (10–12)',
    'Medical Fitness Certificate',
    'Police Clearance Certificate',
    'HIV Test Report',
    'Birth Certificate',
    'Bank Statement (financial sponsor)',
  ],
  benefits: [
    { icon: 'Sparkles', title: 'Emerging Destination', desc: 'Government-backed education reforms — continuously improving quality और infrastructure।' },
    { icon: 'GraduationCap', title: 'NMC Approved', desc: 'NMC और WHO approved universities — FMGE/NEXT देकर India में practice करें।' },
    { icon: 'Landmark', title: 'Rich Cultural Connect', desc: 'Uzbek culture Indian culture से similar — food, hospitality, और values।' },
    { icon: 'IndianRupee', title: 'Budget Friendly', desc: 'Total ₹20–30L — India के most affordable MBBS abroad options में से एक।' },
    { icon: 'BookOpen', title: 'English Medium', desc: 'Complete MBBS program English में — language problem नहीं।' },
    { icon: 'Shield', title: 'Safe Environment', desc: 'Tashkent — safe, peaceful city with growing Indian student community।' },
  ],
  faqs: [
    { q: 'Uzbekistan MBBS India में valid क्यों है?', a: 'NMC-approved Uzbek medical universities से degree लेकर FMGE/NEXT exam pass करने के बाद India में registered doctor बन सकते हैं। यह legally valid process है।' },
    { q: 'Uzbekistan new destination है — reliable है?', a: 'Bilkul! Uzbekistan की universities NMC और WHO listed हैं। Government education reforms बहुत strong हैं। Thousands of Indian students successfully पढ़ रहे हैं।' },
    { q: 'Tashkent में Indian food और community है?', a: 'Haan! Tashkent में Indian restaurants, grocery stores, और active Indian student associations हैं। Indian Embassy भी Tashkent में है।' },
    { q: 'Fees कब और कैसे pay करनी होती है?', a: 'Fees year-wise या semester-wise pay होती है। First year fees admission के time pay होती है। CAE आपको complete fee schedule और payment process guide करती है।' },
    { q: 'MBBS के बाद PG कर सकते हैं?', a: 'Haan! FMGE/NEXT qualify करने के बाद India में PG entrance dena possible है। Uzbekistan से degree valid होती है NEET PG के लिए।' },
    { q: 'Admission process कितने दिन में complete होती है?', a: 'Application से visa तक typically 6–8 weeks का time लगता है। जल्दी apply करने से process smooth रहती है। CAE April से ही counseling शुरू करती है।' },
    { q: 'CAE क्या Uzbekistan में support देती है?', a: 'CAE university selection, application, documents, visa, pre-departure orientation, और FMGE coaching — सब कुछ handle करती है। आपको sirf study करना है।' },
  ],
  metaTitle: 'Study MBBS in Uzbekistan | NMC Approved | Career Ambition Education Bihar',
  metaDesc: 'Study MBBS in Uzbekistan at ₹20–30L total. NMC & WHO approved universities, English medium, emerging top destination. Free counseling from CAE Bihar.',
  keywords: 'MBBS in Uzbekistan, Uzbekistan MBBS fees, Tashkent medical university, MBBS Uzbekistan Bihar, affordable MBBS abroad',
}

export const ABROAD_COUNTRIES: CountryData[] = [RUSSIA, KYRGYZSTAN, KAZAKHSTAN, UZBEKISTAN]

export const ABROAD_SLUGS = ABROAD_COUNTRIES.map((c) => c.slug)

export function getCountryData(slug: string): CountryData | undefined {
  return ABROAD_COUNTRIES.find((c) => c.slug === slug)
}
