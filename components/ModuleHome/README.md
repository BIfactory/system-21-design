# ModuleHome

Layout template pro landing stránku modulu. Skládá hlavičku, KPI, rychlé akce a deník dne / feed.

**Kdy:** na „home" stránce každého modulu (`/dashboard`, `/crm`, `/dms`, `/hr`…). Ne na seznamech záznamů (ty používají `PageHeader` + `FilterBar` + `DataTable`), ne na detailech (ty používají `PageHeader` s `Tabs` + sekce).

**Dodáváš:**
- `title` (povinný), `description` — hlavička.
- `kpis` — ReactNode, typicky `<KpiRow>…</KpiRow>` s 3–6 `StatTile` dlaždicemi.
- `quickActions` — ReactNode, typicky `<QuickActions actions={…} />`.
- `activity` — ReactNode, typicky `<ActivityFeed items={…} />`.
- `diary` — volný slot pro pravý sloupec (Deník dne, Nepodepsané smlouvy, Expirace…). Co tam dáš, musí být krátké a akční.

**Layout:**

- Desktop (≥ 1024 px): KPI nahoře přes plnou šířku, pak 2 sloupce — levý (QuickActions + ActivityFeed), pravý (`diary`).
- Mobile / tablet: vše pod sebe.

**Pravidla:**

- Jen jedno použití `ModuleHome` na stránku. Pokud potřebuješ víc „home-like" rozložení, je to seznam nebo detail.
- `diary` je volný slot — pokud nemáš specifický widget, nech ho prázdný. ModuleHome funguje i bez něj.

_Nová komponenta (demo-prep/C, 2026-11-04)._
