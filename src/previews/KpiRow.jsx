import { S, React, mount } from "./shared.jsx";

mount(<div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 20, background: "var(--canvas)" }}>
  <S.KpiRow cols={4}>
    <S.StatTile label="Otevřené zakázky" value="38" accent="primary" />
    <S.StatTile label="Tržby tento měsíc" value="1 248 500" unit="Kč" big />
    <S.StatTile label="Marže" value="+27 %" accent="success" />
    <S.StatTile label="Po termínu" value="1" accent="danger" />
  </S.KpiRow>
  <S.KpiRow cols={3}>
    <S.StatTile label="Klienti" value="124" hint="Rodiny 92 · Firmy 32" />
    <S.StatTile label="Nové tento měsíc" value="7" accent="primary" />
    <S.StatTile label="Aktivní smlouvy" value="208" />
  </S.KpiRow>
</div>);
