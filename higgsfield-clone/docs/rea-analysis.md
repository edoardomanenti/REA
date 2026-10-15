# Analisi REA di higgsfield.ai

Data della cattura: 2026-10-14. Browser: Chromium 141 headless, viewport
1440×900 (desktop) e 390×844 (mobile), collegato via CDP su `127.0.0.1`.
Strumenti: CLI REA di questa repo (`node scripts/rea.mjs`), più script
Playwright per scorrere la pagina e leggere gli stili calcolati.

## Evidence REA prodotte

| Operazione                | Evidence ID (prefisso)  | Risultato                                                                                 |
| ------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| `list_browser_targets`    | `ev_289898616b95a2d8`   | 1 pagina `https://higgsfield.ai/`                                                         |
| `inspect_web_page`        | `ev_8b1ae944803321508e` | 3708 nodi DOM, 2450 nodi di accessibilità, 24 script, 17 risorse; stato `policy_filtered` |
| `analyze_web_bundle`      | `ev_ba552698f5571cef`   | 608 script analizzati, 376 route candidate, 22 endpoint candidati                         |
| `capture_web_screenshot`  | `ev_94ca734a3b54a403`   | footer dell'originale                                                                     |
| `capture_web_screenshot`  | `ev_295ed6e85e4e7309`   | footer del clone                                                                          |
| `compare_web_screenshots` | `ev_455b1d4ff3d02d73`   | soglia 32: 19,3% dei pixel diversi (testi e marchio volutamente diversi)                  |

Le catture grezze (JSON e PNG) restano fuori dalla repo: contengono contenuti
e media dell'originale.

## Osservato (dalle evidence e dagli stili calcolati)

- **Stack**: TanStack Start (asset sotto `assets.higgsfield.ai/tanstack/`),
  autenticazione Clerk, consenso cookie Securiti.
- **Font**: Inter per il testo, Space Grotesk 700 maiuscolo con spaziatura
  negativa per i titoli.
- **Colori**: sfondo `#0f1113`, testo `#f7f7f8`, secondario `#898a8b`, menu
  `#a8a8a8`, accento lime `#d1fe17` (testo scuro `#1a1a1a`), badge rosa per
  sconti e "TOP".
- **Pulsante primario**: lime con gradiente verso `#ffff14`, ombra interna
  `0 -3px 0 #829b19`, raggio 12px, altezza 48px, 18px/600.
- **Header**: 52px in cima, compatto 36px dopo lo scroll. Le voci di menu sono
  28px, 14px/500, con badge "New"/"Top" lime al 20%.
- **Homepage**, dall'alto in basso, sezioni a margine laterale 16px:
  1. carosello di card 512×288;
  2. promo di iscrizione 640×272 e griglia 3×2 di card 241×130;
  3. banner AI Influencer;
  4. festival con conto alla rovescia e griglia 4 colonne;
  5. sezione MCP con agenti;
  6. Visual Effects (masonry a 5 colonne);
  7. Genjutsu (blocco nero, masonry a 5 colonne);
  8. sei gallerie modello (masonry a 4 colonne alte 976px, con dissolvenza e "View all");
  9. progetti;
  10. banner Supercomputer, Canvas e Photodump;
  11. "Explore more AI features";
  12. footer a 5 colonne con bagliore lime.
- **Studio immagini** (`/ai/image`): barra prompt in basso larga 1116px con
  modello, formato, qualità, risoluzione, quantità 1–4 e Generate.
- **Studio video** (`/ai/video`): colonna sinistra di 320px con schede
  Create/Edit/Motion Control, preset, riferimenti, prompt, modello, durata,
  formato, risoluzione, bitrate e Generate. A destra le schede History e
  How it works.
- **Route**: l'elenco completo è nell'evidence `analyze_web_bundle`. Quelle
  usate dal menu sono `/ai/image`, `/ai/video`, `/audio`, `/mcp`, `/katana`,
  `/ads-studio`, `/effects/use`, `/generate`, `/canvas` e altre.

## Dedotto o approssimato

- Stati hover e animazioni: non catturati. Il clone usa transizioni semplici.
- Contenuto dei menu a tendina dei modelli: non aperto durante la cattura. I
  modelli elencati vengono dal footer dell'originale.
- Barra promozionale sopra l'header: presente nell'albero di accessibilità ma
  già chiusa negli screenshot, quindi lo stile non è osservato. Il clone non la
  include.
- Il riepilogo dell'ispezione è `policy_filtered`: script e risorse di origini
  diverse da `https://higgsfield.ai` (CDN, Clerk) sono esclusi dal dettaglio di
  quella evidence. L'analisi del bundle li include, con
  `https://assets.higgsfield.ai` nella lista delle origini consentite.

## Pagine degli strumenti (cattura del 2026-10-15)

Ogni pagina è stata aperta in Chromium e ispezionata con `inspect_web_page`
(albero di accessibilità con testo), più uno screenshot a 1440×900.

| Pagina originale               | Evidence ID (prefisso)   | Nodi di accessibilità | Pagina del clone    |
| ------------------------------ | ------------------------ | --------------------- | ------------------- |
| `/audio`                       | `ev_aafd61e6c544ce1b3b8` | 343                   | `/audio`            |
| `/genjutsu`                    | `ev_9d6a6008ff81e31a326` | 3335                  | `/reality-swap`     |
| `/higgsfield-genjutsu-presets` | `ev_58c423d7c09ba8b5365` | 574                   | `/reality-swap`     |
| `/katana`                      | `ev_d39fe7769cf8dcb6ee7` | 727                   | `/quick-cut`        |
| `/ai-influencer-studio`        | `ev_f4587f1e78805c6de63` | 599                   | `/ai-influencer`    |
| `/ads-studio`                  | `ev_ade0962aa0b13a0a9df` | 348                   | `/ads-studio`       |
| `/effects/use`                 | `ev_dbd73ee680a93503c38` | 354                   | `/effects`          |
| `/generate` (Cinema Studio)    | `ev_efc2d2cd77114cae8c9` | 492                   | `/cinema-studio`    |
| `/marketing-studio`            | `ev_1bb5a087f3e0de44070` | 734                   | `/marketing-studio` |
| `/layers` (Edit)               | `ev_008230a019bf8671623` | 426                   | `/edit`             |

**Osservato:** struttura dei pannelli, etichette dei campi, numero di opzioni per
gruppo (per esempio AI Influencer: 9 tipi di personaggio, 5 generi, 26
acconciature…), filtri dei preset, layout con barra laterale propria di
Cinema Studio e Marketing Studio.

**Non osservato / ricostruito:**

- Lo studio di generazione di Genjutsu senza login reindirizza a `/ai/video`. Lo
  studio Motion transfer / Object swap del clone segue lo schema degli altri
  studi.
- Katana genera tramite Claude ("Send & Generate in Claude"). Il clone usa invece
  un normale pulsante Generate collegato a `runTool`.
- Ads Studio mostra solo il primo passo di "How it works". Gli altri due passi e
  le pagine interne degli strumenti sono ricostruzioni.
- I valori delle opzioni di AI Influencer (tranne i tipi di personaggio) e i nomi
  di preset e template sono testi segnaposto, non quelli dell'originale.

## Non ricostruito

Login, pagamenti, prezzi, community, profili, generazione reale (backend
proprietario), Supercomputer, 3D, Canvas, MCP e le altre pagine non elencate
sopra.
