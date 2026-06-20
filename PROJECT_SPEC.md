# BboyArena.org - Project Spec

Documento di riferimento per la struttura del progetto, i componenti principali, le route e le convenzioni operative.

## 1. Identita del progetto

- `BboyArena.org` e un progetto indipendente dedicato alla cultura breaking, al movimento creativo e allo sviluppo sperimentale.
- Il sito e una superficie pubblica essenziale sopra un progetto in evoluzione.
- Il tono visivo e urban, underground, leggibile e non corporate.
- Il progetto privilegia contenuti statici, route semplici e manutenzione facile.

## 2. Stack tecnico

- `Astro` per il rendering statico e il routing.
- `React` per le parti interattive lato client.
- `TypeScript` per la tipizzazione.
- `TailwindCSS v4` per lo styling.
- `Three.js` + `@react-three/fiber` + `@react-three/drei` per la parte 3D.
- `Zustand` per stato UI e stato condiviso.
- `XState` per la macchina a stati del gameplay.
- `@vite-pwa/astro` per la PWA.
- `Supabase` per il client e l'infrastruttura dati predisposta.

## 3. Comandi principali

- `npm run dev` avvia lo sviluppo locale.
- `npm run build` genera il sito statico in `dist/`.
- `npm run preview` serve la build locale.
- `npm run astro` espone il CLI di Astro.

## 4. Struttura generale delle route

### Route pubbliche principali

- `/` home
- `/manifesto`
- `/news`
- `/news/devlog`
- `/news/app`
- `/news/scene`
- `/privacy`
- `/cookies`
- `/terms`
- `/open-development`
- `/contact`

### Route localizzate

- `/it/*`
- `/es/*`
- `/pt-br/*`
- `/zh/*`

Le pagine locali seguono la stessa struttura delle route principali e sono generate con Astro i18n.

### Route tecniche e di supporto

- `/[...dev]` per pagine dev/locali di supporto.

## 5. Componenti principali

### Layout

- [src/components/layout/Layout.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/layout/Layout.astro)
- E il wrapper globale di tutte le pagine.
- Gestisce:
  - `<head>` e SEO
  - navigazione superiore
  - struttura del main
  - footer globale
  - alternates locali
  - canonical
  - JSON-LD

### Navigazione

- [src/components/navigation/SiteNavigation.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/navigation/SiteNavigation.astro)
- [src/components/navigation/HomeLogo.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/navigation/HomeLogo.astro)

Funzioni:

- menu principale
- switch lingua
- menu mobile
- logo cliccabile verso la home

### Pagine

- [src/components/pages/HomePage.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/pages/HomePage.astro)
- [src/components/pages/ManifestoPage.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/pages/ManifestoPage.astro)
- [src/components/pages/LegalPage.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/pages/LegalPage.astro)

Responsabilita:

- `HomePage`: hero, devlogs recenti, CTA manifesto e archivio
- `ManifestoPage`: contenuto narrativo del manifesto
- `LegalPage`: rendering comune per privacy, cookies, terms, open development e contact

### Game layer

- [src/components/game/GameApp.tsx](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/game/GameApp.tsx)
- [src/components/game/GameCanvas.tsx](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/game/GameCanvas.tsx)
- [src/components/game/Hud.tsx](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/game/Hud.tsx)
- [src/components/game/Player.tsx](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/game/Player.tsx)

Questi componenti governano:

- scena 3D
- HUD di gioco
- player control
- interazioni client side

## 6. Librerie di supporto

### SEO e routing

- [src/lib/seo.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/seo.ts)
- [src/lib/i18n.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/i18n.ts)

### Contenuti editoriali

- [src/lib/home.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/home.ts)
- [src/lib/manifesto.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/manifesto.ts)
- [src/lib/news.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/news.ts)
- [src/lib/legal.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/legal.ts)

### Dati e integrazioni

- [src/lib/supabase.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/supabase.ts)
- [src/data/navigation.json](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/data/navigation.json)

## 7. Design system

### Principi visivi

- atmosfera street / underground
- leggibilita alta
- layout robusto e semplice
- niente look corporate freddo
- niente componenti inutilmente complessi

### Pattern ricorrenti

- pannelli con bordo e ombra
- chip/capsule per label brevi
- bottoni solo dove serve una CTA vera
- footer usato come site map testuale

### Regole di layout

- max width leggibile su contenuti lunghi
- header sticky
- footer con struttura a colonne su desktop
- mobile full width e stack verticale

## 8. Footer globale

Il footer globale deve includere:

- `Manifesto`
- `Privacy`
- `Cookies`
- `Terms`
- `Contact`
- `Open Source`
- `Participate`
- `GitHub` se disponibile

Comportamento attuale:

- su desktop: logo a sinistra, link allineati a destra
- su mobile: tutto centrato e impilato
- i link sono testuali, non button-like

## 9. SEO e metadata

- Il title globale di default e `BboyArena.org`.
- La description globale sintetizza il manifesto del progetto.
- `Layout.astro` gestisce:
  - title
  - description
  - canonical
  - alternates
  - Open Graph
  - Twitter Card
  - JSON-LD

### Pagine article

Per contenuti editoriali si usa `type="article"` e, se necessario:

- `publishedTime`
- `modifiedTime`
- `section`
- `tags`

## 10. Pagine legali e informative

Le pagine legali sono generate con `LegalPage.astro` e condividono il contenuto definito in `src/lib/legal.ts`.

### Pagine presenti

- `Privacy Policy`
- `Cookie Policy`
- `Terms of Service`
- `Open Development`
- `Contact`

### Convenzioni contenuto

- tono chiaro e semplice
- inglese per i contenuti pubblici
- riferimento privacy a `giorgiotedesco.it`
- email privacy: `privacy@giorgiotedesco.it`
- analytics self-hosted su `get.giorgiotedesco.it`
- niente cookie banner invasivo
- niente cookie di profilazione

## 11. Convenzioni i18n

- Lingua di default: `en-US`
- Localizzazioni supportate:
  - `it-IT`
  - `es-419`
  - `pt-BR`
  - `zh-Hans`

Le route localizzate vengono generate con lo stesso schema della pagina principale.

## 12. Environment variables

Le variabili principali sono documentate in `.env.example` e devono essere aggiunte prima in `src/env.d.ts`.

### Principali variabili esposte

- `PUBLIC_SITE_URL`
- `PUBLIC_GITHUB_URL`
- `PUBLIC_SEO_SITE_NAME`
- `PUBLIC_SEO_TITLE`
- `PUBLIC_SEO_DESCRIPTION`
- `PUBLIC_SEO_OG_IMAGE`
- `PUBLIC_SEO_OG_IMAGE_ALT`
- `PUBLIC_SEO_LOGO`
- `PUBLIC_SEO_LOCALE`
- `PUBLIC_SEO_TWITTER_SITE`
- `PUBLIC_SEO_TWITTER_CREATOR`
- `PUBLIC_SEO_AUTHOR`
- `PUBLIC_NEWS_EXTERNAL_FEED_URL`
- `PUBLIC_NEWS_EXTERNAL_SOURCE_NAME`
- `PUBLIC_NEWS_EXTERNAL_SOURCE_URL`

## 13. File chiave da tenere d'occhio

- [src/components/layout/Layout.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/layout/Layout.astro)
- [src/components/pages/HomePage.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/pages/HomePage.astro)
- [src/components/pages/ManifestoPage.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/pages/ManifestoPage.astro)
- [src/components/pages/LegalPage.astro](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/components/pages/LegalPage.astro)
- [src/lib/i18n.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/i18n.ts)
- [src/lib/legal.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/legal.ts)
- [src/lib/manifesto.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/manifesto.ts)
- [src/lib/home.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/home.ts)
- [src/lib/news.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/news.ts)
- [src/lib/seo.ts](/home/giorgionetg/Scrivania/Progetti%20Web/breaking-2/src/lib/seo.ts)

## 14. Note operative

- Preferire componenti piccoli e riusabili.
- Evitare dipendenze nuove se non necessarie.
- Mantenere il sito statico salvo esigenze reali.
- Tenere il footer e il layout globale coerenti con il resto della UI.
- Ogni modifica strutturale dovrebbe preservare la leggibilita mobile.

## 15. Stato attuale

- Build statica funzionante.
- Pagine legali e informative presenti.
- Footer globale aggiornato.
- SEO globale allineata a `BboyArena.org`.

