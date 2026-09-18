import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, background: "var(--surface)" }}><S.Input placeholder="Název zakázky" /><S.Input defaultValue="Reporting obchodu" /><S.Input invalid defaultValue="-5" type="number" /></div>);
