# BboyArena Development Log

Riepilogo dello sviluppo recente del progetto BboyArena.org.

Questo documento raccoglie il lavoro fatto negli ultimi giorni sul sito, sulla PWA, sulla struttura contenuti, sulle pagine di sviluppo e sulla prima base della UI di gioco. Non e' un changelog tecnico riga per riga: e' una mappa pratica per ricordare cosa e' stato costruito, perche' e dove intervenire nei prossimi passaggi.

## Stato generale

BboyArena.org e' stato portato da semplice progetto Astro/React a una base pubblica piu' completa:

- sito pubblico con identita' BboyArena.org;
- PWA installabile e configurata per Android/iOS;
- dominio custom `bboyarena.org`;
- SEO, sitemap, robots e metadata social;
- README orientato ai giocatori e alla community;
- home page piu' editoriale e visiva;
- fallback panoramico interattivo per i devlog;
- integrazione prevista con PocketBase per devlog live;
- area `__dev` per sviluppo gioco e UI interna;
- isolamento CSS della UI di gioco rispetto al sito Astro;
- prima struttura i18n per pagina/area.

## PWA e deploy

La PWA e' stata configurata per funzionare correttamente su GitHub Pages e dominio custom.

Interventi principali:

- configurazione di `@vite-pwa/astro`;
- manifest generato e servito come `manifest.webmanifest`;
- icone Android 192x192 e 512x512;
- icona Apple Touch;
- `display: standalone`;
- gestione corretta di `start_url` e `scope`;
- supporto per base path GitHub Pages e dominio custom;
- service worker Workbox in modalita' `generateSW`;
- banner di aggiornamento quando cambia versione in produzione;
- gestione del colore della barra PWA coerente con la navigation;
- redirect dal vecchio host GitHub Pages verso il dominio ufficiale.

File/aree coinvolte:

- `astro.config.mjs`
- `src/components/layout/Layout.astro`
- `public/manifest.webmanifest` tramite build PWA
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/apple-touch-icon.png`
- `public/icon.png`
- `public/CNAME`

Note importanti:

- in sviluppo locale il service worker non deve interferire troppo con reload e cache;
- in produzione il versioning usa `PUBLIC_APP_VERSION` o `GITHUB_SHA`;
- per GitHub Pages le env pubbliche devono essere disponibili nell'environment `github-pages`;
- il dominio ufficiale e' `https://bboyarena.org`.

## SEO, sitemap e dominio

Il progetto e' stato allineato al dominio `bboyarena.org` e alla configurazione SEO via environment variables.

Interventi principali:

- installazione e configurazione di `@astrojs/sitemap`;
- generazione automatica di `sitemap-index.xml`;
- aggiunta di `robots.txt`;
- metadata Open Graph e Twitter;
- canonical URL;
- JSON-LD tramite helper SEO;
- env SEO centralizzate;
- script analytics opzionale via env;
- contatto principale configurabile via `PUBLIC_CONTACT_EMAIL`.

File/aree coinvolte:

- `astro.config.mjs`
- `public/robots.txt`
- `src/lib/seo.ts`
- `src/components/layout/Layout.astro`
- `src/env.d.ts`
- `.env.example`
- `.github/workflows/deploy-pages.yml`

Env rilevanti:

```env
PUBLIC_SITE_URL=https://bboyarena.org
PUBLIC_SEO_SITE_NAME=BboyArena.org
PUBLIC_SEO_TITLE=BboyArena.org
PUBLIC_SEO_DESCRIPTION=...
PUBLIC_SEO_OG_IMAGE=...
PUBLIC_SEO_OG_IMAGE_ALT=...
PUBLIC_SEO_LOGO=...
PUBLIC_SEO_LOCALE=...
PUBLIC_SEO_TWITTER_SITE=...
PUBLIC_SEO_TWITTER_CREATOR=...
PUBLIC_SEO_AUTHOR=...
PUBLIC_CONTACT_EMAIL=info@bboyarena.org
PUBLIC_ANALYTICS_SCRIPT_URL=...
PUBLIC_ANALYTICS_WEBSITE_ID=...
```

## README e comunicazione pubblica

Il README e' stato trasformato da documento tecnico per sviluppatori a documento pubblico per giocatori, community e persone interessate al progetto.

Interventi principali:

- backup del README originale in `README.backup.md`;
- nuovo README in inglese;
- banner visuale `public/readme-banner.png`;
- tono piu' marketing/community;
- chiarimento che il gioco non e' ancora MVP;
- invito a condividere, seguire la repo e installare/seguire la PWA quando sara' utile;
- spiegazione del lavoro indipendente;
- nota sull'uso massivo di LLM e workflow vibe-based;
- indicazione che contributi, prompt e suggerimenti possono arrivare anche con LLM locali o a pagamento.

File/aree coinvolte:

- `README.md`
- `README.backup.md`
- `public/readme-banner.png`

## Home page

La home page e' stata raffinata come superficie pubblica principale del progetto.

Interventi principali:

- hero con banner visuale;
- copy piu' orientata alla cultura breaking;
- CTA verso manifesto e archivio devlog;
- card social per Discord, Instagram, GitHub e Newsletter;
- icone social nel footer in ordine Instagram, Discord, GitHub;
- rimozione dei social dai link generici testuali del footer;
- ribbon GitHub diagonale in stile repository;
- correzioni responsive su mobile;
- fix conflitto tra ribbon GitHub e navigation mobile;
- CTA secondarie adattive con min-height configurabile.

File/aree coinvolte:

- `src/components/pages/HomePage.astro`
- `src/components/cta/SecondaryCTA.astro`
- `src/components/layout/Layout.astro`
- `src/components/navigation/SiteNavigation.astro`
- `src/styles/global.css`

Dettaglio recente:

- `SecondaryCTA` ora supporta `minHeight="default"`, `minHeight="compact"` e `minHeight="none"`;
- la home mantiene card alte e stabili;
- il Manifesto usa card compatte;
- i bottoni restano dentro le card anche in layout stretti.

## Panorama e devlog fallback

La sezione devlog della home e' stata trasformata: quando non ci sono devlog locali, non appare piu' una card statica anonima, ma un panorama interattivo.

Interventi principali:

- aggiunta di `@photo-sphere-viewer/core`;
- componente React `PanoramaViewer`;
- wrapper Astro `PanoramaFallback`;
- immagine equirettangolare in `public/equirectangular-01.png`;
- autoplay/rotazione lenta;
- supporto touch e interazione mobile;
- panorama full-height/full-width nell'aside della home;
- overlay inferiore trasparente con titolo, descrizione e CTA;
- pulsante full-width stile manifesto;
- link CTA verso archivio devlog.

File/aree coinvolte:

- `src/components/media/PanoramaViewer.tsx`
- `src/components/media/PanoramaFallback.astro`
- `src/components/pages/HomePage.astro`
- `public/equirectangular-01.png`

API del componente:

```astro
<PanoramaFallback
  image="/equirectangular-01.png"
  fillParent
  overlayTitle="Ultimi devlog"
  overlayDescription="Gli appunti piu' recenti del progetto..."
  overlayCtaHref="/news/devlog"
  overlayCtaLabel="Leggi devlog"
/>
```

## PocketBase e devlog live

E' stata preparata una base per integrare devlog live da PocketBase senza dover fare commit e deploy per ogni nuovo contenuto.

Interventi principali:

- helper per configurazione PocketBase;
- URL list per ultimi devlog;
- URL record per singolo devlog;
- filtro opzionale via env;
- fallback locale se PocketBase non risponde o non contiene record;
- 404 capace di intercettare possibili route devlog e provare a leggere il record live.

File/aree coinvolte:

- `src/lib/pocketbase.ts`
- `src/components/pages/HomePage.astro`
- `src/pages/404.astro`
- `src/pages/news/[category]/index.astro`
- `src/pages/[locale]/news/[category]/index.astro`

Env rilevanti:

```env
PUBLIC_POCKETBASE_URL=
PUBLIC_POCKETBASE_DEVLOGS_COLLECTION=devlogs
PUBLIC_POCKETBASE_DEVLOGS_FILTER=
```

## News e devlogs

La sezione news esiste ancora a livello di route, ma e' stata ridimensionata nel modo in cui viene esposta nelle aree di sviluppo.

Interventi principali:

- rimozione dei devlog finti dalla home;
- uso del panorama come fallback quando non ci sono contenuti;
- link principale verso `/news/devlog`;
- nelle route `__dev` la navigation non mostra piu' `News`, ma `Devlogs`;
- anche il footer delle route `__dev` punta direttamente ai devlog.

File/aree coinvolte:

- `src/lib/news.ts`
- `src/components/pages/HomePage.astro`
- `src/components/layout/Layout.astro`
- `src/components/navigation/SiteNavigation.astro`
- `src/pages/news/*`
- `src/pages/[locale]/news/*`

## i18n

La struttura i18n e' stata riorganizzata per essere piu' leggibile e modificabile.

Prima:

- molti testi stavano concentrati in `src/lib/i18n.ts`;
- diventava difficile capire dove cambiare la copy di una pagina specifica.

Dopo:

- testi globali in `src/lib/i18n-data/site/`;
- testi per pagina in `src/lib/pages/`;
- tipi condivisi in `src/lib/i18n-types.ts`;
- README interno per spiegare dove mettere nuove traduzioni.

File/aree coinvolte:

- `src/lib/i18n.ts`
- `src/lib/i18n-types.ts`
- `src/lib/i18n-data/README.md`
- `src/lib/i18n-data/site/shared.ts`
- `src/lib/i18n-data/site/news.ts`
- `src/lib/i18n-data/site/game.ts`
- `src/lib/i18n-data/site/index.ts`
- `src/lib/pages/home.ts`
- `src/lib/pages/manifesto.ts`
- `src/lib/pages/legal.ts`

Regola pratica:

- se devi cambiare una card della home, guarda `src/lib/pages/home.ts`;
- se devi cambiare il Manifesto, guarda `src/lib/pages/manifesto.ts`;
- se devi cambiare testi legali, guarda `src/lib/pages/legal.ts`;
- se devi cambiare nav/footer/news/game globali, guarda `src/lib/i18n-data/site/`.

## Legal, privacy e contatti

Le pagine legali sono state aggiornate per usare l'email principale del progetto.

Interventi principali:

- email principale impostata a `info@bboyarena.org`;
- email resa configurabile via `PUBLIC_CONTACT_EMAIL`;
- copy legal/privacy/terms aggiornata per il progetto indipendente;
- allineamento con analytics privacy-friendly e sito pubblico.

File/aree coinvolte:

- `src/lib/pages/legal.ts`
- `src/components/pages/LegalPage.astro`
- `.env.example`
- `src/env.d.ts`

## Social e community

Sono stati aggiunti e sistemati i collegamenti social/community.

Interventi principali:

- Discord via `PUBLIC_DISCORD_URL`;
- Instagram via `PUBLIC_INSTAGRAM_URL`;
- GitHub via `PUBLIC_GITHUB_URL` o `GITHUB_REPOSITORY`;
- card dedicate in home;
- icone social nel footer;
- ordine footer: Instagram, Discord, GitHub;
- rimozione dei link social testuali generici con label external.

File/aree coinvolte:

- `src/components/pages/HomePage.astro`
- `src/components/cta/SecondaryCTA.astro`
- `src/components/layout/Layout.astro`
- `src/lib/pages/home.ts`
- `.env.example`
- `.github/workflows/deploy-pages.yml`

## UI gioco e isolamento CSS

La UI del gioco e' stata separata dal CSS globale del sito Astro/Tailwind.

Interventi principali:

- nuovo root isolato `#bboyarena-game-root`;
- file dedicato `src/game/game.css`;
- import CSS solo nel root del gioco;
- base CSS con `all: initial`;
- classi scoped sotto `.bboy-game-root`;
- HUD, menu, bottoni e pannelli spostati sotto `src/game/ui/`;
- stile iniziale urban browser game;
- pulsante fullscreen sempre disponibile;
- reticolo/cursore custom in fullscreen;
- menu 2D separato dal 3D;
- Three.js/R3F riservato al play/gameplay;
- Zustand usato per menu/scena;
- XState limitato alla logica di gioco.

File/aree coinvolte:

- `src/game/GameApp.tsx`
- `src/game/CanvasScene.tsx`
- `src/game/GamePlayScene.tsx`
- `src/game/game.css`
- `src/game/state/useGameStore.ts`
- `src/game/state/gameMachine.ts`
- `src/game/ui/GameHUD.tsx`
- `src/game/ui/GameMenu.tsx`
- `src/game/ui/GameButton.tsx`
- `src/game/ui/GamePanel.tsx`
- `src/game/ui/GameFullscreenToggle.tsx`
- `src/game/ui/GameFullscreenReticle.tsx`
- `src/game/ui/GamePlayHUD.tsx`
- `src/game/ui/GameUIDemoScene.tsx`

## Pagine `__dev`

L'area interna di sviluppo e' stata ampliata per provare gioco, UI e componenti senza sporcare le pagine pubbliche.

Route principali:

```txt
/__dev/play
/__dev/game-ui
/__dev/ui-demo
/__dev/tailwind-showcase
/__dev/component-lab
/__dev/leaderboard
```

Interventi principali:

- `__dev/play` come pagina presenter per il gioco;
- canvas/stage 16:9 e layout scuro da teatro;
- `__dev/game-ui` per testare HUD e componenti 2D del gioco;
- `__dev/ui-demo` come atlante per spacing, panel, button e superfici;
- navigazione dev semplificata verso `Devlogs`;
- import `game.css` nelle dev route dove serve.

File/aree coinvolte:

- `src/pages/[...dev].astro`
- `src/dev-pages/play.astro`
- `src/dev-pages/game-ui.astro`
- `src/dev-pages/ui-demo.astro`
- `src/dev-pages/tailwind-showcase.astro`
- `src/dev-pages/component-lab.astro`
- `src/dev-pages/leaderboard.astro`
- `readme-dev-ui.md`

## Assets aggiunti o sostituiti

Asset principali entrati nel progetto:

- `public/icon.png`;
- `public/android-chrome-192x192.png`;
- `public/android-chrome-512x512.png`;
- `public/apple-touch-icon.png`;
- `public/readme-banner.png`;
- `public/equirectangular-01.png`;
- `public/game-menu-background.png`;
- `public/CNAME`;
- `public/robots.txt`.

## Workflow GitHub Pages

Il workflow di deploy e' stato aggiornato per lavorare con GitHub Pages, dominio custom e variabili pubbliche.

Interventi principali:

- configurazione workflow Pages;
- env pubbliche passate al build;
- gestione dominio custom;
- `PUBLIC_APP_VERSION` collegabile a `GITHUB_SHA`;
- deploy statico Astro.

File/aree coinvolte:

- `.github/workflows/deploy-pages.yml`
- `astro.config.mjs`
- `.env.example`

## Verifiche fatte

Durante lo sviluppo e' stato usato spesso:

```bash
npm run build
```

Il build Astro risulta funzionante dopo le modifiche recenti.

Warning noto:

- alcuni chunk client superano 500 kB;
- in particolare `GameApp` e `PanoramaViewer` sono pesanti;
- non e' un errore, ma in futuro ha senso introdurre code splitting/dynamic import piu' mirati.

## Problemi risolti

Lista sintetica dei problemi affrontati:

- manifest PWA non trovato su path sbagliato;
- Chrome Android mostrava solo "Aggiungi a schermata Home";
- path base GitHub Pages `/bboyarena/`;
- service worker troppo aggressivo sugli update;
- PWA installata che non recepiva cambi;
- redirect da GitHub Pages a dominio ufficiale;
- differenza tra comportamento desktop e Android;
- discord card non usava env corretta;
- footer social duplicati;
- README troppo tecnico;
- ribbon GitHub rotto o fuori posto;
- mobile nav in conflitto con ribbon;
- news/devlog inizialmente troppo finte;
- fallback panorama non abbastanza integrato;
- card CTA con bottoni fuori dalla card;
- card manifesto troppo alte;
- UI gioco contaminata dal CSS globale;
- gestione i18n troppo concentrata in un file unico.

## Punti aperti consigliati

Prossimi passi naturali:

1. Scrivere il primo vero devlog.
2. Collegare PocketBase a contenuti reali.
3. Decidere se mantenere `/news` pubblica o spingere direttamente `/news/devlog`.
4. Migliorare code splitting per `GameApp` e `PanoramaViewer`.
5. Rifinire `__dev/game-ui` come vero design system 2D del gioco.
6. Stabilire una convenzione per prompt/asset LLM del visual.
7. Aggiungere test visuali o screenshot check per home, mobile nav e PWA.
8. Documentare meglio il flusso di update PWA per produzione.

## Ultima modifica locale non ancora storicizzata

La modifica piu' recente riguarda le route `__dev`:

- in `src/components/layout/Layout.astro` viene rilevato `pagePath` che inizia con `/__dev`;
- in quel caso la navigation mostra `Manifesto` e `Devlogs`;
- il link `Devlogs` punta a `/news/devlog`;
- nel footer delle route dev il link secondario non punta piu' al generico `/news`, ma ai devlog.

File coinvolti:

- `src/components/layout/Layout.astro`
- `src/components/navigation/SiteNavigation.astro`

