# Polepim patterns → System 21 demo (v2.2)

**Datum:** 2026-11-04 (navazuje na v2.0 „demo-ready")
**Repo:** `BIfactory/system-21-design` (lokálně `/Users/hulin/3_Dev/reseni/system-21-design`)

## Záměr

Dostat demo do stavu **„real-app feel"** — tedy aby ukázalo nejen seznamy a detaily, ale i **interakce**, které polepim-manager zvládá jako produkční ERP: inline úpravy, contextual akce bez navigace, multi-step formuláře, searchable comboboxy, bulk operace, pipeline vizualizace.

Nevezmeme polepim 1:1 (doménové věci jako podpis, QR, HEIC, Raynet zůstávají venku). Vezmeme **patterny a zobecníme je**.

## Cíle

**7 nových komponent do knihovny:**

1. `InlineEditor` — click-to-edit pill, generic (input / date / select / textarea).
2. `QuickActionModal` — malý contextual dialog pro akce na záznamu bez navigace.
3. `FormWizard` — multi-step wrapper se step validací, progress UI, chybovými skoky.
4. `SearchSelect` — searchable combobox pro seznamy 100+ položek (debounce, klávesnice).
5. `FileUploadZone` — drag & drop s per-file progress a per-file error isolací.
6. `SalesFunnel` — responsive funnel vizualizace (SVG trapezoid desktop / stacked bars mobile), klikatelné stavy filtrují list.
7. `BulkActionBar` — floating bar co se zjeví při selection v DataTable.

**4 rozšíření existujících komponent:**

- `Modal` — destruktivní varianta (destructive prop → červené CTA, warning text, focus na Cancel).
- `StatTile` — klikatelná varianta (href nebo onClick → kurzor, hover, focus ring).
- `DataTable` — `selectable` prop (checkbox sloupec, selected state, `onSelectionChange`).
- Sidebar badges s přepočtem (není nová komponenta, jen vzor v `moduleNavSections` — aby demo předvedlo „4 úkoly čekají" sídlo na menu).

**2 nové demo stránky:**

- `demo/predavaci-protokol.html` — plný FormWizard scénář (nová zakázka, 5 kroků: základní info → materiál → termíny → kontakty → souhrn).
- `demo/zakazka-detail.html` — detail zakázky s InlineEditor (deadline, status, hodnota), QuickActionModal (vykázat hodiny), FileUploadZone (dokumenty).

**4 upgrade existujících demo stránek:**

- `dashboard.html` — summary tiles klikatelné (→ filtrovaný list).
- `dms-smlouva-detail.html` — InlineEditor na polích „Údaje" (pojistitel, pojistník, pojistné).
- `ukoly.html` — bulk selection + BulkActionBar („Označit hotové", „Delegovat", „Smazat").
- `crm-obchodni-pripady.html` — SalesFunnel nahoře nad tabulkou, klikatelné stavy filtrují.

## Non-goals

- **Žádný signature pad, QR scanner, PDF renderer, HEIC konverze, Raynet integrace.** Zůstávají doménové.
- **Žádné breaking změny** v existujících komponentách — všechno aditivně přes nové prop.
- **Žádný backend / API mock.** QuickActionModal `onSubmit` jen vyvolá Toast „Uloženo".
- **Žádný plný Next.js setup** — stále jen `demo/*.html` s `window.S21`.

## Anti-goals (jak to zkazit)

- Přidat 7 komponent, ale žádnou je nepoužít v demu → zbytečné v bundle.
- Přidat polepim-doménová jména (např. „VykazPraceModal") — všechno musí být generic a reusable.
- Rozbít Poema submodule změnou existujícího API.
- Udělat InlineEditor tak sofistikovaný, že je horší než textbox (over-engineering).

## Omezení

- React 18+, plain JSX bundle, žádný Tailwind, žádný Next.js.
- Čeština v UI stringech; CZ formáty (datum `12. 11. 2026`, číslo `184 000 Kč`).
- Žádné emoji.
- `npm run build` musí projít po každé fázi; `dist/system21.{css,js,d.ts}` commitované.
- Zpětná kompatibilita absolutní.

## Zvažované přístupy

Brát z polepim-manager je buď **A) kopírovat 1:1** (vyloučeno — doménové), **B) zobecnit pattern** (volba), **C) nechat inspiration-only a nestavět**.

Pro každý z 7 komponent + 4 rozšíření jsem v analýze subagentem ověřil, že jde zobecnit. Signature/QR/PDF jsou C.

## Rozhodnutá architektura

**Rozdělení do 5 fází, každá = 1 commit, prefix `polepim/<H..L>`:**

- **Fáze H — Lehké interakce:** `InlineEditor`, `QuickActionModal`, `Modal destructive`, `StatTile clickable`. Upgrade `dashboard.html` (klikatelné tiles) a `dms-smlouva-detail.html` (InlineEditor na údajích + QuickActionModal „Odeslat k podpisu").
- **Fáze I — Formuláře a vstupy:** `FormWizard`, `SearchSelect`, `FileUploadZone`. Nová stránka `demo/predavaci-protokol.html`. Upgrade `dms-smlouva-detail.html` (FileUploadZone v sekci Soubory).
- **Fáze J — Advanced lists:** `BulkActionBar`, `DataTable.selectable`, `SalesFunnel`. Upgrade `ukoly.html` (bulk) a `crm-obchodni-pripady.html` (funnel nad tabulkou).
- **Fáze K — Scenario stránka:** nová `demo/zakazka-detail.html` kombinující všechny nové patterny (inline edit meta, quick action modál na odeslání, file upload v přílohách, bulk action na operacích).
- **Fáze L — Docs + CHANGELOG v2.2 + README update.**

## Co zůstává na builderovi

- **Konkrétní API tvar jednotlivých komponent** — hlavní linky v plánu, detaily se mohou dotáhnout při implementaci (zejména InlineEditor variant typů).
- **Design tokeny pro nové komponenty** — všechno přes var(--…), žádný hex (Review Focus #4 z předchozí iniciativy stále platí).
- **Mock data v demu** — realistická česká jména/firmy, žádná zákaznická data.

## Rizika

- **Over-engineering FormWizard** — polepim verze má HEIC conversion, signature pad, email send. My jen validaci a chybové skoky. Risk: builder tlačí přidat „taky signature". Mitigation: Non-goals jasně ve spec.
- **SalesFunnel na mobilu** — SVG → stacked bars je trochu práce. Risk: mobile verze zůstane kostrbatá. Mitigation: před commit vizuální check.
- **Bulk action + inline edit kolize** — klik na řádek s checkboxem musí vybrat, ne otevřít detail. Mitigation: `data-no-row-click` na checkbox + testování.
