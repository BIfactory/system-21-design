import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 16, background: "var(--canvas)" }}><S.EmptyState icon="notes" title="Zatím žádné články" description="Knowledge base je prázdná. Založte první článek s postupem, který se v týmu opakuje." action={<S.Button icon="plus">Nový článek</S.Button>} /></div>);
