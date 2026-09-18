import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() { const [q, setQ] = React.useState("Moravia"); const [e, setE] = React.useState(""); return <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "var(--surface)" }}><S.SearchInput value={e} onChange={setE} placeholder="Hledat název, klient, ID…" /><S.SearchInput value={q} onChange={setQ} /></div>; }
mount(<Demo />);
