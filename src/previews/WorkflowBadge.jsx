import { S, React, mount } from "./shared.jsx";

const STATES = ["draft", "offer", "negotiation", "in-progress", "win", "done", "loss", "blocked", "overdue"];

mount(<div style={{ padding: 16, background: "var(--canvas)", display: "flex", flexWrap: "wrap", gap: 8 }}>
  {STATES.map((s) => <S.WorkflowBadge key={s} state={s} />)}
</div>);
