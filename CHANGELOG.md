# Changelog

## v2.2 — 2026-11-04 (polepim patterns → real-app feel)

Přenos nejlepších interakčních patternů z produkční aplikace `BIfactory/polepim-manager` jako generických komponent (všechno zobecněné, žádné doménové věci jako podpisy / QR / HEIC / PDF nesou nezahrnuty — viz design doc).

### Přidáno

**7 nových komponent:**

- `InlineEditor` — click-to-edit pill (text / date / number / select / textarea). Enter=Save, Esc=Cancel, blur=Cancel. Volitelný `display(value)` pro vlastní read-mode (např. Badge pro status, lokalizované datum).
- `QuickActionModal` — malý contextual dialog (sm=460 / md=620 px) pro akce bez navigace. Zavírá se jen footer tlačítky / Esc / click na overlay.
- `FormWizard` — multi-step wrapper s per-step `validate()` vracející array error messages, chybový banner nad body, done/current/future styling kroků, `onComplete(values)` na posledním kroku.
- `SearchSelect` — searchable combobox pro 100+ options. Trigger + popover s input filtrem, keyboard nav (Arrows + Enter + Esc), hint text per option, substring filter v label i hint.
- `FileUploadZone` — drag & drop + file picker. Per-file status (uploading / done / failed) + error isolace. `maxSize` guard před `onFiles` Promise.
- `BulkActionBar` — floating pill u spodku viewportu, spring-in animace. Selection state drží parent; komponenta jen prezentační.
- `SalesFunnel` — responsive pipeline: desktop = SVG clip-path trapezoid chain (šířka proporcionální k max count), mobile = stacked bars s % fillem. Click na stage → onChange; druhý klik vyruší výběr.

**Rozšíření existujících:**

- `Modal`: nový `destructive: boolean` prop → alert-triangle ikonu v header, danger title color, footer `justify-content: space-between` (Cancel vlevo, Confirm vpravo pro svalovou paměť bezpečnosti).
- `StatTile`: nový `href` nebo `onClick` prop → renderuje jako `<a>` nebo `<button>`, přidává `.is-clickable` s hover lift + chevron overlay v rohu.

**Nové demo stránky:**

- `demo/predavaci-protokol.html` — 6-step wizard „nová zakázka" (Základní / Materiál / Termíny / Kontakty / Přílohy / Souhrn) s `SearchSelect` pro klient+lokalita+osoby, `FileUploadZone` pro dokumenty, reálná validace (budoucí datum, min délka názvu, povinný vlastník).
- `demo/zakazka-detail.html` — kompletní detail zakázky používající všechny nové patterny: InlineEditor na polích (klient, deadline s CZ formátem, hodnota, stav se select+WorkflowBadge display), QuickActionModal „Vykázat hodiny" z row akce, FileUploadZone + AttachmentList v Soubory, DataTable selectable + BulkActionBar na operacích, CommentThread, destructive Modal „Zrušit zakázku".

**Upgrade existujících demo stránek:**

- `dashboard.html` — KPI tiles mají `href` na list stránky (Klienti → crm-klienti, Smlouvy → dms-smlouvy, ...).
- `dms-smlouva-detail.html` — sekce Údaje používá InlineEditor na každém poli; header akce: QuickActionModal „Odeslat k podpisu" (email + poznámka), destructive Modal „Smazat" (vypisuje počet příloh + komentářů, které zmizí); FileUploadZone nad AttachmentList.
- `ukoly.html` — DataTable `selectable` + BulkActionBar s 3 akcemi (Označit hotové, Delegovat, Smazat [destructive]).
- `crm-obchodni-pripady.html` — SalesFunnel nad FilterBar s 5 stages; kliknutí na stage filtruje DataTable pod.

### Spec + plán

- `docs/superpowers/specs/2026-11-04-polepim-patterns-design.md`
- `docs/superpowers/plans/2026-11-04-polepim-patterns.md`

### Zpětná kompatibilita

Žádný existující export, třída, token neupraven ani přejmenován. Všechno aditivně.

---

## v2.0 — 2026-11-04 (demo-ready — příprava pro `system21-demo-gui`)

Knihovna povýšena ze „katalog komponent + 1 demo obrazovka" na **plně připravenou šablonu pro univerzální demo**. Cíl: budoucí demo aplikace `BIfactory/system21-demo-gui` vznikne převážně skládáním z knihovny, ne psaním nových komponent.

### Přidáno

**Multi-brand tokeny:**

- `tokens.json → brand.themes[]` — sekce s brand tokeny per theme. `scripts/tokens-to-css.py` generuje `[data-brand="<id>"]` overlay.
- Druhý ukázkový brand **`demo-alt`** (modrá) pro průběžné testování, že přebarvování funguje bez bugů (žádná „zelená záře" na modrém brandu).
- `[data-brand="demo-alt"][data-theme="dark"]` overlay v `bundle.css` — všechny 4 kombinace (bifactory-light/dark, demo-alt-light/dark) fungují.

**Nové komponenty (10):**

- `useBrand()` + `<BrandToggle />` — mirror `useTheme/ThemeToggle`, `localStorage("system21-brand")`.
- `moduleNavSections` — defaultní sidebar sekce se všemi moduly backendu System 21 (Dashboard, Úkoly, Můj plán, CRM/{Klienti, Osoby, Obchodní případy}, DMS/{Smlouvy, Dokumenty, Automatizace}, Obchod/Zakázky, HR/{Pracovníci, Docházka}, Komunikace/{Email, Zprávy}, Intranet/{Nástěnka, KB}).
- `<KpiRow cols?>` — responsive grid wrapper pro `StatTile`.
- `<ActivityFeed items>` — vertikální feed s avatarem/ikonou, relativním časem, empty state.
- `<QuickActions actions cols?>` — mřížka tlačítek s ikonou, badge, href/onClick.
- `<EntityCard icon title subtitle meta tags actions onClick accent>` — univerzální karta záznamu.
- `<WorkflowBadge state label?>` — tenký wrapper nad `Badge` se stavovým enum (`draft | offer | negotiation | in-progress | win | loss | done | blocked | overdue`) a CS labely.
- `<RelationsSidebar sections>` — pravý sloupec na detail stránkách s propojenými záznamy.
- `<ModuleHome title description kpis quickActions activity diary>` — layout template pro home stránky modulů.
- `<CommentThread items onAdd currentUser>` — diskuse s replies (1 úroveň), reakcemi, add form.
- `<AttachmentList items onDownload? onRemove? compact?>` — seznam souborů s mime-icon, meta a akcemi.

**Nová ikona:** `palette` (pro `BrandToggle`).

**6 ukázkových obrazovek v `demo/`:**

- `dashboard.html` — ModuleHome (KPI + QuickActions + ActivityFeed + diář dne).
- `crm-klienti.html` + `crm-klient-detail.html` — seznam klientů + detail rodiny s EntityCard grid + RelationsSidebar.
- `dms-smlouvy.html` + `dms-smlouva-detail.html` — seznam smluv s WorkflowBadge + detail s AttachmentList + CommentThread + RelationsSidebar.
- `ukoly.html` — seznam úkolů s rychlými akcemi.
- `demo/_shared.js` — reusable AppShell bootstrap (DemoSidebar s moduleNavSections, DemoTopBar s BrandToggle + ThemeToggle).

**Dokumentace:**

- `docs/brand-manual.md` — nová sekce „Multi-brand" + 10-minutový proces „Jak udělat nového zákazníka".
- `docs/superpowers/specs/2026-11-04-library-ready-for-demo-design.md` — design doc iniciativy.
- `docs/superpowers/plans/2026-11-04-library-ready-for-demo.md` — implementation plan (6 fází A–F).

### Zpětná kompatibilita

**Žádný existující export, třída nebo token nebyl odstraněn ani přejmenován.** Poema (git submodule `packages/design`) může `git submodule update` kdykoli — rozbije se jen pokud by si naimportovala něco nového, co ještě nepoužívá.

**Hranice souborů:** brand overlay v `tokens.css` (generovaný), dark mode v `bundle.css` (ručně). Dokumentováno v brand manuálu.

---

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
