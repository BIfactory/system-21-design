import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "var(--surface)" }}><S.Field label="Stav"><S.Select placeholder="Všechny stavy" options={[{ value: "w", label: "Výhra" }, { value: "n", label: "Nabídka" }]} /></S.Field><S.Field label="Typ (neaktivní)"><S.Select disabled placeholder="Reporting" /></S.Field></div>);
