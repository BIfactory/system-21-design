# FilterBar

Bílá lišta filtrů nad tabulkou: vyhledávání, selecty a přepínače.

**Kdy:** nad každou tabulkou s víc než ~10 řádky.

**Dodáváš:** `children` v pořadí `SearchInput`, `Select`y, `Checkbox`/`Button`, a `activeCount` (počet aktivních filtrů kromě hledání).

**Pravidla:** filtry se aplikují hned a zapisují do URL. Na mobilu zůstane vidět jen vyhledávání a vedle něj tlačítko filtru s počtem aktivních filtrů (zelený odznak). Ostatní pole se po kliknutí rozbalí pod sebe na celou šířku.

_Ručně přepsáno ze zdroje: app/(app)/zakazky/filters.tsx, components/ui/list-filter.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
