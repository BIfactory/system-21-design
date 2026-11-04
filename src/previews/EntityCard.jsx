import { S, React, mount } from "./shared.jsx";

mount(<div style={{ padding: 16, background: "var(--canvas)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 820 }}>
  <S.EntityCard
    icon="users"
    title="Novákovi"
    subtitle="Rodina · 4 členové · aktivní"
    meta={[
      { label: "Smlouvy", value: "3 aktivní" },
      { label: "Hl. kontakt", value: "Jan Novák" },
      { label: "Poslední kontakt", value: "12. 10. 2026" },
    ]}
    tags={[{ label: "VIP", tone: "primary" }, { label: "Pojištění", tone: "neutral" }]}
    accent="primary"
    onClick={() => {}}
  />
  <S.EntityCard
    icon="building"
    title="Moravia Steel a.s."
    subtitle="Firma · IČ 25812345"
    meta={[
      { label: "Smlouvy", value: "8 aktivních" },
      { label: "Dluh", value: "0 Kč" },
      { label: "Obrat 2026", value: "2 480 000 Kč" },
    ]}
    tags={[{ label: "B2B", tone: "neutral" }]}
    accent="success"
    actions={<S.Button size="sm" iconOnly icon="more" aria-label="Víc akcí" title="Akce" />}
    onClick={() => {}}
  />
</div>);
