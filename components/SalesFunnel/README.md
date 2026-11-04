# SalesFunnel

Responsive pipeline vizualizace: desktop = horizontal trapezoid chain, mobile = stacked bars s % šířkou.

**Kdy:** když chceš vizualizovat průchod záznamů několika stavy workflow (sales pipeline, approval workflow, status of batch) a umožnit klikání na stav → filtruje list pod.

**Dodáváš:** `stages: Array<{ id, label, count, value?, color? }>`, volitelně `value` (aktuálně vybraný stage id), `onChange(id | null)`, `title`, `className`.

- `color` — CSS hodnota (např. `"var(--primary)"`, `"#d97706"`). Když chybí, použije se `--primary`.
- `onChange` — druhý klik na stejný stage vynuluje výběr (předá `null`).

**Chování:**

- Šířka trapezoidu každé stage je proporcionální k nejvyššímu count v setu (největší stage = 100 % šířky viditelné plochy, ostatní poměrné).
- Minimální šířka stage je 16 % (desktop) / 6 % (mobile), aby stage s malým count byly čitelné.
- Hover zvýrazní stage; active (vybraný) má podtržení.

**Pravidla:**

- Max 7 stages. Víc se nevejde ani na desktop ani na mobile.
- `count` je povinný int; `value` je prezentační string (žádná matematika).
- Nepoužívej pro status badges — to je WorkflowBadge.

_Nová komponenta (polepim/J, 2026-11-04). Vzor převzat z `polepim-manager/app/(app)/zakazky/sales-funnel.tsx`, zobecněn._
