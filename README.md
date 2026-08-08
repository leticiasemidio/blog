# leticiasemidio.com

This is the real, multi-page version of the site — built with
[Astro](https://astro.build). It replaces the earlier single-file HTML
wireframe: every page below now has its own real, shareable URL.

## Current scope (MVP)

- **Live in the nav:** Home, About, Resources, Contact — all under `/en/`.
- **Built but hidden from the nav:** Projects (`/en/projects/`) and
  Services (`/en/services/`). The pages are real and work if you visit
  them directly; they are just not linked from the header/footer yet.
- **Built but not linked anywhere:** the RSS feed (`/feed.xml`), the
  newsletter box, and the language selector. Same idea — nothing was
  deleted, it's commented out so it's a one-line change to bring back.
- **English only.** The site is structured as `/en/...` on purpose, so
  that adding Portuguese and Spanish later is just adding `/pt/` and
  `/es/` folders next to it — see "Adding a language" below.
- **Resources hub:** only the *first* article of each of the 7 lifecycle
  stages exists right now (Start here, Organize, Plan, Audit, Write,
  Improve, Scale) — 7 articles total, each its own real page. They are
  currently filled with `[bracketed placeholders]` for you to replace.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:4321`). It will
land on `/en/` — Home redirects there automatically from `/`.

## Where everything lives

```
src/
├── layouts/BaseLayout.astro     → shared <head>, Header, Footer wrapper
├── components/
│   ├── Header.astro             → nav, theme toggle, mobile menu
│   └── Footer.astro
├── styles/global.css            → every design token and component style,
│                                   ported from the original wireframe
├── content/
│   ├── config.ts                → validation rules for every article
│   └── resources/*.md           → the 7 article files — edit these directly
└── pages/
    ├── index.astro               → redirects "/" to "/en/"
    ├── feed.xml.js                → RSS feed (built, not linked — see above)
    └── en/
        ├── index.astro            → Home
        ├── about.astro
        ├── contact.astro
        ├── projects/index.astro   → built, not linked — see above
        ├── services/index.astro   → built, not linked — see above
        └── resources/
            ├── index.astro        → Resources hub (lists the 7 articles)
            └── [...slug].astro    → generates one real page per article
```

## Fill in your own content

Everything with `[bracketed text]` in it is a placeholder waiting for your
real content. The two big places to start:

1. **`src/pages/en/about.astro`** — bio, skills, work experience, clients,
   testimonials, certifications. Search the file for `[` to find every spot.
2. **`src/content/resources/*.md`** — the 7 articles. Each file has its own
   `HOW TO EDIT THIS FILE` comment at the top with the exact steps. Short
   version: replace the frontmatter (title, description, date), then
   replace every `[bracketed placeholder]` in the body below it.

You'll also want real photos — drop them in `public/images/` and reference
them as `/images/filename.jpg` from any page or article.

## Add an 8th (or 9th, or 10th) article

Add a new `.md` file inside `src/content/resources/`. The filename becomes
the URL (`my-new-article.md` → `/en/resources/my-new-article/`). Fill in
the same frontmatter fields as the existing files. It will show up
automatically on the Resources hub, under whichever `category` you set —
no other file needs to change.

## Bring back a hidden feature

Every hidden piece (Projects/Services nav links, RSS, newsletter, language
selector) is wrapped in an HTML comment that says `HIDDEN FOR MVP` right
above it, in whichever file it lives in (mostly `Header.astro`,
`Footer.astro`, `en/index.astro` and `en/resources/index.astro`). Delete
the `<!--` and `-->` around the block to turn it back on.

## Adding a language (Portuguese, Spanish)

The whole site already lives under `/en/`, specifically so this step is
additive, not a rewrite:

1. Duplicate the `src/pages/en/` folder as `src/pages/pt/` (or `es/`).
2. Translate the copy inside those files — the actual translation still
   needs to be done by a human (or carefully reviewed if AI-assisted); see
   the earlier discussion on tone differing by language, not just words.
3. Add `'pt'` (or `'es'`) to the `locales` array in `astro.config.mjs`.
4. Bring back the language selector (see "Bring back a hidden feature"
   above) and point each option at the matching folder.

Content articles can also be translated by adding a `lang` field to the
collection schema in `src/content/config.ts` later, if you want translated
articles to live in the same `resources/` folder instead of being
duplicated per language — happy to help set that up when you get there.

## Before going live

- [ ] Replace every `[bracketed placeholder]` across About and the 7 articles.
- [ ] Add real photos to `public/images/` and reference them from the pages.
- [ ] Wire up the Contact form to a real service — the file
      `src/pages/en/contact.astro` has a comment explaining the Formspree
      option, which needs no backend code of your own.
- [ ] Update the résumé download link in `about.astro` once you have a
      real PDF in `public/`.
- [ ] Double check `astro.config.mjs` still has the right `site` value.

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. On [vercel.com](https://vercel.com), choose "Add New Project" and import
   that repository.
3. Vercel detects Astro automatically — no build settings to change.
4. In the Vercel project settings, add your domain
   (`www.leticiasemidio.com`) under Domains, and follow their DNS
   instructions with whoever you bought the domain from.
5. Every push to your main branch redeploys the site automatically.
