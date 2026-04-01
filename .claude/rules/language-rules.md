# CAE Language Rules

## Primary Language: Hinglish (Hindi + English mixed)

| Rule    | Element          | Instruction                          | Example                                                              |
|---------|------------------|--------------------------------------|----------------------------------------------------------------------|
| RULE 1  | Headings         | Start Hindi (Devanagari), then English | `"आपके सपनों के College में Admission"`                              |
| RULE 2  | CTAs / Buttons   | Hindi + English in same button       | `"Free Counseling लें"`, `"Apply करें"`, `"College खोजें"`          |
| RULE 3  | Descriptions     | Full Hinglish sentences              | `"Free counseling, कोई obligation नहीं।"`                            |
| RULE 4  | Form errors      | Full Hindi only                      | `"कृपया अपना नाम डालें"`, `"Phone number 10 digits का होना चाहिए"`  |
| RULE 5  | Success messages | Full Hindi with student name         | `"धन्यवाद [Name]! हम 2 घंटे में call करेंगे। 🎓"`                   |
| RULE 6  | FAQ              | Questions + Answers in Hinglish      | Q: `"MBBS Abroad India mein valid hai?"` A: `"Haan, bilkul valid hai।"` |
| RULE 7  | Blog titles      | Hinglish for SEO                     | `"JEE Main 2026 ke baad B.Tech ke liye best colleges"`               |
| RULE 8  | Meta tags        | English ONLY                         | `"Free college admission guidance in Bihar since 2009."`             |
| RULE 9  | Numbers          | Always English numerals              | `"10,000+"` not `"१०,०००+"`                                         |
| RULE 10 | College names    | Always English                       | `"Chandigarh University"`, `"LPU"`, `"SRM"`                         |

---

## Extended Rules

| Rule    | Element        | Instruction                           | Example                                             |
|---------|----------------|---------------------------------------|-----------------------------------------------------|
| RULE 11 | Image alt text | English only (SEO + screen readers)   | `alt="CAE counselor helping Bihar student"`         |
| RULE 12 | URL slugs      | English only, lowercase, hyphenated   | `/mbbs-abroad`, `/bscc-loan`, `/study-abroad`       |
| RULE 13 | Schema markup  | English only                          | JSON-LD in English                                  |
| RULE 14 | OG / Social    | English only                          | OpenGraph title and description in English          |
| RULE 15 | Popup heading  | Hindi (Devanagari) — T1 tagline only  | `"आपके सपनों के College में Admission"`              |

---

## Fonts

| Language | Font                   | Weights              |
|----------|------------------------|----------------------|
| English  | Poppins                | 400, 500, 600, 700, 800, 900 |
| Hindi    | Noto Sans Devanagari   | 400, 500, 700, 800   |

**Tailwind classes:**
- English text → `font-poppins`
- Hindi/Devanagari text → `font-devanagari`

---

## SEO Language Strategy

### Primary Keywords (English — for meta tags, schema)
```
college admission bihar
MBBS abroad bihar
DRCC loan bihar
career counseling motihari
engineering admission bihar
BSCC loan bihar
```

### Secondary Keywords (Hinglish — for blog titles, FAQ)
```
bihar mein college admission
MBBS abroad ki fees
BSCC loan kaise milega
12th ke baad kya kare
engineering ke liye best college
```

### Rules Summary
| Element        | Language      |
|----------------|---------------|
| Meta title     | English only  |
| Meta description | English only |
| OG tags        | English only  |
| URL slugs      | English only  |
| Alt text       | English only  |
| Schema markup  | English only  |
| Blog titles    | Hinglish      |
| Page headings  | Hindi first, then English |
| Body copy      | Hinglish      |
| CTAs           | Hinglish      |
| Error messages | Full Hindi    |
| Success messages | Full Hindi  |

---

## Quick Reference — Common Phrases

| Context        | Correct Hinglish / Hindi                                      |
|----------------|---------------------------------------------------------------|
| Hero CTA       | `"Free Counseling लें →"`                                     |
| Course CTA     | `"College खोजें →"`                                          |
| Apply CTA      | `"Apply करें →"`                                             |
| Call CTA       | `"अभी Call करें →"`                                          |
| WhatsApp CTA   | `"WhatsApp करें →"`                                          |
| MBBS CTA       | `"MBBS Abroad जानें →"`                                       |
| Loan CTA       | `"BSCC Loan Apply करें →"`                                   |
| Empty name err | `"कृपया अपना नाम डालें"`                                      |
| Phone err      | `"Phone number 10 digits का होना चाहिए"`                     |
| Course err     | `"कृपया course चुनें"`                                        |
| Status err     | `"कृपया अपनी status चुनें"`                                   |
| City err       | `"कृपया अपना शहर बताएं"`                                      |
| Success msg    | `"धन्यवाद [Name]! हम 2 घंटे में call करेंगे। 🎓"`             |
