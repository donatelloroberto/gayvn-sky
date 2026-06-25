# SkyStream GayVN Extensions

Adult-only (18+) SkyStream Gen 2 plugin repository converted from the **gayvn-cs-main** CloudStream extension pack.

- **16 fully converted plugins** — Kotlin source → SkyStream Gen 2 JavaScript
- All plugins: `isAdult: true`, `contentRating: "18+"`
- All plugins use `manifest.baseUrl` (user-configurable base URL)
- Runtime: SkyStream Gen 2 (`http_get`, `parseHtml`, `MultimediaItem`, `StreamResult`)

---

## Adding to SkyStream

1. In SkyStream, go to **Extensions → Add Repository**
2. Paste the raw URL for `repo.json` from this repository:
   ```
   https://<YOUR-USER>.github.io/<YOUR-REPO>/repo.json
   ```
3. All 16 plugins will appear in the Extensions catalog

---

## Plugins (16)

| Plugin | Base URL | Package |
|--------|----------|---------|
| BestHDgayporn | https://besthdgayporn.com | com.gayvn.besthdgayporn |
| BoyfriendTV | https://www.boyfriendtv.com | com.gayvn.boyfriendtv |
| Fxggxt | https://fxggxt.com | com.gayvn.fxggxt |
| Gaycock4U | https://gaycock4u.com | com.gayvn.gaycock4u |
| GayStream | https://gaystream.pw | com.gayvn.gaystream |
| Gayxx | https://gayxx.net | com.gayvn.gayxx |
| GEPorner | https://www.eporner.com | com.gayvn.geporner |
| GPornOne | https://pornone.com/gay | com.gayvn.gpornone |
| GPorntrex | https://www.porntrex.com | com.gayvn.gporntrex |
| GXtapes | https://gay.xtapes.in | com.gayvn.gxtapes |
| HDgay | https://hdgay.net | com.gayvn.hdgay |
| Jayboys | https://javboys.tv | com.gayvn.jayboys |
| Justthegays | https://justthegays.com | com.gayvn.justthegays |
| Nurgay | https://nurgay.to | com.gayvn.nurgay |
| topHDgayporn | https://tophdgayporn.com | com.gayvn.tophdgayporn |
| Xhamster | https://vi.xhspot.com/gay | com.gayvn.xhamster |

---

## Source

Converted from the **gayvn-cs-main** CloudStream repository.

- 16 plugins had full Kotlin source code and were converted to SkyStream Gen 2 JS
- 28 plugins existed only as compiled `.cs3` binaries (not convertible) — see `CONVERSION_MAP.md`

---

## Plugin Architecture

Every plugin uses the shared **CONFIG + collectStreams** engine:

- `CONFIG` object — holds `baseUrl`, `cardSelectors`, `searchTemplates`, home sections
- `getHome(cb)` — fetches each home section, parses video cards via CSS selectors
- `search(query, cb)` — URL-template-based search with slug/encoded variants
- `load(url, cb)` — OG-meta scraper returning a `MultimediaItem` with recommendations
- `loadStreams(url, cb)` — multi-strategy stream extractor:
  - Direct MP4/M3U8 regex scan of page HTML
  - `var sources = [...]` JSON arrays (BoyfriendTV pattern)
  - EPorner XHR API with base36 hash conversion
  - JSON-LD `contentUrl` / structured data walk
  - `<video>` / `<source>` / data-* attribute scan
  - Recursive iframe depth-2 crawl (ads filtered)
  - Dean Edwards p,a,c,k,e,r unpacker

---

## Development

```bash
# Validate all plugins and repo.json
node scripts/validate.mjs

# Run build checks (file presence + manifest field validation)
node scripts/build.mjs
```

Plugins are pre-built single-file IIFE JavaScript — no compilation step needed.

---

## Repository Structure

```
skystream-gayvn-extensions/
├── repo.json                     # SkyStream repository index
├── package.json
├── README.md
├── CONVERSION_MAP.md             # Full Kotlin → JS conversion record
├── .github/
│   └── workflows/
│       └── publish.yml           # CI: validate + deploy to GitHub Pages
├── scripts/
│   ├── validate.mjs              # Field validation for all plugins
│   └── build.mjs                 # File presence + manifest checks
└── plugins/
    ├── BestHDgayporn/
    │   ├── plugin.js
    │   └── plugin.json
    ├── BoyfriendTV/
    │   ├── plugin.js
    │   └── plugin.json
    └── … (16 plugins total)
```
