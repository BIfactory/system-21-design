import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 12, background: "var(--surface)" }}>
  {S.Icon.names.map((n) => <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}><S.Icon name={n} size={20} /><span className="s21-cell-code" style={{ fontSize: 10 }}>{n}</span></div>)}
</div>);
