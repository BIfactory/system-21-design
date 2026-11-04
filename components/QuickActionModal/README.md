# QuickActionModal

Malý contextual dialog pro akce na záznamu bez navigace. Menší a lehčí než `Modal`.

**Kdy:** když chceš uživateli nabídnout akci (vykázat hodiny, přidat poznámku, odeslat k podpisu…) **bez otevření celé obrazovky**. Typické pro row actions v tabulce nebo header actions na detailu.

Rozdíl proti `Modal`:
- Menší max-width (sm=460px, md=620px).
- Lehčí hlavička (ikona + title + description, bez X v rohu — uzavírá se jen footer tlačítky).
- Víc „popup" charakter než „stránka v stránce".

**Dodáváš:** `open`, `onClose`, `title`, volitelně `description`, `icon`, `size` (`"sm"` default), `children` (obsah), `footer` (tlačítka).

**Klávesnice:** `Escape` zavře. Click na overlay zavře.

**Pravidla:**

- Max 2 tlačítka ve footer (Zrušit vlevo, Confirm vpravo).
- Obsah by měl být **1 formulář / 1 akce**. Pokud máš víc kroků → `FormWizard` nebo plný `Modal`.
- Když uživatel klikne Confirm, zavři ho a zobraz `Toast` s potvrzením. Nenech ho čekat v otevřeném stavu, pokud akce selže → namísto toho vykresli chybu v těle.

_Nová komponenta (polepim/H, 2026-11-04). Vzor z `polepim-manager/app/(app)/zakazky/quick-log-modal.tsx`._
