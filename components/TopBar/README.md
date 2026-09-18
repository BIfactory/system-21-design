# TopBar

Bílá horní lišta nad obsahem: vlevo drobečková navigace, vpravo tři ikony (nastavení, profil, odhlášení).

**Kdy:** na každé přihlášené stránce. Předává se do `AppShell` přes prop `topbar`, takže ji nevkládáš do každé stránky zvlášť, jen jí měníš drobečky.

**Dodáváš:**

- `breadcrumbs`: `<Breadcrumbs items={…}/>` s aktuální cestou. Místo nich lze předat jen `title`.
- `settings`: `{groups: [{title, items: [{href, label, badge?}]}], activeHref?, onSelect?(item)}`, obsah menu pod ozubeným kolem. Skupiny: Uživatelé a role, Ceníky, Číselníky, Provoz. Položky filtruj podle role předem. Neadmin bez nastavení dostane `settings` prázdné, ikona se pak nezobrazí.
- `user`: `{name, role, href?, links?: [{label, href, icon?, onClick?}]}`. Avatar ukazuje iniciály, menu jméno, roli a odkazy (výchozí „Můj profil“).
- `onLogout`: ikona odhlášení vpravo.
- `extra`: volitelně další ikony před ozubeným kolem (např. notifikace).
- `brand` (`{name, logo, href}`) a `quickAction` (`{label, icon, onClick}`): použijí se jen na mobilu v tmavé liště.

**Pravidla:**

- Výška `topbar-h` (56 px), podklad `surface`, spodní linka `border`. Je přilepená nahoře a `PageHeader` se přilepí pod ni.
- Ikony mají 20 px v tlačítku 36 px (`control-h`) a barvu `ink-muted`, při hoveru nebo otevřeném menu `ink` na `surface-muted`. Každá má `aria-label` a `title`.
- Pořadí vpravo je vždy: nastavení → profil → odhlášení.
- Když něco v nastavení vyžaduje pozornost (`badge` > 0), ukáže se na ozubeném kole červená tečka `danger-solid` a v menu počítadlo u položky.
- Menu se zavírá klikem mimo, klávesou Esc a výběrem položky. Stín `shadow-lg`, zarovnání k pravému okraji.
- **Mobil (< 768 px), podle Polepim Manageru:** nahoře je tmavá lišta 48 px (`topbar-h-mobile`) s hamburgerem vlevo, logem a názvem uprostřed a vpravo zelenou rychlou akcí a avatarem. Pod ní je bílý řádek drobečků 36 px (`crumbbar-h`) s „‹ rodič“. Na kořenové stránce (drobečky s jedinou úrovní) se řádek skryje.
- Na mobilu mizí ozubené kolo i ikona odhlášení. Nastavení a „Odhlásit se“ jsou v menu avatara a tečku upozornění nese avatar. Menu se otevírá přes celou šířku displeje.
- Lišta respektuje výřez a zaoblené rohy iPhonu (`safe-area-inset-*`).

_Nová komponenta System 21. Obsah menu nastavení a profilu vychází z components/layout/sidebar.tsx (hulinl/polepim-manager@19de5c8)._
