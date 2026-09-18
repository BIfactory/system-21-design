# StatTile

KPI dlaždice s mono popiskem, velkým číslem, volitelnou jednotkou a nápovědou.

**Kdy:** řada 3 až 6 KPI nad seznamem nebo na dashboardu. Dlaždice vkládej do mřížky `<div className="s21-stat-grid">` (nebo `s21-stat-grid s21-stat-grid--dense` pro 5 a víc hodnot, např. měsíce).

**Dodáváš:** `label`, `value` (naformátované číslo bez jednotky: „1 248 500“), `unit` („Kč“, „h“, „dní“), `hint`, `accent` (`primary` | `success` | `danger`) a `big`.

**Pravidla:**

- Číslo je Manrope 800, `tabular-nums`, a **nikdy se nezalamuje ani nezkracuje**. Velikost se přizpůsobí šířce dlaždice: 24 px až 16 px, u `big` 30 px až 20 px.
- Jednotka je menší (0.6 em, min. 12 px) v `ink-muted`. Jen v hodně úzké dlaždici smí přejít pod číslo.
- Procenta a znaménka nech ve `value` („+27 %“).
- `success` a `danger` použij jen tehdy, když hodnota opravdu znamená dobrý nebo špatný stav. `primary` slouží ke zvýraznění. V řadě je nejvýš jedna dlaždice `big`.

_Ručně přepsáno ze zdroje: app/(app)/dashboardy/page.tsx (Stat) (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
