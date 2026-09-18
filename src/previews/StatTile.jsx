import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, background: "var(--canvas)" }}>
  <div className="s21-stat-grid">
    <S.StatTile label="Tržby tento měsíc" value="1 248 500" unit="Kč" big />
    <S.StatTile label="Marže" value="+27 %" accent="success" hint="vs. plán +22 %" />
    <S.StatTile label="Po termínu" value="2" accent="danger" />
    <S.StatTile label="Rozpracováno" value="7" accent="primary" />
  </div>
  <div className="s21-stat-grid s21-stat-grid--dense">
    <S.StatTile label="Leden" value="12 480 500" unit="Kč" />
    <S.StatTile label="Únor" value="9 812 000" unit="Kč" />
    <S.StatTile label="Březen" value="11 204 300" unit="Kč" />
    <S.StatTile label="Hodiny" value="1 284" unit="h" />
    <S.StatTile label="Zakázky" value="38" />
    <S.StatTile label="Splatnost" value="14" unit="dní" />
  </div>
</div>);
