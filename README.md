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
- `remainingApartments` — de kvarvarande lägenheterna från
  lägenhetsväljaren.
- `images` — pekar just nu mot originalsajtens bilder (hotlinkade).
  Flytta till `/public` eller egen CDN innan produktion.

## Att göra innan lansering

- [ ] Sätt env-variablerna för intresseformuläret i Vercel (se nedan)
- [ ] Verifiera faktiskt antal sålda/kvarvarande lägenheter
- [ ] Egna bildfiler istället för hotlinks
- [ ] GTM/analytics om det ska behållas
- [ ] Undersidor: Våra lägenheter, Webbkamera, Personuppgiftspolicy

## Intresseformuläret

Formuläret postar till `app/api/intresse/route.ts`, som skickar e-post via
[Resend](https://resend.com). Mottagare styrs i `lib/seo.ts`
(`SITE.interestForm`): till `bastad@notar.se`, kopia till
`daniel@akselson.com`. Svar går direkt till den som anmält sig (Reply-To).

Env-variabler (Vercel → Settings → Environment Variables):

- `RESEND_API_KEY` — API-nyckel från Resend.
- `INTEREST_FORM_FROM` — avsändare på en domän verifierad i Resend,
  t.ex. `Parklyckan <intresse@parklyckan.se>`.

Saknas någon av dem svarar API:t 503 och formuläret visar ett felmeddelande
med mäklarens e-postadress.
