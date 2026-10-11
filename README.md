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

- [ ] Lägg till Neon och sätt env-variablerna för formuläret och admin i Vercel (se nedan)
- [ ] Verifiera faktiskt antal sålda/kvarvarande lägenheter
- [ ] Egna bildfiler istället för hotlinks
- [ ] GTM/analytics om det ska behållas
- [ ] Undersidor: Våra lägenheter, Webbkamera, Personuppgiftspolicy

## Intresseformuläret och admin

Formuläret postar till `app/api/intresse/route.ts`, som:

1. **Sparar anmälan i Postgres** (tabellen `interest_submissions`). Tabellen
   skapas automatiskt vid första anropet, ingen manuell migrering behövs.
2. **Mejlar mäklaren via [Resend](https://resend.com).** I produktion går mejlet
   till `bastad@notar.se`, kopia till `daniel@akselson.com` och dold kopia till
   `gabriel@ardiles.se` (`SITE.interestForm` i `lib/seo.ts`). Reply-To är den
   som anmält sig.

   **Testa live:** skicka formuläret med en av mottagarnas egna adresser som
   e-post. Mejlet går då bara till den adressen, märkt `[TEST]`, och mäklaren
   störs inte.

Anmälan räknas som mottagen om minst en av kanalerna lyckas. Ett misslyckat
mejl syns i admin och kan skickas om därifrån. Preview och lokalt mejlar
aldrig mäklaren, om inte `INTEREST_NOTIFICATION_TO` är satt.

### Admin: `/admin`

Lösenordsskyddad lista över alla anmälningar: status (Ny, Kontaktad, Klar,
Skräp), anteckningar, sök, CSV-export för Excel, skicka om mejl och radera
(t.ex. när någon återkallar sitt samtycke).

### Env-variabler (Vercel → Settings → Environment Variables)

| Variabel | Krävs | Beskrivning |
|---|---|---|
| `DATABASE_URL` | Ja | Sätts automatiskt när Neon läggs till under Vercel → Storage. |
| `ADMIN_PASSWORD` | Ja | Lösenord till `/admin`, minst 10 tecken. Byte loggar ut alla. |
| `RESEND_API_KEY` | För mejl | API-nyckel från Resend. |
| `INTEREST_FORM_FROM` | För mejl | Avsändare på en domän verifierad i Resend, t.ex. `Parklyckan <no-reply@polarweb.se>`. |
| `INTEREST_NOTIFICATION_TO` | Nej | Ersätter mottagarna (kommaseparerad). Använd lokalt och i preview. |

Se `.env.example`. Lokalt räcker en lokal Postgres:
`createdb parklyckan` och `DATABASE_URL=postgres://<user>@localhost:5432/parklyckan`.
