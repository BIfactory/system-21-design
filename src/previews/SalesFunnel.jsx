import { S, React, mount } from "./shared.jsx";

const STAGES = [
  { id: "draft", label: "Rozpracováno", count: 24, value: "— Kč" },
  { id: "offer", label: "Nabídka", count: 14, value: "248 500 Kč", color: "var(--primary)" },
  { id: "negotiation", label: "V jednání", count: 8, value: "412 300 Kč", color: "#d97706" },
  { id: "win", label: "Výhra", count: 38, value: "1 240 500 Kč", color: "var(--success-solid)" },
  { id: "loss", label: "Prohra", count: 6, value: "187 200 Kč", color: "var(--danger-solid)" },
];

function Demo() {
  const [stage, setStage] = React.useState(null);
  return (
    <div style={{ padding: 16, background: "var(--canvas)" }}>
      <S.SalesFunnel title="Pipeline obchodních případů" stages={STAGES} value={stage} onChange={setStage} />
      <div style={{ marginTop: 12, font: "400 13px/18px var(--font-body)", color: "var(--ink-muted)" }}>
        Vybraný stav: <strong>{STAGES.find((s) => s.id === stage)?.label || "žádný"}</strong>
      </div>
    </div>
  );
}

mount(<Demo />);
