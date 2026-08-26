# What's left for "Tendercare Svelte Migration" — as at 2026-08-26 02:11 UTC

## Repos

| App | URL | Visibility | Last push |
|---|---|---|---|
| `tendercare-web` | https://github.com/artificialiman/tendercare-web | Public | 2026-08-25 |
| `tendercare-teacher` | https://github.com/artificialiman/tendercare-teacher | **Private** | 2026-08-26 |
| `tendercare-portal` | https://github.com/artificialiman/tendercare-portal | **Private** | repo created, empty |

**Live deploy:** https://artificialiman.github.io/tendercare-web/ (GitHub Pages, auto-deploys on push to `main` via Actions)

**Source repos this migration is replacing** (all still exist, unchanged):
- https://github.com/artificialiman/Testy — old public site (Home/Sports/Yearbook/Awards/Feed/About + disconnected teacher-dashboard/student-portal shells)
- https://github.com/artificialiman/Teacher-care — real broadsheets/roster/scores. **Still public**, contains real student data. Confirmed as the authoritative source for student name spelling (`tcc_broadsheet.html` specifically — see verification below).
- https://github.com/artificialiman/UTMEDaily/tree/main/Tendercare/Directory — student directory, not yet pulled into `tendercare-portal`

---

## tendercare-web — ✅ Done

All six original pages ported, type-checked clean, deployed:
Home, Sports, Yearbook, Awards, Feed, About.

**Nothing left**, except two carried-over gaps from the source repo (not something to fix here — flagging in case they get resolved upstream):
- A handful of source images referenced in the original HTML don't exist in `Testy` (404 there too) — dropped or substituted, documented per-commit.
- Sports page's highlight video (`YHPrade.MOV`, ~13MB) intentionally not bundled into git — needs a real hosting decision (Supabase storage / CDN) before it's wired up.

---

## tendercare-teacher — Schema + roster + as-is scores pushed; still needs:

- [ ] **Actual Supabase project provisioning.** Nothing in `supabase/migrations/` or `supabase/seed/` has been run against a live database yet — the Supabase connector available in this session returns zero projects, so this is all untested against real Postgres. Needs: a project created/connected, migrations applied in order (`0001_core_schema.sql`, `0002_rls_policies.sql`), then seeds (`001_roster_2024_2025.sql`, `002_scores_asis.sql`).
- [ ] **Staff authentication/login.** RLS policies assume a `staff` role in the JWT (`auth.jwt() ->> 'role' = 'staff'`) — no login flow exists yet to actually issue that.
- [ ] **Score entry / broadsheet UI.** The old `teacher-dashboard.html` in `Testy` turned out to be a disconnected demo (references a `js/tcc-data.js` that doesn't exist anywhere) — this needs to be built fresh against the real schema, not ported.
- [ ] **Subject label cleanup.** 69 raw subject label variants from the CSV import (`Maths`/`MATHS`/`Mathematics` etc.) aren't normalized to one canonical name per subject. Deliberately left as-is per instruction since the underlying score data is expected to change anyway.
- [ ] **12 unmatched student names from the score CSVs** need a decision: add to roster, or confirm as errors. Full list in `supabase/seed/002_scores_asis.sql` header comment and the README. A few (e.g. "Adio Daniel") look like new/transferred-in students based on the source file's own notes, not typos.
- [ ] **`Teacher-care` repo visibility.** Still public with real student CSVs in it. Worth flipping private once this app fully replaces it as the working system.

## tendercare-portal — Not started

Repo exists (private), nothing built. Needs:
- [ ] Result/transcript viewer (from `Testy`'s `result.html`/`results.html` + `Teacher-care`'s per-class portal pages)
- [ ] Student login/auth flow
- [ ] Student directory (from `UTMEDaily/Tendercare/Directory` — not yet pulled/reviewed)
- [ ] Wired to the same Supabase project as `tendercare-teacher`, using the already-written read-only RLS role (`portal and public apps see active students only` policy in `0002_rls_policies.sql`) — no new policy work needed, just needs the schema live first

---

## Cross-cutting / not tied to one app

- [ ] **Supabase not connected.** This is the one blocker that affects both `tendercare-teacher` and `tendercare-portal` equally — no migrations, seeds, or RLS policies have run anywhere yet.
- [ ] **`PORTAL_URL` / `TEACHER_URL` in `tendercare-web`'s `src/lib/config.ts`** are placeholder `.example` URLs by design (they 404 on purpose). Need updating to real deploy URLs once `tendercare-teacher`/`tendercare-portal` are live somewhere (Vercel, presumably, given `adapter-vercel` is already configured on `tendercare-teacher`).
- [ ] **Shared design-token package** (`@artificialiman/tendercare-ui` or similar) was part of the original plan so all three apps stay visually consistent without copy-pasting `tendercare.css` — not yet extracted; `tendercare-teacher`'s `/roster` page currently uses its own minimal inline styles, not the Tendercare brand system.
