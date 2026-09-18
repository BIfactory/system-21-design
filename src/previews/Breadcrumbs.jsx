import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() {
  const deep = [{ label: "Zakázky", href: "#" }, { label: "ZAK-2026-0131 Napojení ERP → CRM", href: "#" }, { label: "Realizace", href: "#" }, { label: "Operace: Mapování dat", href: "#" }, { label: "Výkaz #482", href: "#" }, { label: "Příloha: mapping.xlsx", href: "#" }];
  const row = (label, el) => (<div style={{ display: "grid", gridTemplateColumns: "150px 1fr", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: "1px solid var(--border)" }}><span className="s21-field__label">{label}</span><div style={{ minWidth: 0 }}>{el}</div></div>);
  return (
    <div style={{ background: "var(--surface)" }}>
      {row("2 úrovně", <S.Breadcrumbs items={CRUMBS.slice(0, 2)} onNavigate={() => {}} />)}
      {row("4 úrovně", <S.Breadcrumbs items={CRUMBS} onNavigate={() => {}} />)}
      {row("6 úrovní · sbaleno", <S.Breadcrumbs items={deep} onNavigate={() => {}} />)}
      {row("s ikonou kořene", <S.Breadcrumbs items={[{ ...CRUMBS[0], icon: "folder" }, ...CRUMBS.slice(1, 3)]} onNavigate={() => {}} />)}
      {row("mobil (compact)", <S.Breadcrumbs items={CRUMBS} compact onNavigate={() => {}} />)}
    </div>
  );
}
mount(<Demo />);
