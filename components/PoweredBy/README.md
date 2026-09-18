# PoweredBy

Zvýrazněný podpis „Powered by BIfactory“ s logem, v patičce menu a na veřejných stránkách.

**Kdy:** vždy v patičce `Sidebar` (prop `footer`), u všech implementací včetně zákaznických. Varianta `light` patří na přihlášení a veřejné stránky.

**Dodáváš:** `logo` (symbol BIfactory, `assets/Logos/bifactory-mark.png`), volitelně `name` (výchozí „BIfactory“), `href` (výchozí `https://bifactory.cz`, otevře se v novém okně), `label` (výchozí „Powered by“) a `variant` (`dark` | `light`).

**Pravidla:**

- Vlevo je popisek „Powered by“ v mono verzálkách (`sidebar-text-muted`), vpravo symbol databáze 20 px a název „BIfactory“ v Manrope 800 bílou barvou.
- Varianta `dark` má zelený nádech (`primary-soft`) a zelený obrys, při hoveru sytější. Je to jediné zelené místo v patičce, takže podpis je vidět, ale nekonkuruje aktivní položce menu.
- Logo nepřebarvuj a nevyměňuj za logo zákazníka. Zákaznické logo patří do hlavičky menu (`Sidebar.brand`).
- Patička drží spodní bezpečnou zónu iPhonu (`safe-area-inset-bottom`).

_Nová komponenta System 21, vychází z components/layout/powered-by-footer.tsx (hulinl/polepim-manager@19de5c8)._
