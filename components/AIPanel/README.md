# AIPanel

Pravý fixed panel s chat UI pro AI asistentku: hlavička s title + context, scrollable messages, input dole, volitelné suggested prompts.

**Kdy:** když chceš uživateli dát přístup k AI pomocníkovi kontextuálně na stránce. Panel má šířku 440 px, drží se vpravo, překryje část obsahu stránky (backdrop). Pro globální asistentku stačí jeden Panel v root AppShellu, pro per-screen kontext se znovu-otevírá s jiným `context`.

**Dodáváš:** `open`, `onClose`, volitelně `title` (default „AI asistentka"), `context`, `suggestedPrompts`, `messages`, `onSend`, `loading`.

- `context = { label, value }` — malý řádek pod title („Pracuji s: ZAK-131").
- `suggestedPrompts = Array<{ label, prompt, icon? }>` — zobrazí se, dokud `messages` je prázdná.
- `messages = Array<{ id, role: "user"|"assistant", content, timestamp? }>` — chat bubliny.
- `onSend(prompt: string)` — volá se při Enter v inputu nebo kliku na suggested prompt.
- `loading` — zobrazí animované tečky jako „AI přemýšlí".

**Pravidla:**

- Nerenderuj sám streaming odpovědi — plný text po `onSend` výsledku. Pro streaming update `messages` iterativně.
- Nedávej do hlavičky akce („Nová konverzace"); kontext se mění zavřením + znovu-otevřením.
- `suggestedPrompts` max 4 položky.

_Nová komponenta (polepim/M, 2026-11-04)._
