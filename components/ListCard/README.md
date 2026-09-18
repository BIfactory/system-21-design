# ListCard

Mobilní karta záznamu, která na telefonu nahrazuje řádek tabulky. Klik kamkoli na kartu otevře detail.

**Kdy:** pod 768 px u každého seznamu. Nejjednodušeji přes `DataTable` s propem `renderCard`: tabulka se pak na mobilu sama přepne na karty. Samostatně ji použij pro seznamy, které tabulku nemají.

**Dodáváš:**

- `title` (název záznamu) a `flags` (`Tag`y hned za názvem, například „Po termínu“).
- `meta` (kód · klient, jeden řádek se zkrácením).
- `actions` (1 až 2 malá tlačítka vpravo nahoře, například „Vykázat“ a ikona hotovo).
- `stats` (inline čísla dole: datum, marže, cena; důležité číslo v `<strong>`).
- `status` (`Badge` vpravo dole).
- `onClick` nebo `href`.

**Pravidla:**

- Rozložení podle Polepim Manageru: nahoře název a akce, pod linkou jeden řádek čísel a stav.
- Karty jsou pod sebou s mezerou `space-2`. Karta má `radius-xl` a padding `space-3`, hover obrys `primary`, při stisku `canvas`.
- Kliky na tlačítka uvnitř (`a`, `button`, `[data-no-row-click]`) detail neotevírají.
- Karta nemá zvláštní řádek jen pro akci. Akce jsou vždy v hlavičce, aby karta zůstala nízká.

_Ručně přepsáno ze zdroje: app/(app)/zakazky/mobile-order-card.tsx a mobilní karty v app/(app)/zakazky/page.tsx (hulinl/polepim-manager@19de5c8)._
