# AIInputHelper

Tlačítko vedle inputu/textarea, které otevře popup s AI-generovanými variantami textu + Použít / Regenerovat.

**Kdy:** vedle polí, kde uživatel píše text (komentáře, odpovědi klientovi, poznámky, zprávy). Pomoc, ne nahrazení.

**Dodáváš:** `value` (aktuální text), `onSelect(newText)` (vybraná varianta), volitelně `variants` (pre-computed), `onGenerate(current)` (vrací Promise<string[]>), `label` (default „Vylepšit s AI").

**Chování:**

- První otevření bez `variants` → automaticky volá `onGenerate` (loading state).
- „Regenerovat" volá `onGenerate(value)` znovu.
- Klik na „Použít" u varianty volá `onSelect(text)` a zavře popup.

**Pravidla:**

- `onGenerate` musí vrátit Promise<string[]>. Na error vrať prázdné pole.
- Max 5 variant — víc nevejde a užívatel se v nich ztratí.
- Nedávej Helper na pole, kde je vstup kritický (hesla, čísla účtu). AI by neměl ovlivňovat citlivá data.

_Nová komponenta (polepim/M, 2026-11-04)._
