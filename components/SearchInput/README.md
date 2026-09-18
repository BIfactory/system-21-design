# SearchInput

Vyhledávací pole s lupou a tlačítkem pro vymazání.

**Kdy:** globální vyhledávání v `Sidebar` a hledání v `FilterBar` (vždy jako první a nejširší pole, třída `s21-grow`).

**Dodáváš:** `value`, `onChange(value)`, `placeholder` (co lze hledat: „Hledat název, klient, ID…“).

**Pravidla:** filtruje průběžně, bez tlačítka „Hledat“. Křížek se objeví jen s hodnotou. Uvnitř `Sidebar` se automaticky přebarví na tmavou.

_Ručně přepsáno ze zdroje: app/(app)/zakazky/filters.tsx (FieldWithClear), components/layout/global-search.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
