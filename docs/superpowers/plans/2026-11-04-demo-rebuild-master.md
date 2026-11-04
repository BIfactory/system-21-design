# System 21 Demo — master plán rebuild (polepim + poema mash-up)

**Datum:** 2026-11-04
**Status:** **k přečtení a schválení před implementací**. Žádný kód se neskládá, dokud user neřekne „jedeme".
**Autor:** Claude (na základě dvou hlubokých průzkumů polepim-manager + system21-poema-gui)

---

## 1. Proč rebuild

**Zpětná vazba z 2026-11-04:** demo je přeplácané a chaotické; opravy jednotlivých věcí problém neřeší, protože **nejde o kosmetiku, ale o neplánovaný roste.** Každá fáze dosud přidala vrstvu, které neseděla s dřívějšími. Čistá knihovna + 28 stránek navrchu bez společné koherence.

**Otočení přístupu:** vyjít z **dvou konkrétních produktů** — jeden produkčně běží (polepim-manager), druhý má vyzrálý product thinking (Poema features.md s 14 scénáři). Demo bude jejich **spojená, uklizená verze** — ne moje improvizace nad knihovnou.

**Pravidla, která teď platí (viz `memory/project_demo_strategy.md`):**
1. Žádný kód před schváleným plánem.
2. Modul = ucelený balíček. Nekoumat mezi commity.
3. Testování v Playwright před každým „hotovo".
4. Když přidávám, musím něco ubrat.
5. Dlouhá session > rychlá session.

---

## 2. Co kde je — klíčová fakta ze dvou průzkumů

### 2.1 polepim-manager (produkční, hluboké)

| Modul | Stav | Co nejlépe |
|---|---|---|
| Zakázky | kompletní, mnohavrstvové | sales funnel, status badges, mobile KPI row, deadline-aware badges, quick-log modal |
| Vykazování práce | kompletní | timer widget, merged timeline (práce+materiál+ad-hoc), material revert přes audit log |
| Docházka | kompletní | punch buttons s hint systémem, GPS gate badge, vacation balance stacked bar, PDF výkaz |
| Intranet (Nástěnka + KB) | kompletní | pinned hero cards, markdown excerpt, role-based visibility, emoji reactions |

**Společné building blocks z polepim:** Badge, PageHeader, Modal, EmptyState, FilterPill, Button, formatCzk/formatDateTime/formatDecimalToTime, internalStatusLabel, soft-delete+audit pattern.

### 2.2 system21-poema-gui (skelet s dospělou product dokumentací)

**Implementace: 23 souborů, ~600 řádků, vše placeholder.** Všechny stránky jsou `PageHeader + EmptyState`. Nic reálného.

**Hodnota: product thinking.** `docs/features.md` nese 14 scénářů konsolidovaných ze schůzky 25. 9. 2026 + screen inventář. **Mental model** je zralý:

- **Family-first CRM.** Rodina/firma = top-level, osoby jsou členové. Child zakládající vlastní rodinu = nová top-level položka, historické smlouvy zůstávají u rodičů.
- **Rodné číslo = global unique ID.** Napříč všemi osobami, rodinami, firmami. Prohlédnutí + lookup klíč.
- **Contract PK = pojistník + číslo smlouvy.** Ne customer-centric, pojistník-centric.
- **No roles.** Všichni 3 lidé vidí vše, editují vše. Žádný permission UI.
- **Výročí smluv se zadává ručně**, ne auto z data smlouvy. Dodatek **nemění** výročí.
- **Poznámka** = velké, jediné, neomezené textové pole. Konzistentně na každé kartě. Žádný rich text.
- **AI nikdy nevytváří entity sama.** Jen navrhne s confidence %, člověk schvaluje.
- **Email = dokument**, ne komunikační centrum. Žádný compose/forward UI.
- **Reporting v aplikaci, ne v Power BI.**

### 2.3 Kde je naše současné demo oproti tomu

- Multi-brand knihovna ✓ (zůstává, dobře se do toho hodí)
- Komponenty: 60+ ✓ (většina dobrá, pár přebytečných)
- 28 stránek ✓, ale **bez jednotícího product thinkingu** — každá si vymýšlí svoji strukturu
- Žádný konzistentní mental model (CRM je víc "generic enterprise" než Poema family-first)
- Mnoho vrstev AI/notifikací/widgetů nad vším → přeplácanost

**Co z existujícího demo udržíme** (zbytek se přeskládá):
- Multi-brand tokeny + brand overlay (`bifactory` vs. `demo-alt`)
- Design-system komponenty: AppShell, Sidebar, TopBar, PageHeader, PageBody, Badge, EmptyState, Modal, Toast, Tabs, DataTable, FilterBar, SearchInput, ChipGroup, Button
- Dobře zpracované showcase stránky: `/muj-plan` (model čistoty), `/crm-klient-detail` (model detail page), `/oznameni` (model grouped list), `/login` (model focused form)

**Co se přeskládá** (= bude se přepisovat):
- Dashboard — podle Pavlova mental modelu z Poema Scénáře 1
- CRM (Klienti, Osoby, Obchodní případy) — family-first podle Poema
- DMS (Smlouvy) — insurance + energy split, anniversary-first sort
- DMS Automatizace / AI — confidence badges, status tags, žádné carde AI
- Zakázky + detail — 1:1 z polepim, včetně sales funnel + kvík-log + mobile KPI
- Vykazování práce — 1:1 z polepim, merged timeline
- Docházka — 1:1 z polepim, punch buttons + vacation
- Intranet (Nástěnka, KB) — 1:1 z polepim, pinned + markdown

**Co se odstraní** (= přebytečné vzory, co nejsou v žádném zdroji):
- Floating AI FAB (už odstraněno)
- Druhé a třetí AISuggestion bannery
- Pokusy o AI chat panel na každé stránce
- NotificationCenter dropdown (necháme zvonek s counterem, ale **ne 10 mock notifikací přes všechny moduly** — jen 2-3 skutečně smysluplné)
- Reporty stránka jako je — nahradí se Poema Scénář 13 (provizní report) v příštím kole
- Dokončené k fakturaci jako samostatná stránka — stane se tabem na Zakázkách (polepim pattern)

---

## 3. Master plán: moduly, pořadí, co kde

**Pořadí** = od infrastruktury k funkcím. **Odhadnutá velikost**: S (½ dne), M (1 den), L (2 dny). User si může krátit.

### Modul A: Vyčistit podlahu (předpoklad všeho) — M

**Co:**
- Odstranit stránky, které nedělají nic (nebo se nahradí): současné `index.html`, `dashboard.html`, `crm-klienti.html`, `crm-klient-detail.html`, `crm-osoby.html`, `crm-obchodni-pripady.html`, `dms-smlouvy.html`, `dms-smlouva-detail.html`, `dms-dokumenty.html`, `dms-automatizace.html`, `ukoly.html`, `zakazky-dokoncene.html`, `reporty.html` — do `demo/_old/` jako archiv (ne smazat, pro referenci).
- Zachovat: `login.html`, `muj-plan.html`, `oznameni.html`, `nastaveni.html`, `nastenka.html`, `kb.html`, `hr-pracovnici.html`, `hr-dochazka.html`, `email.html`, `zpravy.html`, `showcase.html`.
- Z knihovny odstranit (s commit vysvětlením): `AISuggestion`, `AIInputHelper`, `AIPanel`, `AIBadge` — nahradíme jedním dedikovaným AI pattern v Automatizaci (viz Modul F). Pokud nevadí, že Poema submodule dostane prune, odstraníme; jinak zůstanou, jen je nikde nepoužijeme.
- `moduleNavSections` revize: méně položek, čistší hierarchie (viz 3.1 níže).
- Simplifikovat DemoTopBar: zvonek (notifikace) + brand toggle + theme toggle + avatar (s profilem + logout). **Settings icon do avatar menu**, ne separátně.

**Nice-to-have:** jeden `demo/_404.html` placeholder pro nedemonstrované stránky (čistší než redirect na dashboard).

**Výstup:** repo bez starých přeplácaných stránek, čistý sidebar, lehký topbar.

### 3.1 Nová struktura menu (sidebar)

Založeno na polepim top-level + Poema CRM/DMS strukture. **Žádné dekorace, jen moduly, které budou v demu funkční.**

```
Dashboard                    (Poema Scénář 1)
Můj plán                    (zachovat existing)
Úkoly                       (jednoduchý — polepim má prostý model)

— Obchod                    (collapsible)
    Zakázky                 (polepim 1:1)
    Vykazování              (polepim 1:1)
    [dokončené = tab v Zakázky, ne separátní stránka]

— CRM                       (collapsible)
    Klienti                 (Poema family-first)
    Osoby                   (Poema, cross-entity person directory)
    Obchodní případy        (Poema Scénář 3)

— DMS                       (collapsible)
    Smlouvy                 (Poema insurance + energy split)
    Dokumenty               (polepim-ish file view, ale s Poema Azure Blob mental)
    Automatizace / AI       (Poema Scénář 4.3 + 5)

— Komunikace                (collapsible)
    Email                   (Poema: dokument proxy, ne compose UI)
    Zprávy (SMS)            (zachovat existing jako je)

— HR                        (collapsible)
    Pracovníci              (polepim light)
    Docházka                (polepim 1:1)

— Intranet                  (collapsible)
    Nástěnka                (polepim 1:1 s pinned + markdown)
    Knowledge base          (polepim 1:1)
```

**Co odpadá** z existujícího menu: `Analýzy › Reporty` (odkládá se), `Obchod › Dokončené k fakturaci` (→ tab v Zakázkách).

---

### Modul B: Zakázky (polepim 1:1) — L

**Odkud:** polepim `/app/(app)/zakazky/*`
**Proč tenhle modul prvně:** je nejbohatší v polepim a user ho výslovně chce 1:1. Zakázky táhnou polovinu ostatních modulů (Vykazování visí na nich, Obchodní případy ústí do nich).

**Obrazovky:**
1. **`/demo/zakazky` — list**
   - Filter skupiny: Sales pipeline | Výhra ve výrobě | Vše (chipy)
   - Faceted filter: status, type, search
   - Sort: název / klient / vznik / status
   - Desktop tabulka: Název · Klient · Vznik · Stav · Plnění (%) · Cena · Marže · Akce (⏰ log + ⋯)
   - Mobile card: název + KPI řádek (Vznik · Plnění% · Cena) + color-coded completion badge
   - Deadline-aware badge (⚠ po termínu)
   - Admin/sales only: `SalesFunnel` widget nahoře (už máme v knihovně)
   - Pagination
2. **`/demo/zakazky/zak-131` — detail**
   - Hero: číslo + název, stav badge, akce (Vykázat primární, ⋯ sekundární)
   - Tabs: Plán · Realizace · Nástěnka · Dokumenty · Fotky
   - `Plán` = operace + materiál + ceny tabulky (version picker V1/V2)
   - `Realizace` = merged timeline (práce + materiál + ad-hoc) + per-operation souhrn
   - `Nástěnka` = komentáře + aktivita feed
   - `Dokumenty` = AttachmentList + FileUploadZone
   - `Fotky` = grid obrázků
   - **Žádný AI FAB. Žádné 4 tlačítka v hero.**
3. **Tab „Dokončené k fakturaci"** uvnitř `/demo/zakazky` (filter preset, ne samostatná stránka).

**Komponenty, co potřebujeme nově** (nebo ověřit že máme):
- `SalesFunnel` — máme
- `QuickLogModal` → znovu použijeme `QuickActionModal` s log-time formem
- `CompletionPercentBadge` — nová maličká komponenta (green/orange/red podle %)
- `DeadlineRiskBadge` — nová maličká (red když po termínu, orange do 7 dnů)
- `MobileOrderCard` — polepim pattern, vlastní stylování nebo rozšíření `EntityCard`

**Mock dataset:** 8–12 zakázek, mix stavů (new/quoted/in_progress/done/overdue), 3 pro detail (chceme min. 2 „in progress" s operacemi, 1 done pro fakturaci).

**Jediný bod kompromisu vs. polepim 1:1:** Raynet integrace (externí CRM) — my nemáme backend, takže stavy jsou mock, status badge barvy a labels převezmeme, ale „Odeslat do Raynetu" tlačítko tam nebude.

**Playwright testy před commit:**
- Filter chipy skutečně filtrují tabulku.
- Klik na řádek otevře detail.
- Tabs na detailu přepínají obsah (ne jen aria-selected).
- Mobile (375px) ukazuje KPI row místo tabulky.
- Dark + demo-alt brand kombinace čitelné.

---

### Modul C: Vykazování práce (polepim 1:1) — M

**Odkud:** polepim `/app/(app)/vykazovani/*`

**Obrazovky:**
1. **`/demo/vykazovani/zak-131` — denní práce na zakázce**
   - Form: Hodiny / Operace / Poznámka / Deviation reason (volitelné)
   - Timer widget (Start/Stop) — ikona plays/pause
   - Form: Materiál (SearchSelect z catalog mock dat) + množství + auto-price
   - Form: Ad-hoc costs (type: doprava/služba/materiál/jiné)
   - **Merged timeline dole:** chronological feed (práce + materiál + ad-hoc), last 20, s ikonami podle kindu, delete button jen pro today's entries
2. **`/demo/vykazovani` — denní přehled**
   - Toggle: "Moje" vs. "Tým"
   - Timeline se všemi záznamy dne (merged)
   - Součty: hodiny / náklady / počet logů

**Komponenty nové:**
- `TimerWidget` — nová, start/stop s animací ticking
- `WorklogTimeline` — merged timeline rendering (nebo rozšíření existujícího `Timeline`)
- `MaterialPicker` — SearchSelect specializovaný (ikona + název + unit + price per unit)

**Mock dataset:** 3 zakázky s operacemi, ~30 worklog entries, 15 material entries, 8 ad-hoc.

**Nice-to-copy (polepim):**
- Timer wall-clock precision (startedAt + endedAt)
- Material revert (undo button na material entry → mock toast "Zrušeno")
- Deviation reason + comment pro time overages

**Playwright:**
- Timer start/stop funguje, zobrazuje uplynulý čas.
- Material picker filtruje, po výběru auto-vyplní cenu.
- Delete worklog entry zmizí z timeline.

---

### Modul D: Docházka (polepim 1:1) — M

**Odkud:** polepim `/app/(app)/dochazka/*`

**Obrazovky:**
1. **`/demo/dochazka` — zaměstnanec**
   - Hero: `PunchButtons` — Příchod / Odchod / Oběd out/in / Doktor out/in / Trip out/in
   - Hint systém: "last was departure → suggest arrival"
   - GPS gate badge: "V kanceláři" (success) nebo "Mimo lokalitu" (warning) + reason field
   - Dnes: timeline příchodů/odchodů + delete icon (jen pro today)
   - KPI: Odpracováno / Fond / Přesčas / Zbývá dovolené
   - Vacation request form: date range + type + reason → submit vyvolá Toast "Žádost odeslána"
   - Vacation balance **stacked bar** (approved / pending / remaining — barevný)
2. **`/demo/dochazka/admin` — admin view** (volitelné — jako tab)
   - List zaměstnanců + status (přítomen/nepřítomen/dovolená) + pending requests count
   - Approve/reject modal (destructive = reject)

**Komponenty nové:**
- `PunchButtons` — velké hero tlačítka s ikonou + label
- `VacationBalanceBar` — stacked progress bar, 3 segmenty
- `GPSGateBadge` — ikona pin + text

**Mock dataset:** 5 zaměstnanců, 1 týden punch logů, 3 vacation requests (1 approved, 1 pending, 1 rejected).

**Nice-to-copy:**
- Context-aware punch hint
- PDF výkaz link (mock — tlačítko "Stáhnout PDF" vyvolá Toast)
- Delete jen pro today's records

**Playwright:**
- Klik na Příchod → přidá entry do timeline, mění hint pro další akci.
- Vacation form submit → Toast + form reset.
- Admin: approve/reject zobrazí správný Modal.

---

### Modul E: Intranet (Nástěnka + KB) — M

**Odkud:** polepim `/app/(app)/nastenka/*` + `/app/(app)/kb/*`

**Obrazovky:**
1. **`/demo/nastenka` — feed**
   - Filter pills (horizontal, scrollable on mobile): Vše · Oznámení · Událost · Pochvala · Zprávy (s counts)
   - **Pinned hero cards** (max 2) — gradient bg, larger, bordered
   - Grid feed pod tím (3 col desktop, 1 col mobile)
   - Emoji reactions na kartě + komentáře count
   - Create button → modal (v demu stačí Toast "Vytvořeno")
2. **`/demo/kb` — knowledge base**
   - Levý sidebar: kategorie (Onboarding · Procesy · Produkty · IT) + search
   - 2-col grid článků (title + author + date + reading time + tags)
   - Článek detail: `/demo/kb/jak-nastavit-brand` — markdown rendered

**Komponenty nové:**
- `PinnedPostCard` — rozšířený `EntityCard` s accent gradient
- Markdown rendering — jednoduchá (headings, list, code, bold, italic, link). Buď inline funkce nebo lehký `marked` import. Rozhodnu v implementaci.

**Mock dataset:**
- Nástěnka: 4 posts (2 pinned Důležité, 1 Školení, 1 Pochvala)
- KB: 10 článků, 4 kategorie

**Nice-to-copy:**
- Pinned hero vs. běžný card
- Markdown excerpt (truncate + strip markup) pro card preview
- Role-based visibility — my role nemáme, takže NEkopírujeme

**Playwright:**
- Filter pills skutečně filtrují grid.
- Klik na KB kategorii změní seznam.
- Klik na článek otevře detail s markdown.

---

### Modul F: CRM (Klienti, Osoby, Obchodní případy) — L

**Odkud:** mental model Poema (features.md Scénáře 2, 3), vlastní implementace podle Poema decisions.

**Obrazovky:**

1. **`/demo/crm/klienti` — list rodin + firem**
   - Tabs: Rodiny · Firmy · Všichni (counts)
   - Filter: stav aktivní/pasivní, segment, kraj
   - Desktop DataTable: Jméno · Typ · # smluv · Poslední kontakt · VIP badge
   - Mobile: EntityCard grid
   - Primární CTA: `+ Nový klient`

2. **`/demo/crm/klienti/novakovi` — detail rodiny**
   - Hero: název + typ (Rodina/Firma) + VIP badge + kontakt info
   - Hlavní kontakt (osoba) karta
   - Členové rodiny — EntityCard grid
   - Timeline DMS dokumentů
   - Pravá sidebar (RelationsSidebar — máme): Open cases · Tasks · Last contacts
   - **Poznámka** — velké textarea, neomezené znaky, prominent (vlastní sekce)
   - Rodné číslo prominentně v header (ne hluboko v meta)

3. **`/demo/crm/osoby` — directory**
   - Cross-entity: všichni lidé (members of families + company contacts + other)
   - Primary sort: podle rodného čísla (demonstruje PK), filter podle role
   - Row: Jméno · Rodné číslo · Rodina/Firma · Telefon · Email · Role

4. **`/demo/crm/obchodni-pripady` — case list**
   - Pipeline visualization (SalesFunnel: Poptávka → Nabídka → Vyhodnocení → Smlouva → Podepsáno)
   - Desktop tabulka: Název · Klient · Stav · Hodnota · Deadline · Owner
   - Filter: stav, owner, klient

5. **`/demo/crm/obchodni-pripady/pp-45` — case detail**
   - Hero: název + state badge + klient link
   - Step history timeline (auto-logged by state changes)
   - Attached emails (cards with sender/subject/snippet + attachment count)
   - Attached offers (file links)
   - Current action: "Čekáme na podpis klientem" (contextual summary)

**Komponenty nové:**
- `BirthNumberField` — formatted display (`111222/3333`)
- `NoteBlock` — velké textarea s auto-grow, clear focus styling. Nezávislé od `Field` protože má specifický vzhled (expanded, dedicated section).
- `CaseStepTimeline` — vylepšená `Timeline` s step indicators

**Mock dataset:**
- 8 rodin (Novákovi, Dvořákovi, Procházkovi, Svobodovi, Krejčí, Horákovi, …), 3 firmy (Moravia Steel, Agro Slovácko, Hradecká strojírna)
- ~30 osob napříč, všechny s rodným číslem
- 7 open obchodních případů v různých stavech pipeline

**Decisions z Poema** (viz features.md):
- Family top-level, osoby jako členové
- Rodné číslo global ID
- Pojistník as contract key (bude relevantní pro Modul G)
- No roles — nezobrazovat "Assign to" ani "Edit permissions"
- Poznámka velká a jediná

**Playwright:**
- Filter tabs skutečně filtrují.
- Klik na rodinu otevře detail.
- Změna poznámky → auto-save Toast.
- SalesFunnel na obchodních případech klikatelně filtruje.

---

### Modul G: DMS Smlouvy (Poema insurance + energy split) — L

**Odkud:** Poema features.md Scénář 4

**Obrazovky:**

1. **`/demo/dms/smlouvy` — list**
   - **Default sort: podle výročí (nejbližší první)** — Poema klíčové rozhodnutí
   - Tabs: Aktivní · Čeká na podpis · Neaktivní · Všechny
   - Filter: komodita (Pojištění / Energie), pojišťovna/dodavatel, klient
   - Row: Číslo · Produkt · Pojistník/Zákazník · Výročí (⚠ do 30 dnů) · Pojistné/Cena · Stav badge
   - Badge "⚠ Výročí za 14 dnů" (red) nebo "✓ Aktivní" (success)

2. **`/demo/dms/smlouvy/sm-117` — insurance detail**
   - Hero: číslo + produkt + pojišťovna + stav badge
   - Hlavní sekce pro insurance (všechna pole z features.md):
     - Pojistník · Produkt · Pojišťovna · Přes · Počátek · Výročí · Deadline · Pojistné · Frekvence · Lhůtní pojistné
   - **Poznámka** sekce
   - Odkazy: finální smlouva PDF (klik → Toast "Stažení…"), ceník PDF
   - Linked úkol s deadline
   - Right sidebar: Historie (verze/dodatky), Změny stavu timeline

3. **`/demo/dms/smlouvy/sm-205-energie` — energy detail**
   - Hero: číslo + "Energie" badge + komodita (Elektřina/Plyn)
   - Jiný set polí: Zákazník · Datum narození/IČ · E-mail · Portál access
   - **Odběrná místa** sekce (N:1): kód · EAN · adresa · distributor · sazba · FVE · spotřeba
   - **Údaje o smlouvě energie**: dodavatel · podpis · počátek · konec · termín · tarif · ceník
   - Historicky první/poslední/předposlední smlouva timeline (Scénář 10 pattern)

**Komponenty nové:**
- `AnniversaryBadge` — dny do výročí s barvami (red ≤30, orange ≤90, neutral jinak)
- `OdbMistoCard` — specializovaná karta pro odběrné místo (EAN/adresa/sazba)

**Mock dataset:**
- 12 insurance smluv (různé pojišťovny Allianz/UNIQA/ČPP/Generali, různé výročí)
- 4 energy smlouvy (2 elektřina, 2 plyn, různí dodavatelé ČEZ/innogy)
- 3 "čeká na podpis" pro demonstration Scénáře 8

**Poema decisions:**
- Výročí a konec fixace ručně zadané
- Dodatek NEMĚNÍ výročí
- Insurance vs. energy = **jiné schema**, ne jedna karta s podmíněnými poli — separate detail templates

**Playwright:**
- Default sort = nejbližší výročí nahoře
- Filter komodita přepíná insurance/energy řádky
- Klik na insurance řádek otevře **insurance detail template**
- Klik na energy řádek otevře **energy detail template**

---

### Modul H: DMS Automatizace / AI (Poema Scénář 4.3, 5) — M

**Odkud:** Poema features.md

**Obrazovky:**

1. **`/demo/dms/automatizace`**
   - Dashboard-like top: 4 KPI (Automaticky zpracováno / Čeká na kontrolu / Nezpracovatelné / Confidence avg)
   - **Žádný AI chat panel na stránce.** Žádný fialový FAB.
   - **Kontrolní fronta** = DataTable: Odesílatel · Předmět · Datum · Extrahovaný pojistník · Confidence % · Status badge · Akce
   - Sort: status (needs review první), confidence (lowest první), date (newest první)
   - Klik na řádek → drawer vpravo s detail:
     - Full email (odesílatel, předmět, body)
     - Přílohy (list s typem — smlouva/ceník/podmínky/plná moc)
     - **Extracted fields s confidence badge per field** (green >0.85, yellow 0.7-0.85, red <0.7)
     - Akce: Schválit · Opravit · Odložit · Označit jako nezpracovatelné

**Komponenty nové:**
- `ConfidenceBadge` — mini pill s % a barvou podle prahu
- `ExtractedFieldsTable` — klíč-hodnota se confidence per řádek

**Mock dataset:**
- 15 emailů ve frontě, mix 3 statusů, různé confidence hodnoty
- 1 email s 3 přílohami (smlouva+ceník+podmínky) pro demo Scénáře 7

**Co se NEDĚLÁ** (podle Poema decisions):
- Žádné auto-create entities
- Žádný approve workflow s více kroky
- Žádný AI chat na stránce
- Jen jedna akce po jednom emailu, pak další

**Playwright:**
- Filter podle status filtruje tabulku
- Klik na řádek otevře drawer
- Confidence badges mají správné barvy

---

### Modul I: Dashboard (Poema Scénář 1 — sloučené s polepim KPI patterns) — M

**Odkud:** Poema features.md Scénář 1 = závazná struktura

**Obrazovka `/demo/dashboard`:**

1. **Greeting:** "Dobré ráno, Lubomíre" (contextual podle času + user name)
2. **6 stat tiles ve striktním pořadí** (Poema):
   - Klienti (2 čísla: Rodiny / Firmy)
   - Smlouvy (2 čísla: Tento měsíc / Celkem)
   - Otevřené příležitosti
   - ÁJA kontrola (DMS review queue count)
   - Nepodepsané smlouvy
   - Objem zakázek (2 čísla: Minulý měsíc / Tento měsíc)
3. **Global search** box (Poema Scénář 1.3) — fuzzy přes klienty/smlouvy/zakázky. V demu: SearchInput + mock výsledky dropdown.
4. **Deník dne** — 4 sub-bloky (Poema):
   - DMS review fronta (count + odkaz na automatizaci)
   - Zakázky, které se pohnuly (list ~3)
   - Úkoly s deadline dnes (list ~3)
   - Expirace smluv do 30 dnů (list ~3)

**Co z toho NENÍ:** žádný AI banner, žádné QuickActions mřížka (6 akcí → podle Poema nejsou), žádný floating FAB. Čistý dashboard-as-overview.

**Mock dataset:** sladěný s ostatními moduly tak, aby čísla seděla (např. „Klienti" tile = 8 rodin + 3 firmy = 11; „Otevřené příležitosti" = 7; atd.).

**Playwright:**
- Global search dropdown se otevře po psaní.
- Odkaz z ÁJA kontrola skočí na `/demo/dms/automatizace`.
- Deník dne items jsou klikatelné na příslušné detail stránky.

---

### Modul J: Dokumenty (DMS files, lightweight) — S

Zachovat existující `dms-dokumenty.html` strukturu (folder tree + file list + upload), jen:
- Uklidit KPI nahoru (žádné overdone accents)
- Tagy per soubor podle typu (smlouva / faktura / škoda / šablona)
- Klik na soubor → Toast "Otevírá se…" (mock PDF preview)

**Mock dataset:** 20 souborů napříč kategoriemi.

**Playwright:**
- Folder tree klik filtruje seznam.
- Upload zone funguje (přijme drag, zobrazí progress, hotovo).

---

### Modul K: Email + Zprávy — S

Email: ponechat existující three-pane layout, jen přenastavit mental na "dokument proxy" (odstranit compose UI — žádné "Nová zpráva" ve velkém; jen "Odpovědět" na otevřeném emailu).

Zprávy (SMS): ponechat jak je, žádné změny.

**Žádný backend-integration demo.** Jen frontend mental.

---

### Modul L: HR (Pracovníci) — S

Zjednodušit existující stránku. Odstranit zbytečné detailní sloupce. Mělo by to být krátký staff directory.

### Modul M: Úkoly — S

Zjednodušit existující ukoly.html. Poema ani polepim nemá „úkoly" jako hlavní modul — oba je mají jako proxy na zakázce / smlouvě / případu. V demu zachováme samostatnou stránku, ale **jednoduchou**: list, filter, mark done.

### Modul N: Můj plán, Oznámení, Nastavení, Login — žádná změna

Všechny jsou v agent reportu označené jako "modely čistoty". Nechat být.

---

## 4. Časový rozpis a pořadí implementace

**Session 1 (dnes, pokud chceš jedeme hned):**
- Modul A — vyčistit podlahu (M)
- Diskuse o plánu: potvrdit že sedí, ladění detailů

**Session 2 (den):**
- Modul B — Zakázky (L) — polovina plus Playwright

**Session 3 (den):**
- Modul B — dokončit
- Modul C — Vykazování (M)

**Session 4 (den):**
- Modul D — Docházka (M)
- Modul E — Intranet (M)

**Session 5 (den):**
- Modul F — CRM (L) — polovina

**Session 6 (den):**
- Modul F — dokončit
- Modul G — DMS Smlouvy (L) — polovina

**Session 7 (den):**
- Modul G — dokončit
- Modul H — Automatizace (M)

**Session 8 (den):**
- Modul I — Dashboard (M)
- Moduly J/K/L/M — úklidy (S, S, S, S)
- Final review + Playwright pass přes všechny stránky

**Celkem:** cca 8 sessions = týden kvalitní práce (± 2 sessions podle feedbacků).

**Mezi každou session bych uložil stav do memory (co hotovo, co dál)** — i kdyby mi dříve než za týden došel kontext, další session plynule naváže.

---

## 5. Co teď potřebuju od tebe

**1. Plán ti sedí?**
- Sedí priority modulů (Zakázky → Vykazování → Docházka → Intranet → CRM → DMS → Automatizace → Dashboard → úklidy)? Nebo chceš jinak?
- Sedí obsah jednotlivých modulů? Je něco klíčového, co by chybělo?
- Jsou nějaké věci, které jsem spoč/utro z Poemy navzdory decisions tam napsaným? (Např. **„no roles"** — kdybychom za pár měsíců chtěli ukázat demo zákazníkovi, který role chce, mění to plán?)

**2. Co archivovat vs. mazat?**
- Existující stránky, co budu přepisovat, chci přesunout do `demo/_old/`. **Kdybys souhlasil**, budeme mít referenci pro případ „chci se vrátit", ale v `showcase.html` je už neuvidíš. Sedí?

**3. Co s AI komponenty v knihovně?**
- `AISuggestion`, `AIInputHelper`, `AIPanel`, `AIBadge` — v novém plánu jsou nepoužívané (kromě možná `AIBadge` v Automatizaci). **Chceš je odstranit z knihovny?** Nebo nechat jako "dostupné, kdyby později".
  - **Můj názor:** nechat — nic nestojí. Poema submodule by jinak dostal prune commit.

**4. Timing.**
- 8 sessions je horní odhad. Můžu si vybrat tempo — 4 dny s denními commits, nebo roztáhnout do 2 týdnů s pauzami. Napiš, co ti sedí.

**5. Dnes.**
- Pokud plán odsouhlasíš, mohu hned začít **Modulem A (úklid podlahy)** — to je ~2 hodiny, bez rizika. Výsledek dnes v browseru uvidíš jako "prázdnější, čistší kostra připravená na přestavbu". Nebo si plán chceš nejdřív v klidu přečíst a napsat zítra.

---

## 6. Co ten plán nedělá (abychom byli na jedné lodi)

- **Nejde o 1:1 import kódu z polepim-manager.** Polepim má Next.js + Drizzle + Server Actions; my máme plain React JSX v `window.S21`. **Vzory, komponenty, data model a UX decisions** převezmeme, ne kód. Mock data v JS inline.
- **Nejde o 1:1 kopii Poema-GUI.** Tam není co kopírovat — všechno je placeholder. Bereme **product thinking** (14 scénářů + decisions), ne implementaci.
- **Není tam žádný backend integration.** API fetch, Server Actions, real-time updates = nic z toho. Všechno mock v JS.
- **Není v tom i18n.** Čeština only, jako Poema.

---

**Konec plánu. Čekám na tvůj názor.**
