# AttachmentList

Řádkový seznam přiložených souborů: ikona typu, název, velikost, uploader, download/remove akce.

**Kdy:** na detail stránce (sekce „Soubory") a v Drawerech pro přílohy.

**Dodáváš:** `items: Attachment[]`, volitelně `onDownload(id)`, `onRemove(id)`, `compact`.

- `Attachment = { id, name, size?: number (B), mimeType?, thumbnailUrl?, uploadedBy?, uploadedAt?: string|Date, icon? }`
- Ikonu komponenta odvodí z `mimeType` (obrázek, pdf, text, …); `icon` prop override.
- `onDownload` / `onRemove` — pokud předáš, zobrazí se odpovídající icon-only tlačítko. Žádná callback = tlačítko schované.
- `compact` — jedna řádka bez meta; vhodné do RelationsSidebar.

**Pravidla:**

- Velikost formátuj přes interní `formatBytes` — konzistentní CS formát (`1,2 MB`, mezera-tisíce).
- Thumbnail (pokud `thumbnailUrl`) se v této verzi nezobrazuje — zůstává jen v API pro budoucí rozšíření o grid variantu.

_Nová komponenta (demo-prep/D, 2026-11-04)._
