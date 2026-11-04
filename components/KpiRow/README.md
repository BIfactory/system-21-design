# KpiRow

Grid wrapper pro řadu `StatTile` dlaždic.

**Kdy:** vždy, když ukládáš 2–6 KPI vedle sebe. Je to tenká obálka — vyřeší responsivní šířku sloupců (desktop 2/3/4/6 col, mobil 1–2 col) a konzistentní rozestupy. Alternativa k původní třídě `.s21-stat-grid`.

**Dodáváš:** `cols` (`2 | 3 | 4 | 6`, default = auto fit na min 180 px). Jako `children` dávej `StatTile` komponenty.

**Pravidla:**

- V jedné řadě je **nejvýš jedna dlaždice `big`** (viz pravidla StatTile).
- Když chceš sekundární řadu (např. měsíce), použij druhý `<KpiRow cols={6}>` pod první.
- Na mobilu se `cols={3}` a víc kolabují na 2 sloupce, `cols={2}` na 1 sloupec.

_Nová komponenta (demo-prep/B, 2026-11-04). Nahradí postupně ad-hoc `div.s21-stat-grid` v existujících obrazovkách — oba vzory fungují, ale KpiRow je deklarativní._
