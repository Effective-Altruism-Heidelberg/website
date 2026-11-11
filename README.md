# EA Heidelberg — production site

Plain static HTML/CSS/JS, no build step — ready to serve as-is from
GitHub Pages. This repo was prepared in advance, before the real GitHub
org/repo existed, so the migration is just "create repo → push → flip on
Pages" once they do.

```
index.html          language gate — redirects by browser language,
                     with manual EN/DE links as a fallback
impressum.html       German legal notice (§5 DDG) + image credits
style.css            shared design system
assets/              self-hosted fonts, images, logo (see "Assets" below)
script.js             shared vanilla JS (nav, animations, interactive bits, events)
data/events.json     all events (edited via Pages CMS, see below)
.pages.yml           Pages CMS form definition for the events
aisafety/            Safe AI Heidelberg (standalone page + past-events/), own aisafety.css
democracy/           Initiative for Safeguarding Democracy (standalone page)
en/                  index, what-is-ea, about, events, gallery, contact
de/                  index, was-ist-ea, ueber-uns, veranstaltungen, galerie, kontakt
```

## Deploying, step by step

1. **Create the repo** on GitHub (the org one, once it exists) — empty,
   no auto-generated README/.gitignore/license (this folder already has
   its own).
2. **Push this content**:
   ```bash
   cd ea-heidelberg-site
   git remote add origin git@github.com:<org>/<repo>.git
   git push -u origin main
   ```
3. **Turn on Pages**: repo Settings → Pages → Source: "Deploy from a
   branch" → Branch: `main`, folder `/ (root)` → Save. First build takes
   a minute or two; it'll be live at `https://<org>.github.io/<repo>/`.
4. **Custom domain**, once you have one:
   - Settings → Pages → Custom domain → enter it → Save (this writes a
     `CNAME` file into the repo for you automatically).
   - At your DNS provider:
     - **Subdomain** (e.g. `ea.yourdomain.org`): one `CNAME` record
       pointing to `<org>.github.io`.
     - **Apex/root domain** (`yourdomain.org`): four `A` records
       pointing to GitHub Pages' IPs — `185.199.108.153`,
       `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Add a
       `CNAME` record for `www` → `<org>.github.io` too if you want
       `www.yourdomain.org` to also work.
   - Back in Settings → Pages, tick **Enforce HTTPS** once GitHub shows
     the certificate as issued (can take a while after DNS propagates —
     don't worry if it's not available immediately).
5. That's it — no Actions workflow, no build step. Pushing to `main`
   updates the live site directly.

## What's already handled

- All internal links are relative, so the site works unchanged whether
  it ends up at a repo root, `<org>.github.io/<repo>/`, or a custom
  domain.
- The old "concept redesign / internal review" draft framing and the
  `noindex` meta tag are removed — this is meant to be found and indexed
  now, not hidden.
- The HTTP Basic Auth password that gated the draft only existed at the
  Caddy/toolsite layer it used to live behind; GitHub Pages has no
  server-side request handling to replicate that with anyway, so it's
  simply gone, by request.
- Fonts (Sora, Inter), icons (Lucide) and all images are self-hosted in
  `assets/`, so pages make no requests to Google or other third parties
  until a visitor clicks the video (which then loads from
  youtube-nocookie.com). Sources and licences of every photo are listed
  under "Bildnachweise / Image credits" in `impressum.html`. Keep that list
  up to date when adding images.
- The GiveWell/GWWC/80,000 Hours/effectivealtruism.org links are external
  and need no changes for the new host.

## Adding events (no code, no pull request)

All events live in `data/events.json`. The events page and both home pages
read that file in the browser (`initEvents` in `script.js`), so adding an
event never touches any HTML:

- Events whose date is today or later show as "next event" (the earliest
  one is the big teal card; the home pages show only that one).
- Once the day is over they move to "What we've run recently"
  automatically — if "show in archive" is ticked. The newest 6 are shown.
- English fields left empty fall back to the German text.

**Editing via Pages CMS (recommended):**

1. Go to <https://app.pagescms.org>, sign in with GitHub and install the
   Pages CMS GitHub App for this repository (one-time, needs repo admin).
2. Open the repo, branch `main` → "Veranstaltungen / Events". Add or edit
   an entry and save. Pages CMS commits straight to `main`; GitHub Pages
   is live again a minute or two later.
3. People without a GitHub account can be invited by email as
   collaborators (repo settings in Pages CMS).

The form is defined in `.pages.yml`. Alternatively, edit
`data/events.json` directly in the GitHub web editor — same effect.

## After changing style.css or script.js

Every page loads them with a version tag (`style.css?v=20261107`). GitHub
Pages lets browsers cache files for 10 minutes, and phones sometimes keep
them longer, so **bump the tag whenever you change either file**. Otherwise
visitors can get new pages with an old stylesheet:

```bash
NEW=$(date +%Y%m%d%H%M)
grep -rlE '(style\.css|script\.js)\?v=' --include=*.html . | xargs sed -i -E "s/(style\.css|script\.js)\?v=[0-9]+/\1?v=$NEW/g"
```

## Domain and link previews

The group's QR codes and posters point to **https://www.eaheidelberg.de/**, so
every page's `og:image` already uses the absolute URL
`https://www.eaheidelberg.de/assets/img/og-image.jpg`. Link previews will work
once this site is served from that domain. If the domain changes, update it in
one go:

```bash
grep -rl 'www.eaheidelberg.de/assets' en de | xargs sed -i 's#https://www.eaheidelberg.de/#https://NEW-DOMAIN/#'
```

## Assets

```
favicon.svg, favicon-32.png, apple-touch-icon.png   EA lightbulb logo (used under licence)
assets/img/ea-logo.svg, ea-logo-white.svg           logo for header, footer, map pin, 404
assets/img/og-image.jpg                             1200×630 link-preview card (EA HD banner)
assets/img/*.webp                                   Alte Brücke + Heidelberg night photos (Commons) + OSM map
assets/photos/                                      own photos, intro talk May 2023 (gallery + About)
assets/banners/                                     past event banners, shown on the gallery page
assets/qr/                                          Signal + WhatsApp group QR codes (contact page)
assets/fonts/                                       Sora, Inter, Libre Baskerville, Almarai (OFL), Roboto Slab (Apache 2.0)
assets/aisafety/                                    Safe AI Heidelberg wordmark + Alte Brücke photo (SSG / G. Bayerl)
assets/illustrations/                               unDraw SVGs, recoloured to the site teal
404.html                                            served by GitHub Pages for missing URLs
```

Image sources and licences are listed under "Bildnachweise / Image credits" in
`impressum.html`. Keep that list up to date when adding images. Photos of
people should only go up with their consent.

## Spin-off pages: /aisafety and /democracy

`aisafety/` (Safe AI Heidelberg, with `aisafety/past-events/`) and `democracy/`
(Initiative for Safeguarding Democracy) are 1:1 ports of the pages that lived at
the same paths on the old Squarespace site, so existing links keep working
(GitHub Pages redirects `/aisafety` to `/aisafety/`). They intentionally keep
their own look and don't use `style.css`. Their events are edited directly in
the HTML (`<details>` blocks), not via `data/events.json`.
