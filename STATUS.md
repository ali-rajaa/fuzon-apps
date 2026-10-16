# STATUS

Where the Fuzon Apps site is up to. The project's memory: read this first
in any new chat, then `PLAN.md` (the agreed plan) and `SITE-PLAYBOOK.md`
(the standard it is built to). Updated in the same commit as the work.

Last updated: 16 October 2026.

**How to start a new chat:**

> Working on fuzon-apps. Read STATUS.md, then continue with <the task>.

---

## 1. What this site is

The website for **Fuzon Apps**, publisher of three phone apps: Cloud
Storage, Smart Switch – Data Transfer and GPS Voice Navigation. A
light-only static site in the Cloudly template's style with the logo's
colours. There is no login (owner, 16 Oct).

## 2. Confirmed facts (and where each came from)

| Fact | Source |
|---|---|
| App names and what each does | Owner's Privacy Policy and Terms of Service (.docx, 16 Oct) |
| Taglines, points and chips for each app | Play listing titles and screenshot captions (Play can't be fetched from this environment) |
| Support email `console@fuzonapps.com` | Owner, 16 Oct |
| Legal name as written in the documents: "FUZON APS PTY LIMITED" | Documents. **Not confirmed against ASIC** (see 10) |
| Light theme only; no login | Owner, 16 Oct |
| Logo colours: `#FDA94E`, `#F755FA`, `#42C6FE` (3-stop horizontal gradient) | Sampled from `_reference/logo-source.png` |
| Template look | Owner's Cloudly screenshots, `_reference/template/` |
| Always push to `main` | Owner, 16 Oct |
| Google Play listings: Cloud Storage & Cloud Drive (`com.cloudstorageapp.cloudbackup.storagespace.databackup`), Transfer My Data – Phone Clone (`com.smartswitch.shareit.datashare.phoneclone`), GPS Navigation & Directions (`com.gpsnavigation.directions.gpsmaps`); developer page `dev?id=8522805663199379420` | Owner's links and screenshots, 16 Oct |
| All free to download, all with in-app purchases; Smart Switch and GPS also "Contains ads" | Play listings (screenshots) |
| Android only (no App Store links) | Play listings |
| Keep the name "Smart Switch" (it's also our name); on Play it's "Transfer My Data – Phone Clone" | Owner, 16 Oct |
| The logo is the one the owner supplied (traced to SVG, no other file) | Owner, 16 Oct |
| Domain move to fuzonapps.com happens last | Owner, 16 Oct |

**Standing content rules (owner, 16 Oct):**
- Legal-document content (privacy, terms, data handling, legal name) on
  the legal pages only. Nowhere else, not even paraphrased.
- Never mention ratings, reviews or download/install numbers.
- No app counts ("three apps", "all three"). Copy must stay true when an
  app is added; lists, menus, tabs and cards come from `_data/apps.yml`.
- "Free to download", never a bare "free".

## 3. Directory tree

```
.github/workflows/pages.yml   build (Jekyll 4.4) + unrendered-Liquid check + deploy to GitHub Pages
_config.yml                   url/baseurl/staging (preview values now), company name + email
_data/apps.yml                the three apps: name, short, slug, tone, glyph, tagline, points, store links, built
_data/nav.yml                 Support menu and footer links
_includes/                    header, footer, logo, app-tile, icon-sprite, hero-glow, faq-section,
                              faq-schema, breadcrumb-schema, cta-band, scripts, home/{schema,hero,apps,data}
_layouts/default.html         head, SEO tags, header, main, footer
_layouts/upcoming.html        placeholder for pages not built yet (keeps every link working)
assets/css/shell.scss         tokens, tones, base, buttons, tiles, header, footer, glow, FAQ, CTA band
assets/css/pages/             home.scss, upcoming.scss
assets/fonts/                 inter-latin.woff2 (variable) + OFL licence
assets/icons/                 logo.svg (redrawn), apple-touch-icon, icon-192/512
assets/og/default.jpg         1200x630 share card
assets/js/site.js             header state, menus + phone sheet, showcase tabs, reveal
index.html                    homepage (built)
cloud-storage.md, smart-switch.md, gps-navigation.md, about.md, contact.md,
delete-account.md, privacy-policy.md, terms-of-service.md     placeholders (layout: upcoming)
404.html, sitemap.xml, robots.txt, site.webmanifest, favicon.ico
.htmlvalidate.json            html-validate config (no-redundant-role off: role="list" is
                              deliberate, Safari drops list semantics when bullets are removed)
PLAN.md, SITE-PLAYBOOK.md, _reference/   planning and reference, excluded from the build
```

## 4. Layouts and required front matter

| Layout | Required | Optional |
|---|---|---|
| `default` | `title`, `description`, `permalink` | `css`, `tone` (cloud/switch/gps, put on `<main>`), `noindex`, `og_image`, `og_image_alt` |
| `upcoming` | `title`, `description`, `permalink`, `css: upcoming`, `heading`, `lead`, `noindex: true` | `app` (apps.yml slug), `tone`, `coming` (list), `breadcrumbs` |

Every page sets its own `css:` (layout front matter doesn't cascade).

## 5. Work log

### 5a. Plan (16 Oct)
`PLAN.md` v1 and v2: playbook + Cloudly template + logo colours. No code.

### 5b. Scaffold and homepage (16 Oct)
Owner: "Always push to main, start it now, create the first home page with
workable links ready to make after."

- Jekyll 4.4 scaffold, Actions workflow, config in preview state.
- **Logo** redrawn as SVG from the screenshot by tracing (rocket) and
  geometry (hexagon with the notch, rounded corners, the 3-stop gradient).
  Checked by overlaying it on the original. Favicons, touch icon, manifest
  icons and the share card are generated from it.
- **Homepage**, in the template's order: header (Apps and Support menus,
  About, "Get the apps"); hero (chip, "Store it. Move it. / Find your
  way.", lead, two buttons, logo-colour glow); showcase window with one
  tab per app (phone frame shows the app tile until screenshots arrive);
  facts strip from the privacy policy (replaces the template's customer
  logos); "Three apps. One place." cards; "How we handle your data"; FAQ
  (5 questions, plus FAQPage schema); black CTA band; footer.
- **App tiles** are rounded hexagons (CSS mask) in each app's tone, with a
  white line glyph: cloud, arrows, navigation arrow.
- **Placeholders**: every linked page exists on the `upcoming` layout
  (noindex, out of the sitemap), so no link 404s. Each says the page is
  being written, what it will cover, and gives the email.
- **Checked** locally against a server that serves clean URLs like GitHub
  Pages: build clean; no unrendered Liquid; html-validate clean;
  axe-core zero violations on all 10 pages at 1440 and 390px; no
  horizontal overflow at 15 widths from 320 to 1920px; tap targets at
  least 44px on phones; no text under 12px; one H1 per page; canonicals
  correct; all 22 internal links resolve; 23 scripted interaction checks
  (menus by click, hover, Escape, click outside; phone sheet; tabs by
  click, arrows, Home; no-JS fallback) all pass.

### 5c. Google Play, content rules (16 Oct)
- `apps.yml`: Play titles, links, `store_name`, `ads`; copy from the
  listings. GPS page moved to `/gps-navigation`.
- Drawn "Get it on Google Play" button (`_includes/store-badge.html`) on
  the showcase panels and app cards; the developer page from the hero,
  the store strip, the CTA band and the footer.
- Removed everything taken from the legal documents outside the legal
  pages: the "From our privacy policy" strip (now a "Where to get them"
  store strip), the "How we handle your data" section, and the FAQ
  answers about data and deletion. New FAQ: what we make, are they free,
  which phones, why Smart Switch has another name on Play, help.
- Removed app counts: new hero "Apps for the everyday jobs on your phone."
  (the old "Store it. Move it. Find your way." named exactly three
  jobs); "Find the app for the job."; chip "Free to download on Google
  Play". The tab bar scrolls if more apps are added.
- Share card redone without app names or counts.
- Checked: axe zero violations, no overflow, html-validate clean, 26
  links, 23 interaction checks, no app counts and no legal or ratings
  wording on non-legal pages.

## 6. SEO and routing

- Clean URLs (`/cloud-storage`), canonicals generated from `page.url`.
- `staging: true`: every page noindex, robots `Disallow: /`.
- Sitemap lists only indexable pages (placeholders are noindex), so it
  holds the homepage only for now.
- Schema: Organization + WebSite + ItemList + FAQPage on the homepage.

## 7. Build and deploy

- Push to `main`. `.github/workflows/pages.yml` builds and deploys to
  GitHub Pages.
- **Owner setup needed once:** repo Settings > Pages > Source > **GitHub
  Actions** (don't click "Configure"). Until then the deploy job fails
  at "configure-pages".
- Preview address: **`https://fuzon.fixmypcperth.com`** (owner, 16 Oct),
  noindex. `_config.yml` has `url` set to it and `baseurl: ""`.

### 7a. Setting up the preview subdomain (owner, once)

1. **Cloudflare** (the fixmypcperth.com zone) > DNS > Records > Add record:
   Type `CNAME`, Name `fuzon`, Target `ali-rajaa.github.io`,
   Proxy status **DNS only** (grey cloud), TTL Auto. Grey cloud matters:
   GitHub can't issue the HTTPS certificate through Cloudflare's proxy.
2. **GitHub** > `ali-rajaa/fuzon-apps` > Settings > Pages:
   - Source: **GitHub Actions** (don't click "Configure").
   - Custom domain: `fuzon.fixmypcperth.com` > Save. Wait for "DNS check
     successful" (minutes, sometimes up to an hour).
   - Tick **Enforce HTTPS** once it stops being greyed out (the
     certificate can take up to about an hour).
3. Actions > "Build and deploy" > re-run the latest run (or push any
   change) so it deploys after Pages is switched on.
4. Check: `https://fuzon.fixmypcperth.com` loads the homepage, and
   `https://fuzon.fixmypcperth.com/robots.txt` says `Disallow: /`.

The custom domain lives in the repo's Pages settings, not in a `CNAME`
file: Actions deployments ignore that file, so there isn't one.
Nothing in the fixmypcperth repo changes; it's one DNS record.
- Local build in this environment: `bundle exec jekyll build` (if the
  binstub is missing, run `bundle exec ruby $(bundle info jekyll --path)/exe/jekyll build`).

## 8. Domain cutover (later)

`fuzonapps.com` has no DNS records yet (checked 16 Oct). At cutover:
Settings > Pages > Custom domain `fuzonapps.com` (replacing
`fuzon.fixmypcperth.com`), then delete the `fuzon` CNAME from the
fixmypcperth.com zone; apex A records to
185.199.108-111.153 and `www` CNAME to `ali-rajaa.github.io` (DNS only on
Cloudflare); Enforce HTTPS; in `_config.yml` set `url:
"https://fuzonapps.com"`, `baseurl: ""`, `staging: false`. Keep the mail
records for console@ intact.

## 9. Execution order (next)

1. App pages (layout `app`, one first for sign-off, then the other two).
2. Legal pages (layout `legal`, owner's text verbatim), Contact, Delete
   your account, About.
3. llms.txt, per-app share cards, app-ads.txt if the apps run ads.
4. Full QA, then cutover.

## 10. Open items (owner)

| # | Item |
|---|---|
| 1 | ~~Logo~~ Done: use the supplied logo (traced SVG) |
| 2 | ~~Store links~~ Done (Google Play). App Store links if iPhone versions ever exist |
| 3 | Per app: 3 to 6 plain app screenshots (not the Play marketing images) for the showcase window and app pages |
| 4 | AdMob publisher ID (`pub-…`) for `app-ads.txt`: Smart Switch and GPS show ads |
| 5 | Exact legal name (APS or Apps), ACN/ABN, address, governing state, effective date |
| 6 | Decisions on the legal-document issues in PLAN.md section 7 |
| 7 | ~~Smart Switch name~~ Kept (owner) |
| 8 | Domain access, and confirm the console@ mailbox works |
| 9 | Enable GitHub Pages (section 7) |
| 10 | Guides hub at launch or later? Analytics: none (recommended) or which? |
