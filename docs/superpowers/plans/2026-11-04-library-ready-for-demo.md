# Library-ready-for-demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dovybavit knihovnu `system-21-design` o multi-brand tokeny, chybějící generické komponenty a ucelený showcase, aby budoucí Next.js aplikace `system21-demo-gui` vznikla převážně skládáním, ne psaním nových dílů.

**Architecture:** Aditivně — všechny stávající exporty, třídy `.s21-*` a tokeny zůstávají beze změny. Brand tokens se oddělí v `tokens.json` do sekce `brand.themes[]`, `tokens-to-css.py` získá nový režim pro generování `[data-brand="…"]` overlay v `tokens.css`. Dark mode zůstává v `src/components/bundle.css` (mimo scope migrovat). Nové komponenty se přidají do `src/components/index.jsx` jako nové exporty; existující se nemění. Showcase: nová sada HTML v `demo/` + malý sdílený bootstrap `demo/_shared.js`.

**Tech Stack:** React 18 (plain JSX modul se `"use client"`), esbuild bundler (`scripts/build.sh`), Python token generator (`scripts/tokens-to-css.py`), statický HTML showcase. Žádný Next.js, žádný test framework, žádné další runtime deps.

**Spec:** `docs/superpowers/specs/2026-11-04-library-ready-for-demo-design.md`

## Global Constraints

- **Zpětná kompatibilita absolutní:** žádný existující export z `src/components/index.jsx`, žádná třída `.s21-*`, žádný CSS custom property nesmí být přejmenován, odstraněn nebo změnit sémantiku. Nové věci jen přidávat.
- **Build musí projít po každé fázi:** `npm run build` nehrozí a `dist/system21.{css,js,d.ts}` + `components/*/preview.html` + `tokens/tokens.css` se regenerují.
- **Stávající `demo/index.html` a `demo/showcase.html` musí dál renderovat identicky** (ruční kontrola v prohlížeči před commitem fáze).
- **Čeština, CZ formáty** v UI stringech (`12. 05. 2026`, `184 000 Kč`, `+32 %` s mezerou), žádná emoji v UI.
- **Fonty:** Manrope (display), Archivo (body), JetBrains Mono (mono) — identické pro všechny brandy v této iteraci.
- **Commit strategie:** jeden commit na fázi (A–F), prefix `demo-prep/<A..F>`, push na `main` po každé fázi. `dist/*` součástí commitu fáze.

## Review Focus

Pět tříd vstupů / selhání, co spec implikuje, ale žádný task jejich testy přímo neexercuje — proto pro každou přidávám verifikační krok v odpovídajícím tasku:

1. **Přepnutí brandu + darku ve všech kombinacích vizuálně konzistentní** (očekávání: žádná „zelená záře" na modrém brandu, žádné světlé pozadí v darku). → Verifikováno v **Task A4** krokem „zkontrolovat všechny 4 kombinace v showcase".
2. **Poema submodule pull nerozbije stávající stránky** (očekávání: po `git submodule update` v Poemě se nic nezmění, dokud záměrně nenasadí nové komponenty). → Verifikováno v **Task F3** krokem „grep stávajících tříd v Poema repo".
3. **Komponenty graceful degradace bez povinných props** (očekávání: `<ActivityFeed items={[]}/>` vykreslí EmptyState, ne crash). → Verifikováno v **Task B3** a **B4** empty-state krokem.
4. **CSS tokenizace — žádný hardcoded hex ve stylech nových komponent** (očekávání: nový zákazník přebarví změnou tokenů, ne editací komponent). → Verifikováno v **Task C4** krokem `grep '#[0-9a-f]\{3,\}'` nad novými CSS pravidly.
5. **A11y minimum nových komponent — focus visible, aria-labels, keyboard nav** (očekávání: tab prochází všechny interaktivní prvky, screen reader čte smysluplné popisky). → Verifikováno v **Task E6** krokem „procházet showcase klávesnicí".

---

## Task A: Multi-brand v tokenech

**Files:**
- Modify: `tokens/tokens.json` — přidat sekci `brand.themes[]` s `bifactory` a `demo-alt`, přesunout brand-related tokeny z ploché kolekce do `brand.themes[].tokens`
- Modify: `scripts/tokens-to-css.py` — načíst `brand.themes[]`, generovat `:root { … }` (default = první theme) + `[data-brand="…"] { … }` overlay pro ostatní themes
- Modify: `tokens/tokens.css` — regenerovaný výstup (nepřímo)
- Create: `src/components/hooks/useBrand.jsx` — hook se signaturou `useBrand(): { brand: string, setBrand: (b: string) => void, brands: string[] }`; persist do `localStorage("system21-brand")`, default `'bifactory'`, nastavuje `data-brand` na `<html>`
- Modify: `src/components/index.jsx` — přidat export `useBrand` a `BrandToggle` komponentu (dropdown se seznamem brandů, mirror `ThemeToggle`)
- Modify: `demo/showcase.html` — vedle `ThemeToggle` přidat `BrandToggle`; v `<head>` inline bootstrap script čte `localStorage("system21-brand")` a nastavuje `data-brand` před React mountem
- Modify: `demo/index.html` — totéž

**Interfaces:**
- Produces:
  - CSS proměnné `--primary`, `--primary-hover`, `--primary-active`, `--primary-soft`, `--primary-glow`, `--primary-glow-strong`, `--primary-text`, `--on-primary`, `--accent`, `--on-accent`, `--focus-ring`, `--shine`, `--ink`, `--ink-muted`, `--black`, `--sidebar-bg`, `--sidebar-hover`, `--sidebar-border`, `--sidebar-text`, `--sidebar-active-bg`, `--sidebar-active-text`, `--brand-name`, `--brand-subtitle`, `--brand-logo-url`, `--font-display`, `--font-body`, `--font-mono` definovány v `:root` (default bifactory) a v `[data-brand="demo-alt"]` (overlay)
  - JS: `useBrand(): { brand, setBrand, brands }`; `<BrandToggle />`

- [ ] **A1: Rozšířit `tokens.json` o sekci `brand.themes[]`**

  Přesunout z `color.tokens[]` ty, co spec řadí mezi brand (viz Rozhodnutí z builder-checku #4). Vytvořit:
  ```json
  {
    "brand": {
      "themes": [
        { "id": "bifactory", "name": "BIfactory", "tokens": [ { "name": "primary", "value": "#43c466", "usage": "…" }, … ] },
        { "id": "demo-alt", "name": "Demo (modrá)", "tokens": [ { "name": "primary", "value": "#1e4bd6", … }, … ] }
      ]
    }
  }
  ```
  Barevný výběr pro `demo-alt`: primární `#1e4bd6` (sytá modrá), hover `#1b44c2`, active `#1839a8`, on-primary `#ffffff` (kontrast 7.3:1), primary-text `#1e4bd6` (na světlém 7.1:1), primary-soft `rgba(30,75,214,0.12)`, accent zůstává `#ffc719`, sidebar-bg `#0a0e1f` (tmavě modrý uhel). Pro dark variantu demo-alt: sidebar a surfaces upravit paralelně s `bifactory` dark v `bundle.css` (viz A3).

- [ ] **A2: Upravit `scripts/tokens-to-css.py`**

  Rozšířit o načtení `brand.themes[]`. První theme generuje do `:root { --token: value; … }`. Ostatní themes generují do `[data-brand="<id>"] { --token: value; … }`. Všechny systémové tokeny (spacing, radius, elevation, motion, state) zůstávají v `:root` jako dřív.

- [ ] **A3: Přidat dark overrides pro `demo-alt` v `src/components/bundle.css`**

  Grep současné bloky `[data-theme="dark"]` → naklonovat a přidat `[data-brand="demo-alt"][data-theme="dark"]` selektor s odpovídajícími tmavými hodnotami pro demo-alt primary/sidebar/surface. Pro `bifactory` dark zůstává selector `[data-theme="dark"]` beze změny (nepředpokládá brand).

- [ ] **A4: Vytvořit `useBrand` + `BrandToggle`**

  V `src/components/index.jsx` přidat (ne nahradit existující useTheme):
  ```jsx
  export function useBrand() {
    // mirror useTheme — localStorage("system21-brand"), default 'bifactory', setuje data-brand na <html>
    // vrací { brand, setBrand, brands: ['bifactory','demo-alt'] }
  }
  export function BrandToggle({ compact }) {
    // dropdown se seznamem brandů; current má check; popover analog ThemeToggle
  }
  ```

- [ ] **A5: Showcase bootstrap**

  V `demo/showcase.html` a `demo/index.html` do `<head>` před React script přidat:
  ```html
  <script>
    (function(){
      try {
        var b = localStorage.getItem('system21-brand') || 'bifactory';
        if (b !== 'bifactory') document.documentElement.setAttribute('data-brand', b);
      } catch(e){}
    })();
  </script>
  ```
  V TopBar přidat `BrandToggle` vedle `ThemeToggle`.

- [ ] **A6: Build + vizuální ověření**

  Spustit `npm run build`. Expected: `tokens/tokens.css` obsahuje `:root` block + `[data-brand="demo-alt"]` block. `dist/system21.{css,js,d.ts}` updated.

  Otevřít `demo/showcase.html` v prohlížeči a ručně otestovat 4 kombinace:
  - bifactory + light (default, musí vypadat jako dnes)
  - bifactory + dark
  - demo-alt + light (modrý primární)
  - demo-alt + dark

  V žádné kombinaci nesmí být „ghost" z druhého brandu (např. zelený glow na modrém pozadí). **Review Focus #1.**

- [ ] **A7: Commit**

  ```bash
  git add tokens/ scripts/tokens-to-css.py src/components/ dist/ demo/showcase.html demo/index.html
  git commit -m "demo-prep/A: multi-brand tokens (demo-alt + BrandToggle + useBrand)"
  git push origin main
  ```

---

## Task B: Dashboard widgety a ModuleNav

**Files:**
- Modify: `src/components/index.jsx` — přidat exporty `moduleNavSections` (pole, ne komponenta), `KpiRow`, `ActivityFeed`, `QuickActions`
- Modify: `dist/system21.css` — přidat CSS pravidla `.s21-kpirow`, `.s21-feed`, `.s21-quickact`
- Create: `components/KpiRow/README.md`, `components/ActivityFeed/README.md`, `components/QuickActions/README.md` + jejich `preview.html` v témže adresáři
- Create: `src/previews/KpiRow.jsx`, `src/previews/ActivityFeed.jsx`, `src/previews/QuickActions.jsx`

**Interfaces:**
- Produces:
  - `export const moduleNavSections` — pole `Sidebar.sections[]` kompatibilní s existujícím `<Sidebar sections={…}/>`, obsahuje všechny moduly backendu v BIfactory pořadí (Dashboard, Úkoly, Můj plán, CRM.Klienti, CRM.Osoby, CRM.Obchodní případy, DMS.Smlouvy, DMS.Dokumenty, DMS.Automatizace, Sales.Zakázky, HR.Pracovníci, HR.Docházka, Email, Nastenka, Knowledge base, Nastavení)
  - `<KpiRow>{<StatTile/>...}</KpiRow>` — layout wrapper, responsive 2/3/4/6 col, props: `cols?: 2|3|4|6` (default auto)
  - `<ActivityFeed items={ActivityItem[]} empty={ReactNode}/>` — vertikální feed; `ActivityItem = { id, actor, action, target, timestamp, icon? }`; empty state když `items=[]`
  - `<QuickActions actions={Action[]}/>` — mřížka tlačítek; `Action = { label, icon?, href?, onClick?, badge? }`

- [ ] **B1: `moduleNavSections` data export**

  V `src/components/index.jsx` přidat:
  ```js
  export const moduleNavSections = [
    { items: [ { href:'/dashboard', label:'Dashboard', icon:'dashboard' }, { href:'/ukoly', label:'Úkoly', icon:'tasks', badge:3 }, … ] },
    { title:'CRM', collapsible:true, items:[ { href:'/crm/klienti', label:'Klienti' }, { href:'/crm/osoby', label:'Osoby' }, { href:'/crm/obchodni-pripady', label:'Obchodní případy' } ] },
    { title:'DMS', collapsible:true, items:[ { href:'/dms/smlouvy', label:'Smlouvy' }, { href:'/dms/dokumenty', label:'Dokumenty' }, { href:'/dms/automatizace', label:'Automatizace' } ] },
    { title:'Obchod', collapsible:true, items:[ { href:'/zakazky', label:'Zakázky' } ] },
    { title:'HR', collapsible:true, items:[ { href:'/hr/pracovnici', label:'Pracovníci' }, { href:'/hr/dochazka', label:'Docházka' } ] },
    { title:'Komunikace', collapsible:true, items:[ { href:'/email', label:'Email' }, { href:'/zpravy', label:'Zprávy', hint:'SMS/SMTP' } ] },
    { title:'Intranet', collapsible:true, items:[ { href:'/nastenka', label:'Nástěnka' }, { href:'/kb', label:'Knowledge base' } ] }
  ];
  ```
  Konzistentní se stávající obrazovkou Zakázky (ta má vlastní sekce — nemění se).

- [ ] **B2: `KpiRow`**

  Signatura: `<KpiRow cols?: 2|3|4|6>{children}</KpiRow>`. CSS: `.s21-kpirow` grid s `grid-template-columns: repeat(var(--kpi-cols), 1fr)`, gap `var(--space-4)`, mobile fallback 1-2 col.

- [ ] **B3: `ActivityFeed`**

  Signatura: `<ActivityFeed items={ActivityItem[]} empty?={ReactNode} max?={number}/>`. Každá položka: avatar kruh (iniciály z `actor.name` nebo `actor.avatarUrl`), text `{actor.name} {action} {target}`, relativní čas (`před 3h`, formát přes utility `relativeTime(ts)`), ikonka vlevo od avataru (`icon` prop). Empty state: pokud `items.length === 0`, vykreslit `empty` nebo defaultní `<EmptyState title="Žádná aktivita" hint="Jakmile něco provedete, objeví se tady."/>`.

- [ ] **B4: `QuickActions`**

  Signatura: `<QuickActions actions={Action[]} cols?={number}/>`. Mřížka `cols` × tlačítko (default 3). Každé tlačítko: ikona nahoře, label dole, případně `badge` v rohu. Použít `<Button>` interně. Pokud `actions.length === 0`, nic nevykreslit (ne empty state — quick actions bez akcí jsou prázdná plocha).

- [ ] **B5: Previews + README pro každou novou komponentu**

  Pro každou (`KpiRow`, `ActivityFeed`, `QuickActions`): `src/previews/<Name>.jsx` (ukázka s realistickými daty), `components/<Name>/README.md` (kdy použít, props). `scripts/build.sh` ty previews zapisuje do `components/<Name>/preview.html`.

- [ ] **B6: Build + commit**

  ```bash
  npm run build
  # vizuálně ověřit /components/KpiRow/preview.html, /components/ActivityFeed/preview.html, /components/QuickActions/preview.html
  git add src/ dist/ components/ tokens/ 2>/dev/null
  git commit -m "demo-prep/B: ModuleNav config + KpiRow + ActivityFeed + QuickActions"
  git push origin main
  ```

---

## Task C: Record primitives

**Files:**
- Modify: `src/components/index.jsx` — exporty `EntityCard`, `RelationsSidebar`, `WorkflowBadge`, `ModuleHome`
- Modify: `dist/system21.css` — nová pravidla
- Create: `components/<Name>/{README.md,preview.html}` a `src/previews/<Name>.jsx` pro každou

**Interfaces:**
- Consumes: `Badge` (pro `WorkflowBadge`), `AppShell`, `PageHeader`, `KpiRow`, `ActivityFeed`, `QuickActions` (pro `ModuleHome`)
- Produces:
  - `<EntityCard icon? title subtitle? meta? tags? actions? onClick?/>` — reusable karta pro jakoukoli entitu
  - `<RelationsSidebar sections={RelationSection[]}/>` — `RelationSection = { title, count?, items: RelationItem[], action? }`, `RelationItem = { icon?, label, meta?, href? }`
  - `<WorkflowBadge state={string} label?/>` — tenký wrapper nad Badge; stavy: `draft|offer|negotiation|win|loss|in-progress|done|blocked|overdue`
  - `<ModuleHome title description? kpis? activity? quickActions? diary?/>` — layout template, používá KpiRow + ActivityFeed + QuickActions

- [ ] **C1: `EntityCard`**

  Signatura:
  ```ts
  <EntityCard
    icon?: ReactNode | string  // string = ikona z Icon setu
    title: string
    subtitle?: string
    meta?: Array<{ label: string, value: ReactNode }>  // max 4 řádky
    tags?: Tag[]
    actions?: ReactNode  // typicky řada Button icon-only
    onClick?: () => void
    accent?: 'primary' | 'warning' | 'danger' | 'success'
  />
  ```
  Hover state, keyboard focus (tabindex=0 když `onClick`), click na kartu (ale ne na vnořené akce) → `onClick`.

- [ ] **C2: `WorkflowBadge`**

  Mapa stavů → color + icon + default label (CZ):
  ```js
  const WORKFLOW = {
    draft:       { color: 'ink-muted',   icon: 'file',         label: 'Rozpracováno' },
    offer:       { color: 'info',        icon: 'send',         label: 'Nabídka' },
    negotiation: { color: 'warning',     icon: 'chat',         label: 'V jednání' },
    win:         { color: 'success',     icon: 'check',        label: 'Výhra' },
    loss:        { color: 'danger',      icon: 'x',            label: 'Prohra' },
    'in-progress': { color: 'primary',   icon: 'play',         label: 'Realizace' },
    done:        { color: 'success',     icon: 'check-circle', label: 'Hotovo' },
    blocked:     { color: 'danger',      icon: 'ban',          label: 'Blokováno' },
    overdue:     { color: 'danger',      icon: 'alert',        label: 'Po termínu' }
  };
  ```
  Signatura: `<WorkflowBadge state={keyof typeof WORKFLOW} label?={string} fitCell?={boolean}/>`. Pokud `state` není v mapě, fallback = `draft` + console.warn v dev.

- [ ] **C3: `RelationsSidebar`**

  Signatura:
  ```ts
  <RelationsSidebar sections={Array<{
    title: string,
    count?: number,
    items: Array<{ icon?: string, label: string, meta?: string, href?: string }>,
    action?: { label: string, onClick: () => void }
  }>}/>
  ```
  Pravý sloupec na detailu, použitelný jako sidebar pro AppShell nebo přímo v obsahu. Každá sekce: title + count badge vpravo nahoře, pak list položek (ikona + label + meta), případně `action` tlačítko dole (např. „Přidat dokument").

- [ ] **C4: `ModuleHome`**

  Signatura:
  ```ts
  <ModuleHome
    title: string
    description?: string
    kpis?: ReactNode   // typicky <KpiRow>…</KpiRow>
    quickActions?: ReactNode   // typicky <QuickActions .../>
    activity?: ReactNode  // typicky <ActivityFeed .../>
    diary?: ReactNode  // Pavlův Deník dne - volný slot
  />
  ```
  Layout: PageHeader s title/description, pak grid 2-sloupcový (desktop): levý sloupec `kpis` nahoře + `quickActions`, pravý sloupec `activity` + `diary`. Mobile: vše pod sebe.

  **Review Focus #4 verifikace:** `grep -n '#[0-9a-fA-F]\{3,\}' dist/system21.css | grep -i 'kpirow\|feed\|quickact\|entity\|relations\|workflow\|modulehome'` — výstup musí být prázdný; všechny barvy přes `var(--token)`.

- [ ] **C5: Previews + README + build + commit**

  Analog k B5/B6. Commit: `demo-prep/C: EntityCard + WorkflowBadge + RelationsSidebar + ModuleHome`

---

## Task D: Interakce — komentáře a přílohy

**Files:**
- Modify: `src/components/index.jsx` — exporty `CommentThread`, `AttachmentList`
- Modify: `dist/system21.css` — nová pravidla
- Create: `components/<Name>/{README.md,preview.html}` + `src/previews/<Name>.jsx`

**Interfaces:**
- Produces:
  - `<CommentThread items={Comment[]} onAdd?={(text) => void} currentUser?={{name,avatar?}}/>` — `Comment = { id, author, avatar?, text, createdAt, replies?: Comment[], reactions?: Record<string,number> }`
  - `<AttachmentList items={Attachment[]} onRemove?={(id) => void} onDownload?={(id) => void} compact?={boolean}/>` — `Attachment = { id, name, size: number, mimeType, thumbnailUrl?, uploadedBy?, uploadedAt? }`

- [ ] **D1: `CommentThread`**

  Vertikální list komentářů. Každý: avatar kruh, author name, timestamp (relativní), tělo (markdown → `Markdown` komponenta? pokud existuje; jinak `whiteSpace: pre-wrap`), pod tělem reactions (👍 3 · ❤ 1) a Reply tlačítko. Reply komentáře indented (1 úroveň max). Pokud `onAdd`, pod seznamem Textarea + „Přidat komentář" tlačítko.

- [ ] **D2: `AttachmentList`**

  Řádkový seznam. Každý řádek: ikona typu souboru (podle `mimeType` → dict), název (truncate), velikost formátovaná (`formatBytes(1234567) → '1,2 MB'`), uploader + relativní čas, akce vpravo (download, remove — jen pokud callback prop existuje). `compact` varianta: jen ikona + název, žádná meta.

- [ ] **D3: Previews + README + build + commit**

  Commit: `demo-prep/D: CommentThread + AttachmentList`

---

## Task E: Showcase obrazovky

**Files:**
- Create: `demo/_shared.js` — reusable AppShell config: `defaultSidebar()`, `defaultTopBar({breadcrumbs, onNavigate})`, bootstrapping brand/theme
- Create: `demo/dashboard.html`, `demo/crm-klienti.html`, `demo/crm-klient-detail.html`, `demo/dms-smlouvy.html`, `demo/dms-smlouva-detail.html`, `demo/ukoly.html`
- Modify: `demo/showcase.html` — přidat linky na nové demo stránky na patě

**Interfaces:**
- Consumes: všechny komponenty z knihovny (`AppShell`, `Sidebar`, `TopBar`, `Breadcrumbs`, `PageHeader`, `ModuleHome`, `KpiRow`, `ActivityFeed`, `QuickActions`, `EntityCard`, `RelationsSidebar`, `WorkflowBadge`, `CommentThread`, `AttachmentList`, `DataTable`, `FilterBar`, `Tabs`, …)
- Produces: 6 HTML souborů, které renderují reprezentativní obrazovky; použitelné přes `npm run demo` (serve .)

- [ ] **E1: `demo/_shared.js`**

  ```js
  // Načte React UMD, system21 bundle, tokens; expose window.S21Demo s utils
  window.S21Demo = {
    brand: /* z localStorage */,
    sidebar: () => { brand: {name:'BIfactory', logo:…, subtitle:'System 21'}, sections: window.S21.moduleNavSections, activeHref:'…' },
    topbar: ({breadcrumbs, onNavigate}) => React.createElement(window.S21.TopBar, { … }),
    bootstrapHead: () => { /* inline do <head> každé stránky — brand/theme restore před render */ }
  };
  ```
  Alternativně jako IIFE nenáhodně — hlavní je, aby stránky E2–E6 nebyly 400 řádků boilerplate.

- [ ] **E2: `demo/dashboard.html`**

  ModuleHome s:
  - title „Dashboard", description „Co se dnes děje"
  - KpiRow: 4 StatTile (Otevřené zakázky, Tržby tento měsíc, Úkoly dnes, ÁJA kontrola)
  - QuickActions: 6 akcí (Nová zakázka, Nový úkol, Nová smlouva, Nový klient, Nový dokument, Nová osoba)
  - ActivityFeed: 8 položek (smíšené — nová zakázka, komentář k úkolu, nový klient, …)
  - Diary slot: jednoduchý list „Dnes vyprší 3 smlouvy, 2 úkoly po termínu, 1 nová zpráva v mailu"

- [ ] **E3: `demo/crm-klienti.html` + `demo/crm-klient-detail.html`**

  Seznam: PageHeader s tabs (Rodiny / Firmy), KpiRow (Celkem klientů, Nových tento měsíc, Aktivních smluv, Vypršelo do 30 dnů), ChipGroup (filtr: všichni / aktivní / pasivní), FilterBar (Search + Select kraje + Select segmentu), DataTable se sloupci (Jméno, Typ, Počet smluv, Poslední kontakt, Akce). Na mobilu DataTable → EntityCard grid.

  Detail: Breadcrumbs „CRM › Klienti › Novákovi", PageHeader s Tabs (Přehled / Osoby / Smlouvy / Aktivita / Dokumenty), PageBody dvousloupcový: levý = Section „Kontakty" + Section „Smlouvy" (EntityCard grid), pravý = `RelationsSidebar` (Dokumenty 12 · Úkoly 3 · Nedávná aktivita 8).

- [ ] **E4: `demo/dms-smlouvy.html` + `demo/dms-smlouva-detail.html`**

  Seznam: PageHeader, KpiRow (Aktivních, Vypršelých, Nepodepsaných, Čeká na schválení), ChipGroup (filtr podle kategorie), DataTable (Číslo, Klient, Platnost od, Platnost do, Stav → WorkflowBadge, Akce).

  Detail: Breadcrumbs, PageHeader s Tabs (Přehled / Komentáře / Historie / Soubory), levý sloupec = Section s metadaty smlouvy + Section „Soubory" (`AttachmentList`) + Section „Komentáře" (`CommentThread`), pravý sloupec = `RelationsSidebar`.

- [ ] **E5: `demo/ukoly.html`**

  Seznam úkolů: PageHeader s Tabs (Moje / Delegované / Všechny), KpiRow (Dnes, Zítra, Přes týden, Po termínu), ChipGroup (Priorita), DataTable (Předmět, Zadavatel, Deadline, Stav → WorkflowBadge, Akce). Mobile: EntityCard grid.

- [ ] **E6: Pata showcase + vizuální + a11y ověření**

  V `demo/showcase.html` do paty přidat sekci „Ukázkové obrazovky" s linky na všech 6 nových stránek.

  **Review Focus #5 verifikace:** otevřít každou stránku, procházet klávesnicí (Tab, Shift+Tab, Enter, Esc), ověřit že focus ring je viditelný, všechny interaktivní prvky dosažitelné, modalní/dropdown trap správně funguje.

- [ ] **E7: Build + commit**

  Commit: `demo-prep/E: showcase screens (dashboard, CRM, DMS, úkoly)`

---

## Task F: Dokumentace

**Files:**
- Modify: `docs/brand-manual.md` — přidat sekci „Jak udělat nového zákazníka" (konkrétní 10-min proces); zdokumentovat multi-brand architekturu (brand vs system tokens, hranice souborů tokens.json vs bundle.css)
- Modify: `README.md` — update „Nový zákazník (přebarvení)" sekce; přidat sekci „Co je k dispozici pro demo" se seznamem nových komponent a demo stránek
- Modify: `CHANGELOG.md` — nový top-level heading `## 2026-11-04 · demo-ready (v2.0)` se seznamem všech přidaných věcí

**Interfaces:**
- Consumes: nic (jen dokumentuje)
- Produces: dokumentace pro builder/designer, který bude brát knihovnu pro další customer repo

- [ ] **F1: `docs/brand-manual.md` sekce „Jak udělat nového zákazníka"**

  Konkrétní 10-min proces:
  1. V `tokens/tokens.json` přidej do `brand.themes[]` nový objekt s `id: 'zakaznik-x'`, zkopíruj tokeny z bifactory jako výchozí a změň primary/sidebar.
  2. Spusť `npm run tokens` → `tokens.css` se regeneruje.
  3. Ověř kontrast: text na primary ≥ 4.5:1, focus-ring ≥ 3:1 na `surface` i `sidebar-bg`.
  4. Změň `Sidebar.brand.logo` v konkrétní aplikaci.
  5. Pokud fonty: změň `font-display/font-body/font-mono` a přidej `@import` do aplikace.

- [ ] **F2: `README.md` update**

  Rozšířit sekci „Co je v repozitáři" o nové komponenty a demo stránky. Přidat sekci „Multi-brand": kde se definuje, jak se přepíná, co je brand vs system token.

- [ ] **F3: `CHANGELOG.md` v2.0 heading**

  ```markdown
  ## 2026-11-04 · demo-ready (v2.0)

  ### Přidáno
  - Multi-brand v tokenech + ukázkový brand `demo-alt`
  - Komponenty: `KpiRow`, `ActivityFeed`, `QuickActions`, `EntityCard`, `RelationsSidebar`, `WorkflowBadge`, `ModuleHome`, `CommentThread`, `AttachmentList`
  - Konfigurace `moduleNavSections` — defaultní navigace pro všechny moduly backendu
  - Hook `useBrand` + komponenta `BrandToggle`
  - Showcase obrazovky: Dashboard, CRM Klienti (seznam + detail), DMS Smlouvy (seznam + detail), Úkoly

  ### Zpětná kompatibilita
  Žádný existující export, třída nebo token nebyl odstraněn ani přejmenován. Poema (git submodule) může updatovat bez změny.
  ```

  **Review Focus #2 verifikace:** v `~/3_Dev/reseni/system21-poema-gui` spustit `grep -r "window.S21\|@design\|packages/design" --include='*.{tsx,ts,jsx,js,css}' .` → vyvolat seznam používaných symbolů; zkontrolovat že žádný ze symbolů nebyl v této iniciativě odstraněn (všechny jsou aditivní, takže OK).

- [ ] **F4: Commit**

  ```bash
  git add docs/brand-manual.md README.md CHANGELOG.md
  git commit -m "demo-prep/F: docs — brand manual nový zákazník, README, CHANGELOG v2.0"
  git push origin main
  ```

---

## Self-review

- **Spec coverage:** 7 cílů specu (multi-brand, 10 komponent, 6 showcase, docs) rozdělené do fází A–F; každý bod spec pokryt alespoň jedním taskem.
- **Step scan:** každý krok je buď konkrétní signatura ke generování (jedna reasonable interpretace), nebo build/commit/visual verification. Žádný „TBD" ani „handle edge cases".
- **Type consistency:** interface bloky používají jména konzistentně napříč tasky (`ActivityItem`, `Attachment`, `Comment` atd.); `WorkflowBadge.state` enum fixován v C2 a odkazován v E4/E5.
- **Review Focus:** 5 tříd pokryto, každá přiřazena konkrétnímu tasku s verifikačním krokem (A4, F3, B3/B4, C4, E6).
- **Proportion:** plan je zhruba 3× delší než spec — přijatelné, protože nese konkrétní API signatury, token hodnoty a demo-screen obsah; žádné funkce nejsou v plánu přepsané jako transcript.
