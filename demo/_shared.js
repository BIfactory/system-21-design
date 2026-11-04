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
      footer: "Powered by BIfactory",
    });
  }

  function demoHref(path) {
    // Map menu paths → demo HTML stránky; fallback = dashboard.
    const map = {
      "/dashboard": "./dashboard.html",
      "/ukoly": "./ukoly.html",
      "/crm/klienti": "./crm-klienti.html",
      "/crm/osoby": "./crm-klienti.html",
      "/crm/obchodni-pripady": "./crm-klienti.html",
      "/dms/smlouvy": "./dms-smlouvy.html",
      "/dms/dokumenty": "./dms-smlouvy.html",
      "/dms/automatizace": "./dms-smlouvy.html",
      "/zakazky": "./index.html",
    };
    return map[path] || "./dashboard.html";
  }

  function DemoTopBar({ crumbs, onNavigate }) {
    return h(S.TopBar, {
      breadcrumbs: h(S.Breadcrumbs, { items: crumbs, onNavigate: onNavigate || (() => {}) }),
      extra: h(R.Fragment, null,
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
