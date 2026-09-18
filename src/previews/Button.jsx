import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

const row = { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" };
mount(
  <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, background: "var(--surface)" }}>
    <div style={row}><S.Button>Uložit</S.Button><S.Button variant="secondary">Zrušit</S.Button><S.Button variant="ghost">Více možností</S.Button><S.Button variant="danger">Smazat</S.Button><S.Button disabled>Neaktivní</S.Button></div>
    <div style={row}><S.Button size="sm">Malé</S.Button><S.Button size="md">Střední</S.Button><S.Button size="lg">Velké</S.Button></div>
    <div style={row}><S.Button icon="plus">Nová zakázka</S.Button><S.Button variant="secondary" icon="filter">Export</S.Button><S.Button size="sm" iconOnly icon="clock" aria-label="Vykázat" /><S.Button size="sm" variant="secondary" iconOnly icon="check" aria-label="Hotovo" /><S.Button variant="ghost" iconOnly icon="more" aria-label="Další akce" /></div>
  </div>
);
