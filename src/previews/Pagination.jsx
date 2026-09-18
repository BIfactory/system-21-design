import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() { const [p, setP] = React.useState(3); return <div style={{ padding: "16px 24px" }}><S.Pagination page={p} onPage={setP} totalPages={9} total={87} pageSize={10} noun="zakázek" /></div>; }
mount(<Demo />);
