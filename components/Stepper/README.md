# Stepper

Kroky průvodce jako pilulky s číslem; hotové se zaškrtnou.

**Kdy:** vícekrokové formuláře (protokol předání, nová zakázka), vždy nad obsahem kroku.

**Dodáváš:** `steps` (popisky), `current` (od 1) a `onGoTo(step)`.

**Pravidla:** aktivní krok je `primary`, hotový `success-*` s fajfkou, budoucí bílý. Na mobilu kroky vodorovně scrollují. Kroky pojmenovávej podstatným jménem („Klient“, „Rozsah“).

_Ručně přepsáno ze zdroje: components/protocols/wizard-stepper.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
