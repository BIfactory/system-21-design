import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 24, display: "flex", gap: 8, background: "var(--surface)" }}><S.Checkbox label="Zobrazit neaktivní" count={4} /><S.Checkbox label="Jen moje" defaultChecked /></div>);
