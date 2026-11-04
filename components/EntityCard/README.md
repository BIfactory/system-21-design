# EntityCard

Reusable karta pro jakoukoli entitu — klient, projekt, dokument, smlouva, osoba.

**Kdy:** v mřížce záznamů (CRM Klienti, DMS Smlouvy), jako widget v RelationsSidebar nebo v detail-tabu ("hlavní kontakt" box). Alternativa k `DataTable`, když chceš vizuální přehled místo řádkového seznamu.

**Dodáváš:**
- `title` (povinný) — jméno entity. Nezalamuje se, truncate.
- `subtitle` — typ + stav + meta („Rodina · 4 členové · aktivní").
- `icon` — buď string (ikon z knihovny) nebo libovolný `ReactNode` (avatar, firemní logo).
- `meta: Array<{ label, value }>` — až 4 řádky klíč-hodnota. Klíč je mono verzálky (`.label`), hodnota tabular-nums.
- `tags: Array<{ label, tone? }>` — štítky dole, nejvýš 3.
- `actions` — `ReactNode`, typicky řada icon-only tlačítek. Kliknutí na ně se nepropaguje na kartu (má `data-no-row-click`).
- `onClick` — pokud zadáš, karta se stane `<button>` (focusable, clickable); jinak je `<div>`.
- `accent` — `primary | success | warning | danger` levý okraj; použij, když stav nese **informaci** (VIP, risk, nový).

**Pravidla:**

- Max 3 tagy. Víc = EntityCard není správná volba, použij detail stránku.
- Když má karta `onClick`, nedávej do `actions` prvky bez `data-no-row-click` — překryjí se.
- Meta hodnoty jsou krátké (jedno číslo + jednotka, jedno jméno, datum). Delší text patří do subtitle.

_Nová komponenta (demo-prep/C, 2026-11-04)._
