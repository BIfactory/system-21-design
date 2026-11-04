# FormWizard

Multi-step formulář s validací per step, step UI nahoře, chybovými skoky zpět na konkrétní krok.

**Kdy:** když má flow víc než 1 obrazovku vstupu a kroky jsou volně na sebe navazující (jeden flow, není možné „rozstěhovat" pole do různých modálů). Typické: nová zakázka, předávací protokol, onboarding, konfigurace integrace.

**Dodáváš:** `steps: Step[]`, `onComplete(values)`, volitelně `onCancel`, `initialValues`.

- `Step = { id, title, description?, validate?: (ctx) => string[] | null, render: (ctx) => ReactNode }`.
- `ctx = { values, setValue(k, v), goNext(), goPrev(), goTo(i), step }`.
- `validate` vrací pole error messages (nebo `null`/`[]` když OK). Když je něco vráceno, `goNext` se neprovede — zobrazí se `.s21-wiz__errors` nad body.

**Chování:**

- Kliknutí na krok nahoře funguje jen zpět (nemůžeš přeskakovat dopředu bez validace).
- Předchozí kroky jsou „done" (zelený check), aktuální je „current" (primary), budoucí jsou neaktivní.
- Na posledním kroku tlačítko „Další" zmizí a nahradí ho „Dokončit", který vyvolá `onComplete(values)`.

**Pravidla:**

- Validuj **jen to, co je ve stepu** — nevyhazuj chybu z kroku 1 v kroku 3.
- Pokud validace vyžaduje asynchronní kontrolu (unique email, apod.), vrať synchronně validation errors (pre-check) a async kontrolu dělej v `onComplete`.
- Max 7 kroků. Víc = decompose do víc nezávislých forms.

_Nová komponenta (polepim/I, 2026-11-04). Vzor z `polepim-manager/app/(app)/protokoly/handover/novy/wizard.tsx`, bez signature/HEIC/photo specifik._
