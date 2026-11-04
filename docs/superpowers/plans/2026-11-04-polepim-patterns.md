# Polepim patterns Implementation Plan (v2.2)

> **For agentic workers:** sousední fáze předávají zřídka interfaces; implementace fáze po fázi, jeden commit per fáze.

**Goal:** Přenést 7 nových komponent + 4 rozšíření z polepim-manager patternů do knihovny System 21 a zabudovat je do dema (2 nové stránky + 4 upgrade), aby demo dostalo „real-app feel".

**Architecture:** Aditivně nad existující exporty. Všechny nové komponenty žijí v `src/components/index.jsx`, CSS v `src/components/bundle.css`. Žádný Next.js, žádný backend, jen `window.S21` + `demo/*.html`.

**Tech Stack:** React 18 JSX, esbuild, plain CSS přes CSS vars.

**Spec:** `docs/superpowers/specs/2026-11-04-polepim-patterns-design.md`

## Global Constraints

- Žádný existující export, třída, token neupravovat nebo přejmenovávat. Nové věci jen přidávat.
- `npm run build` musí projít po každé fázi; `dist/*` součástí commitu fáze.
- Stávající `demo/*.html` musí dál renderovat identicky (ověřit v browseru).
- Čeština, CZ formáty, žádné emoji, žádný hardcoded hex v CSS nových komponent.
- Commit prefix: `polepim/<H..L>`, jeden commit per fáze, push na `main`.

## Review Focus

Pět tříd selhání, které spec implikuje, ale testy by je neověřily:

1. **InlineEditor v dark modu + demo-alt brandu** vizuálně vybledlý → verifikace v Fáze H screenshot step.
2. **QuickActionModal otevřený z row s onRowClick** nesmí propagovat click na řádek → `data-no-row-click` guard, verifikace v Fáze H.
3. **FormWizard skok zpět na krok s chybou** musí přenést focus na první invalid pole → verifikace v Fáze I.
4. **DataTable.selectable + onRowClick kolize** — klik na checkbox vs. klik na řádek musí být rozlišené → `data-no-row-click` + stopPropagation, verifikace v Fáze J.
5. **SalesFunnel na mobilu** musí být čitelné (ne rozbité SVG) → verifikace v Fáze J v devtools responsive view.

---

## Fáze H: Lehké interakce (InlineEditor + QuickActionModal + Modal destructive + StatTile clickable)

**Files:**
- Modify: `src/components/index.jsx` — exporty `InlineEditor`, `QuickActionModal`; prop rozšíření `Modal` (`destructive` prop), `StatTile` (`href`, `onClick`).
- Modify: `src/components/bundle.css` — `.s21-inline`, `.s21-qam`, `.s21-stat.is-clickable`, `.s21-modal--destructive`.
- Modify: `dist/system21.d.ts` — nové typy.
- Create: `components/{InlineEditor,QuickActionModal}/{README.md,preview.html}`.
- Create: `src/previews/{InlineEditor,QuickActionModal}.jsx`.
- Modify: `src/previews/meta.json` — registrace nových previews.
- Modify: `demo/dashboard.html` — klikatelné tiles (zapojit href na detail stránky).
- Modify: `demo/dms-smlouva-detail.html` — InlineEditor na sekci „Údaje" + QuickActionModal „Odeslat k podpisu".

**Interfaces:**
- Produces:
  - `<InlineEditor value onChange onSave? type="text"|"date"|"number"|"select" options?={...} placeholder? format?={fn} display?={fn} />` — read mode renderuje `display(value) || value`, click přejde do edit mode s inputem, Save/Cancel ikony, Enter=Save, Escape=Cancel.
  - `<QuickActionModal open onClose title description? children footer />` — malý modal (max 480px), focus trap, Escape close. Používá se přes externí state (není portal wrapper — standalone komponenta).
  - `<Modal destructive>` — když `destructive`, CTA z footer má variant `danger`, title má danger ikonu vlevo.
  - `<StatTile href>` nebo `<StatTile onClick>` — udělá tile klikatelnou (kurzor pointer, hover zvýšení elev, focus ring).

- [ ] **H1: `InlineEditor` komponenta**

  Signatura:
  ```ts
  <InlineEditor
    value
    onSave: (newValue) => void
    type?: "text" | "date" | "number" | "select" | "textarea"
    options?: Array<{value, label}>  // jen pro select
    placeholder?
    display?: (value) => ReactNode  // vlastní render v read mode
    label?: string  // aria-label pro edit input
    disabled?: boolean
  />
  ```
  Read mode: `<button>` s render display(value) a hover underline. Click → edit mode: input (odpovídající type) + Save icon button + Cancel icon button. Enter = Save, Escape = Cancel. Blur mimo edit → Cancel (ne Save, aby se nikde zbytečně neuložilo nedokončené).

  CSS: `.s21-inline` display inline-flex, read mode má jemný hover border/underline, edit mode rozšíří width podle contents.

- [ ] **H2: `QuickActionModal` komponenta**

  Signatura:
  ```ts
  <QuickActionModal
    open
    onClose
    title
    description?
    icon?
    children  // obsah těla (form, text, cokoli)
    footer    // tlačítka
    size?: "sm" | "md"  // default sm (max-width 480px)
  />
  ```
  Interně používá stejný portal/overlay pattern jako `Modal`, ale menší, s jemnější animací (fade + mild scale). Žádné title bar close X (uzavírá se jen přes footer tlačítka / Escape / click na overlay).

  CSS: `.s21-qam` menší max-width než Modal, lehčí padding.

- [ ] **H3: `Modal destructive` varianta**

  Nový prop `destructive: boolean`. Když true:
  - V title bar se zobrazí ikona `alert-triangle` barvy `--danger-text`.
  - Footer se vyrenderuje s `justify-content: space-between` (Cancel vlevo, Confirm vpravo).
  - Autofocus skočí na Cancel, ne na Confirm (prevence random Enter potvrzení).

  Doporučený pattern (dokumentovat v README): `<Modal destructive><Button variant="secondary">Zrušit</Button><Button variant="danger">Smazat</Button></Modal>`.

- [ ] **H4: `StatTile` clickable varianta**

  Nový prop `href` nebo `onClick`. Když kterýkoli z nich, tile se stane `<a>` nebo `<button>` (sémantický element), přidá se `.s21-stat.is-clickable` class: kurzor pointer, hover translateY(-1px) + box-shadow var(--elev-2), focus ring.

- [ ] **H5: Previews + README pro `InlineEditor`, `QuickActionModal`**

  Analog k předchozím fázím. meta.json rozšíření.

- [ ] **H6: Upgrade `demo/dashboard.html`**

  KpiRow tiles dostanou `href`:
  - „Klienti 124" → `./crm-klienti.html`
  - „Smlouvy 208" → `./dms-smlouvy.html`
  - „Otevřené příležitosti 7" → `./crm-obchodni-pripady.html`
  - „Nepodepsané smlouvy 2" → `./dms-smlouvy.html?filter=unsigned` (jen URL, filter samotný mock).

- [ ] **H7: Upgrade `demo/dms-smlouva-detail.html`**

  V sekci „Údaje" obalit každou hodnotu (pojistitel, pojistník, pojistné, frekvence) do `<InlineEditor>` s mock `onSave`. Přidat tlačítko „Smazat smlouvu" s destructive `Modal`. Přidat „Odeslat k podpisu" `QuickActionModal` s formulářem (email + zpráva).

- [ ] **H8: Build + commit**

  ```bash
  npm run build
  git add -A
  git commit -m "polepim/H: InlineEditor + QuickActionModal + Modal destructive + StatTile clickable"
  git push origin main
  ```

---

## Fáze I: Formuláře a vstupy (FormWizard + SearchSelect + FileUploadZone)

**Files:**
- Modify: `src/components/index.jsx` — `FormWizard`, `SearchSelect`, `FileUploadZone`.
- Modify: `src/components/bundle.css` — `.s21-wiz`, `.s21-ssel`, `.s21-fuz`.
- Modify: `dist/system21.d.ts` — nové typy.
- Create: `components/{FormWizard,SearchSelect,FileUploadZone}/{README.md,preview.html}`.
- Create: `src/previews/{FormWizard,SearchSelect,FileUploadZone}.jsx`.
- Modify: `src/previews/meta.json`.
- Create: `demo/predavaci-protokol.html` — nová stránka s plným FormWizard.
- Modify: `demo/dms-smlouva-detail.html` — `FileUploadZone` v sekci Soubory (vedle existujícího AttachmentList).

**Interfaces:**
- Produces:
  - `<FormWizard steps={Step[]} onComplete onCancel? initialStep=0 />` — `Step = { id, title, description?, validate?: () => string[] | null, render: (ctx) => ReactNode }`. Ctx dodává { values, setValue, goNext, goPrev, goTo, error }.
  - `<SearchSelect value onChange options={Option[]} placeholder? searchable searchPlaceholder? />` — `Option = { value, label, hint? }`. Použitelné jako Select, ale otevře popover s input filter nahoře.
  - `<FileUploadZone onFiles={(files) => void} accept? multiple? maxSize? children? />` — drag-drop + klik otevře file picker, children slot pro vlastní prompt. Zobrazuje per-file progress když vrací se promise z onFiles.

- [ ] **I1: `SearchSelect`**

  Trigger = input-like button s current value nebo placeholder + šipka. Popover s search inputem nahoře + filtered list. Keyboard: Up/Down v seznamu, Enter select, Escape close. Debounce 150 ms. Pro 100+ položek fungující.

- [ ] **I2: `FileUploadZone`**

  CSS: dropzone s dashed border `--border-strong`, hover `--primary` border, dragover `--primary-soft` background. Click = otevře file picker (hidden input). Zobrazí list uploadovaných s progress bar + status (uploading / done / failed) per file. Error state: červený text pod failed files.

- [ ] **I3: `FormWizard`**

  Signatura v H. Stepper nahoře (reuse existujícího `Stepper`), pod ním obsah aktuálního kroku. Footer: Zpět / Další (nebo Dokončit na posledním kroku). Validace spustí `step.validate()` před `goNext`; když vrátí errors, zobrazí je nad obsahem a `goTo` na první step s chybou.

- [ ] **I4: Previews + README**

- [ ] **I5: Nová stránka `demo/predavaci-protokol.html`**

  5-step scénář: (1) Základní info (zadavatel, lokalita — SearchSelect z 20 firem), (2) Materiál (DataTable s přidáváním řádků), (3) Termíny (date inputs + validate budoucí datum), (4) Kontakty (SearchSelect z 50 osob), (5) Souhrn + Dokončit (potvrzovací Modal). `FileUploadZone` v kroku 1 pro přílohy.

- [ ] **I6: Upgrade `demo/dms-smlouva-detail.html`** — `FileUploadZone` nad `AttachmentList` v sekci Soubory.

- [ ] **I7: Build + commit**

  Commit: `polepim/I: FormWizard + SearchSelect + FileUploadZone + předávací protokol screen`.

---

## Fáze J: Advanced lists (BulkActionBar + DataTable.selectable + SalesFunnel)

**Files:**
- Modify: `src/components/index.jsx` — `BulkActionBar`; rozšíření `DataTable` o `selectable`, `selectedIds`, `onSelectionChange`.
- Modify: `src/components/index.jsx` — `SalesFunnel`.
- Modify: `src/components/bundle.css` — `.s21-bab`, `.s21-table__select`, `.s21-funnel`.
- Modify: `dist/system21.d.ts`.
- Create: `components/{BulkActionBar,SalesFunnel}/{README.md,preview.html}` + previews.
- Modify: `demo/ukoly.html` — selectable DataTable + BulkActionBar.
- Modify: `demo/crm-obchodni-pripady.html` — SalesFunnel nahoře.

**Interfaces:**
- Produces:
  - `<DataTable selectable selectedIds={Array<string|number>} onSelectionChange={(ids) => void} />` — přidá sloupec s checkboxem vlevo. Header checkbox select-all / none.
  - `<BulkActionBar count actions onClear />` — floating bar u spodku viewportu když count > 0; zobrazí „X vybráno" + actions + Zrušit.
  - `<SalesFunnel stages={Stage[]} value? onChange? />` — `Stage = { id, label, count, value?, color? }`. Desktop: SVG trapezoid. Mobile: stacked bars se % šířkou. Clickable: `onChange(stageId)`.

- [ ] **J1: `DataTable.selectable`**

  Checkbox sloupec s `data-no-row-click`. Header: checkbox s indeterminate state když některé vybrané. Interně DataTable udržuje `selected` set, callback při změně.

- [ ] **J2: `BulkActionBar`**

  Fixed position bottom, centered, z-index nad content. Slide-in z dola při zobrazení. `actions: Array<{ label, icon?, variant?, onClick }>`.

- [ ] **J3: `SalesFunnel`**

  Desktop (≥768px): inline SVG se stageSs jako trapezoidy, proporcionální šířka podle count. Hover zvýrazní stage. Click vyvolá onChange. Zobrazí label + count + optional value.

  Mobile (<768px): horizontální bars s % šířkou, stacked vertically. Stejná interakce.

- [ ] **J4: Previews + README**

- [ ] **J5: Upgrade `demo/ukoly.html`**

  Přidat `selectable`, state `selectedIds`, render `<BulkActionBar count={selectedIds.length} actions=[{label:'Označit hotové',icon:'check',onClick},{label:'Delegovat',icon:'users'},{label:'Smazat',icon:'trash',variant:'danger'}]` když > 0.

- [ ] **J6: Upgrade `demo/crm-obchodni-pripady.html`**

  Přidat `<S.SalesFunnel>` nad FilterBar s mock stages (Rozpracováno, Nabídka, V jednání, Výhra, Prohra) s counts z DEALS. Clickable stage filtruje tabulku pod.

- [ ] **J7: Build + commit**

  Commit: `polepim/J: DataTable.selectable + BulkActionBar + SalesFunnel`.

---

## Fáze K: Scenario stránka — detail zakázky

**Files:**
- Create: `demo/zakazka-detail.html`

**Interfaces:**
- Consumes: všechny nové komponenty z H+I+J.

- [ ] **K1: `demo/zakazka-detail.html`**

  Kompletní detail zakázky „ZAK-2026-0131 Napojení ERP → CRM":
  - PageHeader s Tabs (Realizace / Plán / Výkazy / Dokumenty / Aktivita).
  - V hlavním sloupci:
    - Section „Údaje" — InlineEditor na polích (klient, deadline, hodnota, stav → WorkflowBadge inline-edit přes SearchSelect stavů).
    - Section „Operace" — DataTable selectable s BulkActionBar (vykázat hodiny, přesunout, uzavřít). QuickActionModal „Vykázat hodiny" otevřený z row action ikony.
    - Section „Soubory" — FileUploadZone + AttachmentList.
    - Section „Komentáře" — CommentThread.
  - V pravém sloupci: RelationsSidebar (klient, propojené zakázky, kontakty).

- [ ] **K2: Mapování v _shared.js**

  Přidat do `demoHref`: `"/zakazky/131": "./zakazka-detail.html"`. V sidebar sekci „Obchod" přidat 2. položku „ZAK-2026-0131 (ukázka detailu)" href="/zakazky/131" — ale lépe: v `demo/index.html` z existujícího rowu kliknout na konkrétní zakázku vede sem.

- [ ] **K3: Build + commit**

  Commit: `polepim/K: zakazka-detail scenario screen combining all new patterns`.

---

## Fáze L: Dokumentace + CHANGELOG v2.2

**Files:**
- Modify: `README.md` — nová „Komponenty v2.2" sekce.
- Modify: `CHANGELOG.md` — v2.2 heading se všemi 7 komponenty + 4 rozšíření + 2 nové stránky + 4 upgrade.
- Modify: `docs/brand-manual.md` — sekce „Interakční patterny" (inline edit, quick action, wizard, bulk, funnel).
- Modify: `demo/showcase.html` — přidat nové obrazovky do „11 · Obrazovky" sekce.

- [ ] **L1: README update**

- [ ] **L2: CHANGELOG v2.2 heading**

- [ ] **L3: brand-manual.md interakce sekce**

- [ ] **L4: showcase.html — rozšířit tiles list**

- [ ] **L5: Build + commit**

  Commit: `polepim/L: docs — README v2.2, CHANGELOG, brand-manual interactions section`.

---

## Self-review

- **Spec coverage:** 7 komponent + 4 rozšíření + 2 nové stránky + 4 upgrade existujících = 17 položek. Každá je přiřazena konkrétnímu kroku v H–K. Dokumentace L.
- **Step scan:** každý krok má jasný deliverable. Žádné „TBD" ani „handle edge cases".
- **Type consistency:** `Step`, `Option`, `Stage`, `Attachment` jména konzistentní napříč fázemi.
- **Review Focus:** 5 pokryto:
  - #1 InlineEditor × dark × demo-alt → Fáze H6 visual check.
  - #2 QuickActionModal × onRowClick → Fáze H7 integrace v demu.
  - #3 FormWizard chybový skok → Fáze I3 implementace + I5 verifikace v demu.
  - #4 DataTable.selectable × onRowClick → Fáze J1 implementace + J5 verifikace.
  - #5 SalesFunnel mobile → Fáze J3 implementace + J6 verifikace.
- **Proportion:** plán je 3× delší než spec, protože nese konkrétní API signatury, konkrétní wizard scénáře a demo integrace. OK.
