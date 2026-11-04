import { S, React, mount } from "./shared.jsx";

const FEED = [
  { id: 1, actor: { name: "Pavel Obdržálek" }, action: "založil zakázku", target: "ZAK-2026-0142 Reporting obchodu", timestamp: "před 12 min" },
  { id: 2, actor: { name: "Alena Dvořáková" }, action: "podepsala smlouvu", target: "SM-2026-089 Moravia Steel", timestamp: "před 1 h" },
  { id: 3, actor: { name: "Systém" }, icon: "bell", action: "upozorňuje: 3 smlouvy vyprší do 30 dnů", timestamp: "před 3 h" },
  { id: 4, actor: { name: "Tomáš Novák" }, action: "přidal poznámku k", target: "Novákovi / rodina", timestamp: "před 5 h" },
  { id: 5, actor: { name: "Alena Dvořáková" }, action: "označila úkol hotový:", target: "Zavolat klientovi Agro Slovácko", timestamp: "včera" },
];

mount(<div style={{ padding: 16, background: "var(--canvas)", maxWidth: 560 }}>
  <S.Section title="Deník dne">
    <S.ActivityFeed items={FEED} />
  </S.Section>
</div>);
