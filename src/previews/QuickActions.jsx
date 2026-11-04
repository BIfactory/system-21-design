import { S, React, mount } from "./shared.jsx";

const ACTIONS = [
  { label: "Nová zakázka", icon: "plus", onClick: () => {} },
  { label: "Nový úkol", icon: "tasks", onClick: () => {} },
  { label: "Nová smlouva", icon: "file", onClick: () => {} },
  { label: "Nový klient", icon: "user-plus", onClick: () => {} },
  { label: "Nový dokument", icon: "paperclip", onClick: () => {}, badge: 3 },
  { label: "Nová osoba", icon: "users", onClick: () => {} },
];

mount(<div style={{ padding: 16, background: "var(--canvas)" }}>
  <S.Section title="Rychlé akce">
    <S.QuickActions actions={ACTIONS} cols={3} />
  </S.Section>
</div>);
