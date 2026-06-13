# Parklyckan — startsida (remake)

Modern remake av [parklyckan.com](https://parklyckan.com) med fokus på
tydligare struktur, bättre responsivitet och ett genomgående
"nästan slutsålt"-budskap.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4 (CSS-first config i `app/globals.css`)
- shadcn-style komponenter i `components/ui` (`components.json` finns,
  så `npx shadcn@latest add <component>` fungerar för fler komponenter)
- Deploy: Vercel

## Kom igång

```bash
npm install
npm run dev
```

## Innehåll & säljläge

Allt redigerbart innehåll ligger i `data/site.ts`:

- `availability.soldCount` — styr announcement bar, hero-mätaren och
  lägenhetssektionen. **Uppdatera detta tal när lägenheter säljs.**
- `remainingApartments` — placeholder-data. Ersätt med de faktiska
  kvarvarande lägenheterna från Nadjafi & Kristensen.
- `images` — pekar just nu mot originalsajtens bilder (hotlinkade).
  Flytta till `/public` eller egen CDN innan produktion.

## Att göra innan lansering

- [ ] Koppla intresseformuläret till API-route/e-post eller CRM
      (`components/sections/interest-form.tsx`)
- [ ] Verifiera faktiskt antal sålda/kvarvarande lägenheter
- [ ] Egna bildfiler istället för hotlinks
- [ ] GTM/analytics om det ska behållas
- [ ] Undersidor: Våra lägenheter, Webbkamera, Personuppgiftspolicy
