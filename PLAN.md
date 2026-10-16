# PLAN: fuzonapps.com

The build plan for the Fuzon Apps website. Kept in the repo so any new chat
can read one file instead of being re-told everything. Once the build
starts, a STATUS.md takes over day-to-day tracking, the same way the
fixmypcperth repo works.

Last updated: 16 October 2026.

---

## 1. What the site is for

Fuzon Apps publishes three mobile apps:

| App | One-liner (from the legal docs) |
|---|---|
| **Cloud Storage** | Upload, store, sync, organise and share files and photos across devices. |
| **Smart Switch: Data Transfer** | Copy contacts, messages, media, apps and settings from one phone to another. |
| **GPS Voice Navigation** | Maps, live traffic and turn-by-turn voice-guided directions. |

The site has four jobs, in priority order:

1. **Store compliance.** Google Play and the App Store both need public URLs
   for the privacy policy, a support or contact page, and (Google Play,
   for apps with accounts) an account-deletion page. Ad-supported apps
   also need `app-ads.txt` at the root of the developer site. Without
   these, store listings get rejected or ads stop serving.
2. **Trust.** Someone who installs a file app, a phone-transfer app or a
   navigation app wants to see a real company behind it. The site should
   say clearly who the publisher is and how data is handled.
3. **Downloads.** Each app gets a page that sells it and links to the
   stores.
4. **Support.** FAQs and one clear way to get help, so fewer emails arrive.

## 2. What we have, what is missing

### Have
- Privacy Policy and Terms of Service drafts (both cover all three apps,
  with sections per app).
- Publisher name as written in the docs: **FUZON APS PTY LIMITED**.
- Contact email: **`console@fuzonapps.com`** (confirmed by the owner on
  16 Oct 2026). It replaces `fuzon.apps@gmail.com` from the docs and fills
  the `privacy@` and `dmca@` placeholders. One address for support,
  privacy, copyright and account deletion.
- Empty repo `ali-rajaa/fuzon-apps`.

### Could not get
- **fuzonapps.com does not resolve.** It has no DNS records, so nothing
  could be fetched from it. Either the domain is registered but not yet
  pointed anywhere, or it is not registered yet. Confirm which, and where
  it is registered (Cloudflare like fixmypcperth would be simplest).
- A web search found nothing for "Fuzon Apps" (only the unrelated
  Fuzen no-code builder), so the apps are either not live yet or
  listed under another name.

### Needed from the owner (blocks the build where marked)
| # | Item | Blocks |
|---|---|---|
| 1 | Exact registered company name: **"Fuzon Aps"** (as in both docs) or **"Fuzon Apps"**? Check ASIC. | Legal pages, footer |
| 2 | ACN / ABN, and the business address to show (state at least). | Footer, legal pages, store listings |
| 3 | Domain status and registrar login. | Launch |
| 4 | Logo (SVG ideally), brand colours if any, each app's icon (512x512). | Design |
| 5 | Per app: store links (Play and/or App Store), package / bundle IDs, launch status, 4 to 6 screenshots. | App pages |
| 6 | Are any apps ad-supported? Which ad network (AdMob?) and its publisher ID. | `app-ads.txt` |
| 7 | Free vs paid plans for Cloud Storage (storage tiers, prices or "see store"). | Cloud Storage page |
| 8 | ~~Contact email~~ Decided: `console@fuzonapps.com`. Make sure its mailbox (MX records) is live before launch, since the domain has no DNS today. | Done |
| 9 | Governing law: Western Australia? (Fills the Terms placeholders.) | Terms |
| 10 | Google Analytics or none? (No analytics means no cookie banner.) | Footer, privacy |

## 3. Problems in the legal docs to fix before they go live

Publishing these as-is would look unfinished, and some lines don't hold up
under Australian law. The site will publish whatever is decided here.
**Have a lawyer check the final wording; this list is not legal advice.**

### Placeholders still in the text
- Privacy: `[privacy@yourcompany.com]` (Your Rights section). Becomes
  `console@fuzonapps.com`.
- Both docs' Contact sections give `fuzon.apps@gmail.com`. Becomes
  `console@fuzonapps.com`.
- Terms: `[dmca@yourcompany.com]` (becomes `console@fuzonapps.com`),
  `[Company Name]` three times
  (Intellectual Property, Limitation of Liability, Indemnification),
  `[Country/State]`, `[Jurisdiction]`, `[or by binding arbitration under
  (Arbitration Rules)]`.
- Neither doc has an **effective date / "Last updated"** date, although
  both say that date changes on update.

### Name and wording
- "FUZON **APS** PTY LIMITED" vs the brand "Fuzon **Apps**". Use the exact
  ASIC name in the legal text, and "Fuzon Apps" as the brand elsewhere.
- Terms say "these Terms of Services" (typo) and "Contact US" heading
  in Privacy.
- The Terms' General section says "Sections 7 to 9 control", but the
  document has no numbers. Number the headings on the site (1 to 19) so
  that reference works; the app-specific sections land at 7, 8 and 9.

### Australian law (the company is a Pty Ltd)
- **Privacy Act 1988 (Cth) and the Australian Privacy Principles** are not
  mentioned. The policy covers GDPR and CCPA but not the publisher's home
  law. Add an Australia section: APP-based rights, how to complain, and
  the **OAIC** as the regulator to escalate to.
- **Australian Consumer Law.** "Fees are non-refundable" and the liability
  cap of "USD $50" need an ACL carve-out (consumer guarantees can't be
  excluded). The cap currency should probably be AUD.
- Notifiable Data Breaches scheme: worth a line in Data Security.

### Store-facing gaps
- **Account deletion (Google Play).** Play requires a web page where users
  can request account deletion without reinstalling the app. Privacy says
  "Settings > Account". The site needs `/delete-account/` with the steps
  and an email route.
- **Data safety form.** The Play Data safety answers must match this
  policy exactly. Keep the per-app tables as the single source.

### Naming risk
- **"Smart Switch" is Samsung's product name** (Samsung Smart Switch).
  Using it as an app name risks a trademark complaint and store
  rejection. The Terms already say the app is not affiliated with any
  phone manufacturer, and the site should say so on the app page too.
  Consider a distinct name (for example "Fuzon Switch: Data Transfer")
  before launch.

## 4. Stack and hosting

Same setup as fixmypcperth, so the owner has one way of working:

- **Jekyll 4**, built by a GitHub Actions workflow
  (`.github/workflows/pages.yml`), served by **GitHub Pages**.
- `CNAME` = `www.fuzonapps.com`; apex redirects to www.
- **Cloudflare** for DNS (and redirects if ever needed).
- No JavaScript framework. One small script file at most (mobile menu,
  FAQ accordion via `<details>` needs none).
- Self-hosted fonts (woff2), no Google Fonts call: one less third party
  to declare in the privacy policy.
- Content in `_data/apps.yml` drives the home cards, the app pages, the
  store badges, the schema and the footer, so an app's name or link is
  typed once.

```
fuzon-apps/
  _config.yml
  _data/apps.yml          # name, slug, tagline, features, permissions, store links, FAQs
  _data/company.yml       # legal name, ABN, email, address
  _layouts/default.html
  _layouts/app.html       # one template for all three app pages
  _layouts/legal.html     # numbered headings, table of contents, last-updated date
  _includes/header.html, footer.html, store-badges.html, schema-org.html, schema-app.html
  assets/css/site.css
  assets/img/             # logo, app icons, screenshots, og images
  index.html
  apps/cloud-storage.html
  apps/smart-switch.html
  apps/gps-voice-navigation.html
  privacy.md
  terms.md
  support.html
  delete-account.html
  contact.html
  about.html
  404.html
  app-ads.txt
  robots.txt
  sitemap.xml
  CNAME
  STATUS.md
```

## 5. Pages

### Home `/`
- Hero: what Fuzon Apps is in one line, the three apps right under it.
- Three app cards: icon, name, one-liner, store badges, "Learn more".
- "Your data, handled properly": three plain points the policy backs up:
  - Smart Switch moves data phone to phone and never uploads it.
  - Cloud Storage encrypts in transit (TLS 1.2+) and at rest (AES-256),
    with optional two-factor sign-in.
  - We don't sell personal data or location history.
- Short "About" strip: Australian company, the legal name, contact.

### App pages `/apps/<slug>`
One layout, filled from `_data/apps.yml`:
- Hero with icon, name, tagline, store badges, a phone screenshot.
- Features (from the Terms' "Description of the Apps").
- How it works (3 steps; for Smart Switch: install on both phones, scan
  the QR code, pick what to move).
- **Permissions explained**: the policy's permissions table filtered to
  this app, in plain words. Pre-empts the "why does a transfer app want
  my location?" question (Android Wi-Fi scanning).
- Privacy at a glance for this app, linking to its section of the policy.
- App-specific notices:
  - GPS Voice Navigation: the **safety notice** from the Terms, shown
    prominently.
  - Smart Switch: "not affiliated with any phone manufacturer", plus
    "back up first; a transfer can overwrite data".
  - Cloud Storage: plans and storage limits, trash kept 30 days.
- FAQ (with FAQPage schema).
- Screenshot gallery.

### Privacy Policy `/privacy`
- Full policy, numbered headings, table of contents, "Last updated".
- Anchors per app (`/privacy#cloud-storage`, `#smart-switch`,
  `#gps-voice-navigation`) so each store listing can deep-link to its
  own section, while still pointing at one policy.
- Tables kept as real HTML tables that scroll sideways on phones.

### Terms of Service `/terms`
- Same treatment, numbered 1 to 19, with anchors per app section.
- Safety notice styled as a callout.

### Support `/support`
- FAQs by app (transfer stuck, storage full, GPS inaccurate, restore
  purchases, cancel a subscription via the store).
- "Still stuck?" with `console@fuzonapps.com` and what to include (app, device,
  OS version, app version).
- This is the App Store "Support URL".

### Delete your account `/delete-account`
- Steps in each app (Cloud Storage: Settings > Account; GPS Voice
  Navigation: Settings > Privacy).
- Email route for people who no longer have the app: a prefilled mailto
  to `console@fuzonapps.com`, subject "Delete my account".
- What is deleted and when (30 days; backups 90 days), straight from the
  retention table. Smart Switch: no account, nothing held.
- This is the Google Play "Delete account URL".

### Contact `/contact`
- `console@fuzonapps.com` for everything; the page suggests a subject
  line per topic (Support, Privacy request, Copyright notice, Delete my
  account) via prefilled mailto links. A form is optional:
  Web3Forms (already used on fixmypcperth) if wanted, otherwise mailto
  only so there is no backend.
- Legal name, ABN, state.

### About `/about`
- Who Fuzon Apps is, what it builds, the privacy stance. Short.

### Utility
- `404.html`, `robots.txt`, `sitemap.xml` (built by Liquid, no plugin).
- `app-ads.txt` if any app shows ads (question 6).
- Later, only if Cloud Storage share links or app deep links need it:
  `/.well-known/assetlinks.json` (Android App Links) and
  `/.well-known/apple-app-site-association` (iOS Universal Links).

### Footer (every page)
Apps, Support, Privacy, Terms, Delete account, Contact; "© 2026
<legal name>, ABN …"; "Google Play and the Google Play logo are
trademarks of Google LLC. App Store is a trademark of Apple Inc." (needed
when the official badges are used).

## 6. Design

- Clean, product-company look: lots of white space, one accent colour
  per app on its page (for example blue for Cloud Storage, green for
  Smart Switch, orange for GPS), a neutral brand colour for the shell.
  Final colours come from the logo once we have it.
- Colours as CSS custom properties; light and dark mode.
- Official store badges only, unedited, at the size guides allow.
- Phone mock-ups built from the real screenshots.
- Mobile first: 16px side gutter, no horizontal scroll, tap targets at
  least 44px.
- Accessibility to WCAG 2.1 AA: contrast, focus styles, alt text, skip
  link, headings in order, `prefers-reduced-motion` respected.

## 7. SEO and sharing

- Unique `<title>` and meta description per page, canonical URLs.
- JSON-LD: `Organization` (site-wide), `MobileApplication` per app page
  (name, OS, category, offers, download URL), `FAQPage` on app and
  support pages, `BreadcrumbList` on app pages.
- Open Graph and Twitter images: one per app, one default.
- Targets: Lighthouse 95+ on all four scores, every page under ~200 KB
  before screenshots.
- Submit to Google Search Console (DNS verification via Cloudflare).

## 8. Build phases

| Phase | Work | Needs |
|---|---|---|
| **0. Inputs** | Owner answers section 2 questions; legal fixes in section 3 decided (and lawyer pass). | Owner |
| **1. Scaffold** | Jekyll 4, Gemfile, Actions workflow, `_config.yml`, layouts, header/footer, CSS tokens, `_data/apps.yml` and `company.yml` with placeholders. Deploy to the default `*.github.io` address with `noindex` on. | Nothing; can start now |
| **2. Legal pages** | Privacy and Terms converted from the .docx, numbered, anchored, with the section 3 fixes. Delete-account page. | Phase 0 answers 1, 2, 9 |
| **3. App pages and home** | The three app pages, home, about, support, contact. | Assets (answers 4, 5, 7) |
| **4. Store extras** | `app-ads.txt`, schema, OG images, sitemap, 404. | Answer 6 |
| **5. QA** | Phone and desktop screenshots, link check, HTML validation, Lighthouse, accessibility pass, every placeholder gone (grep for `[` and `yourcompany`). | |
| **6. Launch** | Cloudflare DNS: keep the email (MX/SPF/DKIM) records for console@ intact; four A records to GitHub Pages (185.199.108-111.153) for the apex, CNAME `www` to `ali-rajaa.github.io`. Set custom domain in repo settings, enforce HTTPS. Remove `noindex`. Search Console. | Domain access |
| **7. Store links** | Put the live URLs into each Play Console / App Store Connect listing: privacy, support, delete-account, marketing URL. | Store access |

Phase 1 is safe to start right away. Phase 2 can start with the current
text and the open placeholders clearly marked, then be finished once the
answers arrive.

## 9. URLs to put in the stores (once live)

| Store field | URL |
|---|---|
| Privacy policy (all apps) | `https://www.fuzonapps.com/privacy` |
| Privacy policy (per app, optional) | `/privacy#cloud-storage`, `#smart-switch`, `#gps-voice-navigation` |
| Support URL (App Store) | `https://www.fuzonapps.com/support` |
| Delete account URL (Play) | `https://www.fuzonapps.com/delete-account` |
| Marketing / website URL | `https://www.fuzonapps.com/apps/<slug>` |
| Developer website (Play, for app-ads.txt) | `https://www.fuzonapps.com` |
