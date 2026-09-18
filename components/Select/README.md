# Select

Rozbalovací výběr s vlastní šipkou.

**Kdy:** výběr jedné hodnoty z krátkého číselníku (stav, typ, klient).

**Dodáváš:** `options [{value, label}]`, `placeholder` (první prázdná volba: „Všechny stavy“), `value` a `onChange` jako u `<select>`.

**Pravidla:** ve filtru znamená prázdná volba „vše“. Pod 768 px je písmo 16 px. Disabled má 60% průhlednost.

_Ručně přepsáno ze zdroje: app/globals.css (select styling), app/(app)/zakazky/filters.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
