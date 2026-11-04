# AISuggestion

Karta s AI-generovaným návrhem akce: ikona, title, description, Accept/Dismiss tlačítka.

**Kdy:** na dashboardu, v row actions, v detail stránkách. Krátký kontextuální popud („Vykázat hodiny?", „Odpovědět klientovi?", „3 smlouvy expirují"). Doporučení, ne příkaz.

**Dodáváš:** `title` (povinné), volitelně `description`, `confidence` (0–100 %), `actions` (ReactNode — typicky 1–3 Button), `dismissed` + `onDismiss` (pokud chceš dismiss ovládat z parentu).

- AI vizuální identita je nezávislá na brandu — gradient modrá/fialová/tyrkys, aby i v brandech s modrým `primary` AI vypadal odlišně.
- `confidence` je informační — nezobrazuj v produktu bez vysvětlení.

**Pravidla:**

- Dismiss musí být vždy možný, pokud návrh není ultra-důležitý. Agresivní „must accept" UX je anti-pattern.
- Max 2 actions. Víc → suggest je spíš feature, patří do plného UI.
- Nekombinuj víc AISuggestion vedle sebe — maximalně 2–3 na obrazovce, jinak unavuje.

_Nová komponenta (polepim/M, 2026-11-04)._
