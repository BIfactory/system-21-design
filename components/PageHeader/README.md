# PageHeader

Přilepená bílá hlavička stránky s titulkem, popisem, akcemi vpravo a záložkami.

**Kdy:** nahoře na každé stránce, hned pod `TopBar`.

**Dodáváš:** `title`, volitelně `description`, `actions` (tlačítka, nejvýš jedno `primary`), `tabs` (`<Tabs/>`) a `sticky` (výchozí `true`). Prop `breadcrumbs` zůstává jen pro aplikace bez `TopBar`. Standardně drobečky patří do `TopBar`.

**Pravidla:**

- Titulek je `page-title` (Manrope 24 px, na mobilu 16 px), jednořádkový se zkrácením. Shoduje se s poslední úrovní drobečků.
- Popis je `ink-muted` a na mobilu se skrývá.
- Akce jsou vpravo, primární tlačítko je poslední (nejvíc vpravo). Na mobilu se zalomí pod titulek.
- Záložky leží v hlavičce, takže při scrollu drží spolu s titulkem. Přilepená hlavička má `shadow-sm` a drží se pod `TopBar`.

_Ručně přepsáno ze zdroje: components/layout/page-header.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
