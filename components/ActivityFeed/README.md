# ActivityFeed

Vertikální feed aktivit: kdo něco udělal, co, s čím, kdy.

**Kdy:** jako widget na dashboardu („Deník dne"), na detailu záznamu (záložka Aktivita) nebo v `RelationsSidebar` jako sekce „Nedávná aktivita".

**Dodáváš:** `items: Array<{ id, actor: {name, avatarUrl?}, action, target?, timestamp, icon? }>`.

- `actor.name` — kdo akci udělal; `avatarUrl` je nepovinný, jinak se vygeneruje kruh s iniciálami.
- `action` — slovesná fráze malým písmem („založil zakázku", „podepsala smlouvu"). Bez tečky.
- `target` — co se akcí dotklo; zobrazuje se barevně jako odkaz (vizuálně). Pokud `action` je samonosná („upozorňuje: 3 smlouvy vyprší"), `target` nemusí být.
- `timestamp` — buď string („před 12 min", „včera") nebo `Date`. V případě `Date` komponenta sama formátuje relativní čas v CS.
- `icon` — když je **systémová akce** (ne člověk), předej ikonu místo avataru (např. `bell`, `refresh`, `cloud`).

Volitelné: `empty` (vlastní empty state místo výchozího), `max` (zobrazit jen prvních N).

**Pravidla:**

- Nejnovější nahoře.
- Nepoužívej `ActivityFeed` jako log; **je to deník, ne audit**. Pro auditní stopu vytvoř samostatnou tabulku.
- Avatar vlevo (28 px), text uprostřed, čas vpravo jako sekundární řádka.

_Nová komponenta (demo-prep/B, 2026-11-04)._
