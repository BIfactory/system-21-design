# System 21 — MIS/IS restrukturalizace demo aplikace

**Datum:** 2026-11-06
**Autor:** Lubomír Hulín + Claude
**Status:** v2 (post builder check) — k approve

## Proč tohle děláme

System 21 backend je stavěný **univerzálně** — plánuje se nasadit různým zákazníkům, GUI se upravuje per-customer. Tohle demo GUI má být **referenční univerzální GUI** pro malou firmu end-to-end. Dnešní stav je ale kočkopes Poema (pojišťovák) + Polepim (výroba), vypadá jako sales pitch pro jednu personu, ne jako platformová showcase. Konkrétní dluhy:

- **Hlavní dashboard** má 6 KPI tiles seřazených pojišťovácky (Klienti / Smlouvy / Příležitosti / ÁJA / Nepodepsané / Zakázky). Z pohledu „jakákoliv malá firma" je to arbitrární výběr vázaný na pojistný byznys.
- **Zakázky list má `SalesFunnel`** (Nové → Nabídka → Realizace → Hotovo → Fakturováno). Sales metafora, která do Výroby nepatří. Výroba potřebuje signály „kde to pálí" (čas, peníze, deadline).
- **Obchod → Výroba spojnice v datech neexistuje.** CASES jsou typově pojišťovací (úrazovka, autopojištění), ORDERS typově IT/vývoj (AI reporting, ERP integrace). Nejde ukázat natural lifecycle „podepsaný případ → otevřená zakázka".
- **Sidebar sekce:** Výroba → Obchod → DMS → Lidé → Komunikace → Intranet. Komunikace + Intranet jsou podpůrné, ale dostávají stejnou prominenci jako Obchod/Výroba.
- **Chybí sekční landingy.** Klik na „Obchod" dnes jen rozbalí submenu; neotevře se žádná sekční přehledovka. Stejně Výroba, Lidé, DMS.

## Co chceme postavit

Transformovat demo na **celopodnikový manažerský informační systém pro malou zakázkovou firmu**, se strukturou **sekce = landing dashboard + operativa (list, detail)**, kde:

1. **Hlavní dashboard** = cross-cut CEO view napříč sekcemi.
2. **Každá velká sekce (Obchod, Výroba, Lidé, DMS) má vlastní landing** = manažerský vstup („kde co pálí v této sekci") + drill-down na operativu.
3. **Komunikace + Intranet jsou ambientní** — pryč ze sidebaru, do topbaru (Inbox bell + nová `/inbox` stránka).
4. **Obchod → Výroba handoff** je modelovaný v datech: `OP-*` má referenci na `ZAK-*` a obráceně. Spojené pro **stejné klienty** napříč sekcemi.

### Cíle
- Demo komunikuje System 21 jako end-to-end MIS pro libovolnou malou zakázkovou firmu — ne jako CRM pro pojišťováka.
- Každá sekce (Obchod, Výroba, Lidé, DMS) je samostatný „mini-produkt" s vlastním landingem.
- Výroba landing dá manažerovi do 3 sekund odpověď na „co teď hoří".
- Obchod→Výroba lifecycle je viditelný a klikatelný (případ → zakázka).
- Komunikace a Intranet nekradou pozornost z dashboardu ani ze sidebaru.
- Terminologie je univerzální — žádné Poema-specific výrazy na top-level nav/dashboard/listech. V detail screens zůstává bohatost (různé typy smluv jako příklady).

### Nejsou cíle (anti-goals)
- **NE** přestavba operativních detail stránek (zakazka-detail, crm-klient-detail, smlouva-detail, dochazka atd.). Zůstávají jak jsou — pracují, jsou otestované.
- **NE** nové ERP koncepty (žádný fakturační modul, žádné účto, žádné finanční plánování).
- **NE** fyzické oddělení IS vs MIS do dvou nav sekcí (zamítnuto v brainstormingu).
- **NE** změny v library komponentách nad rámec toho, co je tu explicitně vyjmenované (Sidebar interakce, nová InboxBell).
- **NE** mazat existující stránky. Email, Zprávy, Nástěnka, KB zůstávají dostupné přes `/inbox` segmenty + direct URL.
- **NE** více jazyků. Čeština only.
- **NE** brand-specific landingy — landingy jsou brand-neutral (tokens-only), ne per-customer.
- **NE** přesun „Deník dne" nebo „global search" v tomhle sprintu — potenciální budoucí práce, mimo scope.

## Omezení

- Plain React 18 + `window.S21` global (žádný bundler per stránku).
- Design tokens + brand overlay (`[data-brand]`), nezměněné.
- Mock data konzistentní napříč demem. Existující klienti (Novákovi, Dvořákovi, Moravia Steel, Agro Slovácko, Hradecká strojírna) zůstávají, dostanou matching cases nebo zakázky.
- CZ formát (`12 345 Kč`, `12. 04. 2026`).
- Playwright verifikace před každým commitem — mobile 375 + desktop 1440.
- Push na main čeká na explicitní schválení uživatele.

## Zvažované přístupy

### Přístup A — Minimální zásah: reshuffle Dashboardu + odstranit SalesFunnel ze Zakázek

Předělat jen 2 obrazovky (hlavní Dashboard, Zakázky list). Přidat `/obchod` landing. Neřešit Lidé/DMS landingy, nechat Komunikaci v sidebaru.

**Pro:** 1-2 dny práce. Žádné riziko regrese jinde.
**Proti:** Neodpovídá vizi. Zůstává Poema-first mental model; Výroba stále bez vlastního landingu; Komunikace stále v sidebaru. Výsledek = kompromis, který odvede pozornost od strukturální změny.

### Přístup B — Fyzická separace IS vs MIS do dvou top-level nav sekcí

Levá navigace rozdělena vertikálně: horní „Pracovat" (Obchod/Výroba/Lidé/DMS), spodní „Řídit firmu" (CEO dashboard, analytika).

**Pro:** Čistě oddělené mental modely.
**Proti:** Uživatel je stejná osoba; context switch pálí. User explicitně odmítl v brainstormingu.

### Přístup C — Sekční landing + drill-down (ZVOLENO)

Každá velká sekce = landing dashboard (manažerský úvod) + operativa pod ním (list, detail). Cross-cut MIS = jen hlavní Dashboard. Komunikace/Intranet pryč do topbaru.

**Pro:**
- Jediný mentální model: **zoom level** (firma → sekce → list → detail). Žádný mode switch.
- IS a MIS splývají přirozeně přes drill-down.
- Komunikace přestává konkurovat Obchodu/Výrobě o pozornost.
- Odpovídá vzoru moderních enterprise UI (Linear, Shopify admin, Jira cloud).

**Proti:** 4 nové landingy + topbar/inbox refactor + reshuffle dashboardu + mock data overhaul = ~3-4 dny.

**Mitigation:** Jednotný `.s21-section-landing` CSS pattern a stejná mentální šablona: `[KPI pruh nahoře] + [hlavní signál 2-col block] + [odkaz na operativu]`.

## Rozhodnutá architektura (přístup C)

### Datový model — overhaul mock dat

**CASES (`CASES[*]` v `demo/crm-pripady.html` + extrakt do sdíleného `_shared.js`):**

Přepsat CASES tak, aby to byly **generické sales opportunities** pro **stejné klienty, které existují v ORDERS**. Vznikne natural lifecycle Obchod→Výroba.

Nová sestava CASES (5 základních, zachovává existující stage enum):

| ID | Název | Klient | Stage | Hodnota (Kč) | → ZAK-* |
|---|---|---|---|---|---|
| OP-2026-0045 | Fotovoltaika pro RD Lipová | Novákovi | won | 220 000 | **nová zakázka ZAK-2026-0155** |
| OP-2026-0043 | AI reporting pilot | Moravia Steel | negotiation | 180 000 | → existující ZAK-2026-0142 (po podpisu) |
| OP-2026-0041 | ERP→CRM integrace | Agro Slovácko | won | 312 000 | → existující ZAK-2026-0131 |
| OP-2026-0039 | Automatizace výkazů | Hradecká strojírna | won | 96 500 | → existující ZAK-2026-0139 |
| OP-2026-0037 | Rekonstrukce koupelny | Dvořákovi | negotiation | 180 000 | **nová zakázka ZAK-2026-0156** |

Nová pole v CASES:
- `firstContactAt: "DD. MM. YYYY"` — kdy první kontakt (pro case velocity KPI)
- `wonAt?: "DD. MM. YYYY"` — datum podpisu (pokud stage=won)
- `productionOrderId?: "ZAK-2026-NNNN"` — odkaz na navazující zakázku

**ORDERS (`ORDERS[*]` v `demo/zakazky.html`):**

Zachovat existujících ~10 zakázek. **Přidat 2 nové** (`ZAK-2026-0155 Fotovoltaika 8 kWp`, `ZAK-2026-0156 Rekonstrukce koupelny`) pro Novákovi/Dvořákovi. Všechny ORDERS dostanou nová pole:

- `plannedHours: number` — celkový plán hodin (sum existujících `operations[*].planned`)
- `realHours: number` — skutečně odvedeno (sum `operations[*].done`)
- `caseId?: "OP-2026-NNNN"` — odkaz zpět na případ, ze kterého vznikly

Pozn.: pole `plannedHours`/`realHours` jsou odvoditelné z operations ale uchováváme je snadno čitelná pro landingy.

**SMLOUVY (`CONTRACTS[*]` v `demo/dms-smlouvy.html`):**

**Nerewritujeme.** Pojištění + energie zůstávají jako „diverse contract examples" pro malou firmu. Univerzální: každá firma má mix smluv.

**Sdílený datový modul `_shared-data.js`:**

Nový soubor obsahující `CASES`, `ORDERS` + agregační helpery (`getActiveOrders()`, `getOpenCases()`, `getRiskScore(order)`, `getCaseByProductionOrder(zakId)`, apod.). Načítán skrz `<script>` před každou stránkou, co ho potřebuje (dashboard, obchod landing, vyroba landing, zakazky list, pripady list). Současné per-page datové konstanty se migrují sem.

### Sidebar — nový tvar

Nové pořadí sekcí:

```
(bez nadpisu)      Dashboard, Můj plán, Úkoly
OBCHOD             Přehled, Obchodní případy, Klienti, Osoby
VÝROBA             Přehled, Zakázky, Vykazování
LIDÉ               Přehled, Pracovníci, Docházka
DMS                Přehled, Smlouvy, Dokumenty, Automatizace / AI
```

Pozn.:
- Obchod první (sales je na začátku lifecyklu).
- První item každé velké sekce = „Přehled" (landing).
- **Komunikace + Intranet mizí ze sidebaru.** Stránky dostupné přes `/inbox` (unified) a direct URL (/nastenka, /kb).

### Sidebar komponenta — změna interakce (library change)

Dnešní `.s21-navsec__head` je **jeden `<button>` pro celý řádek** (titulek + chevron uvnitř). Nové chování:

- **Klik na titulek sekce (OBCHOD)** → navigace na její Přehled (`/obchod`).
- **Klik na chevron** → expand/collapse podsekce (stávající chování).

Implementace v `src/components/index.jsx`:

- Rozdělit `.s21-navsec__head` na dvě ARIA role: `<a class="s21-navsec__title" href="/obchod">OBCHOD</a>` + `<button class="s21-navsec__chev" aria-label="Rozbalit" aria-expanded>...</button>`.
- Chevron button má `aria-expanded` + `aria-controls`.
- Pro keyboard: titulek je link (Enter = naviguj), chevron je button (Enter/Space = toggle). Tab mezi nimi funguje nativně.
- Non-collapsible sekce (bez nadpisu — Dashboard/Můj plán/Úkoly) beze změny, zůstávají jak jsou.

### Topbar — Komunikace jako ambientní vrstva

**Dnes:** `Breadcrumbs | NotificationCenter | BrandToggle | ThemeToggle | Avatar`

**Nově:** `Breadcrumbs | InboxBell | NotificationCenter | BrandToggle | ThemeToggle | Avatar`

**`InboxBell` (nová library komponenta):**
- Umístěna v `src/components/index.jsx`, export jako `window.S21.InboxBell`.
- Props: `{ unread: number, onClick: () => void }`.
- Vizuálně: ikona `mail` + badge s počtem nepřečtených (barva primary pokud > 0, neutrální pokud 0).
- Rozdíl od NotificationCenter: NotificationCenter = systémové události (události z backendu — smlouva podepsaná, úkol dokončen). InboxBell = lidské zprávy (email, SMS, chat).
- Mock data count — hodnota se předá z `_shared.js` konstanty (`INBOX_UNREAD = 5` demo value).
- Klik → `window.location.href = '/inbox'`.

### `/inbox` — nová unifikovaná komunikace

Nová stránka `demo/inbox.html` která sjednotí dnešní `/email`, `/zpravy`.

**Layout:**
- `S.PageHeader` s titulkem „Inbox" + description „Email, SMS a interní zprávy na jednom místě".
- **`SegmentedControl: Email | Zprávy (SMS) | Interní chat`** nahoře.
- Pro každý segment: 2-pane layout (list vlevo, detail/preview vpravo). Na mobilu `s21-grid-main-aside` (stacking).
- Obsah segmentů:
  - Email: přenést mock data z `email.html` + stejný 3-pane styling (ale bez left folder sidebar — ten je nahrazen SegmentedControl).
  - Zprávy: přenést mock data z `zpravy.html`.
  - Interní chat: nový mock — 3 interní konverzace (Pavel O. ↔ Alena D., team Obchod, team Výroba).

**Hlavní UX prvek:** Každá zpráva má akci **„Napojit na"** — modal s picker klient / zakázka / smlouva / případ. Při výběru se zpráva uloží do logu dané entity.

**Zpětná kompatibilita existujících URL:**
- `/email` a `/zpravy` zůstávají jako soubory (nemažu). V `_shared.js` MAP je **přesměruji na `/inbox` + hash** (`/email` → `./inbox.html#email`, `/zpravy` → `./inbox.html#zpravy`). Kdokoliv s uloženým starým linkem skončí ve správném segmentu.

### Hlavní Dashboard — redesign

Nahradí dnešní 6 Poema tiles + Deník dne.

**KPI pruh (4 cross-cut signály):**
1. **Otevřený byznys** — počet aktivních cases + součet pipeline value (součet `CASES` kde stage not in {won, lost}).
2. **Běžící výroba** — počet aktivních zakázek + součet realHours × hodinovka (aproximace rozpracovanosti).
3. **Co pálí** — počet zakázek s `riskScore > threshold` (viz Výroba landing); warning/danger accent.
4. **Zdraví klientů** — počet smluv expirujících < 30 dní + ÁJA fronta (součet `CONTRACTS` kde `daysToExpiry < 30` + mock ÁJA pending count).

**Hlavní blok (2-col grid, `.s21-grid-main-aside`):**
- **Levý „Dnes rozhoduješ"** — manuálně kurátorovaný top 5 feed napříč sekcemi: nejbolestivější zakázka, největší vyjednávání v Obchodě, expirující smlouva, chybějící ÁJA schválení, úkol na dnes. Každá řádka má ikonu sekce, titulek, krátký meta, klik → relevantní detail.
- **Pravý „Aktivita napříč firmou"** — timeline posledních 24h: podepsáno case X, zakázka Y hotová, smlouva Z vytvořena, úkol dokončen. Hardcoded 6-8 položek.

**Spodní lifecycle banner — inline komponenta** (není library):
- Vizuální flow `Obchod → Výroba → Fakturace` třemi bloky:
  - **V jednání (Obchod):** count open cases / sum Kč hodnoty
  - **V realizaci (Výroba):** count active orders / sum Kč rozpracovanosti
  - **Dokončeno (Hotovo YTD):** count delivered orders / sum Kč fakturováno
- Mezi bloky šipka `→`. Každý blok klikatelný, navigace na příslušný list.
- Vizuální šablona: builder zvolí (horizontální 3 karty vs. funnel-like trojúhelník). Dok neuzavírá.

**Co zmizí z dashboardu:**
- 6 Poema KPI tiles (nahradí je 4 nové).
- Global search nestěhujeme v tomhle sprintu — **zůstává na dashboardu** jako dnes. Přesun do topbaru je samostatné budoucí rozhodnutí.
- Deník dne (4 bloky) **zůstává** jako dnes — přesun do /muj-plan je mimo scope tohohle sprintu.
- Pozn.: dashboard tím bude delší (KPI pruh + hlavní blok + lifecycle banner + global search + Deník dne). To je OK — stránka smí scrollovat.

### `/obchod` — nová Obchod landing

Nový soubor `demo/obchod.html`. Kompozice:

**KPI pruh (4):**
1. Otevřené případy (count ze stage not in {won, lost})
2. Hodnota pipeline (sum value stejné skupiny)
3. Konverze (% stage=won / total uzavřených za rok)
4. Case velocity (průměr `wonAt - firstContactAt` v dnech přes won cases)

**Hlavní blok (2-col grid):**
- **Levý: SalesFunnel** — 8 fází Poema Scénář 3, s počty a hodnotami. Komponenta se **přesune sem z `/obchod/pripady`**. V `/obchod/pripady` zůstane jen tabulka.
- **Pravý: „Vyžaduje tvou pozornost"** — top 5 cases: nejbližší deadline, nejvyšší hodnota, čeká na odpověď klienta dlouho. Weighted skórováno (podobný pattern jako Výroba rizikový list).

**Spodní operativa:** 
- Link `→ Všechny obchodní případy (12)` + inline mini-tabulka 5 nejnovějších cases (kód, klient, stage, hodnota).
- Vedle link `→ Klienti (8)` + mini-tabulka 5 recently active clients.

### `/vyroba` — nová Výroba landing

Nový soubor `demo/vyroba.html`. Kompozice:

**KPI pruh (4):**
1. Aktivních zakázek (count stav in {nabidka, realizace})
2. Hodnota rozpracovanosti (sum `realHours × hourlyRate` — mock hourlyRate = 1 500 Kč/h)
3. Po termínu (count `overdue === true`); danger accent
4. Průměrná marže aktivních (%)

**Hlavní blok (2-col grid):**

**Levý „Rizikový list TOP 5":**
- Weighted skóre = `overdueFactor × 4 + overHoursFactor × 3 + lowMarginFactor × 2 + missingDocsFactor × 1`.
  - `overdueFactor` = 1 pokud `overdue=true` jinak 0
  - `overHoursFactor` = 1 pokud `realHours > plannedHours × 1.1` jinak 0
  - `lowMarginFactor` = 1 pokud `margin < 15%` jinak 0
  - `missingDocsFactor` = 1 pokud `missingDocs=true` jinak 0
- Seřazeno descending podle skóre, zobrazeno top 5.
- Každá řádka: kód + název zakázky, klient, 2-3 červené flags (ikona + krátký štítek), tlačítko „Otevřít" (navigace na zakazka-detail).
- Prázdný stav: „Vše v normě 👍 — žádná zakázka v riziku."

**Pravý „Plán vs. realita heatmapa":**
- Tabulková vizualizace: řádky = aktivní zakázky, sloupce = operace (OP-01 až OP-NN).
- Každá zakázka má seznam operations (již existuje v mock datech `demo/zakazka-detail.html` — reuse pattern). Zakázky bez operations se zobrazí s 1 generickým sloupcem „Celkem".
- Buňka = barva podle stavu operace:
  - `empty` (bg: surface-muted, 0%)
  - `plan` (bg: primary-soft, 1-99%)
  - `done` (bg: success-bg, 100%)
  - `over-done` (bg: warning-bg, > 100% hodin)
- Hover na buňce = tooltip „OP-03 Mapování dat · 8/12 h · 67 %".
- Klik na řádek = otevři zakázku.
- **Mobile fallback:** horizontal scroll (table-layout: fixed na heatmapě; wrap v `overflow-x: auto`). Ne alternativní view.

**Spodní operativa:** Link `→ Všechny zakázky (10)` + mini-tabulka 5 nejhorších po termínu. Vedle link `→ Vykazování`.

### `/vyroba/zakazky` — úprava existující stránky

- **Odstranit SalesFunnel komponentu** (migrovaná do `/obchod`).
- **Nahradit chip filtry** „Vše / Sales pipeline / Výhra ve výrobě / Po termínu / Chybí podklady" za **„Co pálí" filtry:**
  - Vše (default)
  - Po termínu (`overdue=true`)
  - Přetažené hodinami (`realHours > plannedHours × 1.1`)
  - Nízká marže (`margin < 15%`)
  - Bez výkazu > 7 dní (mock field `lastLogDays > 7`)
- KPI tiles zůstanou (Aktivních / V běhu — přejmenovat „V realizaci" / Po termínu / Hodnota aktivních).
- Tabulka columns beze změny.

### `/lide` — nová Lidé landing (lightweight)

Nový soubor `demo/lide.html`.

**KPI pruh (4):** Celkem pracovníků, dnes v práci, na dovolené, nemocní.

**Hlavní blok (2-col grid):**
- **Levý „Fond hodin tento týden"** — seznam pracovníků s progress bars (odpracováno / plán 40h). Barva baru = zelená pokud 80-110%, žlutá pokud < 80%, červená pokud > 110%.
- **Pravý „Docházka dnes"** — kdo přišel (mock 4 lidi s časem příchodu + ikona kanceláře/vzdáleně), kdo je venku (lunch/meeting), kdo chybí (dovolená/nemoc).

**Spodní operativa:** `→ Všichni pracovníci (7)`, `→ Docházka tento měsíc`.

### `/dms` — nová DMS landing (lightweight)

Nový soubor `demo/dms.html`.

**KPI pruh (4):** Aktivních smluv, vyprší do 30 dnů (warning), nepodepsané (danger), dokumentů v DMS.

**Hlavní blok (2-col grid):**
- **Levý „Blížící se výročí smluv"** — top 5 smluv s nejbližším výročím / koncem fixace. Reuse pattern z `dms-smlouvy.html` AnnivBadge komponenty.
- **Pravý „ÁJA fronta"** — top 5 emailů z `demo/dms-automatizace.html` (čtu stejná mock data — vyextrahuju do `_shared-data.js`). Každá řádka: odesílatel, předmět, confidence badge, čas.

**Spodní operativa:** `→ Všechny smlouvy`, `→ Dokumenty`, `→ Automatizace / AI`.

### Obchod → Výroba handoff v akcích

- **Case detail (budoucí stránka — mimo scope tohohle sprintu):** na podepsaném case nabídne akci „Vytvořit zakázku" (otevře `/zakazky/nova`). Pro teď tahle akce neexistuje — case→zakázka vazba je jen v datech.
- **`zakazka-detail.html`** sekce „Údaje" dostane field „Vznikla z: [OP-2026-0045 Fotovoltaika pro RD Lipová]" jako klikatelný odkaz (vede na `/obchod/pripady` + hash k danému case).
- **`crm-pripady.html` list:** k won cases přidat badge „→ ZAK-2026-0155" (klik vede na detail zakázky).

## Co zbývá builderovi dovyřešit

Tyhle věci spec záměrně nerozhoduje:

- **Vizuální šablona sekčního landingu** — nový `.s21-section-landing` wrapper vs. kompozice z existujících `S.Section` + `S.KpiRow`. Builder vybere podle toho co vyjde cleaner.
- **Heatmapa buňka visual** — čtvereček/pruh/bar, přesná velikost. Builder navrhne; stačí že splní semantiku stavů.
- **Lifecycle banner vizuál na dashboardu** — 3 karty vs. funnel trojúhelník vs. chevron flow. Builder navrhne inline (není library).
- **Inbox stránka layout detaily** — avatary/ne, email preview rich/plain. Builder vyzkouší co lépe sedí.
- **Operations pro ORDERS bez operations** — některé existující zakázky nemají operations (hero metrics jsou spočítané). Builder doplní generic 3-5 operations tam, kde chybí, ať heatmapa funguje všude.

## Review focus (testovací kritéria)

Builder přidá k relevantním taskům tyto testy:

1. **Komunikace mizí ze sidebaru — ale je dohledatelná.** Test (Playwright): na jakékoliv stránce najdi element s `[aria-label*="Inbox"]` v topbaru. Klik otevře `/inbox`. Na `/inbox` ověř, že jsou 3 segmenty (Email, Zprávy, Interní chat).
2. **Sidebar klik rozlišení.** Test: na `/dashboard` klikni na element `.s21-navsec__title[href="/obchod"]` — očekávej navigaci na `/obchod` (nový landing, status 200, žádný console error). Separátně: klikni na `.s21-navsec__chev[aria-controls]` — očekávej toggle `aria-expanded` bez změny URL.
3. **Existující URLs fungují.** Test: iteruj přes všech 20+ klíčů v `_shared.js` MAP, načti každou URL, asserta HTTP 200 a `console.errors.length === 0`.
4. **Heatmapa na mobilu nepřetéká viewport.** Test: viewport 375, otevři `/vyroba`, assertuj `document.body.scrollWidth <= 375`. Heatmapa uvnitř má `overflow-x: auto`.
5. **Lifecycle banner čte z ORDERS/CASES.** Test: změň mock `CASES[0].wonAt = "yesterday"`, znovunačti dashboard, assertuj že „V jednání" count se snížil o 1. (Symbolický test — v praxi stačí vizuální verifikace Playwright screenshotem.)
6. **Obchod→Výroba link na zakazka-detail.** Test: otevři `/zakazky/131` (ZAK-2026-0131), v Údaje sekci najdi text „Vznikla z: OP-2026-0041". Klik otevře `/obchod/pripady` s hash #OP-2026-0041.

## Fáze (orientační členění pro plán)

Rozsah = project. Plán rozepíše do taskových PR. Fázování:

- **F1 — Datový model + sidebar infra:** `_shared-data.js` s `CASES`+`ORDERS` overhaulem (OP↔ZAK vazby, timestamps, hodiny). Nová `moduleNavSections` s „Přehled" items. Sidebar library change (klik titulek vs. chevron). InboxBell komponenta. Topbar změna. `/email`+`/zpravy` redirect na `/inbox`.
- **F2 — Landingy:** `/obchod`, `/vyroba`, `/lide`, `/dms`, `/inbox`. Postupně.
- **F3 — Dashboard redesign + Zakázky cleanup:** přepis `/dashboard` (4 KPI + hlavní blok + lifecycle banner, Deník dne a global search zůstává). Odstranění SalesFunnel z `/vyroba/zakazky`, výměna chip filtrů za „co pálí". Doplnění OP↔ZAK linků v zakazka-detail a crm-pripady.

Plán rozepíše.

---

Design doc v2 konec.
