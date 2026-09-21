# kshitij-portfolio

Personal site. Vite + React 19 + Tailwind v4.

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # fetches Medium + GitHub first (prebuild), then builds to dist/
```

## Quick swaps

The short version. Details for each are further down.

| To… | Do this |
|---|---|
| Replace a project | Overwrite its entry in `pinned` → give it a cover (screenshot or drawing) → fix its name in the `stack` `in:` lists → `grep -rn "OldName" src` |
| Change a screenshot | Save `public/projects/<slug>.jpg` (16:10, ~1600 × 1000, < 200 KB) → set `image` |
| Publish an article | Nothing. The next deploy picks it up. Commit `src/data/writing.json` now and then so old posts survive. |
| Fix an article's title or summary | `writing.overrides['<hex id from URL>'] = { title, dek, topics }` |
| Hide an article | Same override, `hidden: true` |
| Change the song | `song` in `site.js` (Spotify → Share → Copy link) |
| Change the status line | `profile.status` |
| Add the résumé | `public/resume.pdf` + `profile.resume: '/resume.pdf'` |

## Where things live

Almost all content is in **`src/data/site.js`**. Edit there, not in the components.

| What | Where |
|---|---|
| Name, tagline, status, email, résumé link | `profile` in `site.js` |
| The six project tiles | `pinned` in `site.js` |
| Names on the orange ribbon | `allProjects` in `site.js` |
| Project screenshots | `public/projects/` |
| Drawn covers (projects without a screenshot) | `illustrations` in `src/components/ProjectCover.jsx` |
| Article summaries and titles | `writing.overrides` in `site.js` |
| Article list itself | `src/data/writing.json` (generated) |
| Off-the-clock cards | `interests` in `site.js` |
| Tools grid | `stack` in `site.js` |
| Tech logos | `src/components/TechLogo.jsx` |
| Numbers row (1st, 200+, 5) | `highlights` in `site.js` |
| Contact cards | `socials` in `site.js` |
| Corner music player | `song` in `site.js` |
| Contribution calendar | `src/data/contributions.json` (generated) |
| Link-preview image, app icon | `public/og.png`, `public/apple-touch-icon.png` |

---

## Swap a project

Each entry in `pinned` is one tile:

```js
{
  slug: 'flux',                 // lowercase, no spaces. Used for the #project-flux anchor and the cover.
  name: 'Flux',
  kind: 'Concurrent double-entry ledger',  // one short line under the name
  summary: 'Two sentences at most.',
  metric: { value: '₹0', label: 'overdraft with FOR UPDATE' },  // or null
  stack: ['Next.js', 'Node 22', 'PostgreSQL 16'],              // 3–4 items
  repo: 'https://github.com/zacktiger/Flux-ledger',
  live: 'https://…' ,           // or null. If set, the tile links here instead of the repo.
  image: '/projects/flux.jpg',  // or null (see covers below)
  status: 'In progress',        // optional yellow tag; leave the key out when done
}
```

To replace one, overwrite its entry in place. Then:

1. **Give it a cover.** Either add a screenshot (see below), or leave `image: null` and add a drawing to `illustrations` in `ProjectCover.jsx` under the same `slug`. **With neither, the cover is blank.**
2. **Metric:** only use a number a committed benchmark or eval produced. Leave it `null` otherwise.
3. **Tools grid:** in `stack`, update the `in: [...]` lists. Drop the old project's name and add the new one where it really uses that tool. A name that matches a pinned project becomes a link to its tile.
4. **Logos:** every name in the project's `stack` gets a logo only if `TechLogo.jsx` knows it (see [Add a tech logo](#add-a-tech-logo)). Unknown names just show as text.
5. **Ribbon:** the ribbon updates by itself for pinned projects. If the project you took out should still appear there, add it to the unpinned part of `allProjects`.
6. **Stray mentions:** run `grep -rn "OldName" src` for the name you removed. It also appears in prose, e.g. the Writing intro in `Writing.jsx` names AtlasQL and PoliCast.

**Renaming a `slug`** (or `name`) breaks things silently, with no error. The slug is also the key in `illustrations` and the screenshot filename, and the `name` is what `stack` matches for links. Rename all of them together.

**Order and layout.** Tiles lay out in list order on a fixed pattern: wide / narrow, narrow / wide, half / half (`spans = [4, 2, 2, 4, 3, 3]` in `src/components/Work.jsx`). Put a project with a strong screenshot in position 1 or 4, the wide slots. The pattern is built for **exactly six**. For a different count, edit `spans` so each row adds up to 6.

### Screenshots

- **Size:** 16:10, e.g. **1600 × 1000**, JPG, under ~200 KB. The frame is cropped from the top, so keep the important part at the top. In the wide slots (1 and 4) on desktop the frame is taller than 16:10, so the sides get cropped too. Keep the subject near the horizontal centre.
- **Light UI shots read best.** A dark screenshot among the drawn covers reads as a black box at tile size; crop to one detail (a table, a chart) rather than the whole screen.
- **Where:** save to `public/projects/<slug>.jpg` and set `image: '/projects/<slug>.jpg'`.
- The site slightly desaturates and warms images. Don't pre-filter them.
- To go back to the drawing, set `image: null`.

### Drawn covers

An entry in `illustrations` (in `ProjectCover.jsx`) is SVG children drawn on a **320 × 194** canvas. Colour it only with the constants at the top of that file (`ink`, `muted`, `line`, `accent`, `soft`, plus `var(--bg)` for fills), never hex values, so it follows light and dark mode. Copy the nearest existing drawing and change it; one idea per cover, one accent element.

### Ribbon-only projects

Add a line to the unpinned part of `allProjects`:

```js
{ name: 'SnapLink', href: gh('Url_shortner') },   // gh('<repo name>') builds the GitHub URL
```

The ribbon's speed scales with the count on its own. Leave out assignments, tutorials and this site.

---

## Articles (Medium)

Nothing to do for a new post. Every `npm run build` (including each Vercel deploy) pulls the Medium feed into `src/data/writing.json`. Run `npm run fetch:medium` to refresh it locally.

- **Fix a title, summary or topics:** add an override keyed by the hex id at the end of the post URL (`…-cant-win-wars-anymore-f8f82d89a2eb` → `'f8f82d89a2eb'`):

  ```js
  writing.overrides['f8f82d89a2eb'] = {
    title: 'Shorter title',          // optional
    dek: 'One-line summary.',       // optional. By default it's the post's opening line.
    topics: ['Geopolitics', 'War'], // optional. By default it's the first two Medium tags.
    hidden: true,                   // optional. Keeps the post off the site.
  }
  ```

  Any field you leave out falls back to the feed.
- **Hide a post:** add `hidden: true` to its override. Deleting it from `writing.json` doesn't work, because the next fetch adds it back while it's still in the feed.
- **Keep old posts:** the feed only carries the latest 10. Commit `writing.json` after a local fetch so older ones stay.
- The four newest show. The rest sit behind a "N more essays" button (`SHOWN` in `src/components/Writing.jsx`).
- The section heading and intro ("Notes on maps, money and war") are in `src/components/Writing.jsx`. Change them if the topics drift.
- Reading time is estimated at 230 words/min, so it won't always match Medium's.

---

## Off-the-clock cards

In `interests`:

```js
{ key: 'books', title: 'Books', line: 'One or two sentences.', picks: ['Title', 'Title'], now: 'Current title' }
```

- `picks` (2–3 favourites) and `now` only appear once filled. Use `[]` and `null` to hide them.
- `now` also needs a `verb` in that card's `look` entry ("Reading", "Playing"). Quizzes has `verb: null`, so its `now` never shows.
- **The `key` must exist in `look` in `src/components/About.jsx`,** which sets the icon, colour and width. To add or rename a card, add a `look` entry with the same key. Icons come from [Phosphor](https://phosphoricons.com); the colour is one of `blue`, `green`, `red` or `yellow`.
- Widths are 3 + 3, then 2 + 2 + 2. If you change the number of cards, adjust the `span` values so each row adds up to 6.

---

## Tools grid

In `stack`, grouped. Each tool names the projects that actually use it:

```js
{ name: 'Redis', in: ['Pulse', 'SnapLink'] }   // `in: []` is fine for tools not tied to one repo
```

- **The `group` name must exist in `toolLook` in `About.jsx`** (icon, colour, width). To add a group, add an entry there too.
- Widths are 2 + 2 + 2, then Frontend at 4 (its list splits into two columns via `wide: true`) beside Ops at 2. Keep Frontend the longest list. If you add or remove a group, adjust the `span` values so each row adds up to 6.
- Keep it to things shipped in real code. No "familiar with" lists.

### Add a tech logo

In `src/components/TechLogo.jsx`, names are matched in lowercase, without version numbers and without anything after " / ". So "Node / Express" → `node` and "PostgreSQL 16" → `postgresql`.

1. Find the brand on [simpleicons.org](https://simpleicons.org). The import name is `si` + its slug with the first letter capitalised, e.g. `siMongodb`.
2. Import it at the top and add `'mongodb': siMongodb` to `brands`.
3. With no brand icon, map it to a Phosphor icon in `standIns` instead.

---

## Everything else

- **Résumé:** replace `public/resume.pdf` with the new PDF; `profile.resume` already points at `/resume.pdf`.
- **Status line** (e.g. "Open to SDE & PM internships"): `profile.status`.
- **Contact cards:** `socials`. **Each `label` needs an entry in `marks` in `src/components/Contact.jsx`** (icon + hover colour), or the page crashes. **Keep the label `GitHub` spelled exactly:** the console note in `src/main.jsx` looks it up by name, and the site won't load without it. The first two entries also appear as links under the hero, so order matters. The email is also in `profile.email`, so change both.
- **Hero:** name, status, tagline, role and education all come from `profile`. The Nixie clock shows local time in `profile.timezone` (an IANA name like `'Asia/Kolkata'`); `profile.location` is the text beside it.
- **Nav:** `nav`. Each `id` must match a section's `id`.
- **Song:** open the track on Spotify, then Share → Copy link. The id is the part after `/track/`. Set `uri: 'spotify:track:<id>'` and update `title` and `artist`.
- **About text** (the big sentence and paragraph): written directly in `src/components/About.jsx`, still marked TODO.
- **Principles, numbers row:** `principles` and `highlights` in `site.js`.
- **Contribution calendar:** automatic on every build (`npm run fetch:github`). To use a different account, change `USER` in `scripts/fetch-github.mjs`.
- **Link preview (`og.png`) and app icon:** made from `scripts/brand/og.html` and `icon.html`. Edit the HTML, open it in a browser at exactly 1200 × 630 (icon: 180 × 180), screenshot, and save over the file in `public/`. Also update the matching text in the `og:` and `description` tags in `index.html`. Those tags don't read `site.js`, so a new tagline has to be copied there by hand. LinkedIn and WhatsApp cache previews for days; paste the URL into [LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) to refresh it.
- **Custom domain:** preview tags need the site's full URL, which the build takes from Vercel's production domain. On a custom domain, set `SITE_URL=https://yourdomain.com` in Vercel's environment variables, or shared links show no image.
- **Colours** are CSS variables at the top of `src/index.css`, one block per theme (light and dark).

## Before you push

```sh
npm run build && npm run preview
```

Check that every tile has a cover, the ribbon's filled dots match the tiles, and nothing scrolls sideways on a phone-width window. Both fetch scripts keep the last snapshot if Medium or GitHub is down, so a failed fetch never breaks a deploy.
