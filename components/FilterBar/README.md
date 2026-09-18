# FilterBar

Bílá lišta filtrů nad tabulkou: vyhledávání, selecty a přepínače.

**Kdy:** nad každou tabulkou s víc než ~10 řádky.

**Dodáváš:** `children` v pořadí `SearchInput` (s `className="s21-grow"`), `Select`y, `Checkbox`/`Button`.

**Pravidla:** filtry se aplikují hned a zapisují do URL. Na mobilu zůstane vidět jen vyhledávání a tlačítko filtru s počtem aktivních filtrů, ostatní se rozbalí pod ním.

_Ručně přepsáno ze zdroje: app/(app)/zakazky/filters.tsx, components/ui/list-filter.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
