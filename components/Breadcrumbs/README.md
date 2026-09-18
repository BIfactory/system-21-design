# Breadcrumbs

Vodorovná drobečková navigace v horní liště `TopBar`: ukazuje úrovně, kam se uživatel proklikal, a umožní se na kteroukoli vrátit.

**Kdy:** na každé stránce hlouběji než první úroveň, například v detailu zakázky, operaci zakázky nebo verzi dokumentu. Na kořenové stránce ukazuje jen jednu úroveň („Zakázky“). Vkládá se do `TopBar` přes prop `breadcrumbs`.

**Dodáváš:**

- `items`: pole úrovní `[{label, href, icon?}]` od kořene po aktuální stránku. Kořen je položka menu (Zakázky), další úrovně jsou názvy záznamů a pohledů.
- `onNavigate(item, index)`: pro klientský router. Bez něj fungují běžné odkazy `href`.
- `maxVisible` (výchozí 4): nad tento počet se prostřední úrovně sbalí do „…“ s rozbalovacím seznamem.
- `compact`: vynutí mobilní podobu „‹ rodič“. Pod 768 px se zapíná sama.

**Pravidla:**

- Poslední úroveň je aktuální stránka: `ink`, tučně, `aria-current="page"`, není klikací a shoduje se s titulkem v `PageHeader`.
- Ostatní úrovně jsou odkazy v `ink-muted`, při hoveru `ink` na `surface-muted`. Oddělovač je šipka › v `ink-subtle`.
- Dlouhé názvy se zkracují (max. 220 px, aktuální 320 px), celý text je v `title`.
- Záložky (`Tabs`) nejsou úrovní. Úrovní se stanou, až když z nich uživatel proklikne na podřízený záznam.
- Úroveň nese kód i název záznamu („ZAK-2026-0131 Napojení ERP → CRM“), aby byla rozpoznatelná i po zkrácení.
- Minimalisticky: bez rámečků a podkladu, písmo `small` 12 px, zabírá jeden řádek.

_Ručně přepsáno ze zdroje: nová komponenta System 21 (nahrazuje components/layout/back-link.tsx) (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
