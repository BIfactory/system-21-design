import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, background: "var(--surface)" }}>
  <S.Field label="Název zakázky"><S.Input placeholder="Např. Reporting obchodu" /></S.Field>
  <S.Field label="Termín" hint="Datum předání klientovi"><S.Input type="date" defaultValue="2026-09-30" /></S.Field>
  <S.Field label="Hodiny" error="Zadejte kladné číslo"><S.Input invalid type="number" defaultValue="-2" /></S.Field>
</div>);
