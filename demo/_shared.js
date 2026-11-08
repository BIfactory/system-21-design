/* System 21 — sdílený bootstrap pro demo stránky.
   UMD skript nad window.S21 (žádný bundler). */
(function (global) {
  const S = global.S21;
  const R = global.React;
  const h = R.createElement;

  const BRAND = {
    name: "BIfactory",
    subtitle: "System 21",
    logo: h("div", { style: { width: 28, height: 28, borderRadius: 6, background: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--on-primary)", font: "700 14px var(--font-display)" } }, "BI"),
  };

  const USER = {
    name: "lubomir@bifactory.cz",
    role: "BIfactory · Admin",
    links: [
      { label: "Můj profil", href: "./nastaveni.html", icon: "user" },
      { label: "Nastavení", href: "./nastaveni.html", icon: "settings" },
    ],
  };

  const INBOX_UNREAD = 5; // demo value

  const DEFAULT_ROLE = "ceo";
  function useRole() {
    const [role, setRoleState] = R.useState(() => {
      try { return localStorage.getItem('system21-role') || DEFAULT_ROLE; } catch (_) { return DEFAULT_ROLE; }
    });
    const setRole = (r) => { try { localStorage.setItem('system21-role', r); } catch (_) {} setRoleState(r); };
    return [role, setRole];
  }

  // Mapa URL → demo HTML stránka. Následuje polepim-manager sidebar strukturu.
  // Nedokončené moduly ukazují na _coming.html s hash pro správné zvýraznění v sidebaru.
  const MAP = {
    // Top sekce (bez titulu, s ikonami)
    "/": "./dashboard.html",
    "/dashboard": "./dashboard.html",
    "/vykazovani-denni": "./_coming.html#/vykazovani-denni",
    "/zakazky-denni": "./_coming.html#/zakazky-denni",
    "/ukoly": "./ukoly.html",
    "/muj-plan": "./muj-plan.html",
    "/dochazka": "./hr-dochazka.html",
    "/poznamky": "./_coming.html#/poznamky",

    // Provoz
    "/zakazky": "./zakazky.html",
    "/zakazky/nova": "./zakazka-nova.html",
    "/zakazky/131": "./zakazka-detail.html",
    "/planovani-vyroby": "./vyroba-kapacita.html",
    "/planovani-financi": "./_coming.html#/planovani-financi",
    "/vykazovani": "./vykazovani.html",
    "/reklamace": "./_coming.html#/reklamace",
    "/zakazky-fakturace": "./_coming.html#/zakazky-fakturace",
    "/dochazka-admin": "./_coming.html#/dochazka-admin",

    // Intranet
    "/nastenka": "./nastenka.html",
    "/moje-skoleni": "./_coming.html#/moje-skoleni",
    "/kb": "./kb.html",
    "/dokumenty": "./dms-dokumenty.html",
    "/skoleni-sprava": "./_coming.html#/skoleni-sprava",
    "/onboarding": "./_coming.html#/onboarding",

    // Nastavení
    "/uzivatele": "./hr-pracovnici.html",
    "/nastaveni-role": "./_coming.html#/nastaveni-role",
    "/materialy": "./_coming.html#/materialy",
    "/operace": "./_coming.html#/operace",
    "/sablony-operaci": "./_coming.html#/sablony-operaci",
    "/nastaveni-kat-materialu": "./_coming.html#/nastaveni-kat-materialu",
    "/nastaveni-typy-nepritomnosti": "./_coming.html#/nastaveni-typy-nepritomnosti",
    "/odchylky": "./_coming.html#/odchylky",
    "/checklist-predavek": "./_coming.html#/checklist-predavek",
    "/nastaveni-kategorie": "./_coming.html#/nastaveni-kategorie",
    "/lokality-gps": "./_coming.html#/lokality-gps",
    "/nastaveni": "./nastaveni.html",

    // Legacy/support routes still accessed from existing pages
    "/inbox": "./inbox.html",
    "/email": "./inbox.html#email",
    "/zpravy": "./inbox.html#zpravy",
    "/oznameni": "./oznameni.html",
    "/obchod/pripady": "./crm-pripady.html",
    "/obchod/klienti": "./crm-klienti.html",
    "/obchod/osoby": "./crm-osoby.html",
    "/dms/smlouvy": "./dms-smlouvy.html",
    "/dms/dokumenty": "./dms-dokumenty.html",
    "/dms/automatizace": "./dms-automatizace.html",
    "/lide/pracovnici": "./hr-pracovnici.html",
    "/lide/dochazka": "./hr-dochazka.html",
    "/vyroba": "./vyroba.html",
    "/vyroba/kapacita": "./vyroba-kapacita.html",
    "/obchod": "./obchod.html",
    "/lide": "./lide.html",
    "/dms": "./dms.html",
  };
  function demoHref(path) { return MAP[path] || "./_coming.html#" + path; }

  function DemoSidebar({ active = "/dashboard" }) {
    const [a, setA] = R.useState(active);
    const [q, setQ] = R.useState("");
    return h(S.Sidebar, {
      brand: BRAND,
      quickAction: { label: "Nový záznam", icon: "plus" },
      search: h(S.SearchInput, { value: q, onChange: setQ, placeholder: "Hledat…" }),
      sections: S.moduleNavSections,
      activeHref: a,
      onNavigate: (it) => { setA(it.href); if (it.href) global.location.href = demoHref(it.href); },
      footer: h(S.PoweredBy, {
        logo: h("img", { src: "../assets/logos/bifactory-mark.png", alt: "" }),
        name: "BIfactory",
        href: "https://bifactory.cz",
      }),
    });
  }

  // Jen dvě aktivní notifikace — zbytek bude přibývat s moduly.
  const NOTIFICATIONS = [
    { id: 1, group: "Dnes", icon: "check", tone: "success", title: "Smlouva podepsaná", description: "SM-2026-089 Moravia Steel — klient podepsal.", time: "před 3 h", read: false, href: "/dms/smlouvy" },
    { id: 2, group: "Dnes", icon: "alert-triangle", tone: "warning", title: "Smlouva vyprší za 7 dnů", description: "Procházkovi — živnostenské pojištění.", time: "před 5 h", read: false, href: "/dms/smlouvy" },
    { id: 3, group: "Včera", icon: "tasks", title: "3 úkoly dokončené", description: "Dvořákovi · Novákovi · Agro Slovácko", time: "včera 10:12", read: true, href: "/ukoly" },
  ];

  function DemoTopBar({ crumbs, onNavigate, onRoleChange }) {
    const [role, setRole] = useRole();
    const [notifs, setNotifs] = R.useState(NOTIFICATIONS);
    R.useEffect(() => { if (onRoleChange) onRoleChange(role); }, [role]);
    return h(S.TopBar, {
      breadcrumbs: h(S.Breadcrumbs, { items: crumbs, onNavigate: onNavigate || (() => {}) }),
      extra: h(R.Fragment, null,
        h(S.PersonaSwitcher, { role, onChange: setRole }),
        h(S.InboxBell, { unread: INBOX_UNREAD, onClick: () => global.location.href = './inbox.html' }),
        h(S.NotificationCenter, {
          notifications: notifs,
          onMarkAllRead: () => setNotifs(notifs.map((n) => ({ ...n, read: true }))),
          onNavigate: (n) => { if (n.href && MAP[n.href]) global.location.href = demoHref(n.href); },
          onClick: (n) => setNotifs(notifs.map((x) => x.id === n.id ? { ...x, read: true } : x)),
        }),
        h(S.BrandToggle),
        h(S.ThemeToggle)
      ),
      // settings se už nerenderuje separátně — je součástí avatar menu (user.links)
      user: USER,
      onLogout: () => {},
    });
  }

  global.S21Demo = {
    BRAND, USER, DEFAULT_ROLE,
    useRole,
    DemoSidebar, DemoTopBar, demoHref,
  };
})(window);
