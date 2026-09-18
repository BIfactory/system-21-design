# Button

Tlačítko ve čtyřech variantách a třech velikostech, volitelně s ikonou nebo jen jako ikona.

**Kdy:** pro každou akci. Navigaci řeš odkazem.

**Dodáváš:** `variant` (`primary` | `secondary` | `ghost` | `danger`), `size` (`sm` 28 px | `md` 36 px | `lg` 48 px), `icon` (název z `Icon`), `iconOnly` + `aria-label` + `title`, `children` a běžné atributy `<button>`.

**Pravidla:**

- `primary` jen jednou na obrazovku (hlavní akce stránky nebo modalu).
- `secondary` pro „Zrušit“, „Upravit“ a export. `ghost` pro méně důležité akce v kartách. `danger` pro mazání, vždy s potvrzením v `Modal`.
- Ikonová tlačítka v tabulkách jsou `sm`.
- Disabled má 50% průhlednost a kurzor „not-allowed“. Proč je akce nedostupná, vysvětli v `title`.

_Ručně přepsáno ze zdroje: components/ui/button.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
