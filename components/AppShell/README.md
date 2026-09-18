# AppShell

Kostra každé obrazovky: tmavé menu vlevo, bílá horní lišta nahoře a obsah pod ní; na mobilu menu v draweru.

**Kdy:** vždy. Jde o kořen každé přihlášené stránky.

**Dodáváš:** `sidebar` (hotový `<Sidebar/>`), `topbar` (hotový `<TopBar/>`) a `children` (obvykle `PageHeader` + `PageBody`).

**Pravidla:**

- Menu je přilepené na plnou výšku (`sidebar-width`). `TopBar` je přilepená nahoře v pravé části, `PageHeader` se přilepí pod ni (`topbar-h`). Obsah scrolluje s dokumentem.
- Pod 768 px se menu schová do draweru. Hamburger je vlevo v `TopBar`, pod otevřeným menu je ztmavení `overlay`.
- Pozadí obsahu je `canvas`. Karty a tabulky na něm leží jako `surface`.

_Ručně přepsáno ze zdroje: components/layout/mobile-shell.tsx, app/(app)/layout.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
