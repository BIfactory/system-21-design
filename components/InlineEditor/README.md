# InlineEditor

Click-to-edit pill: v read mode zobrazí hodnotu, kliknutí přepne do editu s inputem + Save / Cancel.

**Kdy:** když chceš uživateli umožnit úpravu pole bez otevření celého formuláře / modálu. Typické pro detail záznamu (deadline, stav, krátká poznámka, cena). Není náhrada za plný formulář s validací — to je `FormWizard` nebo samostatná editace.

**Dodáváš:**
- `value` (povinné) — aktuální hodnota.
- `onSave(newValue)` — volá se po Enter / Save ikoně, pouze pokud se hodnota změnila.
- `type` (default `"text"`) — `"text" | "date" | "number" | "select" | "textarea"`.
- `options` (jen pro `type="select"`) — `Array<{ value, label }>`.
- `display(value)` — vlastní render v read mode (např. formát data, Badge pro status). Pokud není, zobrazí se `value` jako string.
- `placeholder` — placeholder v inputu a v read mode když je `value` prázdná.
- `label` — aria-label (např. „deadline") pro screen reader.
- `disabled` — zakáže klikání.

**Klávesnice:**
- `Enter` → Save (kromě `textarea`, kde Enter = nový řádek; Save přes ikonu).
- `Escape` → Cancel.
- `Blur` mimo widget → Cancel (ne Save; prevence proti náhodnému zápisu nedokončeného inputu).

**Pravidla:**

- Vždycky dávej `display` pro netriviální typy (`date`, `select` s WorkflowBadge) — hodnota v read mode musí vypadat stejně jako jinde na stránce.
- `onSave` je jediný callback. Pokud potřebuješ validaci, proveď ji uvnitř `onSave` a v případě chyby neuzavírej editační state (ale tohle pattern komponenta sama neřídí — musíš mít kontrolovanou komponentu).
- Nepoužívej InlineEditor pro povinná pole v onboarding flow — tam patří plný formulář. InlineEditor je pro úpravy již vyplněných záznamů.

_Nová komponenta (polepim/H, 2026-11-04). Vzor převzat z `polepim-manager/app/(app)/zakazky/[id]/deadline-editor.tsx`, zobecněn._
