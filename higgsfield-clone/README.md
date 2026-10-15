# Clone frontend di higgsfield.ai

Ricostruzione dell'interfaccia di [higgsfield.ai](https://higgsfield.ai) fatta con
gli strumenti browser di REA (vedi [docs/rea-analysis.md](docs/rea-analysis.md)).
Riproduce struttura, layout, misure, colori, font e interazioni delle pagine
principali. Marchio, logo, nomi dei prodotti proprietari e media sono segnaposto
da sostituire con i tuoi.

## Avvio

Richiede Node.js 24 (come la repo REA).

```bash
cd higgsfield-clone
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # typecheck + build in dist/
npm run preview    # serve la build su http://127.0.0.1:4173
```

## Pagine ricostruite

| Route                    | Contenuto                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `/`                      | Homepage completa: header, carosello, promo, banner, festival, MCP, effetti, gallerie, progetti, footer    |
| `/ai/image`              | Studio immagini: banner, stato iniziale, barra prompt con modello, formato, qualità, risoluzione, quantità |
| `/ai/video`              | Studio video: pannello impostazioni (riferimenti, prompt, modello, durata, formato, risoluzione, bitrate)  |
| `/audio`                 | Audio: Text to Speech, Voice Change, Translate                                                             |
| `/reality-swap`          | Landing "Reality Swap" (al posto di Genjutsu) con feed dei preset                                          |
| `/reality-swap/create`   | Studio Motion transfer / Object swap: video sorgente, personaggio, location, prodotti                      |
| `/quick-cut`             | "Quick Cut" (al posto di Katana): video di riferimento + personaggi, preset della community                |
| `/ai-influencer`         | AI Influencer: 19 gruppi di attributi, modalità Motion, galleria                                           |
| `/ads-studio`            | Landing Ads Studio con i due strumenti                                                                     |
| `/ads-studio/create`     | Static ads: sito del brand, prodotti, formato, quantità                                                    |
| `/ads-studio/multiplier` | Ad multiplier: annuncio di riferimento + prodotti e personaggi                                             |
| `/effects`               | Effects: scelta preset, personaggio, location, prodotti, risoluzione e formato                             |
| `/cinema-studio`         | Cinema Studio con barra laterale propria: riferimenti, film setup, camera, palette, luci, modello          |
| `/marketing-studio`      | Marketing Studio: prompt, inquadratura, formato, avatar e prodotto, template filtrabili                    |
| `/edit`                  | Edit / Layers: carosello degli strumenti, caricamento immagine, progetti                                   |
| altre                    | Pagina "Coming soon" con link agli studi                                                                   |

Su telefono compaiono l'header ridotto e la barra di navigazione in basso, come
sull'originale.

## Dove personalizzare

| Cosa                          | File                                                                   |
| ----------------------------- | ---------------------------------------------------------------------- |
| Nome, logo, indirizzo, social | `src/config/brand.ts`, `src/components/Logo.tsx`, `public/favicon.svg` |
| Modelli e opzioni             | `src/config/models.ts`                                                 |
| Testi e media della homepage  | `src/content/home.ts`                                                  |
| Menu e footer                 | `src/content/navigation.ts`                                            |
| Colori e font                 | `src/styles/global.css` (variabili in `:root`)                         |

### Media

Ogni immagine o video è un componente `Media` che, senza sorgente, disegna un
gradiente segnaposto con le stesse proporzioni dell'originale. Per usare i tuoi
file aggiungi `media: { src: "/tuo-video.mp4", kind: "video" }` alla voce in
`src/content/home.ts` (i file statici vanno in `public/`).

## Collegare i modelli (Seedance, GPT Image, Kling, ...)

Tutte le generazioni passano da un solo file: `src/api/generation.ts`.

- Image e Video chiamano `generateImage` / `generateVideo`.
- Tutti gli altri studi chiamano `runTool({ tool, prompt, options, files })`:
  `tool` dice quale strumento (per esempio `ads.static`, `effects`, `cinema`),
  `files` contiene i file caricati divisi per casella (`character`, `product`,
  `source`...) e `options` tutte le impostazioni scelte. Prima di chiamare il
  provider, `runTool` controlla che ci siano i file obbligatori e il prompt.

- `generateImage(request)` e `generateVideo(request)` ricevono già tutti i
  parametri scelti nell'interfaccia (modello, prompt, formato, durata, file di
  riferimento...).
- Implementa `provider.generateImage`, `provider.generateVideo` e
  `provider.runTool` e restituisci
  `{ ok: true, assets }` con gli URL dei risultati: le pagine li mostrano da sole
  (griglia immagini e cronologia video).
- Finché non colleghi nulla, il pulsante Generate mostra "No ... provider is
  connected yet".
- Le chiavi API devono restare su un tuo server: dal browser chiama il tuo
  backend (c'è un esempio commentato nel file), mai il fornitore del modello con
  la chiave dentro il codice frontend.

I prezzi in crediti sono opzionali: aggiungi `credits` a un modello in
`src/config/models.ts` e il numero comparirà sul pulsante Generate.

## Limiti noti

- Solo frontend: niente login, pagamenti, profili o community.
- Le pagine non elencate sopra non sono ricostruite.
- Alcuni dettagli non osservati (stili hover, contenuti dei menu a tendina
  dell'originale, barra promozionale in cima) sono approssimati; vedi
  [docs/rea-analysis.md](docs/rea-analysis.md).
