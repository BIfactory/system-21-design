# SearchSelect

Searchable combobox pro seznamy se 100+ položkami. Trigger + popover s input filtrem a filtrovaným listem.

**Kdy:** pokud má Select víc než ~15 položek a uživatel si je chce dohledat psaním. Pro malé seznamy (statusy, kraje) stačí `Select`.

**Dodáváš:** `value`, `onChange(value)`, `options: Array<{ value, label, hint? }>`, volitelně `placeholder`, `searchPlaceholder`, `disabled`.

- `hint` — sekundární text u položky (např. IČ firmy, email osoby).
- Filter hledá v `label` i `hint` (case-insensitive, substring).

**Klávesnice:**
- `Šipky nahoru/dolů` — navigace v listu.
- `Enter` — výběr highlightované položky.
- `Escape` — zavře popover.

**Pravidla:**

- Zobrazuje max 320 px výšku; nad to scroll.
- Prázdný filter → zobraz všechny options.
- Žádná „Create new" položka v této verzi (pokud chceš, obal komponentu vlastní logikou).

_Nová komponenta (polepim/I, 2026-11-04). Vzor převzat z `polepim-manager` OrderPicker, zobecněn._
