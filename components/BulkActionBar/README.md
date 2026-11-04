# BulkActionBar

Floating bar u spodku viewportu se zobrazí, když je vybráno aspoň jedno. Nese počet + seznam akcí + tlačítko pro zrušení výběru.

**Kdy:** když má uživatel na seznamu možnost vybrat víc záznamů naráz a potom udělat akci (označit hotové, delegovat, smazat).

**Dodáváš:** `count` (povinné), `actions: Array<{ label, icon?, variant?, onClick }>`, volitelně `onClear`, `label` (default „vybráno") a `className`.

- Když `count ≤ 0`, komponenta nic nevykreslí.
- `actions` — buttony v baru jsou vždy `size="sm"`; `variant` default `secondary`. Použij `variant: "danger"` pro destruktivní akce (smazat).
- `onClear` → vypne výběr na parent straně (jen ikonu „zavřít" vedle).

**Pravidla:**

- Max 4 akce — víc rozbije mobilní zobrazení.
- Selection state **drží parent**, tahle komponenta je čistě prezentační.
- Pro bulk akce v DataTable: `<DataTable selectable selected={...} onSelectedChange={setSelected} />` nad ní `<BulkActionBar count={selected.length} onClear={() => setSelected([])} actions={[...]} />`. Nekombinuj s interním DataTable `bulkActions` propem (ten je legacy varianta inline v tabulce).

_Nová komponenta (polepim/J, 2026-11-04)._
