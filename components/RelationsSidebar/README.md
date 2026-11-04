# RelationsSidebar

Pravý sloupec na detailu záznamu: propojené záznamy (dokumenty, úkoly, kontakty, nedávná aktivita).

**Kdy:** na detail stránce (klient, smlouva, zakázka, projekt) jako sidebar pravého sloupce. Hlavní obsah zůstává vlevo (karty se sekcemi), vpravo jsou „kolem čeho se to točí". Minimum 240 px, maximum 320 px šířky.

**Dodáváš:** `sections: Array<{ title, count?, items, action? }>`.

- `title` — krátký nadpis sekce v mono verzálkách (`DOKUMENTY`, `ÚKOLY`).
- `count` — počet záznamů v chippu vedle titulku. Pokud je seznam zkrácený (víc záznamů než items), count to řekne.
- `items: Array<{ icon?, label, meta?, href? }>` — jednotlivé záznamy. `meta` je sekundární text (velikost, datum), `href` z nich udělá odkaz.
- `action: { label, icon?, onClick }` — volitelné tlačítko dole sekce (např. „Přidat dokument").

**Pravidla:**

- Nejvýše 3–5 položek na sekci; víc = odkaz „Zobrazit všechny" přes `action`.
- Nejnovější nahoře v každé sekci (kromě dokumentů, kde může být pořadí dané relevancí).
- Když sekce nemá položky, zobrazí se „Nic k zobrazení" — nerenderuj sekci bez items jen proto, abys zachoval konzistenci; vyhoď ji úplně.

_Nová komponenta (demo-prep/C, 2026-11-04)._
