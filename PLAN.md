# PLAN: fuzonapps.com

How the Fuzon Apps website will be built. Planning only: no site code has
been written yet. When the build starts, `STATUS.md` takes over as the
running record (SITE-PLAYBOOK.md section 3), and this file stays as the
agreed plan.

Last updated: 16 October 2026 (v2: playbook, template and logo added).

**Inputs this plan is built from**

| Input | Where it is |
|---|---|
| Site playbook (how CloudGate and Daily Utility Apps were built) | `SITE-PLAYBOOK.md` |
| Template to follow (Cloudly, 3 screenshots) | `_reference/template/` |
| Logo (screenshot, 305x381, grey background) | `_reference/logo-source.png` |
| Privacy Policy and Terms of Service (owner's .docx) | Not in the repo yet; converted when the legal pages are built |
| Contact email | `console@fuzonapps.com` (owner, 16 Oct) |
| Owner rules | Light theme only. No login or sign-in anywhere. A website for all the apps, not one app |

---

## 1. What we are building

A light-only, static marketing and support site for **Fuzon Apps**, the
publisher of three phone apps:

| App | What it does (from the owner's legal docs) | Tone (from the logo) |
|---|---|---|
| **Cloud Storage** | Upload, store, sync, organise and share files and photos across devices | Cyan to blue |
| **Smart Switch: Data Transfer** | Copy contacts, messages, media, apps and settings from one phone to another | Magenta to violet |
| **GPS Voice Navigation** | Maps, live traffic and turn-by-turn voice-guided directions | Orange to coral |

The logo's gradient runs orange, pink, magenta, violet, blue, cyan. Each
app takes one part of it, so the three apps together make up the brand.

The site's jobs, in order:

1. **Store compliance:** privacy, terms, support and delete-account URLs
   for Google Play and the App Store (plus `app-ads.txt` if the apps run
   ads).
2. **Trust:** show who publishes the apps and how data is handled.
3. **Downloads:** one page per app, with store buttons.
4. **Support:** FAQs and one email address.

## 2. How the three inputs fit together

Where they disagree, this is the order of precedence:

1. **Owner rules** (light only, no login, the email above).
2. **The playbook** for anything about truth, legal text, accessibility,
   SEO, performance, code structure and QA (sections 2, 11 to 17).
3. **The Cloudly template** for the look: layout, spacing, type scale,
   buttons, cards, the black CTA band and the footer.

So we use Cloudly's look with Fuzon's colours, laid out the way the
playbook does Daily Utility Apps (also a multi-app portfolio). We drop
anything in the template that breaks a playbook rule.

### What we take from the template, and what changes

| Template element (Cloudly) | Keep? | Fuzon version |
|---|---|---|
| Plain white header: logo + wordmark left, 3 text links, "Log in" + black "Get Cloudly free" right | Keep the look | Logo mark + "Fuzon Apps" wordmark; links **Apps** (flyout), **Support** (flyout), **About**; one black button **"Get the apps"** (goes to `/#apps`). **No "Log in"** (owner rule). It keeps the playbook's behaviour: sticky, turns translucent with a hairline once the page scrolls, flyouts, a phone sheet |
| Announcement chip "● Live Demo Webinar >" above the H1 | Keep the style | Chip linking to `#apps`: "● Cloud Storage · Smart Switch · GPS Navigation". The dot is magenta from the logo instead of green. No webinar or event, since none exists |
| Huge centred two-line H1, grey lead, black primary + grey secondary button | Keep | H1 **"Store it. Move it. / Find your way."** (one line per app). The lead names the three apps in one sentence. Buttons: **See the apps** (black), **Get support** (grey) |
| Soft grey cloud texture behind the hero | Replace | The playbook's **hero glow**: three slow-drifting blurred blobs in the logo's orange, magenta and cyan, very faint on white, plus a faded dot grid. Static under reduced motion |
| Big browser-window mock-up ("app.cloudly.dev") showing the product | Keep the idea, adapt for 3 apps | A **"showcase window"** with the same rounded frame and three traffic-light dots. Instead of a URL bar it has **three tabs, one per app**. Each tab shows the app's tile, its one-liner, 3 feature points and a phone frame with a **real screenshot**. Tabs follow the ARIA tabs pattern. Without JavaScript, all three panels show stacked. Until we have screenshots, the phone frame shows the app tile, not invented UI |
| "Meet Our Customers" logo strip (NVIDIA, Samsung, Spotify…) | **Drop** | Breaks two playbook rules (no other companies' logos, no unconfirmed claims). Replaced by a **plain facts strip** with line icons, each line backed by the privacy policy: "Smart Switch moves data phone to phone, never via our servers" · "Cloud Storage encrypts files in transit and at rest" · "We don't sell your personal information" |
| "Everything you need" + three white cards with line icons and a faded large icon in the corner | Keep | **"Three apps. One place."** The three app cards, each in its tone: tile, name, one-liner, 3 feature chips, store buttons and "About Cloud Storage" link. The faded oversized glyph in the bottom-right corner stays (tinted with the app's tone) |
| Black full-width CTA band: small caps eyebrow, white H2, white pill button, grey small print | Keep | Eyebrow "READY WHEN YOU ARE", H2 **"Pick the app you need"**, white store buttons, small print listing platforms (**derived** from the store links in `apps.yml`, never typed). No "free trial · no credit card" line unless the owner confirms it |
| Footer: logo + one line left; Product / Resources / Company columns | Keep | Columns **Apps** (the three apps), **Support** (Contact, Delete your account, FAQ), **Company** (About), **Legal** (Privacy Policy, Terms of Service). Bottom line "© 2026 Fuzon Apps". The legal name stays on the legal pages only (playbook 2, 15.4) |
| Inter-style tight, heavy headings | Keep | See 4.3 |

## 3. Logo and icons

The supplied logo is a **screenshot** (305x381 px, grey `#f9f9f9`
background, no transparency). That is too small and too soft for crisp
favicons or a sharp header mark.

**Plan:**

1. **Ask first** for the original file (SVG, AI, Figma or a PNG of at
   least 1024 px with a transparent background). If it exists, we use it.
2. **If not,** I redraw it as a clean SVG (rounded hexagon, the 7-stop
   gradient sampled below, white rocket, magenta dot). I show it beside
   the original at the same size for approval before using it anywhere.
3. From that one SVG, generate:
   - `favicon.ico` (16, 32, 48) and `favicon-16/32/48.png`. At 16 px the
     rocket loses its detail, so the small sizes use a simplified mark
     (hexagon and rocket, no dot) if it reads better. Checked at real
     size.
   - `apple-touch-icon.png` 180x180 on a white square (iOS adds its own
     corners).
   - `icon-192.png`, `icon-512.png` and `site.webmanifest`
     (`theme_color` white).
   - The header mark as inline SVG, sharp at any size, with the
     **"Fuzon Apps"** wordmark set in the heading font next to it (like
     "Cloudly").
   - The default 1200x630 share card (logo, wordmark, one line, the
     gradient glow) as JPEG, about 60 KB.
4. **App icons on the site:** the playbook rule is that real app store
   icons are never shown; each app is a **white line glyph on a tile in
   its tone** (playbook 8.6). **Proposed twist:** make the tiles **rounded
   hexagons** to echo the logo, instead of the playbook's rounded square.
   Glyphs: a cloud (Cloud Storage), two phones with arrows (Smart
   Switch), a navigation arrow (GPS Voice Navigation).

## 4. Light theme

Light only, as on Daily Utility (playbook 8.7): `color-scheme: light`,
`<meta name="color-scheme" content="light">`, `theme-color #ffffff`. No
dark tokens, no toggle. Form controls stay light on dark-mode phones.

### 4.1 Colours sampled from the logo

Read pixel by pixel from `_reference/logo-source.png`, left to right
across the hexagon:

| Stop | Hex | White text on it | Note |
|---|---|---|---|
| Orange | `#FDA94E` | 1.9:1 | |
| Coral | `#FD8B89` | 2.3:1 | |
| Pink | `#FC6DC4` | 2.6:1 | |
| Magenta | `#F755FA` | 2.8:1 | the dot is `#FC51FA` |
| Violet | `#A787FC` | 2.8:1 | |
| Blue | `#6AADFD` | 2.3:1 | |
| Cyan | `#42C6FE` | 2.0:1 | |

**Every logo colour fails as text** (AA needs 4.5:1), and fails even for
white glyphs (3:1). That suits the Cloudly template: its buttons and text
are **black and grey**, with colour used only for atmosphere. So:

- **Text and buttons are ink**, as in the template. The logo colours are
  for **decoration only**: the hero glow, the chip dot, the tiles, card
  accents and the CTA band glow.
- Where colour has to carry text or a glyph, we use a **darker sibling of
  the same hue**, measured.

### 4.2 Proposed tokens (`shell.scss`, the only place hex values live)

| Token | Value | Measured | Use |
|---|---|---|---|
| `--bg` | `#ffffff` | | page |
| `--bg-alt` | `#f7f7f8` | | alternate sections (the template's off-white bands) |
| `--surface` | `#ffffff` | | cards, the showcase window |
| `--text` | `#0b0b12` | 19.6:1 on white | body and headings |
| `--text-2` | `#5b5866` | 6.9:1 white, 6.4:1 alt | lead paragraphs, card text |
| `--text-3` | `#6b6878` | 5.4:1 white, 5.0:1 alt | small print, footer links |
| `--border` | `#ececf0` | | hairlines, card borders |
| `--border-strong` | `#d9d8de` | | high-contrast mode, inputs |
| `--btn` / `--on-btn` | `#0b0b12` / `#ffffff` | 19.6:1 | primary button (template black) |
| `--btn-2` / `--on-btn-2` | `#f1f0f3` / `#0b0b12` | 17:1+ | secondary button (template grey) |
| `--brand-gradient` | `linear-gradient(90deg, #FDA94E, #FD8B89 18%, #FC6DC4 36%, #F755FA 52%, #A787FC 70%, #6AADFD 85%, #42C6FE)` | decoration only | glow, accent hairline, CTA band glow |
| `--brand-text` | `#8355FB` (violet, darkened) | 4.5:1 on white (4.2:1 on alt) | the few coloured text bits: eyebrow labels, link hover |
| `--dot` | `#F755FA` | decoration | chip dot |

**App tones** (the playbook's `.tone-*` classes swap these on an app page,
so its tile, glow, accents and text links all change together):

| Tone | App | Tile gradient (white glyph at least 3:1 on both stops) | Text-safe colour (4.5:1) | Glow blobs (decoration) |
|---|---|---|---|---|
| `tone-cloud` | Cloud Storage | `#019EE0` to `#3F95FC` | `#017EB3` | `#42C6FE`, `#6AADFD` |
| `tone-switch` | Smart Switch | `#F63FF9` to `#A07DFC` | `#8355FB` | `#F755FA`, `#A787FC` |
| `tone-gps` | GPS Voice Navigation | `#E27703` to `#FC5F5C` | `#B55F02` | `#FDA94E`, `#FD8B89` |

Two catches from measuring:
- The text-safe colours pass on white but **drop to about 4.2:1 on
  `--bg-alt`**. Either coloured text sits on white only, or each tone gets
  a slightly darker `-text` value for grey sections (decided in the style
  tile).
- The tile stops above clear 3:1 by a hair (3.0 to 3.07). The build
  deepens each one a notch for margin.

All pairs get re-measured in the build and the result recorded in a CSS
comment (playbook 8.1).

### 4.3 Type, shape and depth

- **Inter** variable (self-hosted woff2, Latin subset, preloaded,
  `font-display: swap`, `system-ui` fallback). It is what the Cloudly
  screenshots look like and what CloudGate used. Headings 700 to 800 with
  tight negative tracking (-0.03em) and `clamp()` sizes. The H1 reaches
  about 4.5rem on desktop, as in the template. The body is 16px+ and
  grey. One family keeps it to a single font file.
- Radius: cards 16 to 20px, the showcase window 22px, buttons 10px (the
  template's buttons are soft rectangles, not pills). The chip is the only
  pill.
- Shadows: very soft and wide, like the template's window
  (`--shadow-lg`). Cards rest on a 1px `--border` with almost no shadow
  and lift slightly on hover.
- Spacing, `--wrap` 70rem, the gutter (16px minimum) and breakpoints
  480/600/760/900 as in playbook 8.4.

## 5. Site map

| Page | URL | Layout | Notes |
|---|---|---|---|
| Home | `/` | default | Section 6.1 |
| Cloud Storage | `/cloud-storage` | app | `tone-cloud` |
| Smart Switch | `/smart-switch` | app | `tone-switch`; shows the "not affiliated with any phone manufacturer" line |
| GPS Voice Navigation | `/gps-voice-navigation` | app | `tone-gps`; shows the driving safety notice from the Terms |
| About | `/about` | default | Who Fuzon Apps is; only confirmed facts |
| Contact / Support | `/contact` | default | Playbook 9.6: `console@fuzonapps.com` card, "Write an email", "Copy address", one mailto per app with the app name in the subject, "what to put in your email", "don't include your password". App Store "Support URL" |
| Delete your account | `/delete-account` | default | **Google Play requirement** for apps with accounts (Cloud Storage, GPS sign-in). Steps per app, a prefilled email "Delete my account", and what is deleted and when (from the retention section). Not in the playbook; added for Play |
| Privacy Policy | `/privacy-policy` | legal | Generated table of contents, an ID on every heading, plus per-app anchors (`#cloud-storage` etc.) for store listings |
| Terms of Service | `/terms-of-service` | legal | Same; the GPS safety notice as a callout |
| 404 | `/404.html` | default | noindex, links to each app |
| Guides hub (later) | `/guides/` | default + post | **Phase 2, not at launch** unless the owner wants it. Long-tail SEO ("transfer data to a new phone", "back up photos", "offline maps"). Nothing links to it until it exists (playbook 7) |

Plus `sitemap.xml`, `robots.txt`, `llms.txt`, `site.webmanifest`,
favicons, and `app-ads.txt` **only if** the apps run ads.

**Header:** Apps (a flyout listing the three apps with their tiles and
one-liners) · Support (a flyout with Contact, Delete your account, Privacy
Policy, Terms of Service) · About · black **Get the apps** button. On
phones, a menu button opens a sheet where Apps and Support fold open and
"Get the apps" is a full-width button at the foot.

## 6. Page blueprints

### 6.1 Home (template order, Fuzon content)

1. **Hero** (never a scroll-reveal; it is the largest paint): chip, H1
   "Store it. Move it. / Find your way.", lead, **See the apps** /
   **Get support**, hero glow behind.
2. **Showcase window** (`#showcase`): rounded frame, three app tabs
   (section 2 table).
3. **Facts strip** (replaces the customer logos): 3 short lines with
   icons, each traceable to the privacy policy.
4. **Apps** (`#apps`): "Three apps. One place." Three tone cards.
5. **Your data** (`--bg-alt`): heading beside the content on wide screens
   (playbook 9.11, so the page isn't centred heading after centred
   heading). Four plain points from the policy: no selling, Smart Switch
   device-to-device, Cloud Storage encryption, delete your data any time.
   Link to the policy.
6. **FAQ** (company level, heading beside the list on wide screens): Are
   the apps free to download? (only once confirmed) · Do I need an
   account? · Which phones do they work on? (derived) · How do I get help?
   · How do I delete my account or data? Rendered visibly and as
   `FAQPage` schema from one source.
7. **Black CTA band**: "Pick the app you need" with store buttons.
8. Footer.

### 6.2 App page (one layout, built from front matter, the same on all three)

The playbook's `app.html` in the Cloudly style:

1. Hero: breadcrumbs, chip (the app's category), tile, H1 (the app name),
   tagline, platforms (derived), store buttons (`id="download"`), tone
   glow.
2. Showcase window with this app's screenshots (a scrollable row of phone
   frames).
3. Features: a bento of cards from the Terms' "Description of the Apps"
   and owner-confirmed store copy. Nothing else.
4. How it works: 3 steps (Smart Switch: install on both phones · pair with
   the code or QR · pick what to move).
5. **Permissions, explained:** the privacy policy's permissions table
   filtered to this app, in plain words (for example why Android asks
   Smart Switch for location: Wi-Fi scanning). A table on desktop, cards
   on phones.
6. **Privacy at a glance:** what this app collects and keeps, linking to
   its section of the policy.
7. App notice: the GPS safety notice; for Smart Switch "back up first, a
   transfer can overwrite data" and "not affiliated with any phone
   manufacturer"; for Cloud Storage, storage limits and Trash kept 30 days.
8. FAQ (visible + schema).
9. Black CTA band.
10. "More from Fuzon Apps": the other two app cards.

On phones under 600px the page is compacted as in playbook 9.4 (rows
instead of cards; nothing hidden).

### 6.3 Legal pages

Playbook 9.7 and Appendix G1: hero with H1, a one-line lead,
"Effective / Last updated"; a sticky "On this page" contents list from
front matter; prose at about 70 characters per line; a company details
card at the end. Wide tables scroll inside a labelled box on desktop and
become cards on phones.

## 7. Legal content: how we handle the owner's documents

The playbook rule is that **legal text is the owner's and is reproduced
word for word**, not improved (playbook 2). So:

- I convert both .docx files to Markdown and check every heading and
  paragraph against the source with a script. The only changes are
  **filling placeholders with values the owner confirms**:
  - `[privacy@yourcompany.com]`, `[dmca@yourcompany.com]` and
    `fuzon.apps@gmail.com` become `console@fuzonapps.com` (owner
    confirmed the address; confirm it should replace these three).
  - `[Company Name]` (3 times in the Terms) becomes the legal name.
  - `[Country/State]`, `[Jurisdiction]`, `[Arbitration Rules]` become
    what the owner gives.
  - Add the effective / last-updated date.
- Any placeholder still unanswered shows **highlighted on the preview**
  so it can't ship by accident (playbook 15.3).
- **Issues I'll put to the owner, not fix myself** (they decide, ideally
  with an Australian solicitor):
  1. "FUZON **APS** PTY LIMITED": is that the exact ASIC name?
  2. No Privacy Act 1988 / APPs / OAIC complaint wording (playbook 15.2
     has the standard wording).
  3. No Australian Consumer Law carve-out; "non-refundable" and the
     "USD $50" cap may conflict with it (playbook 15.2 item 11 has the
     standard clause).
  4. The Terms refer to "Sections 7 to 9" but the headings are
     unnumbered. Number them on the page? (Formatting, not wording.)
  5. Small typos ("Terms of Services", "Contact US"): fix or keep?
  6. The policy states AES-256 at rest and TLS 1.2+. Fine to publish
     because it's the owner's text, but confirm it's true (playbook 15.3
     item 9: a false claim is misleading conduct).
  7. **"Smart Switch" is Samsung's product name.** Trademark and store
     rejection risk. Keep, or rename?
- The legal name, ACN/ABN and address appear **on the legal pages only**
  (not the footer, schema or meta). This is checked on the built site
  (playbook 15.4).

## 8. Copy rules (playbook 2 and 14)

- Nothing invented: features, numbers, platforms, prices, reviews, team
  and addresses come only from the owner's docs or confirmed store
  listings. Unknowns become open items, not filler.
- No star ratings, download counts, awards, testimonials, customer logos,
  "trusted by millions" or "#1".
- "Free to download", never a bare "free", and only once confirmed.
- No "automatic", "secure", "seamless", "fast", "one tap", "unlimited"
  unless the owner's text says it. Avoid the banned word list in playbook
  14.
- Australian English, dates like "16 October 2026", plain short
  sentences.

## 9. Tech and structure

Daily Utility's pattern (playbook 5.1), minus Sign in and guides at launch:

```
.github/workflows/pages.yml   build + Liquid check + deploy (Appendix J)
_config.yml                   url, baseurl, staging, company.legal_name, company.support_email
_data/apps.yml                name, slug, tone, glyph, tagline, features, store links, built: true/false
_data/home.yml                homepage copy blocks
_includes/                    icon-sprite, header, footer, logo, app-tile (hexagon), store-badges (SVG),
                              platforms, hero-glow, showcase, faq-section, faq-schema, breadcrumb-schema,
                              home/*, scripts
_layouts/                     default, app, legal
assets/css/shell.scss         tokens, base, buttons, header, footer, shared components
assets/css/pages/*.scss       index, app, legal, contact, about, not-found
assets/fonts/                 inter-latin.woff2 (+ OFL licence)
assets/icons/                 favicons, touch icon, manifest icons, logo.svg
assets/img/screens/           real app screenshots (WebP, sized)
assets/og/*.jpg               share cards: default + one per app
assets/js/site.js             header state, menus, showcase tabs, reveal, copy-email
index.html, cloud-storage.md, smart-switch.md, gps-voice-navigation.md,
about.html, contact.html, delete-account.html, privacy-policy.md, terms-of-service.md, 404.html
sitemap.xml, robots.txt, llms.txt, site.webmanifest, favicon.ico, (app-ads.txt)
STATUS.md, SITE-PLAYBOOK.md, PLAN.md, _reference/   excluded from the build
```

- **Jekyll 4.4, no plugins, built by GitHub Actions** (the playbook's
  first deploy path), strict Liquid and front matter, Sass compressed,
  `?v=` cache stamps. One deferred `site.js`. No frameworks, no
  third-party scripts, no analytics, so no cookie banner (unless the
  owner wants analytics).
- Every internal link goes through `relative_url` and every full URL
  through `absolute_url`, so moving from preview to live is two lines in
  `_config.yml`.
- Motion as in playbook 10: hero glow drift (19/23/27s), scroll reveal
  below the first screen, press-scale on buttons, card hover lift, menus
  growing from their trigger, the showcase tab cross-fade. All of it off
  or reduced under `prefers-reduced-motion`. Built with the
  `apple-design` skill (available in this session).

## 10. Hosting and domain

- **Preview:** GitHub Pages from Actions at
  `https://ali-rajaa.github.io/fuzon-apps/` (`baseurl: /fuzon-apps`,
  `staging: true`, so noindex everywhere and robots `Disallow`). Owner
  step: Settings > Pages > Source > **GitHub Actions** (don't click
  "Configure").
- **Live:** `https://fuzonapps.com`. **The domain has no DNS records
  today** (checked 16 Oct). At cutover:
  - Settings > Pages > Custom domain.
  - DNS: the apex **A** records to GitHub Pages
    (185.199.108.153 / 109 / 110 / 111) and `www` **CNAME** to
    `ali-rajaa.github.io`, DNS only (grey cloud) on Cloudflare.
  - Enforce HTTPS, then flip `url` / `baseurl` / `staging`.
  - Keep the **MX/SPF/DKIM** records for `console@fuzonapps.com` intact.
    The mailbox must work before the site and store listings point
    people at it.
  - Recommend **no-www** as the one canonical address (matches how the
    owner wrote it); GitHub redirects www to it.
- After launch: Search Console + sitemap; put the live URLs into each
  store listing (section 12).

## 11. QA before every push (playbook 17)

A local build, then: html-validate; no unrendered Liquid; axe-core at
1440 and 390px with zero violations; Playwright layout checks at 15
widths from 320 to 1920 (no overflow or overlap); phone checks (44px
targets, 16px gutter, no text under 12px); a scripted header and menu
test; CLS about 0; an SEO script (one H1, title, description, self
canonical, OG image, sitemap equals the indexable pages); copy-rule grep
(banned words, "free" alone, the legal name outside legal pages, other
sites' names: CloudGate, Daily Utility, fixmypcperth); an internal link
check; actionlint. **Screenshots at phone and desktop sizes for owner
sign-off at each milestone.**

## 12. Build order

| Step | What | Owner sign-off |
|---|---|---|
| 0 | Owner answers the open items (section 13) | |
| 1 | **Logo**: original file, or my SVG redraw shown beside the original | ✅ logo |
| 2 | **Style tile**: one static page showing the tokens, type scale, buttons, chip, an app card per tone, the hexagon tiles, the showcase window and the black band, rendered and screenshotted at phone and desktop | ✅ look and feel, before any page is built |
| 3 | Scaffold: Gemfile, `_config.yml` (preview), `.gitignore`, `pages.yml`; preview live and noindex | |
| 4 | Shell: `default.html`, `shell.scss`, icon sprite, header, footer, `site.js`; header checked at every width | |
| 5 | Shared includes: tile, store badges, platforms, hero glow, showcase, FAQ + schema, breadcrumbs | |
| 6 | Home page | ✅ home screenshots |
| 7 | App layout + the three app pages | ✅ one app page first, then the other two |
| 8 | Legal pages (verbatim + script check), Contact, Delete your account, About, 404 | ✅ legal placeholders filled |
| 9 | SEO files, favicons, manifest, share cards, llms.txt, (app-ads.txt) | |
| 10 | Full QA (section 11), a phone-only pass, a reduced-motion pass | ✅ final preview |
| 11 | Go live (section 10), live checks, Search Console | ✅ DNS change (ask first) |
| 12 | Store listings: privacy `/privacy-policy`, support `/contact`, delete account `/delete-account`, marketing `/<app>` | Owner (store consoles) |

`STATUS.md` is updated in the same commit as each step.

## 13. Open items (owner)

Blocking is marked. Everything else gets a highlighted placeholder and the
build carries on.

| # | Item | Blocks |
|---|---|---|
| 1 | Original logo file (SVG / high-res transparent PNG), or OK to redraw | Step 1 |
| 2 | Per app: Play and/or App Store links and package IDs, live or not yet | Store buttons, platforms, schema |
| 3 | Per app: 3 to 6 real screenshots | Showcase window (placeholder until then) |
| 4 | Free to download? Any in-app purchases or subscriptions? Ads, and which network (AdMob publisher ID)? | Copy, `app-ads.txt` |
| 5 | Exact legal name (APS / Apps), ACN or ABN, address (legal pages only), governing state, effective date | Legal pages |
| 6 | Decisions on the legal issues in section 7 | Legal pages |
| 7 | Keep the name "Smart Switch"? | App page, before launch |
| 8 | Domain: registrar / Cloudflare access; is the console@ mailbox live? | Launch |
| 9 | ~~Branches~~ Decided (owner, 16 Oct): always push to `main`. | Done |
| 10 | Guides hub at launch, or phase 2? | Scope |
| 11 | OK with the hero line "Store it. Move it. Find your way." and hexagon app tiles? | Step 2 |
| 12 | Analytics: none (recommended; no cookie banner), or which? | Privacy page |
