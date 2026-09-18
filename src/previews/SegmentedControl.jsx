import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() { const [v, setV] = React.useState("week"); return <div style={{ padding: 24 }}><S.SegmentedControl value={v} onChange={setV} items={[{ value: "day", label: "Denní" }, { value: "week", label: "Týdenní" }, { value: "month", label: "Měsíční" }]} /></div>; }
mount(<Demo />);
