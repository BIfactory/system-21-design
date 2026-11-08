# Polepim-manager fidelity migration plan

**Spec základ:** rozhodnutí 2026-11-08 — "ten design je strašně daleko od toho co máme v polepim manager; chci co nejvíce převzít 1:1 tam to funguje a je to otestováno PC i telefon". Dobré přírůstky z dema (topbar right corner s notifikacemi/mail) zachovat.

**Výchozí repos:**
- Zdroj designu: `/Users/hulin/3_Dev/reseni/polepim-manager/` (Next.js 16, Tailwind, žlutá+černá+grayscale)
- Cíl: `/Users/hulin/3_Dev/reseni/system-21-design/demo/*.html` (plain React + window.S21 UMD + tokens.css)

**PRD vazba:** stávající PRD `docs/superpowers/specs/2026-11-07-gui-prd-v1.md` zůstává platný co do role personas + obsah homů (5 persona homů, capacity plánování). Tenhle plán dotčuje **vizuální vrstvu + sidebar strukturu + styl screenů** — ne obsah / IA personas.

---

## Co se bere z polepimu 1:1

### Brand tokens
- Primary: **#FFCC01** (yellow) — tlačítka, aktivní sidebar pill, focus ring
- Ink: **#000000** (black) — text na yellow buttonu, text na white background
- Sidebar bg: **#000000** (solid black) — ne gradient
- Sidebar text: white + opacity klesá podle hierarchie (100 / 100-80 / 100-60 / 100-40)
- Surface: **#FFFFFF** (white)
- Grays: #FAFAFA / #F5F5F5 / #E5E5E5 / #404040 / #1A1A1A
- Font: Inter

### Sidebar vizuál
- w-64 (256px) fixed left, bg-black
- Logo top s divider border-b gray-700
- Global search input přímo v sidebaru (není v topbaru) — kbd ⌘K hint
- QR scanner + voice note ikona button pattern (yellow bg + black)
- Item padding `px-3 py-1.5`, rounded-lg, gap-2
- Active item = **yellow pill** (bg-yellow text-black font-semibold)
- Hover = bg-gray-900 overlay
- Section headers:
  - Plain = text-xs uppercase muted text (ne button), px-3
  - Iconed = button s gear + chevron, bg-gray-900/60 border
- Chevron rotate-180 na open
- Badges = red-500 circle, white text, [10px] bold tabular-nums
- Scrollbar thin 4px rgba(255,255,255,0.12)

### Sidebar struktura (per polepim/components/layout/sidebar.tsx:139-229)
1. **Top (bez title, s ikonama)**:
   - Dashboardy (icon dashboard)
   - Denní přehled výkazů (icon dailyReport)
   - Denní přehled zakázek (icon dailyReport)
   - Úkoly (icon tasks, badge openTasksCount)
   - Můj plán (icon myPlan)
   - Docházka (icon attendance)
   - Poznámky (icon notes, badge unroutedNotesCount)
2. **Provoz** (plain section, collapsible):
   - Zakázky
   - Plán výroby
   - Finanční plán
   - Vykazování
   - Reklamace
   - K fakturaci
   - Docházka (admin)
3. **Intranet** (plain section, collapsible):
   - Nástěnka
   - Moje školení (badge pendingTrainingsCount)
   - Knowledge base
   - Dokumenty
   - Školení (správa)
   - Onboarding šablony
4. **Nastavení** (iconed section, collapsible, admin-only):
   - Uživatelé
   - Role a oprávnění
   - Materiály
   - Operace
   - Šablony operací
   - Kategorie materiálu
   - Typy nepřítomností
   - Důvody odchylek
   - Checklist předávek
   - Kategorie KB / dokumentů / školení
   - Lokality GPS
   - Integrace a klíče (badge raynetFailedCount)

### Buttons
- Primary: bg-yellow text-black hover:brightness-95 (žádný box-shadow lift)
- Secondary: bg-white text-black border-gray-200
- Ghost: transparent text-black hover:bg-gray-100
- Danger: red-50 bg + red-700 text + red-200 border
- Sizes: sm (px-3 py-1.5 text-xs), md (px-4 py-2 text-sm), lg (px-6 py-3 text-base)
- rounded-lg, font-semibold

### Badges
- Rounded-full pill
- dot + text, px-2 py-0.5, text-xs font-medium
- color system: bg (color+22 alpha) + text (color) + border (color+55 alpha)

### Row component (polepim/components/zakazky/row.tsx)
- `<tr>` s `hover:bg-yellow/10 cursor-pointer`
- Click target full row, s guard na interactive children

### Mobile
- Fixed top-0 h-12 (48px) bg-black text-white
- Hamburger left, logo center, voice+QR right
- Drawer: w-72 max-w-85vw left, overlay bg-black/50 backdrop-blur
- Safe-area padding (pt + horizontal pro landscape)

### Nástěnka feed card
- Category-specific gradient bg (žlutá pro announcements, modrá pro news…)
- Category tag rounded-full inline
- Emoji dle kategorie (📢 📅 👏 📰)
- Date Czech locale "5. pro. 2026"

### Dashboardy landing
- PageHeader (title + description, sticky top, border-b)
- DashboardSection: title + subtitle + summary KPI grid + collapsible `<details>` detail
- KPI karta: white bg, border gray-200, rounded-xl, p-5

### Zakázky list
- PageHeader + filters bar
- Group chips (Pipeline / Výhra / Vše) link-style toggle
- SalesFunnel horizontal (bar chart stages)
- Table columns: name / client / raynetCode / status / finances / actions
- Mobile: card layout bg-white border rounded-xl

### Můj plán / Docházka
- Můj plán: list/table operací, workstation + operation + order + deadline
- Docházka: punch buttons + today events + monthly summary
- Empty states: žlutý tint box (bg-yellow/10 border-yellow/40)

---

## Co zachováváme z dema (polepim NEMÁ)

1. **Topbar s pravým rohem** — demo má useful set:
   - PersonaSwitcher (role switch — demo-specific, polepim má uživatele natvrdo)
   - Mail/Inbox bell (notifikace jednotlivých modulů)
   - Help icon
   - Theme toggle (light/dark)
   - Avatar/user menu
   
   Zachovat, ale restyle: bg-white + border-b gray-200, slim (h-14), pravý align. Nesmí soutěžit s černým sidebarem.

2. **Role-based dashboard shell** — stávající `ROLE_BODY` v `dashboard.html` (CEO / Obchodník / Vedoucí výroby / Asistentka / Pracovník home variants). Polepim nemá "home-per-role", má jednu `/dashboardy` stránku. Náš demo koncept personas je silnější — necháme.

3. **PersonaSwitcher komponenta** — pro rychlý demo switching rolí v topbaru.

4. **System21 brand logo** (BIfactory + SYSTEM 21 subtitle) v sidebaru — polepim má svoje "Polepim" logo. Pro náš demo brand "BIfactory / System 21" zůstává, ale v polepim-style frame (36px icon + text, divider border-b gray-700).

5. **Theme light/dark** — polepim má jen light. Náš demo má oba. Zachováme oba.

---

## Postup práce (sprinty)

### Phase 1 — Rebrand & shell (1 commit)
- `tokens/tokens.json` → regen `tokens/tokens.css`:
  - Primary `#FFCC01`
  - Primary-soft `rgba(255,204,1,0.1)` nebo yellow/10
  - Primary-text `#000000` (kontrast na yellow)
  - Ink `#000000`
  - Surface bgs stay similar
- Konvertovat `.s21-sidebar` z white+green na black+yellow (bundle.css):
  - Background black
  - Items white text
  - Active item = yellow pill
  - Hover = gray-900
  - Section headers = uppercase small muted
- `.s21-topbar` restyle: slim h-14, white bg, border-b, right-align actions, no competing color
- Mobile hamburger drawer už existuje (BottomNav z night/K) — polepim pattern je jiný (top bar hamburger). Rozhodnout: zachovat BottomNav mobile? Nebo předělat na polepim hamburger-top? → **rozhodnutí: zachovat obě — BottomNav = stále bar dole 4 ikony (polepim toto nemá a je to UX plus), top hamburger = otevře full sidebar drawer.**
- Tlačítka: `.s21-btn--primary` → yellow bg + black text
- Badge: rounded-full + dynamic color (už existuje)

**Commit msg:** `phase 1: polepim rebrand — yellow/black tokens, black sidebar, yellow active pill`

### Phase 2 — Sidebar restructure (1 commit)
- `src/components/index.jsx` moduleNavSections → polepim structure (top items s ikonami + Provoz + Intranet + Nastavení)
- Icony: inline SVG per polepim/components/layout/sidebar.tsx:15-91 (dashboard, tasks, myPlan, attendance, notes, dailyReport, user, logout)
- Collapsible plain section header (text-xs uppercase muted)
- Collapsible iconed section header (gear icon + chevron for Nastavení)
- DemoSidebar wrapper nemění API, jen `moduleNavSections` content
- Dotčené existující pages: změnit `active="/..."` prop k nové href strukturné

**Commit msg:** `phase 2: sidebar restructure — polepim functional grouping (Provoz / Intranet / Nastavení)`

### Phase 3 — Page content ports (postupné commity, modul po modulu)

Pořadí dle vlivu na UX (vyšší impact první):

**Sprint 3a — Core landing & daily**
1. `dashboard.html` → `/dashboardy`-style collapsible sections (zachovat role-based shell)
2. `zakazky.html` → polepim list pattern (filters + sales funnel + row hover yellow/10)
3. `nastenka.html` → polepim feed card pattern (gradients + emojis + Czech date)

**Sprint 3b — My work**
4. `muj-plan.html` → polepim list pattern
5. `dochazka` (new page nebo use hr-dochazka) → punch buttons + today events
6. `ukoly.html` → polepim pattern

**Sprint 3c — Operations**
7. Zakázka detail (zakazka-detail.html) → polepim detail layout
8. Plán výroby (use vyroba-kapacita.html) — refactor na polepim styling
9. Finanční plán (new page or _coming stub)
10. Vykazování (vykazovani.html) → polepim pattern

**Sprint 3d — Intranet**
11. Nástěnka post detail
12. Knowledge base (kb.html) → polepim list
13. Dokumenty (dms-dokumenty.html) → polepim
14. Školení / Onboarding (_coming stubs)

**Sprint 3e — Nastavení**
15. Uživatelé (hr-pracovnici.html rename)
16. Role (nastaveni.html subsection)
17. Materiály / Operace / Šablony (_coming stubs)
18. Lokality GPS / Integrace (_coming stubs)

### Phase 4 — Polish & verify (final)
- Full audit all pages desktop + mobile
- Role switcher still works
- Dark mode (polepim nemá — ponecháme lightf-only pro polepim pages? rozhodnout)
- Console errors clean

---

## Globální omezení (per celou migraci)

1. **Nekopírovat polepim Next.js router** — zůstáváme na plain React + HTML pages v `/demo`.
2. **Nekopírovat polepim backend logiku** — pouze vizuální kompozice + styling.
3. **Zachovat window.S21Data mock vrstvu** — polepim má DB, my máme mock.
4. **Czech grammar rules** (per feedback z dneška) — plurál helpers pluralLide / pluralDnu / pluralPripadu / pluralOtevrenyPripad.
5. **PRD sync** — každý commit co mění UI aktualizuje PRD change log.
6. **Žádné emoji v kódu** mimo případů kde polepim má explicitně (nástěnka kategorie).

## Rozhodnutí zapsaná do plánu (bez user interrupt)

- **Ruling: zachovat BottomNav + top hamburger drawer oba.** BottomNav je dobrý mobile UX plus z dema; polepim má jen top drawer. Varianty koexistují.
- **Ruling: zachovat topbar s pravým rohem.** Polepim nemá desktop topbar, demo ano — user explicitně chce zachovat. Styl: slim bg-white border-b, right-align actions.
- **Ruling: zachovat role-based dashboard shell.** Polepim má jednu dashboardy stránku per uživatele dle role; demo má více specifického per-persona. Náš demo je silnější, zachováme PersonaSwitcher + 5 home variant.
- **Ruling: zachovat dark mode toggle.** Polepim nemá, ale demo má. Zachováme — dark varianty tokens budou restyle v Phase 1.
- **Ruling: brandname BIfactory / SYSTEM 21** zůstává (ne "Polepim"). Polepim-fidelity se týká vizuálního jazyka, ne brand identity.

---

## Co zbývá builderovi

- Přesná color scale pro dark mode variant (yellow/black invertovat jak?)
- Jestli některé polepim komponenty (např. QR scanner button v sidebaru) mají v našem demo význam. Default: skrýt QR, zachovat "+" button jak teď.
- Routa `/dashboardy` dnes v demo neexistuje — zachovat `/dashboard` jako aktuální route a mapovat sidebar link na ni.

---

## Rollout pořadí (TL;DR)

1. **Teď (session 1):** plán + Phase 1 (rebrand + shell).
2. **Následující (session 2):** Phase 2 (sidebar restructure).
3. **Dále (sessions 3-6):** Phase 3a-e postupně modul po modulu.
4. **Finále (session 7):** Phase 4 polish + PRD finální sync.
