/* System 21 — sdílený bootstrap pro demo stránky (demo-prep/E, 2026-11-04).
   Pracuje jako UMD skript nad window.S21 (žádný bundler). */
(function (global) {
  const S = global.S21;
  const R = global.React;
  const h = R.createElement;

  const BRAND = {
    name: "BIfactory",
    subtitle: "System 21",
    logo: h("div", { style: { width: 28, height: 28, borderRadius: 6, background: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--on-primary)", font: "700 14px var(--font-display)" } }, "BI"),
  };

  const USER = { name: "lubomir@bifactory.cz", role: "BIfactory · Admin" };
  const SETTINGS = {
    groups: [
      { title: "Uživatelé a role", items: [
        { href: "/nastaveni/uzivatele", label: "Uživatelé" },
        { href: "/nastaveni/role", label: "Role a oprávnění" },
      ] },
      { title: "Integrace", items: [
        { href: "/nastaveni/api", label: "API klíče" },
        { href: "/nastaveni/pripojeni", label: "Napojení" },
      ] },
    ],
  };

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

  function demoHref(path) {
    // Map menu paths → demo HTML stránky.
    const map = {
      "/dashboard": "./dashboard.html",
      "/ukoly": "./ukoly.html",
      "/muj-plan": "./muj-plan.html",
      "/crm/klienti": "./crm-klienti.html",
      "/crm/osoby": "./crm-osoby.html",
      "/crm/obchodni-pripady": "./crm-obchodni-pripady.html",
      "/dms/smlouvy": "./dms-smlouvy.html",
      "/dms/dokumenty": "./dms-dokumenty.html",
      "/dms/automatizace": "./dms-automatizace.html",
      "/zakazky": "./index.html",
      "/zakazky/nova": "./predavaci-protokol.html",
      "/zakazky/131": "./zakazka-detail.html",
      "/zakazky/dokoncene": "./zakazky-dokoncene.html",
      "/reporty": "./reporty.html",
      "/hr/pracovnici": "./hr-pracovnici.html",
      "/hr/dochazka": "./hr-dochazka.html",
      "/email": "./email.html",
      "/zpravy": "./zpravy.html",
      "/nastenka": "./nastenka.html",
      "/kb": "./kb.html",
      "/nastaveni": "./nastaveni.html",
      "/oznameni": "./oznameni.html",
    };
    return map[path] || "./dashboard.html";
  }

  const NOTIFICATIONS = [
    { id: 1, group: "Dnes", icon: "sparkles", tone: "primary", title: "AI navrhuje vykázat 6 h", description: "Včera jsi strávil 6 h na ZAK-2026-0131.", time: "před 2 h", read: false, href: "/dashboard" },
    { id: 2, group: "Dnes", icon: "check", tone: "success", title: "Smlouva podepsaná", description: "SM-2026-089 Moravia Steel — klient podepsal.", time: "před 3 h", read: false, href: "/dms/smlouvy" },
    { id: 3, group: "Dnes", icon: "alert-triangle", tone: "warning", title: "Smlouva vyprší za 7 dnů", description: "Procházkovi — živnostenské pojištění.", time: "před 5 h", read: false, href: "/dms/smlouvy" },
    { id: 4, group: "Včera", icon: "chat", tone: "primary", title: "Alena okomentovala smlouvu", description: "„Podpis plánujeme na 20. 11. v kanceláři.“", time: "včera 14:32", read: true, href: "/dms/smlouva-detail" },
    { id: 5, group: "Včera", icon: "tasks", title: "3 úkoly dokončené", description: "Dvořákovi · Novákovi · Agro Slovácko", time: "včera 10:12", read: true, href: "/ukoly" },
    { id: 6, group: "Dříve", icon: "mail", title: "Nová zpráva v mailu", description: "Jan Novák — Dotaz na pojištění", time: "2 dny zpět", read: true, href: "/email" },
  ];

  function DemoTopBar({ crumbs, onNavigate }) {
    const [notifs, setNotifs] = R.useState(NOTIFICATIONS);
    return h(S.TopBar, {
      breadcrumbs: h(S.Breadcrumbs, { items: crumbs, onNavigate: onNavigate || (() => {}) }),
      extra: h(R.Fragment, null,
        h(S.NotificationCenter, {
          notifications: notifs,
          onMarkAllRead: () => setNotifs(notifs.map((n) => ({ ...n, read: true }))),
          onNavigate: (n) => { if (n.href && demoHref(n.href)) global.location.href = demoHref(n.href); },
          onClick: (n) => setNotifs(notifs.map((x) => x.id === n.id ? { ...x, read: true } : x)),
        }),
        h(S.BrandToggle),
        h(S.ThemeToggle)
      ),
      settings: { ...SETTINGS, onSelect: () => {} },
      user: USER,
      onLogout: () => {},
    });
  }

  global.S21Demo = {
    BRAND, USER, SETTINGS,
    DemoSidebar, DemoTopBar, demoHref,
  };
})(window);
