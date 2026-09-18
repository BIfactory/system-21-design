# Modal

Dialog nad obsahem s hlavičkou, obsahem a patičkou s akcemi.

**Kdy:** krátké formuláře (založení záznamu), potvrzení mazání, náhledy. Delší editace patří na vlastní stránku.

**Dodáváš:** `open`, `onClose`, `title`, `description`, `size` (`sm` 384 | `md` 448 | `lg` 672), `children` a `footer` (akce: `secondary` Zrušit, pak `primary`).

**Pravidla:** zavírá se Esc, klikem mimo a křížkem. Po dobu otevření blokuje scroll stránky. Bez `backdrop-filter` (rozbíjí iOS). `inline` slouží jen pro náhledy.

_Ručně přepsáno ze zdroje: components/ui/modal.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
