import { S, React, mount } from "./shared.jsx";

const FEED = [
  { id: 1, actor: { name: "Alena Dvořáková" }, action: "podepsala smlouvu", target: "SM-2026-089", timestamp: "před 1 h" },
  { id: 2, actor: { name: "Systém" }, icon: "bell", action: "upozorňuje: 3 smlouvy vyprší do 30 dnů", timestamp: "před 3 h" },
  { id: 3, actor: { name: "Tomáš Novák" }, action: "přidal poznámku k", target: "Novákovi / rodina", timestamp: "včera" },
];

const ACTIONS = [
  { label: "Nová smlouva", icon: "file", onClick: () => {} },
  { label: "Nový klient", icon: "user-plus", onClick: () => {} },
  { label: "Nový dokument", icon: "paperclip", onClick: () => {} },
];

mount(<div style={{ padding: 16, background: "var(--canvas)" }}>
  <S.ModuleHome
    title="Dashboard"
    description="Co se dnes děje v tvojí praxi"
    kpis={
      <S.KpiRow cols={4}>
        <S.StatTile label="Klienti" value="124" accent="primary" />
        <S.StatTile label="Smlouvy aktivní" value="208" />
        <S.StatTile label="Otevřené příležitosti" value="7" accent="primary" />
        <S.StatTile label="Nepodepsané smlouvy" value="2" accent="danger" />
      </S.KpiRow>
    }
    quickActions={<S.QuickActions actions={ACTIONS} cols={3} />}
    activity={<S.ActivityFeed items={FEED} />}
    diary={
      <S.Section title="Deník dne">
        <div style={{ font: "400 14px/20px var(--font-body)", color: "var(--ink-muted)" }}>
          Dnes vyprší 3 smlouvy, 2 úkoly po termínu, 1 nová zpráva v mailu.
        </div>
      </S.Section>
    }
  />
</div>);
