# Free design resources for the EA Heidelberg site

Research notes, November 2026. This file lists free resources (logos, photos,
icons, illustrations, data graphics, textures) and the place on the site where
each one would fit. Nothing has been added to the site yet. Licences were
checked at the source where possible. Where the answer was unclear, the note
says so.

---

## 0. What the site has today

| Area | Current state | Gap |
|---|---|---|
| Logo / brand | Text only: `EA <span>Heidelberg</span>` (`.brand` in every header) | No logo mark, **no favicon**, no `og:image` (links shared in WhatsApp, Signal or Instagram show no preview) |
| Photos | **None.** The only image is a YouTube thumbnail (`en/what-is-ea.html:61`, `de/was-ist-ea.html:64`) | The site gives no sense of the actual people, the room or the city |
| Icons | About 20 hand-drawn inline SVGs, 24×24, `stroke-width:2`, round caps (`.icon` in `style.css`) | Some are hard to read. "Free snacks" looks like a sun, "Animal welfare" is a cluster of dots, and "No obligation" is a double arrow |
| Illustrations | Teal gradient cards and the "ripple" animation | No figurative imagery at all |
| Data | Hand-built HTML bar chart, count-up stats | Good already. Could use one authoritative chart |
| Fonts | Sora + Inter **loaded from fonts.googleapis.com** | GDPR risk in Germany (see §9) |

---

## 1. Logo and brand identity

### 1a. The EA "heartbulb" (lightbulb with a heart)

- **Status:** CEA (via Effective Ventures Foundation) says it **owns the
  trademark on the heartbulb logo**. It does *not* claim the phrase
  "effective altruism" ([EA Forum: "Who owns Effective Altruism?"](https://forum.effectivealtruism.org/posts/WN4thu6pYoBTHfEay/who-owns-effective-altruism)).
- Many local groups use a version of the bulb, and there is no community-wide
  brand guide ([EA Forum: graphic standards thread](https://forum.effectivealtruism.org/posts/dTCMBEvhNkbh2qSZc/does-effective-altruism-have-a-graphic-standards-brand-style)).
  The same thread links CEA's style guide for effectivealtruism.org, hosted on
  Frontify, and a group graphics collection at `resources.eahub.org/graphics`.
  I could not open either, and both may be out of date.
- **CEA's [press kit](https://www.centreforeffectivealtruism.org/press-kit)
  offers no logo download.** EA Germany's [press page](https://effektiveraltruismus.de/presse/)
  doesn't offer one either.
- **Recommendation:** Email CEA's groups team and EA Germany's community team.
  Ask for the official group-logo files and written OK to use them as
  "EA Heidelberg". This is the normal route for university groups. Until then,
  don't copy the bulb from other sites.

### 1b. Effective Altruism Australia design guidelines (best reference found)

- [effective-altruism-australia.github.io/design-guidelines](https://effective-altruism-australia.github.io/design-guidelines/design-guidelines.md)
  is a full public brand kit. It has the bulb logo in SVG/PNG
  (colour/mono/black/white), a teal palette, Merriweather + Mukta type, and
  **14 line icons for EA charities** (AMF, GiveDirectly, GiveWell, GWWC,
  Malaria Consortium, New Incentives and others).
- **No licence is stated.** Treat it as inspiration, or ask EAA before reusing
  files.
- Their primary teal `#0C869B` is almost identical to our `--teal:#0388a0`.
  That suggests our palette already fits the wider EA visual family, so we
  don't need to change colours.

### 1c. Own mark (works without anyone's permission)

- Build a small **wordmark / monogram** ("EA HD" or "EA" in a rounded square,
  in teal and amber) from **Sora**. Sora is SIL Open Font License, and the OFL
  allows its use in logos.
- **Where to use it:**
  - `.brand` in the header of all 10 pages, plus `index.html` and `impressum.html`
  - `<link rel="icon" href="/favicon.svg">` + `apple-touch-icon.png` (180×180) in every `<head>`
  - `og:image` / `twitter:image`: a 1200×630 card (logo + "Do good, better" +
    a Heidelberg photo, see §2). This matters because the site is mostly
    shared as a link in student group chats.
  - Footer (`.site-footer`), white version on `--teal-900`.

---

## 2. Photos

### 2a. Your own event photos (highest impact)

Nothing free beats real photos of the group. A full room at an intro talk,
snacks on the table, or the team around a whiteboard tells a first-year
"people like me go here" better than any stock image.

- Get consent from the people pictured. In Germany that falls under the
  GDPR/KUG, so a sign at the door or a sign-up checkbox is enough.
- **Where they would go:**
  - `about.html` / `ueber-uns.html` → "Who we are": a team photo of the six organisers.
  - `events.html` / `veranstaltungen.html` → "What we've run recently": small
    thumbnails on the past-event cards.
  - `index.html` → the hero stat card could alternate with or sit beside a
    group photo.
  - `about.html` → "Books": a photo of the actual lending shelf. This also
    avoids book-cover copyright (see §6).

### 2b. Heidelberg photos from Wikimedia Commons (licences checked via the Commons API)

All of these are Commons "Quality images". CC BY means credit only. CC BY-SA
means credit, and if you **modify** the image (crop and overlay are borderline;
a colour-tinted remix definitely counts), the modified image must also be
CC BY-SA.

| Photo | Licence | Author | Size | Good for |
|---|---|---|---|---|
| [Heidelberg Altstadt Schloss Luftbild](https://commons.wikimedia.org/wiki/File:Heidelberg_Altstadt_Schloss_Luftbild.JPG) | **CC BY 4.0** | Schlurcher | 4074×2834 | Home hero / `og:image` background (aerial view of the old town and castle) |
| [20230315 Alte Brücke Heidelberg 03](https://commons.wikimedia.org/wiki/File:20230315_Alte_Br%C3%BCcke_Heidelberg_03.jpg) | **CC BY 4.0** | Flocci Nivis | 6016×4016 | About page banner |
| [Heidelberger Schloss 2012](https://commons.wikimedia.org/wiki/File:Heidelberger_Schloss_2012.jpg) | **CC BY 3.0** | Felix König | 2600×1810 | Secondary / German pages |
| [Alte Brücke Heidelberg von Nordwesten](https://commons.wikimedia.org/wiki/File:Alte_Br%C3%BCcke_Heidelberg_von_Nordwesten.jpg) | CC BY-SA 4.0 | Stephan van Helden | 6000×4000 | Events hero |
| [Neckarstrand am Neckarstaden Heidelberg](https://commons.wikimedia.org/wiki/File:Neckarstrand_am_Neckarstaden_Heidelberg.jpg) | CC BY-SA 4.0 | Stephan van Helden | 6000×4000 | "Social gatherings" feel (river bank) |
| [Heidelberg-Altstadt](https://commons.wikimedia.org/wiki/File:Heidelberg-Altstadt.jpg) | CC BY-SA 4.0 | Jörg Braukmann | 5686×3000 | Wide banner |
| [Neckar in Heidelberg 2023](https://commons.wikimedia.org/wiki/File:Neckar_in_Heidelberg_2023.jpg) | CC BY-SA 4.0 | Jörg Braukmann | 16960×5000 panorama | Thin full-width strip above the footer |
| [Heidelberg night](https://commons.wikimedia.org/wiki/File:Heidelberg_night.jpg) | CC BY-SA 3.0 | Godoi | 3872×2592 | Dark section background (evening events) |

The full list of Heidelberg quality images is at
[Category:Quality images of Heidelberg](https://commons.wikimedia.org/wiki/Category:Quality_images_of_Heidelberg).

**Credit format:** "Photo: Schlurcher, CC BY 4.0, via Wikimedia Commons"
with links. Put it in a small caption or a "Bildnachweise / Image credits"
block in `impressum.html`.

**Technical:** Download the images, resize them to about 1600px wide, convert
them to WebP/AVIF and store them in `/img/`. Don't hotlink
upload.wikimedia.org (privacy and performance).

### 2c. General stock photos (no attribution needed)

- **[Unsplash](https://unsplash.com/license)** and **Pexels**: free, no
  attribution, commercial use OK. Search "Heidelberg", "students discussion",
  "lecture hall". EA Germany's own site uses Unsplash images.
- Use them sparingly. Generic stock "diverse students laughing at laptop"
  photos read as fake. City and atmosphere shots work better than staged
  people.

### 2d. Cause-area photos

- **Animal welfare → [We Animals Media](https://weanimalsmedia.org/?p=84081)**:
  35,000+ photos, **free for non-commercial use by advocates/NGOs/educators**.
  The credit must read "Photographer / We Animals Media". Pick gentle images
  (animals in sanctuaries) rather than graphic farm footage for a welcoming
  student site.
  - **Where:** the "Animal Welfare" cause card (`what-is-ea.html` around line
    118) and the "Which cause area speaks to you?" quiz panel.
- **Global health:** I found **no open photo licence** from GiveWell, AMF or
  GiveDirectly. GiveDirectly photos are taken under recipient-consent forms
  covering *its own* publications, not third-party reuse. Ask the charity
  directly, or use Commons / Unsplash. Follow dignity-first image guidelines:
  no "poverty porn", and show people as agents rather than recipients.
- **Global catastrophic risks:** abstract imagery works well (NASA images are
  public domain, e.g. Earth from space, available on Commons).

---

## 3. Icons

The existing icons use the same grammar as **Lucide/Feather** (24×24 viewBox,
2px stroke, round joins). Lucide icons therefore drop straight into the
existing `.icon` CSS with no style changes. Copy the inline `<svg>` from
lucide.dev and keep `class="icon"`.

| Library | Licence | Notes |
|---|---|---|
| **[Lucide](https://lucide.dev/license)** (recommended) | ISC (Feather-derived icons: MIT) | 1,500+ icons, same style as today's icons |
| Tabler Icons | MIT | 5,000+, also 24px / 2px stroke |
| Phosphor | MIT | Six weights, including "duotone", which could pair teal + amber |
| **Simple Icons** | CC0 | Brand icons (Instagram, WhatsApp, Meetup, Signal) for footer social links. Each brand's own trademark rules still apply |

**Suggested swaps (Lucide names):**

| Location | Now | Suggested |
|---|---|---|
| `index.html` cards | search / target / arrow | `search` · `target` · `hand-heart` |
| `what-is-ea.html` Scale / Neglectedness / Tractability | globe / magnifier / check | `globe` · `eye-off` · `wrench` |
| `what-is-ea.html` cause areas | plus-circle / dots / polygon | `heart-pulse` · `paw-print` · `shield-alert` |
| `events.html` "No prep" | check | `circle-check` |
| `events.html` "Free snacks" | sun-like shape | `cookie` or `pizza` |
| `events.html` "Come alone or with a friend" | two circles | `users` |
| `events.html` "No obligation" | double arrow | `door-open` |
| `contact.html` | map pin / envelope | `map-pin` · `mail` (current ones are fine) |
| New: event meta lines | — | `calendar`, `clock`, `map-pin` inline before date/room |
| New: Books section | — | `book-open` |
| New: footer | — | Instagram/Meetup from Simple Icons |

**Emoji graphics** (if you want a playful touch):
[OpenMoji](https://openmoji.org) (CC BY-SA 4.0), Twemoji (graphics CC BY 4.0).
The Giving What We Can **🔸 small orange diamond** is the community's pledge
symbol and matches the `--amber` accent nicely ([GWWC](https://www.givingwhatwecan.org/get-involved/advocacy-assets)).

---

## 4. Illustrations

| Library | Licence | Fit |
|---|---|---|
| **[unDraw](https://undraw.co/license)** | Free, commercial OK, **no attribution**. No redistribution as a pack, no AI training | Has a colour picker, so set `#0388a0` and they match the palette exactly |
| **[Open Peeps](https://openpeeps.com)** / Open Doodles | **CC0** | Hand-drawn, warm and human. Suits "Welcome, really" |
| Humaaans | Free commercial use | Mix-and-match people |
| Storyset (Freepik) | Free **with attribution** | Lots of animated scenes, but the credit is required |

**Where:**
- `events.html` → "First time coming? Here's what to expect": one illustration
  of people around a table beside the four cards.
- `contact.html` → hero: a person waving / sending a message.
- `about.html` → "Welcome, really": an Open Peeps group.
- **A 404 page** (none exists yet. GitHub Pages serves `404.html` from the
  root): a friendly illustration plus links back.
- An empty state for "no upcoming event announced yet".

Pick **one** library and stick with it. Mixing styles looks worse than having
no illustrations.

---

## 5. Data graphics

- **[Our World in Data](https://ourworldindata.org/faq)**: charts and data are
  **CC BY** (some older pages still say CC BY-SA; OWID says to treat everything
  as CC BY). Third-party data inside a chart keeps its own licence. Download
  any chart as **SVG/PNG**
  ([how-to](https://ourworldindata.org/how-to-use-our-world-in-data-visualizations-in-presentations)),
  or fetch it via `ourworldindata.org/grapher/<slug>.svg`.
  - **Self-host the static SVG** instead of using the iframe embed, which
    loads third-party scripts (privacy, see §9).
  - **Where:**
    - `what-is-ea.html` "How much does being born where you were matter?" (dark
      section, around line 222) → OWID life-expectancy or extreme-poverty world map.
    - "Global Health & Wellbeing" card → OWID child-mortality-over-time line.
    - Home "A quick reality check" stats → link each number to its OWID/GiveWell source.
  - Credit: "Source: Our World in Data (CC BY)" plus the underlying source.
    Don't imply that OWID endorses EA Heidelberg.

---

## 6. EA-ecosystem assets

| Asset | Terms | Where |
|---|---|---|
| **GWWC [advocacy assets](https://www.givingwhatwecan.org/get-involved/advocacy-assets)**: pledge badges, sample HTML, Canva templates | Provided for sharing/advocacy | `what-is-ea.html` "Small student budget…" section, next to the GWWC card |
| GiveWell / GWWC / 80,000 Hours / effectivealtruism.org **logos** | Trademarks, no open licence. Small logos to identify linked orgs are common, but ask to be safe | "We didn't invent any of this" cards (`what-is-ea.html` around line 326). Even just the favicon-sized logo above each card title would help |
| EA Australia **charity line icons** | No licence stated, so ask | Could illustrate the "Small student budget" accordion (bednets, deworming, vitamin A) |
| **Book covers** ("Doing Good Better", "The Precipice", "100x Mehr", …) | Publisher copyright. Germany has no fair use. Open Library Covers API images aren't licensed for reuse | Better: **photograph your own shelf** for the Books section |
| YouTube "Drowning Child" thumbnail | Belongs to The Life You Can Save | Download it once and self-host (see §9) |

---

## 7. Textures, patterns and section dividers (cheap, big visual lift)

- **[Haikei](https://haikei.app)**: generates SVG waves, blobs and layered
  peaks in your own colours. You own the output.
  - Wavy dividers between `.section` and `.section--tint`.
  - A blob behind the hero heading, replacing the current blurred amber circle.
- **Hero Patterns** (CC BY 4.0): subtle repeating SVG patterns. A 5%-opacity
  "topography" pattern on `.section--dark` (it fits Heidelberg's hills and
  river).
- Grain/noise SVG filter on the teal gradient cards (`.hero__stat-card`,
  `.event-card.is-featured`) for a less flat look. Pure CSS, no licence
  question.

---

## 8. Maps (contact page)

- `contact.html` → "Where we meet" currently has only the address text.
- **OpenStreetMap** (ODbL): a static map image with a pin on AWI,
  Bergheimer Str. 58, credited "© OpenStreetMap contributors", linking to
  `openstreetmap.org` for directions. A static image avoids third-party tile
  requests. The Google Maps embed is **not** recommended because it sets
  cookies and transfers data to Google, which needs consent in Germany.

---

## 9. Privacy and legal points that come up with external assets (Germany)

1. **Google Fonts are loaded from Google's servers on every page**
   (`<link href="https://fonts.googleapis.com/...">`). LG München I,
   20.01.2022, Az. 3 O 17493/20 held this unlawful without consent and awarded
   damages. A wave of warning letters followed, though a later ruling went
   against the mass senders. **Fix:** self-host Sora + Inter (both OFL) from
   `/fonts/` using google-webfonts-helper or Fontsource, then remove the two
   `preconnect` lines.
2. **The YouTube thumbnail** (`i.ytimg.com`) loads before anyone clicks, which
   sends visitor IPs to Google. `script.js:213` correctly uses
   `youtube-nocookie.com` only on click. Self-hosting `hqdefault.jpg` would
   make the facade fully privacy-preserving.
3. **Image credits:** add a "Bildnachweise / Image credits" section to
   `impressum.html` listing every CC BY / CC BY-SA / We Animals Media image.
   This satisfies attribution in one place, alongside the small captions.
4. Store everything locally in `/img`, `/icons`, `/fonts`. Hotlink nothing.

---

## 10. Suggested order of work

| # | Change | Effort | Impact |
|---|---|---|---|
| 1 | Favicon + `og:image` share card (own wordmark + CC BY Heidelberg aerial photo) | Low | High: every shared link gets a preview |
| 2 | Self-host fonts and YouTube thumbnail | Low | Removes legal risk |
| 3 | Swap the weakest icons for Lucide (snacks, animal welfare, no obligation, catastrophic risk) + add calendar/clock/pin to event meta | Low | Medium |
| 4 | Real photos: team photo on About, past-event thumbnails, book shelf | Medium (needs a camera and consent) | **Highest** |
| 5 | Heidelberg photo banner on About/Events heroes + credits block | Low | Medium–high |
| 6 | Haikei wave dividers + subtle pattern on dark sections | Low | Medium |
| 7 | One unDraw/Open Peeps illustration on "What to expect" + a 404 page | Low | Medium |
| 8 | OWID map in "born where you were" section | Medium | Medium |
| 9 | Ask CEA / EA Germany for official group logo files | Email | Brand consistency |

Every change has to be made twice (EN + DE pages mirror each other).
