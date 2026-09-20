# Changelog

## v1.2 — 2026-09-20 (Olaf inspirace — Fáze N)

Přenos 5 nejlepších vzorů z produkční mobilní aplikace `bifactory/olaf/apps/web` do design systému:

- **`<Reveal>`** komponenta — fade-up entrance s stagger, dashboard hero pattern.
- **`Avatar` `alert` prop** — "!" indikátor v pravém horním rohu (nedokončený profil, oznámení).
- **`Toast` `role="alert"` + `aria-live`** — screen readery správně notifikují dle tone.
- **`[data-theme="paper"]`** — warm outdoor/magazine paletta jako scoped alternative k dark; lze aplikovat na sub-strom.
- **`@media (max-width: 399px)`** — extra-small mobile paddings (Section, Callout, Modal, Drawer, PageBody, StatTile) pro iPhone SE / malé Androidy.

**Přeskočeno pro budoucí iteraci:** DatePicker (DayPicker popup), PWA cache-bust utility.

---

## v1.1 — 2026-09-18 (Noční autonomní práce)

Cílem bylo posunout System 21 z „funkčního“ na „luxusní, moderní, propracovaný“ — desktop i mobil. 13 fází, každá samostatný commit `night/*` na `main`.

### Foundations

**Tokeny** (`tokens/tokens.json` + generátor `scripts/tokens-to-css.py`)
- **Motion**: 5 durations (instant 80ms → slower 480ms) + 4 easings (out / out-back / in-out / in).
- **Elevation**: `--elev-0` … `--elev-6` (dvouvrstvé měkké stíny s tintem `rgba(15,23,42,*)`, ne pure black), `--elev-inset-soft` (glass highlight), `--elev-focus-glow` (halo prsten).
- **Radius**: přidáno `-xs` (2px), `-md` (6px), `-3xl` (24px). Existující `-xl` zvětšeno 12→14, `-2xl` 16→18 (měkčí, prémiovější vzhled).
- **Blur**: `--backdrop-blur-sm/md/lg` (8/16/24px) pro glass surfaces.
- **Barvy**: `--border-subtle`, `--surface-raised`, `--surface-sunken`, `--primary-glow`, `--primary-glow-strong`, `--shine`.

**Typografie**
- Nové styly: `.display-xl` (48px hero), `.display-lg` (32px), `.overline` (10px verzálky).
- Font features globálně: `kern`, `liga`, `calt` na `body`; `ss01 + kern` na mono labely (JetBrains SS1 = pěknější 0/`).
- `tabular-nums` na všech číselných surface (StatTile, table numeric, Pagination, ActionBar, badges, cell code).
- Optical fix: `letter-spacing: -.01em` na 16px display titles.
- `text-rendering: optimizeLegibility` + font smoothing na root.

**Dark mode**
- `[data-theme="dark"]` layer — teplý dark základ (#0b0c0e → #22262b), ne pure black.
- BIfactory green stays; `--primary-text` zesvětleno na `#7de49a` (5.6:1 na dark).
- Semantic barvy oklch s posunutou L (light → dark).
- Elevace s vyšší opacitou (rgba 0,0,0 z 0.06 na 0.4–0.8), aby byly stíny vidět.
- `color-scheme: dark` pro native controls.
- **`ThemeToggle`** komponenta (sun/moon) + **`useTheme()`** hook (prefers-color-scheme + localStorage).

### Vizuální polish existujících komponent

**Elevace + glass**
- Karty (Section, StatTile, DataTable wrap, FilterBar) dostaly `--elev-1` + `--surface-raised`.
- StatTile na hover přechází na `--elev-2` (motion tokeny).
- Primary Button: dvouvrstvý shadow (`--elev-1` + `--elev-inset-soft`), glass finish.
- Modal: backdrop `blur-md` + entrance `s21-modal-in` (scale 0.96 → 1 + translateY 8 → 0 + fade), panel `--elev-5`.
- Toast: `--elev-4` + `s21-toast-in` (slide from right, ease-out-back).
- TopBar & sticky PageHeader & StickyActionBar: glassmorphism (`color-mix` + `saturate(180%) blur(--backdrop-blur-sm)`) + `border-subtle`.
- Dropdown menus: legacy `--shadow-lg` → `--elev-3`.
- 8 znovupoužitelných `@keyframes` (fade, modal, toast, drawer-in-right/left/bottom, pop, shimmer).

**Motion & mikrointerakce**
- Focus glow: hard ring + soft halo (`--elev-focus-glow`) na inputech a všech fokusovatelných.
- Button `:active` `translateY(1px)` (fyzický press).
- Row hover indicator: 3px inset box-shadow na první buňce (zelený primary stripe).
- Universal transitions přes motion tokeny (chip, seg, tab, input, navitem).
- Button `loading` prop → spinner místo ikony + `aria-busy` + disabled.
- `prefers-reduced-motion: reduce` → vypne všechny transitions/animations.

**Ikony**
- Rozšíření z 20 na **65** (Lucide styl, ručně inline do `PATHS`, nulová externí závislost).

### Nové komponenty (celkem 22 nových)

**Fáze G — základ:**
1. **Tooltip** — 4 strany, hover/focus delay, arrow.
2. **Skeleton** + `Skeleton.Text` — shimmer gradient.
3. **Progress** (linear + `Progress.Circular` SVG) — 4 tony, aria-progressbar.
4. **Callout** — info/success/warning/danger inline notice.
5. **Switch** — role=switch, ease-out-back thumb, focus glow.
6. **Avatar** + **AvatarGroup** — iniciály/image, 3 tony, overlap +N.
7. **Kbd** — fyzická klávesa (border-bottom 2px).
8. **RadioGroup** — kartová volba, horizontal/vertical.
9. **Popover** — anchored, esc/outside close.
10. **DropdownMenu** — controlled wrapper nad existujícím `.s21-dd`.

**Fáze H — pokročilé:**
11. **Drawer** — 4 strany, backdrop blur, scroll lock.
12. **BottomSheet** — mobile-first Drawer (drag handle, safe area).
13. **Accordion** — single/multiple open.
14. **Timeline** — vertikální osa, dot per tone.
15. **Sparkline** — mini SVG chart (line + area + endpoint dot).
16. **CommandPalette** ⌘K — fullscreen s backdrop-blur-lg, fuzzy search (unicode-normalized), keyboard nav.

**Fáze J — form polish:**
17. **InputGroup** — prefix/suffix adornments (€, %, unit).
18. **Textarea** — autosize + character counter s color states.
19. **FileDrop** — drag & drop s validací + keyboard.

**Fáze K — mobile:**
20. **BottomNav** — fixed mobile tab bar.
21. **useScrollDirection** hook — pro hide-on-scroll TopBar.
22. **SkipLink** (Fáze M) — a11y keyboard-first.

### DataTable rozšíření (Fáze I)

Nové (aditivní) props:
- `selectable` + `selected` + `onSelectedChange` → checkbox column s tri-state header, `.is-selected` row style, bulk toolbar s count + akce + clear.
- `density: "sm" | "md" | "lg"` — kompaktní/default/velký padding.
- `stickyFirst` — první sloupec fixován při horizontal scrollu.
- `loading` + `loadingRows` — skeleton rows.
- `expandRow` + `isRowExpanded` — expandable řádek se sub-obsahem.

### Showcase & docs

- **`demo/showcase.html`** — jedna stránka se všemi komponentami sekcionálně (Foundations, Actions, Data display, Forms, Navigation, Feedback, Data + Sparkline, Overlays, Layout). ⌘K globální listener, sun/moon toggle.
- **`docs/tokens.html`** — živá galerie tokenů (barvy jako swatche, typo samples, prostor bars, radius, elevace demo, motion durations, blur ukázky). Light/Dark toggle přepočítává swatche.
- **`README.md`** — přidány odkazy na showcase, tokens, NIGHT_PLAN, night-log.

### A11y & print (Fáze M)

- **`SkipLink`** komponenta a `.s21-sr-only` utility.
- **`prefers-contrast: more`** — silnější bordery + 3px focus ring.
- **`forced-colors: active`** — Windows high contrast (CSS vars ignorovány, fallback na CanvasText).
- **`@media print`** — čistý dokument: schované chrome, karty bez elevace/gradient bg, URL po externích odkazech, `break-inside: avoid`.

### Přeskočené / odloženo

- **Combobox** a **DatePicker** (Fáze H) — scope-heavy (200+ řádků každý).
- **Column resize** a **column visibility menu** (Fáze I) — komplexní gesture handling.
- **Floating label** a **fieldset group** (Fáze J) — application-level polish.
- **Swipe actions** na ListCard (Fáze K) — touch gesture edge cases.
- **5 realistických screenů** v `demo/screens/` (Fáze L) — showcase pokrývá to nejdůležitější.

### Backward compatibility

Všechny změny jsou **aditivní**. Žádná komponenta neztratila prop, žádný CSS selektor nebyl přejmenován. Legacy `--shadow-sm/lg/xl` tokeny zůstávají (deprecated in favor of `--elev-*`, ale funkční). Existující volání komponent fungují beze změny — nové features jsou opt-in přes nové props.

**Jediný „soft breaking“**: radius-xl (12→14) a radius-2xl (16→18) → všechny existující karty jsou o něco kulatější. Záměr — jde o vizuální upgrade, ne rušení funkce.

---

## v1.0 — 2026-09-18

Initial release: tokeny, komponenty, brand manuál. Viz README.
