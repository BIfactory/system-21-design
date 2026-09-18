System 21 je společný základ interních a zákaznických aplikací BIfactory. Pevná je **struktura**: rozvržení, navigace, tlačítka, tabulky, formuláře a stavy. Barvy, logo a název aplikace se u každé implementace mění podle zákazníka. Tato verze nese značku BIfactory (demo).

## Jak systém používat

- Každou obrazovku postav v `AppShell`: vlevo `Sidebar` (jen navigace), vpravo nahoře `TopBar` (drobečky, nastavení, profil, odhlášení), pod ní `PageHeader` a pak `PageBody`. Jiné rozvržení nevymýšlej.
- Barvy, rozestupy a zaoblení ber jen z tokenů (`var(--primary)`, `var(--space-4)`, `var(--radius-xl)`). Hex kódy ani Tailwind barvy nepiš přímo do komponent.
- Pro nového zákazníka změň jen značkové tokeny: `primary`, `primary-hover`, `primary-active`, `on-primary`, `primary-text`, `primary-soft`, `focus-ring`, `accent`, `on-accent`, `ink`, `black` (a tím i `sidebar-bg`). Dál vyměň logo v `Sidebar.brand` a případně rodiny písma `display` a `body`. Struktura, rozestupy, stavové barvy a komponenty zůstávají.
- Po přebarvení ověř kontrast: text na `primary` alespoň 4.5:1, `focus-ring` alespoň 3:1 na `surface` i `sidebar-bg`. Světlou značkovou barvu kombinuj s tmavým `on-primary`.

## Obsah a tón

Mluvíme jako kolega: konkrétně, věcně, česky, bez korporátních frází a bez emoji v UI.

- Popisek tlačítka je sloveso v infinitivu nebo krátká akce: „Uložit“, „Nová zakázka“, „Označit hotovo“, „Vykázat práci“. Ne „Potvrdit akci“ ani „OK“.
- Titulky stránek jsou podstatná jména v množném čísle („Zakázky“, „Úkoly“, „Dokumenty“), detail nese název záznamu („ZAK-2026-0131 Napojení ERP → CRM“).
- Popisky, záhlaví a nadpisy piš velkým jen prvním písmenem („Dokončené k fakturaci“). Verzálky patří jen do mono popisků (`label`, `eyebrow`), a to přes CSS, ne v textu.
- Prázdné stavy řeknou, co se stalo, a nabídnou další krok: „Zatím žádné články. Založte první článek s postupem, který se v týmu opakuje.“
- Chybové hlášky řeknou, co selhalo, a co udělat: „Synchronizace s CRM selhala. Zkuste to znovu.“
- Čísla: mezera jako oddělovač tisíců, „Kč“ za číslem (`184 000 Kč`), procenta s mezerou (`+32 %`), datum `12. 05. 2026`. Ve sloupcích tabulek vždy `tabular-nums`.

## Barvy

Poměr ploch podle brand manuálu **60 / 30 / 10**: bílá a `canvas` jako základ (≈60 %), `ink` pro text (≈30 %), `primary` cíleně (≈8 %), `accent` jen v dávkách (≈2 %).

- `primary` (BIfactory Green `#43C466`) = hlavní akce a aktuální poloha: primární tlačítko, aktivní položka menu, podtržení aktivní záložky, aktivní segment, aktivní krok. Na obrazovce je vždy **jen jedno** primární tlačítko.
- Text na zelené je vždy `on-primary` (černá). Bílý text na zelené nepoužívej.
- Zelený text (kladná marže, odkazy) piš v `primary-text`, ne v `primary`.
- `accent` (Spark Yellow) je jen upozornění a „nové“, vždy jako podklad s `on-accent`, nikdy jako text.
- Postranní menu je vždy tmavé (`sidebar-bg`), obsah vždy světlý (`canvas` pod obsahem, `surface` pro horní lištu, karty, tabulky a hlavičku).
- Stavy mají vlastní sadu barev, oddělenou od značky: `success-*`, `danger-*`, `warning-*`. Stav nikdy nevyjadřuj jen barvou: badge má vždy text, toast ikonu.

## Typografie

- **Manrope** (`--font-display`) pro titulky stránek (`page-title`), nadpisy sekcí a modalů (`section-title`) a KPI čísla (`kpi`, `kpi-lg`, váha 800).
- **Archivo** (`--font-body`) pro veškerý text UI: `body` 14 px je výchozí, `small` 12 px pro meta údaje a drobečky, `caption` 11 px pro husté tabulky.
- **JetBrains Mono** (`--font-mono`) pro strojové věci: záhlaví tabulek, nadpisy sekcí menu, popisky polí a KPI (`label`, verzálky, prostrkání 0.06em), kódy a ID (`code`: „ZAK-2026-0142“), tagy v hranatých závorkách (`eyebrow`: „[ 03 · DATA ]“).
- Písma se načítají z Google Fonts (import v `components/bundle.css`). V produkci je hostuj lokálně.

## Rozvržení

- **Desktop (≥ 768 px):** `Sidebar` 256 px (`sidebar-width`) je přilepený vlevo na plnou výšku. Nad obsahem je přilepená bílá `TopBar` 56 px (`topbar-h`). Obsah má okraje `space-8` (32 px) a bloky pod sebou mají mezeru `space-4`.
- **Mobil (< 768 px):** vlastní pravidla v sekci Mobil níže.
- Tmavý sloupec `Sidebar` vede vždy přes celou výšku okna, od horního po spodní okraj. Obsah menu je přilepený, při scrollu zůstává na místě.
- `PageHeader` je přilepený hned pod `TopBar` (`shadow-sm`) a drží titulek, akce vpravo a záložky. Při scrollu zůstává na místě.
- Typická stránka seznamu: `TopBar` → `PageHeader` → řada `StatTile` v mřížce `s21-stat-grid` → `ChipGroup` → `FilterBar` → `DataTable` (s `renderCard` pro mobil) → `Pagination`.
- Typická stránka detailu: `TopBar` s `Breadcrumbs` → `PageHeader` s `Tabs` → obsah záložky v kartách `Section`.

## Navigace

Navigace má dvě osy a každá dělá jednu věc.

1. **Svisle vlevo: `Sidebar` = kam v aplikaci jdu.** Menu slouží jen pro pracovní navigaci. Nahoře jsou denní položky s ikonou (1 klik), pod nimi sbalitelné sekce (Provoz, Intranet) s nadpisem v mono verzálkách. Sekce s aktivní stránkou je rozbalená, stav sbalení si pamatuje prohlížeč. Aktivní je vždy položka **kořenové** sekce (Zakázky), i když jsem o 4 úrovně hlouběji. Nastavení, profil ani odhlášení do menu nepatří.
2. **Vodorovně nahoře: `TopBar` = kde přesně jsem a kdo jsem.**
   - Vlevo jsou `Breadcrumbs`: „Zakázky › ZAK-2026-0131 › Realizace › Operace: Mapování dat“. Každá úroveň kromě poslední je odkaz zpět. Poslední je tučně a shoduje se s titulkem stránky. Nad 4 úrovně se prostřední sbalí do „…“, na mobilu zůstane jen „‹ Realizace“. Na kořenové stránce je jediná úroveň („Zakázky“).
   - Vpravo jsou tři ikony: **ozubené kolo** otevře menu Nastavení (skupiny Uživatelé a role, Ceníky, Číselníky, Provoz; červená tečka, když něco v nastavení vyžaduje pozornost), **avatar s iniciálami** otevře profil (jméno, role, Můj profil) a **ikona odhlášení** uživatele odhlásí.
3. **Záložky (`Tabs`)** přepínají pohledy na **stejný** záznam (Realizace, Plán, Výkazy…) a do drobečků se nepropisují jako další úroveň. Výjimkou je případ, kdy z obsahu záložky proklikneš na podřízený záznam: pak se záložka stane úrovní drobečků.
4. **Filtrovací čipy (`ChipGroup`)** přepínají skupiny seznamu, **segmenty (`SegmentedControl`)** přepínají období. Stav obou patří do URL.

## Mobil

Mobilní verze vychází z Polepim Manageru, kde je vyladěná na denní práci v terénu a v dílně. Platí pod 768 px (`breakpoint-md`).

- **Horní lišta:** tmavá lišta 48 px (`topbar-h-mobile`, `sidebar-bg`). Vlevo je hamburger, uprostřed logo a název aplikace, vpravo zelená rychlá akce (40 px) a avatar. Pod ní je bílý řádek drobečků 36 px (`crumbbar-h`) jen s „‹ rodič“. Obě lišty i hlavička stránky zůstávají při scrollu nahoře.
- **Menu:** vysouvá se zleva jako panel `drawer-width` (288 px, max. 85 % šířky) přes rozmazané ztmavení. Zavírá se klepnutím vedle, klávesou Esc a přechodem na jinou stránku. Stránka pod ním nescrolluje.
- **Nastavení, profil a odhlášení** jsou na mobilu v menu avatara. Ozubené kolo a ikona odhlášení se neukazují.
- **Seznamy:** místo tabulky jsou karty `ListCard` pod sebou. Nahoře je název (klidně na dva řádky), příznaky a 1 až 2 malé akce, pod nimi meta řádek s kódem a klientem. Pod linkou je jeden řádek čísel (datum, marže, **cena**) a stav vpravo. Celá karta je klikací.
- **Filtry:** viditelné je jen vyhledávání a vedle něj tlačítko filtru se zeleným počtem aktivních filtrů. Ostatní filtry se rozbalí pod sebe.
- **Hlavička stránky:** titulek 16 px na celou šířku, akce pod ním vlevo a popis se skrývá. Záložky vodorovně scrollují.
- **KPI dlaždice** jsou pod sebou přes celou šířku.
- **Spodní lišta:** v detailu a formulářích s rozpracovanými změnami je dole `StickyActionBar` se souhrnem (například cena) a stavem ukládání nebo jednou akcí.
- **Stránkování:** jen Předchozí, aktuální stránka a Další.
- **Dotyk a iPhone:** tlačítka mají min. 40 px, inputy a selecty 16 px (iOS jinak zoomuje). Lišty respektují výřez a zaoblené rohy (`safe-area-inset-*`). Dole je vždy volné místo, aby obsah nezajel pod spodní lištu nebo home indicator.

## KPI dlaždice

- Řada `StatTile` leží v mřížce `s21-stat-grid` (dlaždice min. 200 px, na mobilu pod sebou). Hustší přehledy, například po měsících, dávej do `s21-stat-grid--dense` (min. 140 px).
- Číslo se nikdy nezalamuje ani nezkracuje. Při úzké dlaždici se písmo zmenší (24 px až 16 px, u `big` 30 px až 20 px).
- Jednotku předávej zvlášť (`value="1 248 500" unit="Kč"`): vykreslí se menší a šedě za číslem. V úzké dlaždici může jednotka přejít pod číslo, samotné číslo ne.

## Tabulky

- Tabulka je vždy v bílé kartě (`surface`, `border`, `radius-xl`). Záhlaví má podklad `paper` a mono verzálky `label` v `ink-muted`.
- Řazení je v záhlaví: klik přepíná směr, aktivní šipka je `ink`, neaktivní `ink-subtle`.
- První sloupec nese název tučně a pod ním meta řádek v `small`/`ink-muted` s kódem (`code`) a klientem. Dlouhé texty se zkracují třemi tečkami a celý text je v `title`.
- Čísla a data jsou zarovnaná vpravo, `tabular-nums`, bez zalomení. Kladné hodnoty v `primary-text`, záporné v `danger-text`, chybějící hodnota jako „—“.
- Stav je `Badge` (barva z číselníku stavů, `fitCell` v úzkém sloupci). Rizika jsou `Tag` hned za názvem.
- Celý řádek je klikací (hover `primary-soft`). Akce v posledním sloupci jsou ikonová tlačítka `sm` s `title` a `data-no-row-click`.
- Stránkování je pod tabulkou: vlevo „1–10 z **38** zakázek“, vpravo ± 2 stránky, aktuální stránka černě.

## Formuláře a ovládací prvky

- Inputy a selecty mají výšku `control-h` (36 px), `radius-lg`, obrys `border`, při focusu `focus-ring`. Placeholder je kurzívou v `ink-subtle`, aby se nepletl s vyplněnou hodnotou.
- Popisek pole je nad polem v mono verzálkách (`Field`). Nápověda nebo chyba je pod polem, chyba v `danger-text`.
- Vyhledávání má lupu vlevo a křížek pro vymazání vpravo. Select má vlastní šipku.
- Tlačítka: `primary` (jedno na obrazovku), `secondary` (bílé s obrysem), `ghost` (bez obrysu, pro sekundární odkazy), `danger` (mazání). Velikosti `sm` 28 px (v tabulkách a kartách), `md` 36 px (výchozí), `lg` 48 px (mobilní CTA).
- Focus: 2 px obrys `focus-ring` s odsazením 2 px na všech interaktivních prvcích. Nikdy ho neodstraňuj.

## Povrchy, zaoblení, stíny

- Zaoblení: `radius-lg` (8 px) pro ovládací prvky a ikonová tlačítka v `TopBar`, `radius-xl` (12 px) pro karty a tabulky, `radius-2xl` (16 px) pro modal a prázdný stav, `radius-full` pro badge, čipy a avatar.
- Karty oddělují obrysy, ne stíny. Stín má jen to, co leží nad obsahem: přilepená hlavička (`shadow-sm`), toast a rozbalovací menu nastavení a profilu (`shadow-lg`), modal (`shadow-xl`).
- Přechody jsou 150 ms na barvách a obrysech. Jinak žádné animace kromě otočení šipky a vysunutí draweru.

## Ikony

- Ikony jsou čárové, 24×24 viewBox, tah 2 px, zaoblené konce (styl Lucide), barva `currentColor`. Najdeš je v komponentě `Icon` (`S21.Icon`, seznam v `Icon.names`).
- V menu mají ikony 18 px, v `TopBar` 20 px, v tlačítkách 16 px (v `sm` 14 px). Ikonové tlačítko má vždy `aria-label` a `title`.
- Emoji ani barevné ikony nepoužívej. Chybí-li ikona, doplň ji ze sady Lucide ve stejném stylu.

## Značka (demo BIfactory)

- V hlavičce menu je symbol databáze (`assets/Logos/bifactory-mark.png`) vedle názvu „BIfactory“ a podtitulku aplikace. Celý logotyp (`bifactory-logo.png`) je černý, patří tedy jen na světlé plochy (přihlášení, PDF výstupy).
- Logo nedeformuj, nepřebarvuj ani mu nepřidávej efekty. Kolem nech ochrannou zónu o velikosti výšky symbolu.
- Patička menu nese `PoweredBy`: „Powered by“ v mono verzálkách a vedle symbol databáze s názvem **BIfactory** (Manrope 800, bílá) v jemně zeleném rámečku. Je u všech implementací, i zákaznických, a odkazuje na bifactory.cz.
- Název systému „System 21“ se píše vždy s mezerou a na jednom řádku (nezalamuje se).

## Nezahrnuto

Tyto části zdrojové aplikace se do systému nepřenášely:

- Doménově specifické komponenty: plánovací tabule, časové osy výkazů, podpisové pole, výběr poškození vozu, QR skener, grafy.
- Tmavý režim obsahu: zdrojová aplikace ho nemá.
