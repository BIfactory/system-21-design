import { S, React, mount } from "./shared.jsx";

function Demo() {
  const [deadline, setDeadline] = React.useState("2026-11-25");
  const [status, setStatus] = React.useState("in-progress");
  const [note, setNote] = React.useState("Klient potvrdil termín.");
  return (
    <div style={{ padding: 16, background: "var(--canvas)", maxWidth: 640 }}>
      <S.Section title="Detail záznamu">
        <dl className="s21-entity__meta" style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "8px 24px" }}>
          <dt>Klient</dt>
          <dd>Novákovi</dd>
          <dt>Deadline</dt>
          <dd><S.InlineEditor value={deadline} type="date" onSave={setDeadline} label="deadline" display={(v) => v && new Date(v).toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric" })} /></dd>
          <dt>Stav</dt>
          <dd><S.InlineEditor value={status} type="select" onSave={setStatus} label="stav" options={[
            { value: "draft", label: "Rozpracováno" },
            { value: "offer", label: "Nabídka" },
            { value: "in-progress", label: "Realizace" },
            { value: "done", label: "Hotovo" },
          ]} display={(v) => <S.WorkflowBadge state={v} fitCell />} /></dd>
          <dt>Poznámka</dt>
          <dd><S.InlineEditor value={note} type="textarea" onSave={setNote} label="poznámka" /></dd>
        </dl>
      </S.Section>
    </div>
  );
}

mount(<Demo />);
