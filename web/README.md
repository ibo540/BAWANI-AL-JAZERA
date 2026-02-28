# Bawani Al-Jazera | بواني الجزيرة

Bilingual (English / Arabic) construction company website with 3D hero, turquoise brand theme, and modern animations.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **React Three Fiber** + Drei (3D hero)
- **Framer Motion** (animations)
- **next-intl**-style i18n with `[locale]` routing

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); you will be redirected to `/en`. Use the header to switch to `/ar` (RTL).

## Structure

- `app/[locale]/` — All pages (home, about, services, projects, contact)
- `components/layout/` — Header, Footer, LanguageSwitcher
- `components/sections/` — HeroSection, ServicesSection, WhyUsSection, CTASection, ContactForm
- `components/three/` — HeroScene (R3F)
- `lib/i18n/` — Locales (en, ar), dictionaries, getDictionary

## Brand

- **Primary color:** Turquoise (`#0d9488`)
- **Fonts:** Montserrat (Latin), Tajawal (Arabic)
- Replace `public/logo.svg` with your logo asset.

## Contact form

The contact form is front-end only. To send emails, wire it to Formspree, Netlify Forms, or your API.
