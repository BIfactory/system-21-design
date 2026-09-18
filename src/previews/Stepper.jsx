import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() { const [c, setC] = React.useState(3); return <div style={{ padding: 24 }}><S.Stepper current={c} onGoTo={setC} steps={["Klient", "Rozsah", "Kalkulace", "Termíny", "Souhrn"]} /></div>; }
mount(<Demo />);
