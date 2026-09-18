# StickyActionBar

Mobilní lišta přilepená ke spodku obrazovky se souhrnnou hodnotou a akcí (nebo stavem ukládání).

**Kdy:** jen na mobilu, v detailu nebo formuláři, kde uživatel mění hodnoty a potřebuje stále vidět výsledek (například cenu zakázky) nebo hlavní akci. Na desktopu se nezobrazuje.

**Dodáváš:** `label` (mono popisek, například „Cena bez DPH“), `value` („312 000 Kč“), `note` (stav: „Ukládám…“), `action` (jedno tlačítko `primary`). Prop `inline` slouží jen pro náhled.

**Pravidla:**

- Lišta je bílá s horní linkou a jemným stínem nahoru a drží spodní bezpečnou zónu iPhonu.
- Pod obsahem vloží prázdné místo 80 px, aby lišta nic nepřekrývala.
- Zobrazuj ji jen tehdy, když má smysl (neuložené změny, rozpracovaný formulář), ne trvale.

_Ručně přepsáno ze zdroje: sticky bottom bar v app/(app)/zakazky/[id]/order-detail-client.tsx (hulinl/polepim-manager@19de5c8)._
