# CommentThread

Vertikální diskuse pod záznamem: komentáře, replies (1 úroveň), reactions, formulář pro přidání.

**Kdy:** na detail stránce záznamu (smlouva, zakázka, dokument, úkol) jako sekce „Komentáře" nebo samostatná záložka.

**Dodáváš:** `items: Comment[]`, volitelně `onAdd(text)` a `currentUser`.

- `Comment = { id, author, avatar?, text, createdAt: string|Date, replies?: Comment[], reactions?: Record<string, number> }`
- `onAdd` — pokud předáš, pod seznamem se zobrazí Textarea + Odeslat. Jinak jen read-only.
- `currentUser: { name, avatar? }` — pro avatar ve formuláři.

**Pravidla:**

- Jen jedna úroveň replies. Hluboké nesting = Slack, ne System 21.
- `text` je plain text s `white-space: pre-wrap`. Žádný markdown parser v knihovně (pokud bude třeba, přidá se externě přes `Markdown` komponentu, kterou aplikace musí vlastnit).
- Reactions je read-only ukazatel (emoji + count); klikání na reakce ani přidávání nových reakcí v této verzi není.

_Nová komponenta (demo-prep/D, 2026-11-04)._
