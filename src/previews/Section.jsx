import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 16, background: "var(--canvas)" }}>
  <S.Section title="Výkon zakázek" subtitle="Posledních 30 dní" action={<S.Button size="sm" variant="ghost">Detailní přehled →</S.Button>}
    detailLabel="rozpad po klientech" defaultOpen
    detail={<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><S.StatTile label="Moravia Steel" value="184 000 Kč" /><S.StatTile label="Agro Slovácko" value="312 000 Kč" /></div>}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}><S.StatTile label="Nové" value="6" /><S.StatTile label="Vyhrané" value="4" accent="success" /><S.StatTile label="Prohrané" value="1" accent="danger" /></div>
  </S.Section>
</div>);
