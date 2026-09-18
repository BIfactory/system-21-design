# System 21 — noční autonomní log

Průběh práce podle `NIGHT_PLAN.md`. Zapisuju čas začátku fáze, hotovo/přeskočeno, findings.

Časy jsou v místní zóně stroje. Datum: **2026-09-18** (start večer).

---

## Fáze A — Základ a tokeny prémiovosti — HOTOVO

**Přidáno:**
- Motion: 5 durací (instant 80ms → slower 480ms), 4 easing (out / out-back / in-out / in).
- Elevation: `--elev-0..6` (dvouvrstvé měkké stíny, tint `rgba(15,23,42,*)` místo pure black), `--elev-inset-soft` (glass highlight), `--elev-focus-glow` (halo).
- Radius: přidáno `-xs` (2px) a `-md` (6px) a `-3xl` (24px). Zvětšeno `-xl` 12→14 a `-2xl` 16→18 pro měkčí, prémiovější zaoblení (drobná viz. změna existujících karet — záměr).
- Blur: `--backdrop-blur-sm/md/lg`.
- Barvy: `--border-subtle`, `--surface-raised`, `--surface-sunken`, `--primary-glow`, `--primary-glow-strong`, `--shine`.
- Generátor: `tokens-to-css.py` teď zahrnuje `motion` a `blur` sekce.

**Findings:** žádné blokery. Build prošel na první pokus.

**Commit:** `night/A: premium tokens (motion, elevation, radius, blur, glow)`

---

## Fáze B — Refined shadows + glass surfaces — HOTOVO

**Aplikováno:**
- **Karty** (`.s21-section`, `.s21-stat`, `.s21-table-wrap`, `.s21-filterbar`): `--elev-1` a `--surface-raised` — jemný lift, moderní hloubka.
- **StatTile hover**: transition na `--elev-2` (subtle lift na hover) s motion tokeny.
- **Primary tlačítko**: dvouvrstvý shadow (`--elev-1` + `--elev-inset-soft`) — glass finish shora; hover → `--elev-2`, active → `--elev-1`.
- **Modal**: `backdrop-filter: blur(--backdrop-blur-md)` na overlay; panel `--elev-5`; entrance `s21-modal-in` (scale 0.96 → 1, translateY 8→0, fade) + backdrop fade.
- **Toast**: `--elev-4`, entrance `s21-toast-in` (slide from right + fade) s ease-out-back.
- **TopBar & PageHeader.is-sticky**: glassmorphism — poloprůhledný `color-mix` background + `backdrop-filter: saturate(180%) blur(--backdrop-blur-sm)` + `border-subtle` místo tvrdé linie.
- **StickyActionBar (mobil)**: stejný glass + jemnější upward shadow.
- **Dropdown menu** (crumbs, dd, powered): `--elev-3` místo tvrdého `--shadow-lg`.
- **Reduced-motion**: globální media query vypíná všechny animace/transitions (0.01ms).
- **Keyframes**: přidáno 8 znovupoužitelných (fade-in/out, modal-in, toast-in, drawer-in-right/left/bottom, pop-in, shimmer).

**Findings:**
- `color-mix(in srgb, var(--surface) 85%, transparent)` funguje v moderních prohlížečích; pro dark mode se použije stejný vzorec (jen `--surface` bude jiný).
- Border-subtle vypadá lépe na sticky lištách než tvrdý `--border` — méně cutu z obsahu při scrollu.

**Commit:** `night/B: elevations, glass surfaces, backdrop blur, motion keyframes`


