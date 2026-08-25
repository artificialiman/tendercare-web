# tendercare-web

Public site for Tendercare Comprehensive College — the Svelte rebuild of the
former [Testy](https://github.com/artificialiman/Testy) static-HTML site.

This is one of three independently-deployable apps in the Tendercare Svelte
migration:

| App | Repo | Role |
|---|---|---|
| `tendercare-web` | this repo | Public site — home, sports, yearbook, awards, feed, about |
| `tendercare-teacher` | *(next)* | Staff dashboard — broadsheets, score entry |
| `tendercare-portal` | *(next)* | Result/transcript portal + student directory |

They are deliberately **not** a monorepo and do not share a runtime or a
deploy pipeline — a broken build in one can't take the others down. Cross-app
links (Results, Student Portal) go through `src/lib/config.ts`
(`PORTAL_URL`/`TEACHER_URL`) — one place to update once those apps have real
deploy URLs, instead of hardcoded hrefs scattered across every page. Right
now those constants point at placeholder `.example` URLs that will 404 on
purpose, rather than silently pointing nowhere.

## Stack

- SvelteKit 2 (Svelte 5, runes mode) + TypeScript
- `adapter-static`, fully prerendered — ships as plain static files, same
  hosting model (GitHub Pages) as the original site
- No backend — this app has no data layer, except the feed page's
  localStorage demo (see below)

## Status: all six original pages ported

Home, sports, yearbook, awards, feed, about — all built, `svelte-check`
clean (0 errors, 0 warnings), production build passes with strict prerender
error handling (`handleHttpError: 'fail'`), deployed via GitHub Actions to
GitHub Pages on every push to `main`.

## What changed vs. the original Testy repo

- **Nav and footer were duplicated on every page in the original HTML** (and
  inconsistently — two different footer layouts existed across pages). Both
  are now single shared components (`src/lib/components/Nav.svelte`,
  `Footer.svelte`), standardized on the richer footer layout.
- **Page-specific `<style>` blocks are now properly scoped** to their
  component instead of living in a shared global stylesheet by accident.
- **`main.js`'s `querySelectorAll`-based behavior** (scroll animations,
  counters, parallax, nav drawer, yearbook flip cards) became Svelte actions
  in `src/lib/actions/scrollFx.ts`, attached only to the elements that use
  them.
- **The sports page's event-video modal** and **about page's contact-form
  button** were converted from inline `onclick="..."` strings (which don't
  execute the way you'd expect inside Svelte's template — it treats `onclick`
  as an event binding, not a raw HTML attribute) into real Svelte state and
  event handlers.
- **The feed page's data layer was kept as vanilla JS**, wrapped in
  `onMount()`, since it's a self-contained localStorage demo with an
  already-documented Supabase upgrade path in its own comments. Its
  dynamically-created elements (comments, user posts) needed their CSS
  selectors wrapped in `:global()` — Svelte's scoped-CSS hashing doesn't
  reach elements created via `innerHTML` at runtime, so without this the
  styling would have silently failed to apply.
- **The design-token stylesheet (`src/lib/styles/tendercare.css`) was
  ported unchanged** — byte-for-byte identical to the original, confirmed
  by diff. Same palette (purple/lemon/cream/wine), same type scale. Nothing
  about the brand changed, only how the markup is organized.
- **Full-page navigation reloads were replaced** with SvelteKit's client-side
  router; the page-transition overlay now hooks into `onNavigate` instead of
  intercepting `<a>` clicks and calling `window.location.href`.

## Known gaps carried over from the source repo

A handful of images referenced in the original HTML (homepage facestrip,
sports-page photo grid) don't actually exist in the Testy repo — they 404
there too. Rather than guess, those entries were dropped or pointed at an
image that does exist; each instance is called out in the commit that
touched it. Also: the sports page's highlight video (`YHPrade.MOV`, ~13MB)
was intentionally **not** bundled into this repo — a binary that size
doesn't belong in git history; it needs a real hosting decision (Supabase
storage, a CDN) before it's wired up.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # static build → build/
npm run check     # svelte-check
```
