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

