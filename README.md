# System 21

Design system pro aplikace BIfactory: tokeny (barvy, písmo, rozestupy), React komponenty a brand manuál. Pevná je **struktura** aplikace (levé menu, horní lišta s drobečky, hlavička stránky, tabulky, formuláře). Barvy a logo se mění s každým zákazníkem — od v2.0 přes multi-brand overlay v tokenech.

- **Živý přehled (brand book s náhledy komponent):** artefakt „System 21" v Claude, <https://claude.ai/artifact/Y29e25HvLxXsQB4tN7M2im> (je potřeba ho nasdílet)
- **Pravidla použití:** [`docs/brand-manual.md`](docs/brand-manual.md). Začni tady.
- **Ukázkové obrazovky:** `npm run demo` → <http://localhost:3000/demo/>
  - [`demo/showcase.html`](demo/showcase.html) — katalog komponent + přepínač brandu (`BrandToggle`) a tmavého režimu (`ThemeToggle`) + odkazy na ukázkové obrazovky
  - [`demo/dashboard.html`](demo/dashboard.html) — ModuleHome (KPI + QuickActions + ActivityFeed + diář dne)
  - [`demo/crm-klienti.html`](demo/crm-klienti.html) · [`demo/crm-klient-detail.html`](demo/crm-klient-detail.html)
  - [`demo/dms-smlouvy.html`](demo/dms-smlouvy.html) · [`demo/dms-smlouva-detail.html`](demo/dms-smlouva-detail.html)
  - [`demo/ukoly.html`](demo/ukoly.html)
  - [`demo/index.html`](demo/index.html) — původní obrazovka Zakázky (v1.0)
- **Token galerie:** [`docs/tokens.html`](docs/tokens.html) — barvy, typo, prostor, radius, elevace, motion, blur.
- **Změny v2.0 (demo-ready):** [`CHANGELOG.md`](CHANGELOG.md); plán v [`docs/superpowers/plans/2026-11-04-library-ready-for-demo.md`](docs/superpowers/plans/2026-11-04-library-ready-for-demo.md).
- **Noční změny (v1.1):** [`NIGHT_PLAN.md`](NIGHT_PLAN.md) a průběh v [`docs/night-log.md`](docs/night-log.md).

## Komponenty v2.0 (demo-ready)

Nad v1.1 katalogem (33 komponent) přibyly v2.0:

- **Multi-brand:** `useBrand`, `BrandToggle` + `moduleNavSections` (defaultní sidebar sekce se všemi moduly backendu System 21: Dashboard, Úkoly, CRM, DMS, Obchod, HR, Komunikace, Intranet).
- **Dashboard widgety:** `KpiRow` (grid pro `StatTile`), `ActivityFeed` (deník dne), `QuickActions` (mřížka akcí), `ModuleHome` (layout template pro home modulu).
- **Datové primitives:** `EntityCard` (univerzální karta záznamu), `RelationsSidebar` (pravý sloupec s propojenými záznamy), `WorkflowBadge` (stav workflow s enum mapou).
- **Interakce:** `CommentThread` (diskuse s replies + reakcemi + add form), `AttachmentList` (soubory s meta + download/remove).

## Co je v repozitáři

```
tokens/tokens.json        zdroj pravdy: všechny tokeny s poznámkou k použití
tokens/tokens.css         CSS proměnné (--primary, --space-4 …) + třídy písma (.body, .label …), generováno
dist/system21.css         styly komponent (třídy s21-*), používají jen proměnné z tokens.css
dist/system21.js          komponenty jako jeden skript → window.S21 (potřebuje globální React 18)
dist/system21.d.ts        typy props všech komponent
src/components/index.jsx  zdroj komponent (ES modul, lze importovat přímo do React/Next.js)
src/previews/             zdroje náhledů komponent
components/<Name>/        README (kdy a jak použít) + preview.html pro každou komponentu
assets/logos/             logo a symbol BIfactory
scripts/                  build.sh (tokens + dist + náhledy), tokens-to-css.py
```

## Použití v aplikaci (Next.js / React)

1. Zkopíruj `tokens/tokens.css`, `dist/system21.css` a `src/components/index.jsx` do projektu, nebo přidej tohle repo jako git submodul.
2. V kořenovém layoutu importuj styly:

   ```tsx
   import "@/system21/tokens.css";
   import "@/system21/system21.css";
   ```

3. Komponenty importuj ze zdroje (soubor má `"use client"`):

   ```tsx
   import { AppShell, Sidebar, TopBar, Breadcrumbs, PageHeader, PageBody, StatTile, DataTable } from "@/system21/index.jsx";

   <AppShell
     sidebar={<Sidebar brand={…} sections={…} activeHref={pathname} />}
     topbar={<TopBar breadcrumbs={<Breadcrumbs items={crumbs} />} settings={…} user={…} onLogout={logout} />}
   >
     <PageHeader title="Zakázky" actions={<Button icon="plus">Nová zakázka</Button>} />
     <PageBody>…</PageBody>
   </AppShell>
   ```

   Props jsou popsané v `dist/system21.d.ts` a v `components/<Name>/README.md`.

Bez buildu (prototyp, čisté HTML) stačí načíst `tokens.css`, `system21.css`, React 18 UMD a `dist/system21.js`. Viz `demo/index.html`.

## Nový zákazník (přebarvení)

Mění se jen značkové tokeny v `tokens/tokens.json`: `primary`, `primary-hover`, `primary-active`, `on-primary`, `primary-text`, `primary-soft`, `focus-ring`, `accent`, `on-accent`, `ink`, `black`. Dál se mění logo (`Sidebar.brand.logo`) a případně písma (`type.families`). Pak spusť `npm run tokens`. Kontrast ověř podle pravidel v brand manuálu (text na `primary` ≥ 4.5:1).

## Úpravy komponent

```bash
npm install
npm run build   # tokens.css + dist/ + components/*/preview.html
```

Po změně je dobré promítnout ji i do artefaktu „System 21“ (živý přehled), aby oba zdroje zůstaly stejné.

## Původ

Struktura a chování komponent vychází z aplikace `hulinl/polepim-manager` (commit `19de5c8`). Barvy, písma a logo pochází z BIfactory Brand Manualu v1.0. `Breadcrumbs` a `TopBar` jsou nové. Komponenty jsou ručně přepsané (bez Tailwindu), doménové části (plánovací tabule, časové osy, podpis, QR skener, grafy) nejsou zahrnuté.
