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

---

## Fáze C — Motion & mikrointerakce — HOTOVO

**Přidáno:**
- **Focus glow**: `.s21-input` a všechny fokusovatelné prvky mají tvrdý ring + soft halo `--elev-focus-glow` (4px `--primary-glow`). Prémiový moderní focus.
- **Button transitions**: rozšířeno na motion tokeny (fast + ease-out), přidáno `transform: translateY(1px)` na `:active` (fyzický "press" feel).
- **Row indicator v tabulce**: hover řádku vysune 3px zelený indikátor zleva (přes `inset box-shadow` na první buňce, protože `<tr>` neakceptuje `::before` reliably).
- **Universal transitions**: chip, seg, tab, input, navitem přejeté na motion tokeny (150ms `--motion-ease-out`).
- **Button loading state**: nový `loading` prop → spinner místo ikony, `aria-busy`, `disabled`, kurzor `wait`. TypeScript def aktualizován.
- **Spinner keyframe**: `s21-spin` (0.7s linear infinite, currentColor border).

**Findings:**
- Použití `::before` na `<tr>` je nespolehlivé; `inset box-shadow` na první buňce je čistší cesta pro row indicator.
- `translate` na `:active` vypadá výrazněji s dvouvrstvým stínem (elev-1) než by bez něj — dobrá synergie s Fází B.

**Commit:** `night/C: motion transitions, focus glow, row indicator, button loading`

---

## Fáze D — Typografie — HOTOVO

**Přidáno:**
- **display-xl** (48/1.1 Manrope 800, -.03em) — hero titulek pro landing/onboarding.
- **display-lg** (32/1.15 Manrope 800, -.025em) — sekundární hero.
- **overline** (10/14 mono 600, .12em uppercase) — mikro-labely nad názvem karty.
- **Font features globálně**: `kern`, `liga`, `calt` na `body`; `ss01 + kern` na mono labels (JetBrains stylistic set 1 = pěknější 0/`).
- **tabular-nums**: přidáno na `.s21-stat__value`, `.s21-table td.is-num`, `.s21-pager`, `.s21-actionbar__value`, `.s21-cell-code`, `.s21-lcard__stats`, `.s21-badge`, `.s21-navitem__badge` — všechna čísla zarovnaná.
- **Optical fix**: `section-title` a `modal-title` (16px Manrope 600) dostaly `letter-spacing: -.01em` — v malé velikosti čte líp.
- **Generátor** rozšířen: `overline` dostává také `text-transform: uppercase` automaticky.
- **Font smoothing**: `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`, `text-rendering: optimizeLegibility` na root.

**Findings:** vypadá dobře; číslo v Pagination bylo do teď proporcionální — tabular-nums to sjednotil.

**Commit:** `night/D: typography (font-features, tabular-nums, display-xl/lg, overline)`

---

## Fáze F — Rozšíření ikonového setu (20 → 65) — HOTOVO

**Přidáno 45 ikon** (Lucide-style, 24×24, stroke 2, ručně do PATHS):
- Navigace: `chevron-up`, `arrow-up/down/left/right/up-right`, `external-link`
- Akce: `minus`, `download`, `upload`, `copy`, `edit`, `trash`, `eye`, `eye-off`, `lock`, `unlock`, `refresh`, `save`
- Komunikace: `mail`, `phone`, `send`, `bell`, `share`, `link`
- Značení: `bookmark`, `flag`, `heart`, `star`, `tag`, `map-pin`
- Data view: `sort-asc`, `sort-desc`, `grid`, `list`, `columns`, `expand`, `collapse`
- Soubory/tisk: `image`, `file`, `paperclip`, `printer`, `credit-card`
- Osoby/místa: `home`, `building`, `users`, `user-plus`
- Feedback: `alert-circle`, `alert-triangle`, `info`, `help-circle`
- Analytika: `sparkles`, `zap`, `activity`, `trending-up`, `trending-down`, `bar-chart`, `pie-chart`
- Motiv: `sun`, `moon`
- Média: `play`, `pause`, `arrow-repeat`, `cloud`

TypeScript union type `IconName` aktualizován.

**Commit:** `night/F: expand icon set 20 → 65 (Lucide-style, hand-inlined)`

---

## Fáze G — Nové komponenty: základ — HOTOVO (10/10)

**Přidáno v `src/components/index.jsx` + `bundle.css` + `system21.d.ts`:**

1. **Tooltip** — hover/focus s delay, 4 strany (top/bottom/left/right), portal-less, tmavý pop se šipkou, `role="tooltip"`.
2. **Skeleton** — animovaný shimmer (`s21-shimmer` keyframe), `Skeleton.Text` helper (n řádků, poslední kratší).
3. **Progress** — lineární (sm/md/lg), 4 tony (primary/success/danger/warning), aria-progressbar, hlavička s label + % (tabular). `Progress.Circular` (SVG, konfigurovatelná velikost a stroke).
4. **Callout** — inline notice s tonem info/success/warning/danger, default ikonou, volitelnou action. `role=alert` pro warning/danger.
5. **Switch** — accessible `role="switch"` toggle, thumb s ease-out-back animací (16px slide), focus glow, disabled state.
6. **Avatar + AvatarGroup** — kruhový avatar iniciál nebo image, 3 tone (primary/accent/muted); group s max overlap a "+N" spillover.
7. **Kbd** — `<kbd>` ve stylu fyzické klávesy (border-bottom 2px + mono font).
8. **RadioGroup** — kartová varianta (checked = primary-soft podklad), horizontal/vertical, aria-radiogroup, focus glow.
9. **Popover** — trigger anchored (top/bottom × start/end/center), escape + outside click close, `s21-pop-in` entrance.
10. **DropdownMenu** — controlled wrapper nad existujícím `.s21-dd` markup; `trigger` a `children` mohou být funkce (render-prop pro state).

**Findings:**
- `role="switch"` + native checkbox = nejlepší accessibility bez custom keyboard handleru.
- `color-mix` pro Callout borders → světlejší varianta primary/warning-text jako border v mixu s `--border`.
- Skeleton používá gradient bg + shimmer keyframe — cache-friendly.

**Poznámka:** Previews (`components/*/preview.html`) pro tyto komponenty přidám v Fázi L (showcase). Zatím jsou dostupné přes `window.S21.<Name>` v `dist/system21.js`.

**Commit:** `night/G: 10 base components (Tooltip, Skeleton, Progress, Callout, Switch, Avatar, Kbd, RadioGroup, Popover, DropdownMenu)`

---

## Fáze E — Dark mode — HOTOVO

**Přidáno:**
- **`[data-theme="dark"]` layer** v `bundle.css` — override barevných tokenů:
  - Surfaces: teplý základ `#0b0c0e → #22262b` (canvas → sunken → surface → raised → muted), ne pure black.
  - Text: `#ececed` primary, `#a1a1aa` muted.
  - Borders: `rgba(255,255,255,0.04..0.18)` — jemnější v dark.
  - Primary green stays, ale `--primary-text` se zesvětlí na `#7de49a` (5.6:1 na dark surface), `--primary-glow` z 0.28 na 0.4 (víc vidět).
  - Sidebar `#050506` (tmavší než tělo pro kontrast s obsahem).
  - Semantic (success/danger/warning): oklch tón/luminance přepočtený pro dark bg (~65% L, snížené chroma).
  - Elevace: víc opacity na stínech (rgba 0,0,0 z 0.06 na 0.4-0.8), aby byly vidět na dark.
  - `color-scheme: dark` — nativní scrollbar/kalendář v dark.
  - `--shine: rgba(255,255,255,0.08)` — inset highlight jemnější.
- **Overrides v konkrétních komponentách:**
  - TopBar/PageHeader/StickyActionBar glass přepočet (opacity 82/88/90%).
  - Table thead → `--surface-sunken`.
  - Chip.is-active a Pagination.is-current → z `--black` na `--primary` (v dark nejsou visible černé prvky nad tmavým bg).
  - Tooltip pop → `#2a2d31` (světlejší než default `#1f2124`, aby byl vidět nad kartami).
- **`ThemeToggle`** komponenta (sun/moon ikona, iconbtn stylem).
- **`useTheme` hook** — čte prefers-color-scheme, persistuje do `localStorage['system21-theme']`.

**Findings:**
- Použití oklch pro semantic barvy v dark bylo přímočaré — jen zvedneme L a snížíme C.
- `color-scheme` je důležité, jinak Chrome vykresluje form controls a scrollbary bíle na dark bg.

**Commit:** `night/E: dark mode (data-theme=dark) + ThemeToggle + useTheme`

---

## Fáze H — Pokročilé komponenty — ČÁSTEČNĚ (6/8)

**Přidáno:** Drawer, BottomSheet, Accordion, Timeline, Sparkline, **CommandPalette** (premium moment).

**Přeskočeno:** Combobox a DatePicker — scope-heavy (200+ řádků každý s tricky keyboard/focus flow). Přesunuto na následující iteraci.

**Detaily:**
- **Drawer** — 4 strany (left/right/top/bottom), animace `s21-drawer-in-*`, escape close, body scroll lock, radius 3xl na bottom/top varianta pro sheet look.
- **BottomSheet** — mobile-first Drawer s `--sheet` className: drag handle indicator (36×4px pill top), padding pro safe area.
- **Accordion** — single nebo multiple open, chevron rotate + fade-in body.
- **Timeline** — vertikální osa (`::before` line), dot v barvě dle tone, čas + title + description + author.
- **Sparkline** — SVG mini graf (line + area + last-point dot), aria-label. Automatický scale z min/max data.
- **CommandPalette** — ⌘K style. Fullscreen s `backdrop-blur-lg`, fuzzy search (normalizace unicode diakritiky), keyboard nav (↑↓ Enter Esc), sekcionalizace, kbd shortcuts na items, `role="dialog"`.

**Findings:**
- CommandPalette by potřeboval globální keyboard listener na ⌘K/Ctrl+K — nechal jsem ho externě (aplikace si napíše `useEffect` s add/remove listener a `setOpen`). Interní listener by narušil kontrolu.
- BottomSheet reuse Drawer je čistý — jen preset props + className s podrobným paddingem.

**Commit:** `night/H: 6 advanced components (Drawer, BottomSheet, Accordion, Timeline, Sparkline, CommandPalette)`

---

## Fáze L — Showcase + Token galerie — ČÁSTEČNĚ

**Přidáno:**
- **`demo/showcase.html`** — jednostránkový katalog: hero s ⌘K promo, sekce Foundations (barvy, typo), Actions (buttons), Data display (badges/tags/chips/kbd), Forms (input/switch/radio), Navigation (tabs/seg/breadcrumbs), Feedback (callout/progress/skeleton), Data (StatTile + Sparkline), Overlays (Modal/Drawer/BottomSheet/Tooltip/CommandPalette), Layout (Timeline/Accordion/Avatar). Globální ⌘K listener.
- **`docs/tokens.html`** — token galerie: barvy (swatche), typo (samples všech .display-xl → .code), prostor (bars podle skutečné šířky), radius (vizuál), elevace (demo boxy), motion (durations + demo box s bounce animací), blur (vizual přes gradient overlay). Toggle Light/Dark v hlavičce.
- **`README.md`** — přidány odkazy na showcase, tokens, NIGHT_PLAN, night-log.

**Přeskočeno:** 5 realistických screenů v `demo/screens/` — do budoucna. Priorita byla showcase + token galerie, které dají uživateli okamžitý přehled o všem, co je hotovo.

**Commit:** `night/L: showcase.html + tokens gallery + README links`

---

## Fáze I — DataTable polish — HOTOVO

**Přidáno (props na `<DataTable>`):**
- `selectable` + `selected` + `onSelectedChange` — checkbox sloupec s tri-state header ("indeterminate" když jen některé vybrané). Řádek dostane `.is-selected` (primary-soft podklad).
- `bulkActions` — inline toolbar nad tabulkou se aktivuje jakmile je vybraný ≥1 řádek: „Vybráno **N** z M“ + akce + X pro clear. Fade+scale entrance.
- `density` — `sm` (kompaktní 13px/tighter padding), `md` (default), `lg` (spacious).
- `stickyFirst` — první sloupec sticky při horizontálním scrollu (např. long tabulky s hodně sloupci). Použije `background: --surface-raised` + box-shadow separator.
- `loading` + `loadingRows` — místo tbody se rendruje N skeleton řádků (shimmer, respektuje selection/expand sloupce).
- `expandRow` + `isRowExpanded` — chevron sloupec vlevo, po kliku se pod řádek vloží `<tr>` s vlastním obsahem (`--surface-sunken` bg).

**Vše aditivní** — existující DataTable volání fungují dál bez změny (nové props default `false`/`undefined`).

**Přeskočeno:** column resize (drag handles, komplexní) a column visibility menu (potřebuje DropdownMenu + local state, hodí se do budoucí iterace).

**Commit:** `night/I: DataTable — selection, density, sticky first, expandable, loading skeletons, bulk toolbar`










