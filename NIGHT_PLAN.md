# System 21 — plán noční autonomní práce

**Cíl:** posunout design system z „funkčního“ na „luxusní, moderní, propracovaný“ — desktop i mobil. Každá fáze je samostatný commit, který jde nezávisle otestovat v `demo/` a pushnout na `main`.

**Pracovní režim:** self-paced `/loop` (dynamický interval). Po každé fázi:
1. `npm run build` (regeneruje `tokens.css`, `dist/`, `components/*/preview.html`).
2. Ruční kontrola v `demo/index.html` (screenshoty do `docs/night/`).
3. Commit s prefixem `night/<fáze>` + push do `main`.
4. Zápis do `docs/night-log.md` (co hotovo, co posunuto, co objeveno).

**Bezpečnostní pravidla pro noc:**
- Žádné destruktivní změny (nemazat komponenty, tokeny přepisovat aditivně).
- Zpětná kompatibilita: existující třídy `.s21-*` a props zůstávají — nové věci přidávat vedle.
- Když něco nejde vyřešit do 30 min, přeskočit a napsat do logu.
- Pushovat na `main` po každé fázi, ne v půlce.

---

## Fáze A — Základ a tokeny prémiovosti (~1h)

**A1. Motion tokens** (`tokens/tokens.json` → `motion.tokens`)
- `--motion-duration-instant` 80ms, `-fast` 150ms, `-base` 220ms, `-slow` 320ms, `-slower` 480ms
- `--motion-ease-out` `cubic-bezier(.2,.8,.2,1)` (základní premium ease)
- `--motion-ease-out-back` `cubic-bezier(.34,1.56,.64,1)` (mírný overshoot, jen pro entrance)
- `--motion-ease-in-out` `cubic-bezier(.4,0,.2,1)`
- `--motion-ease-spring` `linear(...)` fallback

**A2. Elevation systém** (nahradit tři shadowy sedmi vrstevnou škálou s dvojitým stínem — ambient + key light):
- `--elev-0`, `-1`, `-2`, `-3`, `-4`, `-5`, `-6` (od jemného hover po floating panel)
- Použít princip Material 3 / Vercel: dvě vrstvy stínu (velmi měkký velký + ostrý blízký), nižší opacity než teď.
- Přidat `--elev-inset-soft` pro vnitřní highlight (subtle inner shadow pro hloubku karet).

**A3. Radius refinement**
- Přidat `--radius-xs` 2px a `--radius-md` 6px pro jemnější přechody.
- Zvýšit `--radius-xl` na 14px pro karty (16 už je moc, 12 málo).

**A4. Nové barevné tokeny**
- `--surface-raised` (bílá s jemným warm tint pro elevated karty).
- `--surface-sunken` (canvas o odstín tmavší pro vnořené sekce).
- `--border-subtle` (rgba 0,0,0,0.06 — pro divider bez ostré linie).
- `--primary-glow` (rgba primary 0.24 — pro focus glow místo tvrdé ring).

**A5. Blur/backdrop tokens**
- `--backdrop-blur-sm` 8px, `-md` 12px, `-lg` 20px (pro glassmorphism topbar/modal).

**Deliverable:** nové proměnné v `tokens.css`, dokumentace v `tokens.json`, žádná vizuální změna komponent (jen zpřístupnění).

---

## Fáze B — Refined shadows + surfaces na existujících komponentách (~45min)

- Karty (`.s21-section`, `.s21-stat`, `.s21-table-wrap`, `.s21-filterbar`): jemný `--elev-1` místo ostré border-only varianty (border zůstává, ale menší).
- Modal: `--elev-5` + `backdrop-filter: blur(--backdrop-blur-md)` na overlay.
- Toast: `--elev-4` + jemný slide-in.
- Dropdown (`.s21-dd__menu`, `.s21-crumbs__menu`): `--elev-3` + entrance fade.
- Sidebar: `--elev-2` na pravém okraji (subtle depth mezi menu a main).
- TopBar: `backdrop-filter: saturate(180%) blur(--backdrop-blur-sm)` + `background: rgba(255,255,255,0.85)` — sticky lišta „splývá“ s obsahem pod ní.

---

## Fáze C — Motion & mikrointerakce (~1.5h)

**C1. Universal transitions**
- Všechny `.s21-btn`, `.s21-chip`, `.s21-tab`, `.s21-navitem` na `transition: ... var(--motion-duration-fast) var(--motion-ease-out)`.
- Přidat `transform: translateY(-1px)` na hover primary tlačítka (jemný lift) + reset na `:active`.

**C2. Focus glow**
- Focus ring: 2px border + `box-shadow: 0 0 0 4px var(--primary-glow)` (soft halo, ne tvrdá čára). Zachovat outline pro high-contrast režim.

**C3. Table row interactions**
- Hover řádku: jemný levý indicator 3px v `--primary` (currently jen background). Animovaný slide-in zleva.

**C4. Reduced-motion**
- `@media (prefers-reduced-motion)` — všechny transitions → 0.01ms; zachovat focus změny.

**C5. Modal / Toast entrance**
- Modal: scale 0.96 → 1 + fade + backdrop fade, 220ms ease-out.
- Toast: slide from right + fade, 220ms.
- Drawer (nová komponenta): slide + backdrop fade.

**C6. Button loading state**
- `loading` prop na `Button` → spinner + disabled + zachování šířky (min-width lock).

---

## Fáze D — Typografie a číselné detaily (~30min)

- `font-feature-settings: "cv11", "ss01", "kern", "liga"` na `body` (moderní Inter/Archivo tvary).
- `font-variant-numeric: tabular-nums` defaultně na `.s21-stat__value`, `.s21-table td.is-num`, `.s21-pager`, `.s21-actionbar__value`.
- Nové typo groupy: `display-xl` (48px/1.1 Manrope 800, letter-spacing -0.03em) pro hero na landing/print, `overline` (10px verzálky + tracking) pro subtle labely.
- Optical fix: `letter-spacing: -0.01em` na `.s21-section__title` a `.s21-modal__title` (16px display se skinny čte líp).

---

## Fáze E — Dark mode (~1.5h)

**E1. `[data-theme="dark"]` layer v `tokens.css`**
- Zdrojová sada dark tokenů: `--surface: #111214`, `--canvas: #0b0c0e`, `--paper: #17191c`, `--ink: #ececed`, `--ink-muted: #a1a1aa`, `--border: rgba(255,255,255,0.08)`, `--primary` zůstává (BIfactory green má dostatečný kontrast), `--on-primary` černá zůstává.
- Sidebar v dark módu: `--sidebar-bg: #050506` (ještě tmavší než tělo), aktivní item glow.
- Semantic barvy: `success/danger/warning` bg zjemnit (12% alpha color-mix), text zesvětlit.

**E2. Test všech komponent v dark**
- Prolítnout každý `components/*/preview.html` s `data-theme="dark"` na `<html>`.
- Opravit kontrast tam kde je špatný.

**E3. Theme switcher**
- Malá utility komponenta `ThemeToggle` (sun/moon icon).
- Persistence do localStorage `system21-theme`.

---

## Fáze F — Rozšíření ikonového setu (~1h)

Momentálně ~20 ikon. Doplnit na ~60 (všechny 24×24, stroke 2, konzistentní styl):
`arrow-up/down/left/right`, `arrow-up-right` (external link), `download`, `upload`, `copy`, `edit`, `trash`, `eye`, `eye-off`, `lock`, `unlock`, `mail`, `phone`, `send`, `bell`, `bookmark`, `flag`, `heart`, `star`, `share`, `link`, `unlink`, `refresh`, `sort-asc`, `sort-desc`, `grid`, `list`, `columns`, `expand`, `collapse`, `fullscreen`, `zoom-in`, `zoom-out`, `image`, `file`, `file-plus`, `paperclip`, `printer`, `credit-card`, `tag`, `map-pin`, `home`, `building`, `users`, `user-plus`, `alert-circle`, `alert-triangle`, `info`, `help-circle`, `sparkles`, `zap`, `activity`, `trending-up`, `trending-down`, `bar-chart`, `pie-chart`, `sun`, `moon`.

Zdroj/styl: Lucide (open, konzistentní s existujícími). Ručně přepsat do `PATHS` v `src/components/index.jsx` (aby se nezaváděla externí závislost).

---

## Fáze G — Nové komponenty: základní vrstva (~2.5h)

Pořadí podle důležitosti pro „premium“ pocit:

1. **Tooltip** — hover delay, arrow, auto-position (top/bottom/left/right), portal do `<body>`.
2. **Popover** — trigger-based, focus trap, escape to close, portal.
3. **DropdownMenu** — sekce, ikony, kbd shortcuts, submenu, aria-menuitem.
4. **Skeleton** — `<Skeleton />` blok, `<Skeleton.Text lines={3} />`, animovaný shimmer.
5. **Switch** — accessible toggle (role=switch).
6. **RadioGroup** — inline i stacked, custom kroužek s check animací.
7. **Kbd** — `<Kbd>⌘K</Kbd>` (styl klávesy).
8. **Progress** — linear (bar + label + %), circular (SVG).
9. **Callout** — info/success/warning/danger inline zpráva se side icon.
10. **Avatar / AvatarGroup** — iniciály nebo image, overlap při group, tooltip s celým jménem.

---

## Fáze H — Nové komponenty: pokročilé (~3h)

1. **CommandPalette** (`⌘K` / `Ctrl+K`) — hlavní premium moment.
   - Fullscreen overlay s blur backdrop.
   - Fuzzy search přes items (nabídka/nastavení/nedávno navštívené).
   - Sekce s kbd shortcuts.
   - Arrow keys navigace, Enter execute.
2. **Combobox** — searchable Select s ostálým chováním jako Select, ale s async source support.
3. **DatePicker** — light popover s kalendářem (bez lib, cca 200 řádků), CZ locale, range mode.
4. **Drawer** — side panel (left/right/top/bottom), náhrada některých modalů pro CRUD.
5. **BottomSheet** — mobile-first varianta Drawer (bottom), drag-to-dismiss.
6. **Accordion** — jednoduchý (details/summary based) + řízená verze.
7. **Timeline / ActivityFeed** — pro detail zakázky (kdo kdy co).
8. **Sparkline** — mini SVG chart do KPI dlaždice (7/30/90 dnů trend).

---

## Fáze I — DataTable polish (~1.5h)

- **Row selection** — checkbox v prvním sloupci, header checkbox, „vybráno N“ toolbar s bulk akcemi.
- **Column resize** — drag handle na `<th>`.
- **Sticky first column** — pro široké tabulky (mobil-desktop split).
- **Density toggle** — comfortable / compact.
- **Expandable row** — sub-detail (např. položky zakázky).
- **Column visibility menu** — DropdownMenu s checkboxy.
- **Empty & loading state** — Skeleton řádky při loading.

---

## Fáze J — Form polish (~1h)

- **Input adornments** — prefix/suffix ikona nebo text (např. `€`, `%`).
- **Floating label** varianta (jen pro moderní formuláře, ne default).
- **Character counter** — pod textarea `0 / 500`.
- **Validation animation** — červený border s subtle shake, error text fade-in.
- **File upload** — drag & drop zone (samostatná komponenta `FileDrop`).
- **Textarea autosize**.
- **Field group** — visual grouping (bordered set s legend).

---

## Fáze K — Mobil premium polish (~1.5h)

- **BottomSheet** aplikovat na FilterBar (místo horizontálního collapse).
- **Swipe actions** na `ListCard` (swipe left → delete, right → done).
- **Sticky bottom navigation** varianta AppShell (alternativa hamburgeru, 4-5 tabů dole).
- **Pull-to-refresh** vizuální (jen indicator, hook si aplikace udělá).
- **Improved TopBar mobile** — když se scrolluje dolů, TopBar se schová (translateY -100%), scroll up → objeví se.
- **Better touch targets** — minimum 44×44 všude, audit.
- **Ripple / press feedback** — subtle scale + opacity na tap.

---

## Fáze L — Showcase & docs (~1.5h)

- **`demo/showcase.html`** — jedna stránka se všemi komponentami sekcionálně (Buttons, Forms, Data, Feedback, Navigation, Overlays, Charts, Mobile).
- **Theme switcher + viewport toggle** (desktop/tablet/mobile iframe).
- **Token gallery** (`docs/tokens.html` generovaný z tokens.json): swatche, type samples, spacing scale, radius, shadows.
- **5 realistických obrazovek** (`demo/screens/`):
  1. Dashboard KPI + tabulka + sparkliny
  2. Detail zakázky (Timeline + Tabs + StickyActionBar)
  3. Nastavení (Sidebar sub-nav + form)
  4. Empty state + onboarding
  5. Mobil: list + detail + bottomsheet filter

---

## Fáze M — QA sweep (~45min)

- **Contrast audit** — projet všechny text/bg kombinace přes WCAG (skript).
- **Keyboard nav audit** — každou komponentu projet Tabem.
- **Reduced motion audit** — přepnout system pref, ověřit.
- **Print styles** — `@media print` pro `.s21-pagebody` (schová TopBar, Sidebar).
- **Regenerate all previews** — `npm run build` a check `components/*/preview.html`.

---

## Odhady a priorita

Celkem odhaduji **12–16 hodin autonomní práce**. Priority pokud dojde čas:

**Must (do rána 100%):** A, B, C, D, F, G (min. Tooltip + Skeleton + Switch + Progress + Callout).
**Should:** E (dark), H (CommandPalette + Drawer + Sparkline), I (row selection + density).
**Nice:** J, K, L, M.

## Log & progress

Průběh se zapisuje do `docs/night-log.md`. Screenshoty do `docs/night/`. Ráno bude na `main` série commitů s prefixem `night/` a souhrnný commit `night: summary + changelog`.
