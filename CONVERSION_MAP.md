# Conversion Map — gayvn-cs-main → SkyStream Gen 2

Records the full conversion status of every plugin in the **gayvn-cs-main** CloudStream repository.

---

## Converted Plugins (16) — Full Kotlin Source → SkyStream Gen 2 JS

All converted plugins:
- Use `manifest.baseUrl` (user-configurable)
- Set `isAdult: true` and `contentRating: "18+"`
- Use the shared CONFIG + collectStreams engine
- Runtime functions: `http_get`, `parseHtml`, `MultimediaItem`, `StreamResult`

| Plugin | Package Name | Base URL | Kotlin Class | Stream Technique |
|--------|-------------|----------|--------------|-----------------|
| BestHDgayporn | com.gayvn.besthdgayporn | https://besthdgayporn.com | BestHDgayporn.kt | aiovg-item-video cards; mp4/m3u8 regex + iframe crawl |
| BoyfriendTV | com.gayvn.boyfriendtv | https://www.boyfriendtv.com | BoyfriendTV.kt | `var sources=[...]` JSON array with quality labels |
| Fxggxt | com.gayvn.fxggxt | https://fxggxt.com | Fxggxt.kt | article.loop-video.thumb-block cards; iframe extractor |
| Gaycock4U | com.gayvn.gaycock4u | https://gaycock4u.com | Gaycock4U.kt | elementor-post cards; iframe data-src extractor |
| GayStream | com.gayvn.gaystream | https://gaystream.pw | GayStream.kt | div.grid-item cards; onclick button iframe crawl |
| Gayxx | com.gayvn.gayxx | https://gayxx.net | Gayxx.kt | div.videopost cards; iframe data-src extractor |
| GEPorner | com.gayvn.geporner | https://www.eporner.com | GEporner.kt | EP.video.player.vid+hash → XHR API; base36 hash conversion |
| GPornOne | com.gayvn.gpornone | https://pornone.com/gay | GPornOne.kt | .popbop.vidLinkFX cards; #pornone-video-player source tags |
| GPorntrex | com.gayvn.gporntrex | https://www.porntrex.com | GPorntrex.kt | div.video-item cards; var flashvars JSON video_url/video_alt_url |
| GXtapes | com.gayvn.gxtapes | https://gay.xtapes.in | GXtapes.kt | ul.listing-tube li cards; #video-code iframe |
| HDgay | com.gayvn.hdgay | https://hdgay.net | HDgay.kt | div.videopost cards; yolo-server-list buttons + iframe |
| Jayboys | com.gayvn.jayboys | https://javboys.tv | Javboys.kt | div.list-item div.video.col-2 cards; data-src iframe extractor |
| Justthegays | com.gayvn.justthegays | https://justthegays.com | Justthegays.kt | div.col-xl-4 article cards; mp4/m3u8 regex + iframe scan |
| Nurgay | com.gayvn.nurgay | https://nurgay.to | Nurgay.kt | article.loop-video cards; mirror menu data-url |
| topHDgayporn | com.gayvn.tophdgayporn | https://tophdgayporn.com | topHDgayporn.kt | aiovg-item-video cards; mp4/m3u8 regex + iframe crawl |
| Xhamster | com.gayvn.xhamster | https://vi.xhspot.com/gay | Xhamster.kt | window.initials JSON; HLS + MP4 stream walk |

---

## Binary-Only Plugins (28) — Not Converted

These plugins existed only as compiled `.cs3` (Android Dalvik) binaries in the source repository. No Kotlin source was available, so conversion to SkyStream Gen 2 JavaScript was not possible.

| Plugin | CloudStream Class | CS3 Version | Reason Not Converted |
|--------|------------------|-------------|----------------------|
| FreePornVideos | com.XXX.FreePornVideosPlugin | v5 | Binary-only, no Kotlin source |
| Fullboys | com.Fullboys.FullboysProvider | v4 | Binary-only, no Kotlin source |
| Hqporner | com.xxx.HqpornerPlugin | v6 | Binary-only, no Kotlin source |
| InternetChicks | com.InternetChicks.InternetchicksProvider | v4 | Binary-only, no Kotlin source |
| LongVideos | com.LongVideos.LongvideosProvider | v4 | Binary-only, no Kotlin source |
| Mangoporn | com.Mangoporn.MangopornProvider | v9 | Binary-only, no Kotlin source |
| Noodlemagazine | com.owencz1998.NoodleMagazinePlugin | v2 | Binary-only, no Kotlin source |
| Onlyjerk | com.Onlyjerk.OnlyjerkProvider | v4 | Binary-only, no Kotlin source |
| Perverzija | com.owencz1998.PerverzijaPlugin | v7 | Binary-only, no Kotlin source |
| Porn4fans | com.Porn4fans.Porn4fansProvider | v5 | Binary-only, no Kotlin source |
| Pornhits | com.xxx.PornhitsProvider | v4 | Binary-only, no Kotlin source |
| Pornhoarder | com.xxx.PornhoarderProvider | v11 | Binary-only, no Kotlin source |
| Pornhub | com.owencz1998.PornHubProviderPlugin | v22 | Binary-only, no Kotlin source |
| Pornken | com.owencz1998.Porn11Provider | v6 | Binary-only, no Kotlin source |
| Pornmz | com.Pornmz.PornmzProvider | v3 | Binary-only, no Kotlin source |
| Pornobae | com.Pornobae.PornobaeProvider | v4 | Binary-only, no Kotlin source |
| Pornone | com.PornOne.PornOnePlugin | v3 | Binary-only, no Kotlin source |
| Porntrex | com.owencz1998.PorntrexProvider | v3 | Binary-only, no Kotlin source |
| Spankbang | com.Spankbang.spankbangProvider | v10 | Binary-only, no Kotlin source |
| Sxyprn | com.owencz1998.SxyPrnProvider | v4 | Binary-only, no Kotlin source |
| Trendyporn | com.Trendyporn.TrendyPornProvider | v3 | Binary-only, no Kotlin source |
| UncutMaza | com.coxju.UncutMazaProvider | v5 | Binary-only, no Kotlin source |
| Whoreshub | com.Whoreshub.WhoreshubProvider | v4 | Binary-only, no Kotlin source |
| XPrimeHub | com.xprimehub.XPrimeHubProvider | v1 | Binary-only, no Kotlin source |
| Xmaza | com.Xmaza.XmazaProvider | v16 | Binary-only, no Kotlin source |
| Xtapes | com.Xtapes.InternetchicksProvider | v11 | Binary-only, no Kotlin source |
| Yespornplease | com.YesPornPlease.YesPornPleaseProvider | v10 | Binary-only, no Kotlin source |
| iGay69 | com.iGay69.JayboysPlugin | v2 | Binary-only, no Kotlin source |

---

## Conversion Approach

### Plugin Runtime (SkyStream Gen 2)

Each converted plugin is a self-contained IIFE wrapped JS file using:

```
http_get(url, headers)    → fetch page HTML via SkyStream runtime
parseHtml(html)           → returns DOM with querySelector/querySelectorAll
MultimediaItem({...})     → video item constructor
StreamResult({...})       → stream URL constructor
manifest.baseUrl          → user-configurable base URL override
```

### CONFIG Pattern

```js
const CONFIG = {
  internalName, name, packageName, version,
  baseUrl,        // default; overridden by manifest.baseUrl at runtime
  home,           // [{ name, url }, ...] sections shown on home screen
  cardSelectors,  // CSS selectors tried in order to find video cards
  searchTemplates // URL templates with {query}/{querySlug} placeholders
};
```

### collectStreams Engine

Multi-strategy stream extractor (depth-2 recursive):
1. MP4/M3U8 regex scan of raw HTML
2. `var sources=[...]` JSON parser (BoyfriendTV)
3. EPorner XHR API (vid + base36(hash) lookup)
4. JSON-LD `contentUrl` / structured-data walk
5. `<video>`, `<source>`, `data-*` attribute scan
6. Dean Edwards p,a,c,k,e,r unpacker
7. Recursive iframe fetch (depth ≤ 2, ads filtered)
