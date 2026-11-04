import { S, React, mount } from "./shared.jsx";

function Demo() {
  const [open, setOpen] = React.useState(false);
  const [hours, setHours] = React.useState("2");
  const [note, setNote] = React.useState("");
  return (
    <div style={{ padding: 16, background: "var(--canvas)" }}>
      <S.Button icon="clock" onClick={() => setOpen(true)}>Vykázat hodiny</S.Button>
      <S.QuickActionModal
        open={open}
        onClose={() => setOpen(false)}
        title="Vykázat hodiny"
        description="Zakázka ZAK-2026-0131"
        icon="clock"
        footer={<>
          <S.Button variant="secondary" onClick={() => setOpen(false)}>Zrušit</S.Button>
          <S.Button onClick={() => setOpen(false)}>Uložit</S.Button>
        </>}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <S.Field label="Počet hodin" htmlFor="qa-hours">
            <S.Input id="qa-hours" value={hours} onChange={setHours} type="number" />
          </S.Field>
          <S.Field label="Poznámka" htmlFor="qa-note">
            <S.Textarea id="qa-note" value={note} onChange={setNote} placeholder="Co jsi dělal?" />
          </S.Field>
        </div>
      </S.QuickActionModal>
    </div>
  );
}

mount(<Demo />);
