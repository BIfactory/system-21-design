import { MARK } from "../components/mark.js";
export const S = window.S21;
export const React = window.React;
export const mount = (el) => window.ReactDOM.createRoot(document.getElementById("root")).render(el);

export const SECTIONS = [
  { items: [
    { href: "/dashboardy", label: "Dashboardy", icon: "dashboard" },
    { href: "/ukoly", label: "Úkoly", icon: "tasks", badge: 3 },
    { href: "/muj-plan", label: "Můj plán", icon: "calendar" },
    { href: "/dochazka", label: "Docházka", icon: "clock" },
    { href: "/poznamky", label: "Poznámky", icon: "notes" },
  ] },
  { title: "Provoz", collapsible: true, items: [
    { href: "/zakazky", label: "Zakázky" },
    { href: "/planovani-vyroby", label: "Plán výroby" },
    { href: "/planovani-financi", label: "Finanční plán" },
    { href: "/vykazovani", label: "Vykazování" },
    { href: "/zakazky/dokoncene", label: "Dokončené k fakturaci" },
  ] },
  { title: "Intranet", collapsible: true, items: [
    { href: "/nastenka", label: "Nástěnka" },
    { href: "/kb", label: "Knowledge base" },
    { href: "/dokumenty", label: "Dokumenty" },
  ] },
];

export function DemoSidebar({ active = "/zakazky" }) {
  const [a, setA] = React.useState(active);
  const [q, setQ] = React.useState("");
  return (
    <S.Sidebar
      brand={{ name: "BIfactory", subtitle: "System 21", logo: <img src={MARK} alt="" /> }}
      quickAction={{ label: "Nový záznam", icon: "plus" }}
      search={<S.SearchInput value={q} onChange={setQ} placeholder="Hledat zakázku, klienta…" />}
      sections={SECTIONS}
      activeHref={a}
      onNavigate={(it) => setA(it.href)}
      footer={<S.PoweredBy logo={<img src={MARK} alt="" />} />}
    />
  );
}

export const ORDERS = [
  { id: 1, code: "ZAK-2026-0142", name: "Reporting obchodu — pilot", client: "Moravia Steel a.s.", status: "Výhra", color: "#16a34a", created: "12. 05. 2026", price: "184 000 Kč", margin: "+32 %", pos: true, progress: "68 %" },
  { id: 2, code: "ZAK-2026-0139", name: "Automatizace výkazů práce", client: "Hradecká strojírna s.r.o.", status: "Nabídka", color: "#2563eb", created: "03. 05. 2026", price: "96 500 Kč", margin: "+24 %", pos: true, progress: "—" },
  { id: 3, code: "ZAK-2026-0131", name: "Napojení ERP → CRM", client: "Agro Slovácko", status: "Realizace", color: "#d97706", created: "22. 04. 2026", price: "312 000 Kč", margin: "−4 %", pos: false, progress: "41 %", late: true },
  { id: 4, code: "ZAK-2026-0127", name: "AI asistent pro zápisy z porad", client: "Obec Staré Město", status: "Hotovo", color: "#6b7280", created: "15. 04. 2026", price: "48 000 Kč", margin: "+41 %", pos: true, progress: "100 %" },
];

export const ORDER_COLUMNS = [
  { key: "name", label: "Zakázka", sortable: true, width: "34%", render: (o) => (
    <div style={{ minWidth: 0 }}>
      <span style={{ display: "flex", gap: 6, alignItems: "center", minWidth: 0 }}>
        <span className="s21-cell-title">{o.name}</span>
        {o.late && <S.Tag tone="warning">Po termínu</S.Tag>}
      </span>
      <span className="s21-cell-meta"><span className="s21-cell-code">{o.code}</span> · {o.client}</span>
    </div>
  ) },
  { key: "status", label: "Stav", sortable: true, width: "14%", render: (o) => <S.Badge color={o.color} fitCell>{o.status}</S.Badge> },
  { key: "created", label: "Vznik", sortable: true, width: "13%", numeric: true },
  { key: "price", label: "Cena", align: "right", numeric: true, width: "14%" },
  { key: "margin", label: "Marže", align: "right", numeric: true, width: "10%", render: (o) => <span className={o.pos ? "s21-pos" : "s21-neg"}>{o.margin}</span> },
  { key: "progress", label: "Plnění", align: "right", numeric: true, width: "9%" },
  { key: "actions", label: "Akce", align: "center", width: "8%", render: () => (
    <span className="s21-row-actions" data-no-row-click>
      <S.Button size="sm" iconOnly icon="clock" aria-label="Vykázat práci" title="Vykázat práci" />
      <S.Button size="sm" variant="secondary" iconOnly icon="check" aria-label="Označit hotovo" title="Označit hotovo" />
    </span>
  ) },
];

export const CRUMBS = [
  { label: "Zakázky", href: "/zakazky" },
  { label: "ZAK-2026-0131 Napojení ERP → CRM", href: "/zakazky/131" },
  { label: "Realizace", href: "/zakazky/131?tab=realizace" },
  { label: "Operace: Mapování dat", href: "/zakazky/131/op/7" },
];

export const SETTINGS = { groups: [
  { title: "Uživatelé a role", items: [{ href: "/uzivatele", label: "Uživatelé" }, { href: "/nastaveni/role", label: "Role a oprávnění" }] },
  { title: "Ceníky", items: [{ href: "/materialy", label: "Materiály" }, { href: "/operace", label: "Operace" }, { href: "/sablony", label: "Šablony operací" }] },
  { title: "Číselníky", items: [{ href: "/nastaveni/kategorie", label: "Kategorie" }, { href: "/odchylky", label: "Důvody odchylek" }] },
  { title: "Provoz", items: [{ href: "/dochazka/lokality", label: "Lokality GPS" }, { href: "/nastaveni", label: "Integrace a klíče", badge: 1 }] },
] };
export const USER = { name: "lubomir.hulin@bifactory.cz", role: "CEO / Vedoucí" };

export const BRAND = { name: "BIfactory", logo: <img src={MARK} alt="" /> };
export const QUICK = { label: "Nový záznam", icon: "plus" };

export function DemoTopBar({ crumbs = CRUMBS, onNavigate }) {
  return (
    <S.TopBar
      brand={BRAND}
      quickAction={QUICK}
      breadcrumbs={<S.Breadcrumbs items={crumbs} onNavigate={onNavigate || (() => {})} />}
      settings={{ ...SETTINGS, onSelect: () => {} }}
      user={USER}
      onLogout={() => {}}
    />
  );
}

export const orderCard = (o) => (
  <S.ListCard
    key={o.id}
    onClick={() => {}}
    title={o.name}
    flags={o.late ? <S.Tag tone="warning">Po termínu</S.Tag> : null}
    meta={<><span className="s21-cell-code">{o.code}</span> · {o.client}</>}
    actions={<><S.Button size="sm" icon="clock">Vykázat</S.Button><S.Button size="sm" variant="secondary" iconOnly icon="check" aria-label="Označit hotovo" title="Označit hotovo" /></>}
    stats={<><span>{o.created}</span><span className={o.pos ? "s21-pos" : "s21-neg"}>{o.margin}</span><strong>{o.price}</strong></>}
    status={<S.Badge color={o.color}>{o.status}</S.Badge>}
  />
);
