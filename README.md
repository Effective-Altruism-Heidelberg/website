# EA Heidelberg — production site

Plain static HTML/CSS/JS, no build step — ready to serve as-is from
GitHub Pages. This repo was prepared in advance, before the real GitHub
org/repo existed, so the migration is just "create repo → push → flip on
Pages" once they do.

```
index.html          language gate — redirects by browser language,
                     with manual EN/DE links as a fallback
impressum.html       German legal notice — see TODO below before launch
style.css            shared design system
assets/              self-hosted fonts, images, logo (see "Assets" below)
script.js             shared vanilla JS (nav, animations, interactive bits)
en/                  index, what-is-ea, about, events, contact
de/                  index, was-ist-ea, ueber-uns, veranstaltungen, kontakt
```

## TODO before this actually goes live

**`impressum.html` is a placeholder.** It has bracketed fields
(`[Name der verantwortlichen Person/Organisation]` etc.) instead of real
information. German law (§5 DDG) requires this page to correctly name
whoever is actually responsible for the site's content — fill it in
before publishing. This wasn't guessed on purpose: it's the one piece of
real-world information (who's the responsible organiser, what address)
that has to come from you, not from a redesign exercise.

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

## Once the final domain is known

Link previews (WhatsApp, Signal, Slack, etc.) need an **absolute** URL for
the share image. In every page's `<head>`, change
`<meta property="og:image" content="../assets/img/og-image.jpg">` to
`https://<your-domain>/assets/img/og-image.jpg`:

```bash
grep -rl 'og:image" content="../' en de | xargs sed -i 's#og:image" content="../#og:image" content="https://YOUR-DOMAIN/#'
```

## Assets

```
favicon.svg, favicon-32.png, apple-touch-icon.png   logo mark (Alte Brücke arches + amber diamond)
assets/img/logo-mark.svg                            same mark, used in header/footer/map pin
assets/img/og-image.jpg                             1200×630 link-preview card
assets/img/*.webp                                   Wikimedia Commons photos + OSM map (credits in impressum)
assets/fonts/                                       Sora + Inter woff2, SIL OFL licences
assets/illustrations/                               unDraw SVGs, recoloured to the site teal
404.html                                            served by GitHub Pages for missing URLs
```

