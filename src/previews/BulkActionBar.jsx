import { S, React, mount } from "./shared.jsx";

function Demo() {
  const [count, setCount] = React.useState(3);
  return (
    <div style={{ padding: 16, background: "var(--canvas)", minHeight: 240 }}>
      <S.Button onClick={() => setCount((c) => c + 1)}>Přidat</S.Button>{" "}
      <S.Button variant="secondary" onClick={() => setCount(0)}>Vynulovat</S.Button>
      <S.BulkActionBar
        count={count}
        label="úkolů vybráno"
        onClear={() => setCount(0)}
        actions={[
          { label: "Označit hotové", icon: "check", onClick: () => {} },
          { label: "Delegovat", icon: "users", onClick: () => {} },
          { label: "Smazat", icon: "trash", variant: "danger", onClick: () => {} },
        ]}
      />
    </div>
  );
}

mount(<Demo />);
