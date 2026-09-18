# Badge

Stavová pilulka s tečkou; barvu přebírá z číselníku stavů nebo z tónu.

**Kdy:** stav záznamu v tabulce, kartě nebo hlavičce (Nabídka, Výhra, Realizace, Hotovo).

**Dodáváš:**

- `children`: text stavu, vždy přítomný.
- `color` (hex z číselníku, např. z CRM) nebo `tone` (`neutral` | `success` | `warning` | `danger` | `primary`).
- `fitCell`: vyplní šířku buňky a zkrátí text.

**Pravidla:**

- Podklad je barva stavu na 13 %, obrys na 33 %, text a tečka v plné barvě.
- Na jeden záznam patří jeden stav. Doplňující příznaky jsou `Tag`.
- Bez barvy je `neutral-status`.

_Ručně přepsáno ze zdroje: components/ui/badge.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
