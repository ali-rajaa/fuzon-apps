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
| Legal name "FUZON APS PTY LIMITED", ABN 56 679 075 775, ACN 679 075 775, Australian private company; postal address 7 Barraberry Rtt, Canning Vale WA 6155 | ABN advice letter from the Australian Business Register (owner, 16 Oct). The letter also lists a business address in Craigieburn VIC; the site shows the postal address only |
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
- No pills or chips (owner, 16 Oct). Labels use the one `.eyebrow` style
  (small caps grey line above a heading); feature points use the tick
  list (`.check-list`) everywhere.

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
- **App tiles** are rounded squares (border-radius 26%; owner, 16 Oct: "not
  hexagon") in each app's tone, with a white line glyph: cloud, arrows,
  navigation arrow.
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

### 5d. No pills (16 Oct)
Owner: "remove the ugly pills and make it consistent". Hero pill, app-card
feature chips and the placeholder "being written" badge replaced: one
`.eyebrow` style (hero, "Where to get them", "Our apps", "Help", the CTA
band, placeholder card) and tick lists on the cards, matching the
showcase. Checks rerun: all pass.

### 5e. Legal pages (16 Oct)
Owner: "now do all the legal pages with info I sent, any missing just
make a blank".

- `/privacy-policy` and `/terms-of-service` built on `_layouts/legal.html`
  from the owner's .docx, **word for word** (typos and all: "FUZON APS",
  "Terms of Services", "Contact US"). Headings carry Word's own automatic
  numbering (Privacy 1 to 15 with 2.1 to 2.5; Terms 1 to 20), so the Terms'
  "Sections 7 to 9" point at the three app sections as written.
- Structure only: tables get header rows (stack as cards on phones), the
  GPS safety notice is a callout, a contents list (sticky on desktop,
  folded on phones) and a company details card.
- Placeholders: `[privacy@…]`, `[dmca@…]` and `fuzon.apps@gmail.com` became
  `console@fuzonapps.com`; `[Company Name]` the legal name from
  `_config.yml`. Still unknown, shown as highlighted blanks from
  `_data/legal.yml`: governing law, jurisdiction, arbitration, ABN/ACN,
  address, and the effective / last-updated dates.
- Two paragraphs split by page breaks in the .docx were joined ("…IN THE
  12 / MONTHS…", "…indemnification / and governing law…").
- Regenerate after the owner edits a document:
  `pandoc <docx> -t html --wrap=none -o x.html`, then
  `python3 _tools/legal/legal_build.py x.html body.html privacy|terms`,
  paste the body under the page's front matter, build, and run
  `python3 _tools/legal/legal_verify.py <unzipped docx>/word/document.xml
  _site/<page>.html`. It must report 0 missing (Privacy 163 paragraphs,
  Terms 72).
- Checked: wording 235/235 paragraphs; legal name on no other page; axe
  zero violations; no overflow; html-validate clean; 61 links.

### 5f. First app page: Cloud Storage & Cloud Drive (16 Oct)
Owner: "do the next page".

- `_layouts/app.html`: hero (tile, eyebrow, name, tagline, Google Play
  button, "How it works"), a window with the phone, "What it does"
  feature cards, numbered "How it works" steps, FAQ, "More from Fuzon
  Apps" (every other app in apps.yml, so it grows with the list), and the
  black band in app mode ("Get <app>" with the white Play button).
  Schema: MobileApplication (Android, price 0 AUD, installUrl, publisher
  → Organization; no rating) + BreadcrumbList + FAQPage.
- `/cloud-storage` now uses it (`built: true`); share card
  `assets/og/cloud-storage.jpg`. Copy restates the listing and the
  points only: no plan sizes, prices, ratings or legal content.
- Shared pieces moved into shell.scss (showcase window, phone, app
  cards) and `_includes/app-card.html`; app card grid is auto-fit so it
  holds any number of apps. New icons: folder, share, upload, download.
- Checked: axe zero violations, no overflow, html-validate clean, 62
  links, 23 interaction checks, no banned content.
- **Waiting on owner sign-off** before Smart Switch and GPS Navigation
  get the same layout.

### 5g. In-depth app pages (16 Oct)
Owner: "structure of these pages need 1,500 visible word content, deeper
content and can't be a copy of homepage, make it more unique and better UI".

- `_layouts/app.html` rebuilt: split hero (text left, phone on a tone
  stage right), sticky underline section bar (highlights the current
  section), overview + "At a glance" card, "When it helps" cards, bento
  features (lead card full width, the rest auto-fit), timeline steps,
  compare table and/or checklist, a long guide (the page's Markdown
  body), FAQ, compact "More from Fuzon Apps" list, black band.
- All three app pages built: Cloud Storage, Smart Switch, GPS
  Navigation. Visible words (header/footer excluded, FAQ closed):
  1,501 / 1,530 / 1,527; with FAQ answers 1,683 / 1,726 / 1,694.
- App claims only from the Play listings; the depth is general, true
  advice (organising files, preparing two phones, driving safely). No
  voice or offline claims for GPS (not on the listing).
- Share cards for Smart Switch and GPS. Table styles moved to shell.scss.
- Checked: axe zero violations on all pages at 1440/390, no overflow,
  html-validate clean, 83 links, 23 interaction checks.

### 5h. Deploy blocked (16 Oct)
Every Actions run built fine but the deploy job was rejected in ~2s
with no log: the repo's default branch was still
`claude/vigilant-volta-hjzpr2`, and the `github-pages` environment only
allows the default branch to deploy. Fix (owner, in Settings): default
branch → `main`; Environments → github-pages → deployment branches →
allow `main`. Then re-run the latest run. Branch deletion is blocked
from Claude's environment, so the old branch is deleted in the GitHub UI.

### 5i. Deploy fixed, site live (16 Oct)
Owner changed the default branch to `main`, deleted the old branch and
allowed `main` in the github-pages environment. Run #8 (re-run, no
push) built and deployed green. Every push to `main` now publishes to
fuzon.fixmypcperth.com.

### 5j. Contact, Delete your account, About (16 Oct)
Owner: "continue what you were fixing, finish fully".

- `_layouts/support.html` (left-aligned hero, WebPage/ContactPage/
  AboutPage schema with breadcrumbs) and `assets/css/pages/support.scss`.
- `/contact`: email card (Write an email, Copy address shown only where
  the clipboard works, status announced), one prefilled email per app,
  what to put in your email, quick answers, common requests
  (subscriptions via Google Play, delete account, get the apps). No
  phone, address, hours or reply-time promise.
- `/delete-account` (Google Play "Delete account URL"): request steps by
  email that work without the app, one prefilled "Delete my account:
  <app>" email per app, things to do first; what is deleted and kept is
  linked to the Privacy Policy (#data-retention), not copied.
- `/about`: facts only (what we make, free to download, optional
  in-app purchases, how to reach us). No team, history, location or
  numbers.
- No placeholders left; the `upcoming` layout is kept for future pages.
  Sitemap now lists 9 pages.
- Checked: axe zero violations on all pages at 1440/390, no overflow at
  15 widths, html-validate clean, 89 links, 23 interaction checks, legal
  name on legal pages only.

### 5k. Square tiles, CSS fix, company details (16 Oct)
- App tiles changed from hexagons to rounded squares everywhere (menu,
  showcase, cards, CTA band, 404, contact rows); OG images re-rendered.
- `assets/css/shell.scss` held a second, duplicate copy of itself (about
  1,000 lines from a faulty edit script). Removed; no visual change.
- `_data/legal.yml` filled from the owner's ABN advice letter: ABN/ACN and
  the postal address. Shown only in the company details card on the two
  legal pages. The letter's entity name matches the documents, so the
  legal text is unchanged (verify: Privacy 163/163, Terms 72/72).
- Not in the letter, still blank: governing law, jurisdiction,
  arbitration, effective and last-updated dates.
- Checked: axe, overflow, tap targets, 89 links, 23 interaction checks,
  html-validate clean.

### 5l. Apple design pass over all CSS (16 Oct)
Owner: apply the apple-design skill across all CSS. What changed:
- **Motion tokens** (shell.scss `:root`): one spring curve
  (`--ease-spring`, damping 1.0, no bounce, as CSS `linear()` with a
  cubic-bezier fallback), `--dur-spring` 0.54s (response 0.4) and
  `--dur-spring-fast` 0.4s (response 0.3), `--ease-exit` (the entrance
  curve mirrored) and `--dur-exit` for quicker exits on the same path.
- **Press feedback on press, not release**: buttons, store badges, menu
  button, tabs, app cards, other-app rows, per-app email rows and 404 rows
  shrink on press in 80ms and spring back on release; nav, menu, contents
  and footer links change colour on press. No grey tap flash on phones;
  `touch-action: manipulation` on controls.
- **Showcase tabs** work like a segmented control: one white thumb slides
  to the picked tab, and the new panel comes in from that side (site.js).
- **Materials**: the header is a translucent layer with a scroll-edge fade
  instead of a ruled border (0.84 opacity keeps grey nav text at 4.9:1
  over the black band); desktop menus are a thicker translucent layer that
  grows out of the trigger and shrinks back along the same path; the phone
  sheet dims the page behind it, and bar plus sheet turn solid.
- **Type**: tracking set by size through tokens (`--track-display` to
  `--track-small`, `--track-caps`), body and small text from Inter's own
  size table. The logo wordmark and the 404 numeral keep their own values.
- **Preferences**: reduced motion swaps slides and scales for cross-fades
  (nothing moves, feedback stays); reduced transparency or more contrast
  makes every translucent surface solid; more contrast also darkens
  secondary text and borders through the tokens.
- Checked: axe, overflow, tap targets, 89 links, 23 interaction checks,
  html-validate clean; tab thumb, menus, sheet and header checked in
  screenshots, including mid-animation.

### 5m. Fuzon Know-How: hub and 8 guide placeholders (17 Oct)
Owner: guides section named Fuzon Know-How (recommended name), covering
every app; build the hub and 8 guide pages as placeholders, no article
text yet; owner confirms the design, then we write the pages. SEO
targeted per page (searchfit on-page checklist).
- `/guides/` hub (`guides/index.html`): hero with the first guide as a
  featured card, a topic switcher (segmented control, `?topic=` in the
  address), every guide as a card, topic cards with the app for each job,
  the black band. CollectionPage + ItemList + BreadcrumbList schema.
- `_layouts/guide.html`: question as H1, topic eyebrow, meta line (by
  Fuzon Apps, date or "Being written", reading time), share button,
  reading-progress line, contents rail (legal TOC classes, so site.js
  folds and highlights it), "In short" card, sections, one "Do it with
  <app>" panel, questions people ask, Keep reading, the app's band.
  BlogPosting + BreadcrumbList; FAQPage once answers exist; og:type
  article with published/modified/section.
- `_data/topics.yml`: Cloud & backup, New phone & transfer, Maps &
  driving (tone, glyph, app, blurb). Guides link from the header
  (Guides), the footer (Support column) and nowhere else yet.
- Includes: `guide-card`, `guide-placeholder` (grey lines + a dashed
  "Text to come" note with the section brief), `guide-app`, `read-time`.
  Styles in `assets/css/pages/guides.scss`; JS in site.js (topic switcher,
  progress, share).
- The 8 guides (`guides/*.md`), each with its target phrase in the title,
  H1, description and slug; H2s for the sub-questions; FAQ questions
  from what people search:

  | Slug | Target phrase |
  |---|---|
  | back-up-photos-android | how to back up photos on android |
  | free-up-storage-android | how to free up storage on android |
  | cloud-storage-vs-phone-storage | cloud storage vs phone storage |
  | transfer-data-android-to-android | how to transfer data from android to android |
  | before-selling-your-android-phone | what to do before selling your android phone |
  | transfer-photos-contacts-new-phone | transfer photos and contacts to new phone |
  | plan-road-trip-route-multiple-stops | how to plan a road trip route with multiple stops |
  | save-battery-data-gps-navigation | save battery and data gps navigation |

- Every guide and the hub are `noindex` and out of the sitemap while
  drafts. To publish a guide: write the body (Markdown, each H2 with its
  section id), add `lead`, `takeaways` and FAQ answers, remove `draft`,
  `noindex` and `words`. Then: the hub's noindex, an OG card per guide,
  the homepage row, "Guides for this app" on app pages, feed.xml and
  llms.txt.
- Checked: axe, overflow, tap targets, 184 links, 23 interaction checks,
  html-validate clean; screenshots at 1280 and 390.

### 5n. Full audit (18 Oct)
Owner: "audit fully now". Playbook 17 checklist plus the searchfit SEO
audit, on all 19 built pages.
- **Tools**: build; html-validate; unrendered-Liquid grep; static audit
  script (titles, descriptions, canonicals, OG/Twitter, one H1, heading
  order, images, JSON-LD required fields, internal links and #anchors,
  orphans, sitemap, robots, copy rules, page weight); axe at 1440/390;
  runtime script (every page at 15 widths for overflow and clipping;
  320 to 430px for tap targets, 16px gutter and text size; layout shift;
  console and network errors; keyboard focus rings; no-JS view);
  interaction tests; Lighthouse 12 mobile and desktop on 5 pages;
  actionlint and shellcheck on the workflow.
- **Found and fixed**:
  - Guide and legal pages shifted on phones (CLS up to 0.36): the
    contents fold rendered open, then site.js closed it. It is now drawn
    closed on phones until the script has run (`.is-synced`). CLS 0.
  - /about overflowed by 1px at 320px: the email in the side card could
    not wrap. Grid column now shrinks and links wrap.
  - Google Play buttons: accessible name didn't start with the visible
    words (WCAG 2.5.3, Lighthouse label-content-name-mismatch). Now "Get
    it on Google Play: <app>" and "All our apps on Google Play".
  - GPS app page title 66 characters, now 60. About and Contact titles
    made descriptive. Privacy (84) and Terms (44) meta descriptions
    rewritten to 150 to 160 characters.
- **Result**: 0 critical findings; axe zero violations; 184 links and
  every #anchor resolve; no overflow, clipping, small targets or tiny
  text at any width; CLS 0; no console errors; Lighthouse performance
  99 to 100, accessibility 100, best practices 100 (SEO 69 only because
  the preview is noindex).
- **Left as is, on purpose**: "Privacy Policy" and "Terms of Service"
  titles are short (convention). US spellings ("organize", "center",
  "license") are in the owner's legal text, reproduced word for word.
  Lighthouse cache and compression notes come from the local test server
  (GitHub Pages compresses and caches). site.js is unminified (19KB,
  about 6KB compressed). The sitemap has no lastmod because no page has a
  real content date yet; guides get one when published.
- **Still to do before launch**: share cards for the hub and guides;
  `llms.txt`; `app-ads.txt` (needs the AdMob ID); remove noindex at
  cutover; Search Console and sitemap submission after cutover.

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

1. App pages: done (5g).
2. Legal pages, Contact, Delete your account, About: done (5e, 5j).
3. llms.txt, per-app share cards, app-ads.txt if the apps run ads.
4. Full QA, then cutover.

## 10. Open items (owner)

| # | Item |
|---|---|
| 1 | ~~Logo~~ Done: use the supplied logo (traced SVG) |
| 2 | ~~Store links~~ Done (Google Play). App Store links if iPhone versions ever exist |
| 3 | Per app: 3 to 6 plain app screenshots (not the Play marketing images) for the showcase window and app pages |
| 4 | AdMob publisher ID (`pub-…`) for `app-ads.txt`: Smart Switch and GPS show ads |
| 5 | Fill the rest of `_data/legal.yml`: governing law, jurisdiction, arbitration (or remove that clause), effective and last-updated dates. ABN/ACN, postal address and legal name are done (ABN advice letter) |
| 6 | Decisions on the legal-document issues in PLAN.md section 7 |
| 7 | ~~Smart Switch name~~ Kept (owner) |
| 8 | Domain access, and confirm the console@ mailbox works |
| 9 | ~~Enable GitHub Pages~~ Done; deploys from main (5i). Turn on Enforce HTTPS in Settings > Pages |
| 10 | ~~Guides hub~~ Fuzon Know-How (5m): confirm the design, then the 8 guides get written. Analytics: none (recommended) or which? |
