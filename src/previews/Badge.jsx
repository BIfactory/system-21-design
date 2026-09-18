import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(
  <div style={{ padding: 24, display: "flex", gap: 8, flexWrap: "wrap", background: "var(--surface)" }}>
    <S.Badge>Koncept</S.Badge><S.Badge tone="success">Výhra</S.Badge><S.Badge tone="warning">Čeká na klienta</S.Badge><S.Badge tone="danger">Prohra</S.Badge><S.Badge tone="primary">Realizace</S.Badge><S.Badge color="#2563eb">Nabídka (barva z CRM)</S.Badge>
    <div style={{ width: 110 }}><S.Badge fitCell color="#d97706">Čekání na zákazníka</S.Badge></div>
  </div>
);
