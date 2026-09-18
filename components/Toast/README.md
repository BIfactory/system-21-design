# Toast

Krátké potvrzení nebo chyba vpravo nahoře, po 4 s zmizí.

**Kdy:** výsledek akce („Zakázka uložena.“, „Synchronizace selhala…“).

**Dodáváš:** obal aplikace v `<ToastProvider>`, pak `const t = useToast(); t.success("…")`, `t.error("…")`, `t.info("…")`. Komponentu `Toast` lze vykreslit i samostatně (`tone`, `message`, `onDismiss`).

**Pravidla:** jedna věta s tečkou. Chyba říká, co udělat. Tón nese ikona i barva. Nepoužívej ho pro informace, které musí uživatel potvrdit (na to je `Modal`).

_Ručně přepsáno ze zdroje: components/ui/toast.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21._
