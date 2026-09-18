import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() { const [q, setQ] = React.useState(""); return <div style={{ padding: 16, background: "var(--canvas)" }}><S.FilterBar><S.SearchInput className="s21-grow" value={q} onChange={setQ} placeholder="Hledat podle názvu…" /><S.Select placeholder="Všechny stavy" options={[{ value: "a", label: "Aktivní" }]} /><S.Checkbox label="Zobrazit neaktivní" count={4} /></S.FilterBar></div>; }
mount(<Demo />);
