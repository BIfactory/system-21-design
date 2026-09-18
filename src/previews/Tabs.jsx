import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() {
  const [t, setT] = React.useState("plan");
  return <div style={{ background: "var(--surface)", padding: "16px 24px 0", borderBottom: "1px solid var(--border)" }}><S.Tabs value={t} onChange={setT} items={[{ value: "realizace", label: "Realizace" }, { value: "plan", label: "Plán" }, { value: "vykazy", label: "Výkazy", count: 12 }, { value: "dokumenty", label: "Dokumenty" }, { value: "fotky", label: "Fotky" }, { value: "aktivita", label: "Aktivita" }]} /></div>;
}
mount(<Demo />);
