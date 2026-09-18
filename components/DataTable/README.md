# DataTable

Tabulka v kartě s mono záhlavím, řazením, klikacími řádky a akcemi.

**Kdy:** každý seznam záznamů na desktopu. Pod 768 px ho nahraď kartami se stejnými daty.

**Dodáváš:**

- `columns [{key, label, sortable?, align?, numeric?, width?, render?(row)}]`, `rows`, `rowKey`.
- `sort {key, dir}` + `onSort(key, dir)`, `onRowClick(row)`, `empty` (text prázdného stavu), `minWidth` (od něj se tabulka vodorovně scrolluje).

**Pravidla:**

- V prvním sloupci je název (`s21-cell-title`) a pod ním meta řádek (`s21-cell-meta` s `s21-cell-code`).
- Čísla jsou vpravo s `numeric`. Kladná v `s21-pos`, záporná v `s21-neg`, prázdná „—“.
- Stav je `Badge fitCell`, rizika `Tag`.
- Akce jsou v posledním sloupci jako ikonová tlačítka `sm` v obalu s `data-no-row-click`.
- Záhlaví je `paper` + `label` verzálkami, řádky oddělené `border`, hover `primary-soft`.
- Pod tabulkou vždy `Pagination`.

_Ručně přepsáno ze zdroje: app/(app)/zakazky/page.tsx, app/(app)/zakazky/row.tsx, components/ui/sortable-th.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
