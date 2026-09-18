# Sidebar

Tmavé svislé menu jen pro pracovní navigaci: logo, rychlá akce, vyhledávání a sbalitelné sekce.

**Kdy:** jednou v `AppShell`. Na mobilu se stejná komponenta vykreslí v draweru, který otevírá hamburger v `TopBar`.

**Dodáváš:**

- `brand`: `{name, subtitle, logo, href}`. Logo je obrázek nebo SVG v rámečku 36 px a mění se se zákazníkem.
- `quickAction`: `{label, icon, onClick}`, zelené čtvercové tlačítko 40 px vpravo od loga (v originále skenování QR).
- `search`: obvykle `<SearchInput/>`, globální vyhledávání.
- `sections`: pole sekcí `{title?, collapsible?, items: [{href, label, icon?, badge?}]}`.
- `activeHref`, `onNavigate(item)`.
- `footer`: patička, standardně `<PoweredBy logo={…}/>`.

**Pravidla:**

- Nastavení, profil uživatele a odhlášení v menu nejsou. Patří do `TopBar` vpravo nahoře, aby menu zůstalo celé pro navigaci.
- První sekce je bez nadpisu a obsahuje denně používané položky s ikonou. Další sekce jsou sbalitelné s nadpisem v mono verzálkách.
- Aktivní položka má `sidebar-active-bg` a tučné písmo. Aktivní je vždy kořenová položka, i hluboko v detailu (hloubku ukazují `Breadcrumbs` v `TopBar`).
- Sekce s aktivní položkou je rozbalená. Uživatelovo sbalení nebo rozbalení vyhrává a v aplikaci se ukládá do `localStorage`.
- `badge` je počítadlo položek vyžadujících pozornost (`danger-solid`). Zobrazuje se jen, když je větší než 0.
- Tmavý sloupec menu vede vždy od horního po spodní okraj okna. Obsah menu je přilepený (sticky), takže při scrollu stránky zůstává na místě.
- Položky filtruj podle oprávnění role ještě před předáním do `sections`. Menu samo nic nefiltruje.

_Ručně přepsáno ze zdroje: components/layout/sidebar.tsx (hulinl/polepim-manager@19de5c8), přebarveno na System 21. Sekce Nastavení a profil přesunuty do TopBar._
