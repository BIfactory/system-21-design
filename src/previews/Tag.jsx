import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 24, display: "flex", gap: 8, flexWrap: "wrap", background: "var(--surface)" }}><S.Tag>Interní</S.Tag><S.Tag tone="success">Fakturováno</S.Tag><S.Tag tone="warning">Po termínu</S.Tag><S.Tag tone="danger">Záporná marže</S.Tag><S.Tag tone="accent">Nové</S.Tag></div>);
