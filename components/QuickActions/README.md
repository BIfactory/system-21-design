# QuickActions

Mřížka tlačítek s ikonou a popiskem pro nejčastější akce („Nová zakázka", „Nový úkol"…).

**Kdy:** na dashboardu nad feedem, případně jako widget na module home. Není náhrada za primární tlačítko v `PageHeader` — to drží jednu akci relevantní pro aktuální obrazovku. QuickActions nabízí zkratky napříč systémem.

**Dodáváš:** `actions: Array<{ label, icon?, href?, onClick?, badge? }>` a volitelně `cols` (default 3, mobile vždy 2).

- `href` vs. `onClick` — pokud zadáš `href`, komponenta se vyrenderuje jako `<a>` (SPA router si to zpracuje); jinak jako `<button>`.
- `badge` — číslo v rohu („3 nové dokumenty"); používej střídmě, ne na každém tlačítku.

**Pravidla:**

- 6–9 položek max. Víc = seznam, ne mřížka.
- Label je **sloveso v infinitivu** nebo krátká akce („Vykázat práci", „Importovat"), ne podstatné jméno.
- Ikony z existujícího Icon setu. Pro moduly: `plus` (nová obecně), `tasks`, `file`, `user-plus`, `paperclip`, `users`, `building`, `mail`, `send`.
- Když `actions.length === 0`, komponenta se nevykreslí (žádný empty state).

_Nová komponenta (demo-prep/B, 2026-11-04)._
