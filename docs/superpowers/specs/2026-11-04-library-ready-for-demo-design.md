# Knihovna „demo-ready" — příprava pro budoucí `system21-demo-gui`

**Datum:** 2026-11-04
**Status:** návrh k provedení autonomně v této sešně
**Repo:** `BIfactory/system-21-design` (lokálně `/Users/hulin/3_Dev/reseni/system-21-design`)

## Záměr

Dostat knihovnu `system-21-design` do stavu, kdy budoucí univerzální prototyp `system21-demo-gui` (který vznikne jako samostatná Next.js aplikace, až se Poema GUI dotáhne na aktuální stav backendu) půjde postavit **převážně skládáním** z hotových komponent a brand tokenů, ne psaním nových. Zároveň tím zůstane knihovna užitečná pro `system21-poema-gui` a všechny budoucí zákaznické forky.

## Proč teď

Paralelně běží sešna nad `system21-poema-gui`, která dohání aktuální backend (CRM, DMS, Úkoly a nově přibyté moduly: role/oprávnění, outbound messaging, …). Dokud tam vznikají stránky, můžeme tady preventivně dodat generické komponenty a vzory, které tyhle stránky použijí, a druhou vrstvou pak „ušít" univerzální demo brandingově. Když tady nic neuděláme, při pozdější stavbě dema se buď duplikuje práce z Poemy, nebo demo zaostane za backendem.

## Cíle

1. **Multi-brand v tokenech.** Oddělit brandové tokeny (barvy, logo, fonty) od systémových (spacing, radius, elevace, motion) tak, aby přebarvení pro zákazníka byla úprava jednoho souboru / jedné sekce. Zapéct druhý ukázkový brand `demo-alt` (anonymní, barevně odlišný od BIfactory zelené) pro průběžný test, že přebarvení skutečně funguje.
2. **Chybějící komponenty pro demo.** Dodat generické díly, co dnes v knihovně nejsou a budou je potřebovat všechny moduly: menu se sekcemi pro všechny moduly backendu, dashboard widgety (ActivityFeed, QuickActions, KpiRow), EntityCard, RelationsSidebar, WorkflowBadge, ModuleHome šablona, Comments, AttachmentList.
3. **Ucelené showcase obrazovky.** Postavit v `demo/` reprezentativní stránky (Dashboard, CRM klient — seznam + detail, DMS smlouvy — seznam + detail, Úkoly), aby ukázka na schůzce mohla jít přímo z knihovny, dokud `system21-demo-gui` neexistuje.
4. **Dokumentace.** V `docs/brand-manual.md` sekce „Jak udělat nového zákazníka" (10minutový proces: změnit brand tokens, logo, název); `README.md` update; `CHANGELOG.md` v2.0 heading.

## Non-goals

- **Žádný Next.js v tomto repu.** Knihovna zůstává čistě tokeny + komponenty (JSX bundle) + ukázkové HTML. Any Next.js vznikne až v samostatném repu `system21-demo-gui`.
- **Žádné API klienty, routy, business logika.** Všechno, co komunikuje s backendem, patří do aplikačních repozitářů.
- **Žádná změna existujícího API komponent.** Současné třídy `.s21-*` a props zůstávají; nové věci se přidávají vedle, ne místo.
- **Nepřipravovat Žmolův brand.** Žmola dostane vlastní repo později; druhý ukázkový brand je anonymní testovací, ne customer-specific.
- **Netlačit sem stránky Poemy.** Když v Poemě vznikne konkrétní stránka, tady vzniká **vzor / šablona**, ne jeho kopie.

## Anti-goals (co by znamenalo, že jsme to zkazili)

- Rozbitá zpětná kompatibilita — existující showcase `demo/index.html` by přestal fungovat nebo vypadat stejně.
- „Component bloat" — přidat 20 komponent, které stejně žádná reálná stránka nepotřebuje.
- Smíchat brand a system tokens tak, že změna brandu rozbije layout nebo motion.
- Komponenty vázané na konkrétní modul (např. „CrmClientCard"); všechno musí být generické.

## Omezení

- **Neopouštět stávající bundling.** Repo používá `esbuild` + ruční `tokens-to-css.py`; nepřecházet na Vite/Next/monorepo tooling. Build zůstává `npm run build`.
- **React 18/19 peer dep.** Komponenty jako čistý JSX modul (se `"use client"` hlavičkou), bez TypeScriptu v `src/`.
- **Zachovat `dist/*` jako artefakty.** Poema a budoucí demo-gui je submodulují, takže `dist/system21.{css,js,d.ts}` musí zůstat generované a commitované.
- **Čeština v UI, CZ formáty** (datum `12. 05. 2026`, číslo `184 000 Kč`, procento s mezerou).
- **Žádné emoji v UI.** (Platí z CLAUDE.md.)

## Zvažované přístupy

### A) Minimalistický patch
Jen přidat 2–3 chybějící komponenty a opravit tokeny pro multi-brand. Showcase ponechat.
**Pro:** malá rizika, rychlé.
**Proti:** nedosáhne cíle „demo půjde postavit skládáním"; při stavbě dema zbude moc práce.

### B) Full redesign tokenů
Přepsat `tokens.json` do úplně nové struktury s theme packs a build-time scriptem.
**Pro:** elegantnější dlouhodobě.
**Proti:** rozbíjí zpětnou kompatibilitu s Poema submodulem; moc velký kus na jednu autonomní sešnu; mimo scope.

### C) Aditivní rozšíření (vybráno)
Stávající tokeny ponechat, přidat **brand overlay** — oddělený soubor/sekce s brand tokeny, který se aplikuje přes CSS cascade. Druhý brand je přepínatelný přes `data-brand="demo-alt"` na `<html>`, podobně jako už funguje `data-theme="dark"`. Nové komponenty přidat vedle, staré se nemění. Showcase rozšířit o nové sekce v `demo/` (nové HTML soubory), původní `demo/index.html` zůstává.

**Pro:** nerozbíjí nic, posouvá všechno potřebné, průchodné v jedné sešně.
**Proti:** tokens.json mírně nabobtná o brand-overlay sekci.

**Volba: C.**

## Rozhodnutá architektura

### Multi-brand

- **Brandové tokeny** (co se mění pro zákazníka): `primary`, `primary-hover`, `primary-active`, `on-primary`, `primary-text`, `primary-soft`, `focus-ring`, `accent`, `on-accent`, `ink`, `black`, `sidebar-bg`, `brand-name`, `brand-subtitle`, `brand-logo-url`, `font-display`, `font-body`, `font-mono`.
- **Systémové tokeny** (nikdy se nemění per customer): spacing, radius, elevation, motion, blur, state colors (success/danger/warning), typography scale.
- V `tokens.json` oddělit sekce `brand.themes[]` od `system.*`; `brand.themes[]` obsahuje `bifactory` (default) a `demo-alt`.
- CSS: `tokens.css` produkuje default (bifactory) proměnné v `:root`; `[data-brand="demo-alt"]` je přepíše.
- Přepínač: `ThemeToggle` umí přepnout brand (dropdown „BIfactory / Demo-alt") vedle light/dark toggle v showcase; v zákaznickém repu se nikdy nerenderuje.

### Nové komponenty (všechny generické, všechny do `src/components/index.jsx` jako přírůstek)

1. **`ModuleNav`** — sekce sidebaru s moduly backendu (CRM, DMS, Úkoly, HR, Sales, Email, Nastavení…). Pro demo budou všechny; pro zákazníka se jen předá podmnožina.
2. **`KpiRow`** — row of `StatTile` s layout rules (responsive 2/3/4/6 col).
3. **`ActivityFeed`** — časová osa akcí (kdo, co, kdy) s avatary a odkazem na záznam. Varianty: compact / expanded.
4. **`QuickActions`** — mřížka tlačítek s ikonami pro nejčastější akce (nová zakázka, nový úkol, import…).
5. **`EntityCard`** — generická karta záznamu (klient, projekt, dokument): hlavička s avatarem, meta řádek, akce, tagy. Používá se v seznamech i jako widget na dashboardu.
6. **`RelationsSidebar`** — pravý sloupec na detailu: propojené záznamy (dokumenty, úkoly, kontakty, aktivita).
7. **`WorkflowBadge`** — stav workflow (Nová / V jednání / Výhra / Hotovo…) s barvou a ikonou; rozdíl od `Badge` (který je obecný) a `Tag` — tohle je stateful.
8. **`ModuleHome`** — layout template pro landing stránku modulu: hero s KPI + ActivityFeed + QuickActions + deník dne.
9. **`CommentThread`** — seznam komentářů s avatarem, markdownem, replies, reactions.
10. **`AttachmentList`** — seznam přiložených souborů (ikonka typu, název, velikost, náhled, download).

### Showcase obrazovky (v `demo/`)

- `demo/index.html` — zůstává jako je (obrazovka Zakázky).
- `demo/showcase.html` — zůstává jako je (katalog komponent).
- **Nové:**
  - `demo/dashboard.html` — ModuleHome s KpiRow + ActivityFeed + QuickActions + „Deník dne".
  - `demo/crm-klienti.html` — seznam klientů (EntityCard grid + DataTable toggle).
  - `demo/crm-klient-detail.html` — detail klienta (tabs: Přehled / Smlouvy / Aktivita / Dokumenty) + RelationsSidebar.
  - `demo/dms-smlouvy.html` — seznam smluv s WorkflowBadge.
  - `demo/dms-smlouva-detail.html` — detail smlouvy s CommentThread + AttachmentList.
  - `demo/ukoly.html` — seznam úkolů s mobile card variant + filter chips.
  - Všechny mají přepínač brandu v topbar (BIfactory / Demo-alt) a light/dark toggle.

### Co zůstává bez změny

- `src/components/index.jsx` nevymění žádný existující export; nové jen přibudou.
- `dist/system21.css` se rozroste; staré třídy `.s21-*` beze změny.
- `tokens/tokens.css` se rozroste o `[data-brand=…]` sekci.
- `scripts/build.sh`, `package.json` scripts — jen drobné úpravy, pokud vůbec.

## Commit strategie

Po fázích, prefix `demo-prep/<fáze>`:
1. `demo-prep/A` — multi-brand tokens (brand split v `tokens.json`, `demo-alt` brand, `[data-brand]` v `tokens.css`, `BrandToggle` v showcase).
2. `demo-prep/B` — ModuleNav, KpiRow, ActivityFeed, QuickActions.
3. `demo-prep/C` — EntityCard, RelationsSidebar, WorkflowBadge, ModuleHome.
4. `demo-prep/D` — CommentThread, AttachmentList.
5. `demo-prep/E` — showcase: dashboard, CRM, DMS, úkoly.
6. `demo-prep/F` — docs (brand-manual sekce, README, CHANGELOG v2.0).

Každá fáze: build (`npm run build`), ověřit otevřením nového showcase v prohlížeči (když nelze vizuálně, aspoň HTML validovat), commit, push.

## Co zůstává na builderovi

- **Konkrétní odstíny `demo-alt`** — v design docu říkám „barevně odlišný od BIfactory zelené", builder si zvolí (návrh: tmavě modrý primární #1e4bd6 nebo teplý oranžový #d97706 — budu volit modrý jako kontrast k zelené).
- **Přesné API props jednotlivých nových komponent** — návrh v plan.md, ale finální tvar se může drobně upravit při implementaci podle toho, jak sedí do existujících vzorů (DataTable, Sidebar) a jak to vypadá v showcase.
- **Rozhodnutí o granularitě ModuleNav sekcí** — jestli má mít top-level `CRM` s podsekcemi (Klienti, Osoby, Případy), nebo ploché `Klienti / Osoby / Případy` jako v Poemě. Builder se podívá na současný `Sidebar.sections` v demo/index.html a zvolí konzistentně.
- **Obsah demo dat v showcase obrazovkách** — fiktivní, ale realistická (CZ jména, CZ firmy, reálné stavy). Nepoužít zákaznická data.
- **Finální znění sekce „Jak udělat nového zákazníka" v brand-manual** — předloha je už v README.md odstavec „Nový zákazník (přebarvení)"; builder ji rozšíří.

## Rozhodnutí z builder-checku (2026-11-04)

Všechna tato rozhodnutí dělám jako builder; nejde o otázky pro uživatele.

1. **`demo-alt × dark` je kartézský součin.** Showcase má oba toggles nezávisle, tedy existují všechny čtyři kombinace: `bifactory-light` (default), `bifactory-dark`, `demo-alt-light`, `demo-alt-dark`. Pro `demo-alt` tedy definuju i dark paletu.
2. **Hranice souborů: brand v `tokens.json → tokens.css`, dark mode zůstává v `bundle.css`.** Konzistentní by bylo oboje v JSON, ale migrace dark overrides mimo scope. Dokumentuju hranici v brand-manual: „brandy z tokens.json, dark mode z bundle.css".
3. **Dark paleta pro `demo-alt`: ano.** Tmavá verze anonymního brandu.
4. **Rozšířený seznam brand tokens:** `primary`, `primary-hover`, `primary-active`, `primary-soft`, `primary-glow`, `primary-glow-strong`, `primary-text`, `on-primary`, `accent`, `on-accent`, `focus-ring`, `shine`, `ink`, `ink-muted`, `ink-subtle` (pokud se za barvou cítí brand), `black`, `sidebar-bg`, `sidebar-hover`, `sidebar-border`, `sidebar-text`, `sidebar-active-bg`, `sidebar-active-text`, `brand-name`, `brand-subtitle`, `brand-logo-url`, `font-display`, `font-body`, `font-mono`. Vše, co je **odvozené od primary/black/sidebar**, je brand token. Co je neutrální/system (state colors success/danger/warning, spacing, radius, elevation, motion) zůstává stejné.
5. **`ModuleNav` není nová komponenta.** Je to konvence: default export `moduleNavSections` (JS pole se seznamem všech modulů backendu v BIfactory pořadí). V zákaznickém repu se předá redukovaná verze. Žádný wrapper, žádné nové CSS. Posouvá počet nových komponent z 10 na 9.
6. **`WorkflowBadge` je tenký wrapper nad `Badge`.** API: `<WorkflowBadge state="win" />`. Vrací `Badge` s mapovaným `color` a `icon`. States: `draft | offer | negotiation | win | loss | in-progress | done | blocked | overdue`. Lokalizace textu je součástí: český label pro každý stav.
7. **`BrandToggle` zrcadlí `useTheme` pattern.** Nový hook `useBrand` + exportovaný `BrandToggle`. `localStorage("system21-brand")`, default `'bifactory'`, bez OS detekce. V zákaznickém repu se `BrandToggle` nerenderuje, ale `useBrand` zůstává exportovaný (kdyby customer potřeboval runtime switch). FOUC: inline bootstrap script v `demo/*.html` čte localStorage a nastaví `data-brand` před React mountem (zrcadlo dark).
8. **Showcase: 6 HTML + `demo/_shared.js`.** Malý sdílený modul s AppShell config, Sidebar sections, TopBar s oběma toggles, nav mezi stránkami. Žádné routy, každá stránka je samostatný HTML — ale shared bootstrapping.
9. **`dist/` commitovat jednou na konci každé fáze (A–F).** Ne průběžně, ne až na konec. Každá fáze = koherentní snapshot pro Poema submodule pull.
10. **Fonty `demo-alt` identické s BIfactory.** Manrope/Archivo/JetBrains. V této iteraci fonty nejsou skutečná brand osa; token `font-*` existuje proto, aby budoucí zákazník mohl přefontovat, ale `demo-alt` ho nevyužívá. Dokumentuju v brand-manual.

## Rizika

- **Konflikt s Poema submodulem.** Poema má `packages/design/` jako submodule — po pushnutí nových komponent si pullne a potenciálně se jí něco rozbije, pokud nedržíme zpětnou kompatibilitu. Mitigace: nikdy nemazat/měnit existující exporty, jen přidávat.
- **Divergent evoluce komponent.** V paralelní sešně se v Poemě může ukázat, že některá komponenta tady má špatné API. Mitigace: pokud se to ukáže, uděláme v3 vedle v2, ne breaking change.
- **Build artefakty v commitu.** `dist/` je committed; při každé fázi se rozroste. Mitigace: commitovat záměrně po fázích, ne průběžně.
