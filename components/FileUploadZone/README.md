# FileUploadZone

Drag & drop zóna + click file picker s per-file progress a error state.

**Kdy:** pokud má uživatel nahrát jeden nebo víc souborů. Alternativa k jednoduchému `FileDrop` (který je jen vstupní prvek). FileUploadZone navíc řeší vizualizaci progressu a per-file chyby.

**Dodáváš:** `onFiles(files)` (callback vracející Promise), volitelně `accept`, `multiple` (default true), `maxSize` (v bytech), `children` (vlastní prompt text).

- `onFiles` je volán pro každý nový batch souborů. Pokud Promise selže, konkrétní soubor dostane status `failed` + error message; ostatní pokračují nezávisle.
- Kontrola `maxSize` proběhne před `onFiles` — přesáhlé soubory se nikdy nepošlou.

**Pravidla:**

- `onFiles` je **asynchronní** — vždy vrať Promise (i prázdnou). Komponenta podle resolve/reject nastaví per-file status.
- Chyba na jednom souboru nezastaví ostatní. Error isolace byla hlavní důvod existence této komponenty (vs. jednodušší `FileDrop`).
- Nenazývej soubory podle MIME typu — zobrazuj název souboru. Typová ikona je pro ikonu, ne pro název.

_Nová komponenta (polepim/I, 2026-11-04). Vzor z `polepim-manager/app/(app)/zakazky/[id]/documents-upload-client.tsx`._
