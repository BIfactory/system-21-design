# NotificationCenter

Bell icon v TopBar s dropdown panelem obsahujícím seskupené notifikace. Má counter nepřečtených, mark-all-read a optional "zobrazit všechna".

**Kdy:** v TopBar jako standard pattern pro notifikace. Standalone (ne součást TopBar) — předává se přes `extra` prop do TopBar.

**Dodáváš:** `notifications`, volitelně `onMarkAllRead`, `onNavigate`, `onClick`.

- `Notification = { id, title, description?, icon?, tone?, time?, group?, read?, href? }`
- `group` — string (Dnes / Včera / Dříve); komponenta vlastní grupování podle této hodnoty.
- `tone` — ikonka barva: `primary | success | warning | danger` (default neutral).
- `onClick(n)` — volá se při kliku na item.
- `onNavigate(n)` — volá se když user klikne „Zobrazit všechna" (dostane `{ href: "/oznameni" }`) nebo item s href.
- `onMarkAllRead()` — bez argumentů; parent updatuje pole.

**Pravidla:**

- Max 20 notifikací v dropdownu — víc by měl user jít na samostatnou stránku.
- Nepřečtené mají modrý dot a jemně primary-soft podklad.
- Nikdy neukazuj víc než 3-řádkový description (`-webkit-line-clamp` není nastaveno — volajicí si musí kontrolovat délku).

_Nová komponenta (polepim/N, 2026-11-04)._
