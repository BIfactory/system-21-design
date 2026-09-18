import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() { const [v, setV] = React.useState("all"); return <div style={{ padding: 24 }}><S.ChipGroup value={v} onChange={setV} items={[{ value: "pipeline", label: "Sales pipeline", count: 14 }, { value: "all", label: "Vše", count: 38 }, { value: "win", label: "Výhra ve výrobě", count: 9 }, { value: "done", label: "Hotové", count: 21 }]} /></div>; }
mount(<Demo />);
