# Tabs

Podtržené záložky pro přepínání pohledů na jeden záznam.

**Kdy:** v detailu záznamu (Realizace, Plán, Výkazy, Dokumenty, Fotky, Poznámky, Aktivita). Vkládají se do `PageHeader.tabs`.

**Dodáváš:** `items [{value, label, count?}]`, `value`, `onChange`.

**Pravidla:**

- Aktivní záložka má podtržení 2 px `primary` a text `ink`. Neaktivní jsou `ink-muted`, hover podtrhne `border`.
- Pořadí je podle frekvence použití, audit (Aktivita) vždy poslední.
- `count` v mono zobrazuje počet položek. Na mobilu záložky vodorovně scrollují.
- Aktivní záložka patří do URL (`?tab=`).

_Ručně přepsáno ze zdroje: app/(app)/zakazky/[id]/tabs.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
