# CAE Brand Rules

## Color Palette

| Token      | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| Primary    | `#2E2567` | Headings, navbar, main brand   |
| Secondary  | `#644A9E` | Subheadings, accents           |
| Accent     | `#FBD207` | CTA buttons, highlights        |
| Amber      | `#ECA121` | Warnings, secondary CTAs       |
| WhatsApp   | `#25D366` | WhatsApp button only           |
| Dark Navy  | `#1A1840` | Footer, dark sections          |
| Background | `#F5F5F8` | Page background                |
| Border     | `#E2E0F0` | Card borders, dividers         |

---

## Typography
- Load **Poppins** + **Noto Sans Devanagari** from Google Fonts
- Poppins → all English content
- Noto Sans Devanagari → all Devanagari/Hindi content

---

## Tone
> Trustworthy · Friendly · Aspirational · Knowledgeable · Success-oriented

---

## CSS Custom Properties (Global Style Guide)

Add to `app/globals.css` under `:root`:

```css
:root {
  /* CAE Brand Colors */
  --ind:  #2e2567;     /* Primary indigo — headings, navbar */
  --pur:  #644a9e;     /* Secondary purple — subheadings */
  --yel:  #fbd207;     /* Accent yellow — CTAs, highlights */
  --amb:  #eca121;     /* Amber — secondary CTAs, warnings */
  --grn:  #15803d;     /* Green — success states */
  --wa:   #25d366;     /* WhatsApp green */
  --blue: #1a56db;     /* Info blue */
  --dk:   #1a1840;     /* Dark navy — footer */
  --gray: #f5f5f8;     /* Page background */
  --bdr:  #e2e0f0;     /* Border color */
  --mu:   #6b7280;     /* Muted text */
  --il:   #eeedf8;     /* Indigo light (card bg) */
  --pl:   #f0ecf8;     /* Purple light */
  --yl:   #fffbdf;     /* Yellow light */

  /* Layout */
  --r:    14px;        /* Default border radius */
  --max:  1240px;      /* Max content width */
  --tr:   all .22s cubic-bezier(.4,0,.2,1); /* Default transition */

  /* Typography */
  --font-poppins:           "Poppins", "Poppins Fallback";
  --font-noto-devanagari:   "Noto Sans Devanagari", "Noto Sans Devanagari Fallback";

  /* Spacing scale */
  --spacing: .25rem;

  /* Text sizes */
  --text-xs:   .75rem;
  --text-sm:   .875rem;
  --text-base: 1rem;

  /* Border radius scale */
  --radius-md:  .375rem;
  --radius-lg:  .5rem;
  --radius-xl:  .75rem;
  --radius-4xl: 2rem;

  /* Motion */
  --default-transition-duration:        .15s;
  --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  --animate-spin:  spin 1s linear infinite;
  --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
}

/* Global base styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0 solid;
}

html {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
  scroll-behavior: smooth;
}

body {
  color: var(--ind);
  background: #fff;
  font-family: var(--font-poppins), Poppins, sans-serif;
  line-height: 1.6;
  max-width: 100%;
  overflow-x: hidden;
}
```

---

## Tailwind Config (`tailwind.config.ts`)

```ts
theme: {
  extend: {
    colors: {
      ind:  '#2e2567',
      pur:  '#644a9e',
      yel:  '#fbd207',
      amb:  '#eca121',
      grn:  '#15803d',
      wa:   '#25d366',
      blue: '#1a56db',
      dk:   '#1a1840',
      gray: '#f5f5f8',
      bdr:  '#e2e0f0',
      mu:   '#6b7280',
      il:   '#eeedf8',
      pl:   '#f0ecf8',
      yl:   '#fffbdf',
    },
    borderRadius: {
      cae: '14px',
    },
    maxWidth: {
      cae: '1240px',
    },
    transitionTimingFunction: {
      cae: 'cubic-bezier(.4,0,.2,1)',
    },
    fontFamily: {
      poppins:     ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      devanagari:  ['var(--font-noto-devanagari)', 'Noto Sans Devanagari', 'sans-serif'],
    },
  }
}
```

---

## Do NOTs
- ❌ No Inter, Roboto, Arial, or system fonts
- ❌ No lorem ipsum or placeholder text — use real CAE content
- ❌ No purple gradients on white (generic AI look)
- ❌ No hard-coded contact details outside `/lib/constants.ts`

---

## Official Stats (Use Exactly)
```
10,000+   Successful admissions
17+       Years of experience
490+      Expert counselors
20        Bihar offices
100+      Partner colleges
3,000+    BSCC loans processed
90%+      BSCC loan approval rate
```

---

## Official Taglines (Use Exactly As Written)

| # | Tagline | Placement |
|---|---------|-----------|
| T1 | `"आपके सपनों के College में Admission — हम करेंगे आसान!"` | Homepage hero, popup heading |
| T2 | `"17 वर्षों से चंपारण की सबसे विश्वसनीय संस्था"` + `"10,000+ छात्रों का विभिन्न पाठ्यकर्मों में सफल नामांकन"` | Trust section, About page hero |
| T3 | `"कभी सोंचा है"` + `"12 के बाद क्या ?"` | Homepage attention hook, section break |
| T4 | `"अब fees की tension क्यों जब DRCC है साथ में!"` | BSCC loan page hero, loan section |

> ⚠️ Never paraphrase, translate, or modify these taglines. Use them verbatim.
