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

  // Mapa URL → demo HTML stránka. Nedokončené moduly ukazují na _coming.html.
  const MAP = {
    "/dashboard": "./dashboard.html",
    "/muj-plan": "./muj-plan.html",
    "/ukoly": "./ukoly.html",
    "/zakazky": "./zakazky.html",
    "/zakazky/nova": "./zakazka-nova.html",
    "/zakazky/131": "./zakazka-detail.html",
    "/vykazovani": "./vykazovani.html",
    "/obchod": "./obchod.html",
    "/obchod/klienti": "./crm-klienti.html",
    "/obchod/osoby": "./crm-osoby.html",
    "/obchod/pripady": "./crm-pripady.html",
    "/dms/smlouvy": "./dms-smlouvy.html",
    "/dms/dokumenty": "./dms-dokumenty.html",
    "/dms/automatizace": "./dms-automatizace.html",
    "/lide/pracovnici": "./hr-pracovnici.html",
    "/lide/dochazka": "./hr-dochazka.html",
    "/inbox": "./inbox.html",
    "/email": "./inbox.html#email",
    "/zpravy": "./inbox.html#zpravy",
    "/nastenka": "./nastenka.html",
    "/kb": "./kb.html",
    "/nastaveni": "./nastaveni.html",
    "/oznameni": "./oznameni.html",
  };
  function demoHref(path) { return MAP[path] || "./showcase.html"; }

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

  function DemoTopBar({ crumbs, onNavigate }) {
    const [notifs, setNotifs] = R.useState(NOTIFICATIONS);
    return h(S.TopBar, {
      breadcrumbs: h(S.Breadcrumbs, { items: crumbs, onNavigate: onNavigate || (() => {}) }),
      extra: h(R.Fragment, null,
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
    BRAND, USER,
    DemoSidebar, DemoTopBar, demoHref,
  };
})(window);
