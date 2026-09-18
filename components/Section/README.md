# Section

Bílá karta sekce s nadpisem, akcí vpravo a volitelně rozbalitelným detailem.

**Kdy:** bloky dashboardu a obsahu záložek v detailu.

**Dodáváš:** `title`, `subtitle`, `action` (tlačítko `ghost sm` nebo odkaz), `children`, `detail` + `detailLabel` + `defaultOpen`.

**Pravidla:** detail se rozbaluje přes `<details>` („Rozbalit rozpad po klientech“). Karty neukládej do sebe, uvnitř použij `StatTile` nebo tabulku.

_Ručně přepsáno ze zdroje: components/layout/dashboard-section.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
