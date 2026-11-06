# MIS Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformovat demo z „Poema-sales-first" na univerzální celopodnikový MIS pro malou zakázkovou firmu se strukturou „sekce = landing dashboard + operativa".

**Architecture:** Plain React 18 + `window.S21` global, žádný bundler per stránku. Mock data sdílená v novém `demo/_shared-data.js`. Nová library komponenta `InboxBell`; změna chování existující `Sidebar` sekce (title = link, chevron = button). 4 nové sekční landing stránky (`/obchod`, `/vyroba`, `/lide`, `/dms`) + nová unified `/inbox`. Hlavní Dashboard přepracovaný s 4 cross-cut KPI + lifecycle banner.

**Tech Stack:** React 18, plain HTML + `<script>` per stránka, design tokens CSS (brand overlay), Playwright pro verifikaci.

**Spec:** `/Users/hulin/3_Dev/reseni/system-21-design/docs/superpowers/specs/2026-11-06-mis-restructure-design.md`

## Global Constraints

- Plain React 18 + `window.S21` global — zůstává, žádný bundler per stránku.
- Design tokens + brand overlay (`[data-brand]`) nezměněné.
- CZ formát: `12 345 Kč` (mezera jako tisíc.sep.), `12. 04. 2026` (tečka + mezera v datech).
- Mock data konzistentní napříč demem; všichni klienti z existující diversity (Novákovi, Dvořákovi, Moravia Steel, Agro Slovácko, Hradecká strojírna).
- Playwright před každým commitem — desktop 1440 + mobile 375. 0 console errors.
- Push na main čeká na explicitní schválení uživatele (lokální commity OK).
- Žádné nové ERP koncepty; žádné brand-specific landingy; žádné změny v detail stránkách (zakazka-detail, klient-detail, smlouva-detail, atd.).
- Čeština only.

## Review Focus

Cross-cutting potential bugs, které spec zmiňuje jako rizikové a každý má přiřazený ownership task:

1. **Komunikace mizí ze sidebaru — ale musí být dohledatelná.** Owner: T4+T5. Playwright test: topbar má `[aria-label*="Inbox"]`, klik otevře `/inbox` s 3 segmenty.
2. **Sidebar klik na nadpis vs. chevron.** Owner: T2. Playwright test: klik `.s21-navsec__title[href]` naviguje; klik `.s21-navsec__chev` toggluje `aria-expanded` bez změny URL.
3. **Existujících 20+ URL z MAP zůstává funkčních.** Owner: T7 (sidebar propagation). Playwright test: iteruj MAP, všechny URL vrátí 200, 0 console errors.
4. **Heatmapa na mobilu nepřetéká viewport.** Owner: T9 (Výroba landing). Playwright test: viewport 375, `document.body.scrollWidth <= 375`, heatmapa v `overflow-x: auto` wrapperu.
5. **Dashboard lifecycle banner čte z `CASES`+`ORDERS` korektně.** Owner: T12. Vizuální verifikace screenshot + spot-check hodnot.
6. **Obchod→Výroba linky klikatelné.** Owner: T14. Playwright test: na zakazka-detail najdi text „Vznikla z: OP-2026-*", klik naviguje na pripady s hashem.

---

## Task 1: Create `_shared-data.js` — overhaul CASES + ORDERS

**Files:**
- Create: `demo/_shared-data.js`
- Test: `demo/_shared-data.test.html` (lightweight manual harness — otevře se v browseru a assertuje console.log)

**Interfaces:**
- Consumes: nic (nová vrstva).
- Produces: `window.S21Data` global s:
  - `CASES: Case[]` — 5 cases, pole `firstContactAt`, `wonAt?`, `productionOrderId?`, stage ∈ {'poptavka', 'k-dodavateli', 'nabidka', 'vyhodnoceni-nase', 'vyhodnoceni-klient', 'k-podpisu', 'won', 'lost'}
  - `ORDERS: Order[]` — existujících ~10 + 2 nové (ZAK-2026-0155 Fotovoltaika pro Novákovi, ZAK-2026-0156 Rekonstrukce koupelny pro Dvořákovi). Nová pole `plannedHours`, `realHours`, `caseId?`.
  - `getActiveOrders()`, `getOpenCases()`, `getRiskScore(order): number`, `getCaseByProductionOrder(zakId): Case?`, `getOrderByCase(caseId): Order?`

- [ ] **Step 1: Write the manual test harness `_shared-data.test.html`**

Lightweight HTML that loads `_shared-data.js` and runs assertion script, visible in page body.

```html
<!doctype html>
<html><head><title>_shared-data test</title></head>
<body><pre id="out">Running...</pre>
<script src="./_shared-data.js"></script>
<script>
  const S = window.S21Data;
  const out = document.getElementById('out');
  const asserts = [];
  const assertEq = (name, actual, expected) => asserts.push({ name, pass: actual === expected, actual, expected });
  assertEq('CASES length', S.CASES.length, 5);
  assertEq('ORDERS length', S.ORDERS.length, 12); // 10 existing + 2 new
  assertEq('Novakovi case links to ZAK-2026-0155', S.CASES.find(c => c.client === 'Novákovi').productionOrderId, 'ZAK-2026-0155');
  assertEq('getOrderByCase roundtrip', S.getOrderByCase('OP-2026-0041').code, 'ZAK-2026-0131');
  assertEq('getRiskScore returns number', typeof S.getRiskScore(S.ORDERS[0]), 'number');
  out.textContent = asserts.map(a => (a.pass ? '✓' : '✗') + ' ' + a.name + (a.pass ? '' : ' expected=' + a.expected + ' got=' + a.actual)).join('\n');
</script></body></html>
```

- [ ] **Step 2: Run harness in browser — verify all FAIL** (`_shared-data.js` neexistuje)

Run: `http://localhost:3000/demo/_shared-data.test.html`
Expected: 404 pro `_shared-data.js` → fail silently + "Running..." zůstane.

- [ ] **Step 3: Implement `_shared-data.js` s CASES overhaul**

Vytvořit přes IIFE:

```js
(function(global) {
  const CASES = [
    { id: 'OP-2026-0045', code: 'OP-2026-0045', name: 'Fotovoltaika pro RD Lipová',
      client: 'Novákovi', clientKind: 'family', owner: 'Pavel O.',
      stage: 'won', value: 220000, type: 'fve',
      firstContactAt: '05. 09. 2026', wonAt: '20. 10. 2026',
      productionOrderId: 'ZAK-2026-0155',
      deadline: '15. 12. 2026',
      lastContact: '2 dny' },
    { id: 'OP-2026-0043', code: 'OP-2026-0043', name: 'AI reporting pilot',
      client: 'Moravia Steel a.s.', clientKind: 'b2b', owner: 'Alena D.',
      stage: 'vyhodnoceni-klient', value: 180000, type: 'ai-pilot',
      firstContactAt: '10. 10. 2026',
      productionOrderId: 'ZAK-2026-0142',
      deadline: '25. 11. 2026',
      lastContact: '1 den' },
    { id: 'OP-2026-0041', code: 'OP-2026-0041', name: 'ERP→CRM integrace',
      client: 'Agro Slovácko s.r.o.', clientKind: 'b2b', owner: 'Pavel O.',
      stage: 'won', value: 312000, type: 'integration',
      firstContactAt: '15. 08. 2026', wonAt: '22. 04. 2026',
      productionOrderId: 'ZAK-2026-0131',
      deadline: '10. 11. 2026',
      lastContact: '7 dní' },
    { id: 'OP-2026-0039', code: 'OP-2026-0039', name: 'Automatizace výkazů',
      client: 'Hradecká strojírna s.r.o.', clientKind: 'b2b', owner: 'Alena D.',
      stage: 'won', value: 96500, type: 'automation',
      firstContactAt: '01. 09. 2026', wonAt: '03. 05. 2026',
      productionOrderId: 'ZAK-2026-0139',
      deadline: '15. 12. 2026',
      lastContact: '3 dny' },
    { id: 'OP-2026-0037', code: 'OP-2026-0037', name: 'Rekonstrukce koupelny',
      client: 'Dvořákovi', clientKind: 'family', owner: 'Pavel O.',
      stage: 'nabidka', value: 180000, type: 'construction',
      firstContactAt: '25. 10. 2026',
      productionOrderId: 'ZAK-2026-0156',
      deadline: '20. 11. 2026',
      lastContact: '4 dny' },
  ];
  // ORDERS: 10 existing + 2 new (viz Step 4)
  const ORDERS = [ /* ... */ ];

  function getActiveOrders() { return ORDERS.filter(o => !['delivered', 'cancelled', 'done'].includes(o.status)); }
  function getOpenCases() { return CASES.filter(c => !['won', 'lost'].includes(c.stage)); }
  function getRiskScore(o) {
    let s = 0;
    if (o.overdue) s += 4;
    if (o.realHours > o.plannedHours * 1.1) s += 3;
    if (o.margin < 15) s += 2;
    if (o.missingDocs) s += 1;
    return s;
  }
  function getCaseByProductionOrder(zakId) { return CASES.find(c => c.productionOrderId === zakId); }
  function getOrderByCase(caseId) {
    const c = CASES.find(x => x.id === caseId);
    return c ? ORDERS.find(o => o.code === c.productionOrderId) : null;
  }

  global.S21Data = { CASES, ORDERS, getActiveOrders, getOpenCases, getRiskScore, getCaseByProductionOrder, getOrderByCase };
})(window);
```

- [ ] **Step 4: Extract ORDERS z `demo/zakazky.html` + obohatit o nová pole**

Zkopírovat existujících 10 ORDERS z `demo/zakazky.html` do `_shared-data.js`. Každému doplnit `plannedHours`, `realHours` (součet z operations kde existuje, jinak aproximace), `caseId?` (podle productionOrderId mapovaní zpět).

Přidat 2 nové ORDERS:
- `ZAK-2026-0155 Fotovoltaika 8 kWp` pro Novákovi (operations: Návrh / Objednávka komponent / Instalace / Zápis do sítě; plannedHours: 40, realHours: 12; stav: 'realizace'; overdue: false).
- `ZAK-2026-0156 Rekonstrukce koupelny — RD Zlín` pro Dvořákovi (operations: Bourací práce / Instalace / Obklady / Dokončení; plannedHours: 80, realHours: 0; stav: 'nabidka'; overdue: false).

- [ ] **Step 5: Run harness — verify PASS**

Run: `http://localhost:3000/demo/_shared-data.test.html`
Expected: Všechny ✓.

- [ ] **Step 6: Commit**

```bash
git add demo/_shared-data.js demo/_shared-data.test.html
git commit -m "F1/T1: _shared-data.js — unified mock data s Obchod→Výroba vazbami"
```

---

## Task 2: Sidebar library — split title (link) + chevron (button)

**Files:**
- Modify: `src/components/index.jsx` — hledej `function Sidebar` + `.s21-navsec__head` render
- Modify: `src/components/bundle.css` — `.s21-navsec__title`, `.s21-navsec__chev` nové selektory
- Run build: `npm run build`

**Interfaces:**
- Consumes: existující `moduleNavSections` + `Sidebar` props beze změny.
- Produces: `Sidebar` komponenta renderuje nadpis sekce jako `<a>` + chevron jako samostatný `<button>`. Klik na nadpis = navigace (přes `onNavigate` prop), klik na chevron = toggle expanded.

- [ ] **Step 1: Prozkoumat existující Sidebar render**

Grep `Sidebar.*navsec__head` v `src/components/index.jsx` a identifikuj JSX. Zjistit, jestli dnes používá `onNavigate` callback pro navigaci.

- [ ] **Step 2: Napsat failing test — Playwright evaluate**

Vytvořit soubor `tests/manual/sidebar-click.html` který nastaví Sidebar s mock data a očekává že klik na `.s21-navsec__title[href]` vyvolá navigaci. Alternativně: spustit `/dashboard` v Playwright a assertnout:

```js
const titleEl = await page.locator('.s21-navsec__title[href="/obchod"]').count();
// expect titleEl > 0 — FAIL at this point (today it's a <button>)
```

Zapsat do `.playwright-notes.md` jako tracking.

- [ ] **Step 3: Refactor Sidebar JSX**

V `src/components/index.jsx` v `Sidebar` komponentě:

Před:
```jsx
<button className="s21-navsec__head" onClick={...}>
  <span>{title}</span>
  <Icon name="chevron-down" />
</button>
```

Po:
```jsx
<div className="s21-navsec__headrow">
  {sectionHref ? (
    <a className="s21-navsec__title" href={sectionHref} onClick={(e) => { e.preventDefault(); onNavigate?.({ href: sectionHref }); }}>
      {title}
    </a>
  ) : (
    <span className="s21-navsec__title">{title}</span>
  )}
  <button className="s21-navsec__chev" type="button" aria-expanded={isExpanded} aria-controls={sectionId} onClick={toggleExpanded}>
    <Icon name="chevron-down" />
  </button>
</div>
```

Pozn.: `sectionHref` je nová prop na section item — nastaví se v moduleNavSections (v T2 next step).

- [ ] **Step 4: Update bundle.css selektory**

Rozdělit stávající `.s21-navsec__head` CSS na `.s21-navsec__headrow` (flex row wrapper) + `.s21-navsec__title` (link styling, hover) + `.s21-navsec__chev` (button icon). Chevron má menší hit target (~32×32), rotace při `aria-expanded="true"`.

- [ ] **Step 5: Update `moduleNavSections` s `sectionHref` pro velké sekce**

V `src/components/index.jsx` najít `moduleNavSections` constant. Přidat `sectionHref` property pro OBCHOD, VÝROBA, LIDÉ, DMS:

```js
{ title: "Obchod", sectionHref: "/obchod", items: [
  { label: "Přehled", icon: "...", href: "/obchod" },  // NEW first item
  { label: "Obchodní případy", ... },
  ...
]}
```

Pozn.: první `items[0]` = Přehled s `href = sectionHref`. To zajistí, že i kliknutí na expandovaný submenu hit "Přehled" vede na landing.

Stejně pro Výroba (`/vyroba`), Lidé (`/lide`), DMS (`/dms`).

**Odstranit Komunikaci a Intranet sekce** z `moduleNavSections` (včetně items Email/Zprávy/Nástěnka/KB).

- [ ] **Step 6: Build dist**

Run: `npm run build`
Expected: `Build OK`.

- [ ] **Step 7: Playwright verify sidebar interakce**

Open `/demo/dashboard.html`:
- Klik na `.s21-navsec__title[href="/obchod"]` → očekávej navigaci (page.url() změní na obchod.html — ale ta stránka ještě neexistuje → acceptuj 404 nebo _coming.html).
- Klik na `.s21-navsec__chev[aria-controls]` sousedící s OBCHOD titulkem → očekávej že `aria-expanded` toggluje mezi true/false bez změny URL.
- Assertuj že Komunikace + Intranet NEJSOU v DOM.

- [ ] **Step 8: Commit**

```bash
git add src/components/index.jsx src/components/bundle.css dist/system21.js dist/system21.css
git commit -m "F1/T2: Sidebar — title/chevron split, remove Komunikace+Intranet, add sekční Přehled items"
```

---

## Task 3: `InboxBell` library component

**Files:**
- Modify: `src/components/index.jsx` — nová `InboxBell` komponenta + export
- Modify: `src/components/bundle.css` — `.s21-inboxbell` + `.s21-inboxbell__badge`
- Run build

**Interfaces:**
- Consumes: `Icon` komponenta z library.
- Produces: `window.S21.InboxBell({ unread: number, onClick: () => void, 'aria-label'?: string })` — tlačítko s mail ikonou + badge.

- [ ] **Step 1: Implement `InboxBell` v `src/components/index.jsx`**

```jsx
function InboxBell({ unread = 0, onClick, 'aria-label': ariaLabel = 'Inbox' }) {
  return (
    <button type="button" className="s21-inboxbell" onClick={onClick} aria-label={ariaLabel} title={ariaLabel}>
      <Icon name="mail" size={18} />
      {unread > 0 && <span className="s21-inboxbell__badge">{unread > 99 ? '99+' : unread}</span>}
    </button>
  );
}
```

Export přidat do `moduleNavSections` sekce (hledat `window.S21 = { ... }` nebo podobný export objekt). Přidat `InboxBell` do seznamu.

- [ ] **Step 2: CSS v `bundle.css`**

```css
.s21-inboxbell { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: transparent; border: 0; border-radius: var(--radius-md); color: var(--topbar-text); cursor: pointer; }
.s21-inboxbell:hover { background: var(--topbar-hover); }
.s21-inboxbell__badge { position: absolute; top: 4px; right: 4px; min-width: 16px; height: 16px; padding: 0 4px; background: var(--primary); color: var(--on-primary); font: 700 10px/16px var(--font-mono); border-radius: var(--radius-full); display: inline-flex; align-items: center; justify-content: center; }
```

- [ ] **Step 3: Build**

Run: `npm run build`

- [ ] **Step 4: Manual verify**

Open `/demo/showcase.html` (library preview). V dev tools:
```js
const b = React.createElement(window.S21.InboxBell, { unread: 5, onClick: () => alert('open inbox') });
```
Expected: komponenta existuje, nerozbije se.

Nebo rychleji: přidat do showcase stránky section s `InboxBell` příkladem.

- [ ] **Step 5: Commit**

```bash
git add src/components/index.jsx src/components/bundle.css dist/system21.js dist/system21.css
git commit -m "F1/T3: InboxBell library component"
```

---

## Task 4: `DemoTopBar` — add InboxBell + unread count

**Files:**
- Modify: `demo/_shared.js` — `DemoTopBar` render + nový `INBOX_UNREAD` constant

**Interfaces:**
- Consumes: `window.S21.InboxBell` (z T3), existující `NotificationCenter`.
- Produces: topbar s pořadím `Breadcrumbs | InboxBell | NotificationCenter | BrandToggle | ThemeToggle | Avatar`.

- [ ] **Step 1: Přidat `INBOX_UNREAD` do `_shared.js`**

```js
const INBOX_UNREAD = 5; // demo value
```

- [ ] **Step 2: Modify `DemoTopBar` render**

V `extra` prop přidat InboxBell PŘED NotificationCenter:

```jsx
extra: h(R.Fragment, null,
  h(S.InboxBell, { unread: INBOX_UNREAD, onClick: () => global.location.href = './inbox.html' }),
  h(S.NotificationCenter, { ... }),
  h(S.BrandToggle),
  h(S.ThemeToggle)
),
```

- [ ] **Step 3: Playwright verify**

Open `/demo/dashboard.html`:
- Find `button[aria-label="Inbox"]` v topbaru.
- Assertuj badge text = "5".
- Klik → URL změní na `/demo/inbox.html` (ještě neexistuje, 404 = OK v tomhle kroku, bude existovat v T5).

- [ ] **Step 4: Commit**

```bash
git add demo/_shared.js
git commit -m "F1/T4: DemoTopBar — InboxBell s unread count"
```

---

## Task 5: `/inbox` — unified communication page

**Files:**
- Create: `demo/inbox.html`
- Modify: `demo/_shared.js` — update MAP pro `/email` + `/zpravy` + `/inbox`

**Interfaces:**
- Consumes: `S.SegmentedControl`, `S.AppShell`, `S.PageHeader`, `S.PageBody`, existující mock data z `email.html` a `zpravy.html` (přenést sem).
- Produces: nová stránka s 3 segmenty (Email / Zprávy / Interní chat), hash-based segment selection (`#email`, `#zpravy`, `#chat`).

- [ ] **Step 1: Vytvořit `demo/inbox.html` šablonu (bez obsahu)**

Standardní demo page template (import tokens, system21.css, system21.js, _shared.js), `AppShell` + `PageHeader("Inbox", ...)`. Prázdný PageBody.

- [ ] **Step 2: Implementovat segment switching s hash**

```jsx
const [seg, setSeg] = React.useState(() => window.location.hash.replace('#', '') || 'email');
React.useEffect(() => {
  window.location.hash = seg;
}, [seg]);
```

Render SegmentedControl s items `[{value: 'email', label: 'Email', count: emailUnread}, {value: 'zpravy', label: 'Zprávy', count: smsUnread}, {value: 'chat', label: 'Interní chat', count: chatUnread}]`.

- [ ] **Step 3: Přenést Email segment**

Zkopírovat relevantní JSX z `demo/email.html` do podmíněného renderu `seg === 'email'`. Mock data MAILS zůstanou (deduplikaci neřeším, email.html zůstane v repu).

**Zjednodušit:** odstranit left folder sidebar (Doručená pošta / Hvězdičkované / atd.) — ten patří jen do email.html. Inbox má jen 2-pane: list + preview.

- [ ] **Step 4: Přenést Zprávy segment**

Zkopírovat z `demo/zpravy.html` tabulku odeslaných SMS. Render v podmínce `seg === 'zpravy'`.

- [ ] **Step 5: Vymyslet Interní chat segment (nový mock)**

3 mock konverzace:
- Pavel O. ↔ Alena D. (1:1, poslední zpráva 5 min)
- Team Obchod (channel, 4 členové, 3 nepřečtené)
- Team Výroba (channel, 5 členů, 1 nepřečtená)

Render: list vlevo, preview vpravo. Zcela zjednodušené — žádný chat input, jen zobrazení. Je to demo screenshot, ne funkční chat.

- [ ] **Step 6: Update URL MAP v `_shared.js`**

Změnit:
```js
"/email": "./inbox.html#email",
"/zpravy": "./inbox.html#zpravy",
"/inbox": "./inbox.html",
```

Odstranit nebo nechat starých `/email` → `./email.html` key? **Nechat** — starý soubor přežije, ale URL nav vede na inbox. Email.html zůstane přímo přístupný, ale ze sidebaru se k němu nikdo nedostane (sidebar Komunikaci odstraňuje T2).

- [ ] **Step 7: Playwright verify**

Open `/demo/inbox.html`:
- Assertuj default segment = "email" (žádný hash).
- Klik na "Zprávy" tab → hash = `#zpravy`, obsah se změní.
- 0 console errors.
- Mobile 375: segment control tlačítka wrapping OK, list visible.

Open `/demo/inbox.html#chat`:
- Segment = chat při load.

- [ ] **Step 8: Commit**

```bash
git add demo/inbox.html demo/_shared.js
git commit -m "F1/T5: /inbox unified page (Email / Zprávy / Interní chat segmenty)"
```

---

## Task 6: Sidebar propagation — update `active:` paths across pages

**Files:**
- Modify: všechny `demo/*.html` kde se vyskytuje `DemoSidebar, { active: "/..." }` co se změnilo. T2 mění sidebar strukturu — ale activePath remains same (pokud mapujeme URL na `/obchod` sekci klik = `/obchod`, items jako `/obchod/klienti` se nemění).

**Interfaces:**
- Consumes: `moduleNavSections` z T2.
- Produces: všech 26 stránek funguje — žádná stránka nemá rozbitý active state po sidebar refactoru.

- [ ] **Step 1: Zkontrolovat, že T2 nerozbila existující active paths**

Po T2 je `moduleNavSections` upravené. Zjistit:
- Zda OBCHOD items začínají s `{ href: '/obchod' }` (Přehled) — a existující `/obchod/klienti`, `/obchod/osoby`, `/obchod/pripady` dále (nemění se).
- Podobně VÝROBA (`/vyroba` first, then `/vyroba/zakazky`, `/vyroba/vykazovani`).
- LIDÉ (`/lide` first, then `/lide/pracovnici`, `/lide/dochazka`).
- DMS (`/dms` first, then `/dms/smlouvy`, `/dms/dokumenty`, `/dms/automatizace`).

Pokud items zůstaly stejné jak dnes, žádné stránky se nemusí měnit.

- [ ] **Step 2: Grep existing active paths**

```bash
grep -rn 'DemoSidebar, { active:' demo/*.html
```

Všechny `active:` hodnoty porovnat s novou MAP (T2 výsledkem). Měla by být shodnost.

- [ ] **Step 3: Pokud existuje nesrovnalost, oprav v daných souborech**

Např. pokud `email.html` má `active: "/email"` a nová sidebar/MAP má `/email → ./inbox.html#email` ale item v sidebaru neexistuje → `active: "/email"` nebude nic highlight. To je OK, email.html má ze sidebaru schovanou sekci, uživatel tam přijde jen přes direct URL nebo z inbox redirect.

- [ ] **Step 4: Playwright — test MAP integrity**

Spustit script, který postupně navštíví všech 20+ URL z `_shared.js` MAP a ověří:
- HTTP 200
- 0 console errors
- `document.title` není prázdný

Uložit script do `tests/manual/map-integrity.js` nebo spustit ad-hoc v Playwright.

- [ ] **Step 5: Commit (jen pokud byly změny)**

```bash
git add demo/*.html
git commit -m "F1/T6: Sidebar active paths propagation po Obchod/Vyroba/Lide/DMS přidání Přehledů"
```

Pokud žádné změny → skip commit.

---

## Task 7: `/obchod` — nová Obchod landing

**Files:**
- Create: `demo/obchod.html`
- Modify: `demo/_shared.js` — `/obchod` → `./obchod.html` (už by mělo existovat po T5)
- Modify: `demo/crm-pripady.html` — odstranit SalesFunnel (přesouvá se sem)

**Interfaces:**
- Consumes: `window.S21Data.CASES`, `getOpenCases`, `window.S21.SalesFunnel`, `window.S21.KpiRow`, `window.S21.StatTile`, `window.S21.Section`.
- Produces: landing s 4 KPI pruhem + 2-col blokem (SalesFunnel vlevo, "Vyžaduje tvou pozornost" vpravo) + spodní operativou (odkazy na pripady/klienti).

- [ ] **Step 1: Vytvořit `demo/obchod.html` šablonu**

Standardní template, PageHeader("Obchod", "Prodejní pipeline, klienti a obchodní případy").

- [ ] **Step 2: Implementovat KPI pruh**

```jsx
e(S.KpiRow, { cols: 4 },
  e(S.StatTile, { label: "Otevřené případy", value: S21Data.getOpenCases().length.toString() }),
  e(S.StatTile, { label: "Hodnota pipeline", value: fmt(sumValue(getOpenCases())), unit: "Kč", big: true }),
  e(S.StatTile, { label: "Konverze (YTD)", value: "67 %", hint: "podepsáno / uzavřených" }),  // mock
  e(S.StatTile, { label: "Case velocity", value: "28", unit: "dnů", hint: "poptávka → podpis" }),  // mock average
)
```

- [ ] **Step 3: Implementovat levý SalesFunnel block (přesunutý z `crm-pripady.html`)**

Zkopírovat `FUNNEL` constant a `S.SalesFunnel` render z `crm-pripady.html` do `obchod.html`.

V `crm-pripady.html` po tomhle odstranit SalesFunnel a KPI pruh (přestěhují se do landing).

- [ ] **Step 4: Implementovat pravý "Vyžaduje tvou pozornost"**

Top 5 cases s weighted skóre: `(deadlineDaysLeft < 7 ? 3 : 0) + (value > 100000 ? 2 : 0) + (lastContactDays > 7 ? 2 : 0)`. Zobrazit jako list s kódem, názvem, klientem, badges proč je to na pozornosti.

- [ ] **Step 5: Spodní operativa**

Dvě karty vedle sebe (`s21-grid-cards-2`):
- Vlevo "Nejnovější případy" — mini tabulka 5 cases, link `→ Všechny obchodní případy`
- Vpravo "Recently active klienti" — mini list 5 clients, link `→ Klienti`

- [ ] **Step 6: Playwright verify**

Open `/demo/obchod.html`:
- 0 console errors
- KPI tiles renderují (4 ks)
- SalesFunnel visible
- "Vyžaduje tvou pozornost" top 5 items visible
- Mobile 375: no horizontal overflow
- `document.body.scrollWidth <= 375`

- [ ] **Step 7: Commit**

```bash
git add demo/obchod.html demo/crm-pripady.html
git commit -m "F2/T7: /obchod landing — KPI + SalesFunnel + Vyžaduje pozornost; SalesFunnel přesunut z pripady"
```

---

## Task 8: `/vyroba` — nová Výroba landing

**Files:**
- Create: `demo/vyroba.html`
- Modify: `demo/_shared.js` — `/vyroba` → `./vyroba.html`

**Interfaces:**
- Consumes: `window.S21Data.ORDERS`, `getActiveOrders`, `getRiskScore`, `window.S21.KpiRow`, `window.S21.StatTile`, `window.S21.Section`.
- Produces: landing s 4 KPI + 2-col blokem (Rizikový list TOP 5 vlevo, Plán-vs-realita heatmapa vpravo) + spodní operativou.

- [ ] **Step 1: Šablona**

Standardní, PageHeader("Výroba", "Zakázky, operace, hodiny").

- [ ] **Step 2: KPI pruh**

```jsx
e(S.KpiRow, { cols: 4 },
  e(S.StatTile, { label: "Aktivních zakázek", value: activeCount.toString() }),
  e(S.StatTile, { label: "Rozpracovanost", value: fmt(rozpracovanostKc), unit: "Kč", big: true }),
  e(S.StatTile, { label: "Po termínu", value: overdueCount.toString(), accent: overdueCount > 0 ? "danger" : undefined }),
  e(S.StatTile, { label: "Průměrná marže", value: avgMargin.toFixed(0) + " %" }),
)
```

Výpočty:
- `rozpracovanostKc = ORDERS.filter(active).reduce((s, o) => s + (o.realHours * 1500), 0)` (mock hourly rate)
- `overdueCount = ORDERS.filter(o => active && overdue).length`
- `avgMargin = avg of active orders margins`

- [ ] **Step 3: Rizikový list TOP 5**

```jsx
e(S.Section, { title: "Zakázky v riziku — TOP 5" },
  e("ul", { className: "risk-list" },
    sorted.slice(0, 5).map(o => e("li", { className: "risk-row" },
      e("div", { className: "risk-row__main" },
        e("div", null, o.code + " · " + o.name),
        e("div", { className: "s21-cell-meta" }, o.client)
      ),
      e("div", { className: "risk-row__flags" }, renderFlags(o)),
      e(S.Button, { size: "sm", onClick: () => location = './zakazka-detail.html' }, "Otevřít")
    ))
  )
)
```

`renderFlags(o)`: ikon + text pro `overdue` (ikon alert, "Po termínu"), `overHours` (ikon clock, "+Xh"), `lowMargin` (ikon trending-down, "margin X%"), `missingDocs` (ikon file-x, "chybí podklady").

Prázdný stav: `S.EmptyState` s "Vše v normě, žádná zakázka v riziku."

- [ ] **Step 4: Plán-vs-realita heatmapa**

Komponenta inline (není library). Tabulka:
- Řádky = aktivní zakázky (max 10 pro heatmapu, pak link na "více")
- Sloupce = operations (max 6, pokud více zakrytých skrytí)
- Buňka: `<div className={`heat-cell heat-cell--${status}`}>` kde status ∈ empty/plan/done/over

```css
.heat-table-wrap { overflow-x: auto; }
.heat-table { border-collapse: collapse; min-width: 600px; }
.heat-table th, .heat-table td { padding: 4px; text-align: center; }
.heat-cell { display: inline-block; width: 100%; height: 32px; border-radius: 4px; }
.heat-cell--empty { background: var(--surface-muted); }
.heat-cell--plan { background: var(--primary-soft); }
.heat-cell--done { background: var(--success-bg); }
.heat-cell--over { background: var(--warning-bg); }
```

Tooltip na hover (title atribut postačí).

- [ ] **Step 5: Spodní operativa**

Dvě karty: "Nejhorší po termínu" (mini tabulka 5 zakázek), link `→ Všechny zakázky` + `→ Vykazování`.

- [ ] **Step 6: Playwright verify**

- 0 console errors
- KPI pruh correct values
- Rizikový list má 5 items
- Heatmapa viditelná
- Mobile 375: no body overflow, heatmapa má overflow-x: auto

- [ ] **Step 7: Commit**

```bash
git add demo/vyroba.html
git commit -m "F2/T8: /vyroba landing — KPI + Rizikový list TOP 5 + Plán-vs-realita heatmapa"
```

---

## Task 9: `/lide` — nová Lidé landing

**Files:**
- Create: `demo/lide.html`

**Interfaces:**
- Consumes: mock data (přes `_shared-data.js` nebo lokální) — 7 pracovníků (z `hr-pracovnici.html`).
- Produces: landing s 4 KPI + 2-col blokem (Fond hodin vlevo, Docházka dnes vpravo).

- [ ] **Step 1: Šablona** s PageHeader("Lidé", "Tým, kapacita, docházka").

- [ ] **Step 2: KPI pruh**

StatTile Celkem (7), Dnes v práci (5), Na dovolené (1), Nemocní (1). Hard-coded.

- [ ] **Step 3: Fond hodin tento týden**

List pracovníků s progress baru (mock data: každý má mock `hoursThisWeek` a `plannedHours = 40`). Barva baru: zelená 80-110 %, žlutá < 80 %, červená > 110 %.

- [ ] **Step 4: Docházka dnes**

Mock: 4 lidi přítomní s časem příchodu + ikona kanceláře/home, 1 mimo (lunch), 1 na dovolené, 1 nemocný. Render jako status cards.

- [ ] **Step 5: Spodní operativa**

Links `→ Všichni pracovníci (7)`, `→ Docházka tento měsíc`.

- [ ] **Step 6: Playwright verify + commit**

---

## Task 10: `/dms` — nová DMS landing

**Files:**
- Create: `demo/dms.html`

**Interfaces:**
- Consumes: mock data CONTRACTS (z `dms-smlouvy.html` — zatím přes import nebo kopii; optional extract do `_shared-data.js` v budoucnu).
- Produces: landing s 4 KPI + 2-col blokem (Výročí smluv vlevo, ÁJA fronta vpravo).

- [ ] **Step 1: Šablona** s PageHeader("DMS", "Smlouvy, dokumenty, automatizace").

- [ ] **Step 2: KPI pruh**

StatTile Aktivních smluv, Vyprší do 30 dnů, Nepodepsané, Dokumentů v DMS.

- [ ] **Step 3: Blížící se výročí**

Top 5 smluv s nejbližším výročím — reuse AnnivBadge pattern z dms-smlouvy.html.

- [ ] **Step 4: ÁJA fronta**

Top 5 emailů z `dms-automatizace.html` mock data — buď copy nebo extract do `_shared-data.js`.

- [ ] **Step 5: Spodní operativa + commit**

---

## Task 11: Dashboard redesign

**Files:**
- Modify: `demo/dashboard.html`

**Interfaces:**
- Consumes: `window.S21Data.CASES`, `ORDERS`, `getActiveOrders`, `getOpenCases`.
- Produces: přepsaný dashboard — 4 cross-cut KPI nahoře, 2-col hlavní blok (Dnes rozhoduješ + Aktivita), inline lifecycle banner, pak zachovaný global search a Deník dne.

- [ ] **Step 1: Odstranit staré 6 Poema KPI tiles**

Zachovat template header, `greeting`, `greeting__sub`. Smazat `KpiRow` s 6 tiles.

- [ ] **Step 2: Implementovat nový 4-KPI pruh**

```jsx
e(S.KpiRow, { cols: 4 },
  e(S.StatTile, { label: "Otevřený byznys", value: openCasesCount, hint: fmt(pipelineValue) + " Kč" }),
  e(S.StatTile, { label: "Běžící výroba", value: activeOrdersCount, hint: fmt(rozpracovanostKc) + " Kč" }),
  e(S.StatTile, { label: "Co pálí", value: riskCount, accent: riskCount > 0 ? "warning" : undefined, hint: "zakázky v riziku" }),
  e(S.StatTile, { label: "Zdraví klientů", value: expirySoonCount + ajaPendingCount, accent: ..., hint: "smlouvy + ÁJA" }),
)
```

- [ ] **Step 3: Implementovat hlavní 2-col blok**

Levý "Dnes rozhoduješ" — mock curated feed 5 items napříč sekcemi. Každý item s ikonou sekce (OBCHOD/VÝROBA/DMS), titulkem, meta. Clickable.

Pravý "Aktivita napříč firmou" — timeline 6-8 událostí posledních 24h. Mock data.

- [ ] **Step 4: Lifecycle banner (inline)**

Tři karty vedle sebe:
```jsx
<div className="lifecycle-banner">
  <div className="lc-step"><h3>V jednání</h3><div className="lc-num">{openCasesCount}</div><div>{fmt(pipelineValue)} Kč</div></div>
  <Icon name="arrow-right" className="lc-arrow" />
  <div className="lc-step"><h3>V realizaci</h3>...</div>
  <Icon name="arrow-right" className="lc-arrow" />
  <div className="lc-step"><h3>Dokončeno YTD</h3>...</div>
</div>
```

Každá karta klikatelná → navigace na příslušný list.

- [ ] **Step 5: Zachovat global search + Deník dne**

Pod lifecycle banner nechat existující global search widget a Deník dne 4 bloky. Jen přesunout níž (hierarchy: KPI → Hlavní blok → Lifecycle → Search → Deník).

- [ ] **Step 6: Playwright verify**

- 0 console errors
- Všechny KPI tiles renderují s hodnotami ze `_shared-data`
- Lifecycle banner klikatelný (3 kliknutí → correct navigation)
- Global search a Deník dne stále funkční
- Mobile 375: KPI 2x2, hlavní blok stacking, lifecycle banner stacking (vertikální)

- [ ] **Step 7: Commit**

```bash
git add demo/dashboard.html
git commit -m "F3/T11: Dashboard redesign — 4 cross-cut KPI + hlavní blok + lifecycle banner"
```

---

## Task 12: `/vyroba/zakazky` — odstranit SalesFunnel, nahradit chip filtry

**Files:**
- Modify: `demo/zakazky.html`

**Interfaces:**
- Consumes: `window.S21Data.ORDERS` (optional přechod na shared data; zatím může zůstat lokální).
- Produces: `/vyroba/zakazky` list bez SalesFunnel, s "Co pálí" chip filters.

- [ ] **Step 1: Odstranit SalesFunnel JSX a `FUNNEL` constant**

- [ ] **Step 2: Nahradit chip filters**

Nový set:
- `Vše`
- `Po termínu` (filter: `o.overdue`)
- `Přetažené hodinami` (filter: `o.realHours > o.plannedHours * 1.1`)
- `Nízká marže` (filter: `o.margin < 15`)
- `Bez výkazu > 7 dní` (mock: pridat `lastLogDays` field)

- [ ] **Step 3: Přejmenovat KPI "V realizaci" → "V běhu"**

- [ ] **Step 4: Playwright verify + commit**

---

## Task 13: OP↔ZAK linky v zakazka-detail + crm-pripady

**Files:**
- Modify: `demo/zakazka-detail.html` — section "Údaje" dostane field "Vznikla z: [OP-2026-NNNN]"
- Modify: `demo/crm-pripady.html` — won case dostane badge "→ ZAK-2026-NNNN"

**Interfaces:**
- Consumes: `window.S21Data.getCaseByProductionOrder`, `getOrderByCase`.

- [ ] **Step 1: zakazka-detail**

V "Údaje" sekci přidat řádek "Vznikla z:" s klikatelným odkazem na `crm-pripady.html#OP-2026-NNNN`.

- [ ] **Step 2: crm-pripady**

V tabulce u won cases přidat badge s linkem na zakazka-detail.

- [ ] **Step 3: Playwright verify**

Open `/demo/zakazka-detail.html`:
- Najdi text `Vznikla z: OP-2026-`
- Klik → naviguje na `/demo/crm-pripady.html#OP-...`

- [ ] **Step 4: Commit**

---

## Task 14: Final branch review (fresh reviewer)

Po dokončení T1-T13 proveď finální review přes fresh subagent na claude-opus-4-7.

- [ ] **Step 1: Spustit `code-reviewer` subagent** s prompttem:

> Projdi commits F1/T1 až F3/T13 na branch main. Spec je v `docs/superpowers/specs/2026-11-06-mis-restructure-design.md`. Zkontroluj:
> - Všechny Review focus points (6) jsou pokryté.
> - Nejsou tam regrese v existujících operativních pages.
> - Mock data v `_shared-data.js` jsou vnitřně konzistentní.
> - Playwright testy proběhly.

- [ ] **Step 2: Fix findings**

- [ ] **Step 3: Final commit — "ready for push" message to user**

---

## Dokončení

Po T14:
- Zpráva uživateli se seznamem commitů (F1/T1 .. F3/T13 + T14 fix).
- Request na `git push origin main` approval.
- Update memory `project_rebuild_progress.md` s novou architekturou.

---

Plán hotov.
