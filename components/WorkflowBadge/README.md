# WorkflowBadge

Badge s mapou na stav workflow. Tenký wrapper nad `Badge`, který ví, jaký tone a label patří k jakému stavu.

**Kdy:** vždy, když ukazuješ stav záznamu v workflow — sloupec „Stav" v tabulce, hlavička detailu, filter chip. Nepoužívej `Badge` ručně pro workflow stavy — ztratíš konzistenci napříč moduly.

**Dodáváš:** `state` (povinný) a volitelně `label` (přepíše defaultní český text) a `fitCell` (pro použití v DataTable buňce).

**Stavy:**

| state | tone | default label |
|---|---|---|
| `draft` | neutral | Rozpracováno |
| `offer` | primary | Nabídka |
| `negotiation` | warning | V jednání |
| `in-progress` | primary | Realizace |
| `win` | success | Výhra |
| `done` | success | Hotovo |
| `loss` | danger | Prohra |
| `blocked` | danger | Blokováno |
| `overdue` | danger | Po termínu |

**Pravidla:**

- Když pro tvůj workflow chybí stav, nejprve ho přidej do mapy (upravuj WORKFLOW_MAP v knihovně), ne přepisuj `label` ad-hoc. Konzistence napříč moduly je cennější než rychlost.
- `label` override jen pro doménově specifické varianty téhož stavu (např. „V jednání · pojištění" vs. „V jednání · energie").

_Nová komponenta (demo-prep/C, 2026-11-04)._
