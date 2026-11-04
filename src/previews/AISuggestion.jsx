import { S, React, mount } from "./shared.jsx";

function Demo() {
  const [dismissed1, setD1] = React.useState(false);
  const [dismissed2, setD2] = React.useState(false);
  return (
    <div style={{ padding: 16, background: "var(--canvas)", display: "flex", flexDirection: "column", gap: 12, maxWidth: 680 }}>
      <S.AISuggestion
        title="Vykázat hodiny za včerejšek?"
        description="Včera jsi strávil 6 h na ZAK-2026-0131 (podle kalendáře + Git aktivit). Chceš je vykázat?"
        confidence={92}
        dismissed={dismissed1}
        onDismiss={() => setD1(true)}
        actions={<>
          <S.Button size="sm" icon="check">Vykázat</S.Button>
          <S.Button size="sm" variant="ghost">Upravit</S.Button>
        </>}
      />
      <S.AISuggestion
        title="3 smlouvy expirují do 30 dnů"
        description="Novákovi · Hradecká strojírna · Procházkovi. Doporučuji zavolat klientům s předstihem."
        confidence={100}
        dismissed={dismissed2}
        onDismiss={() => setD2(true)}
        actions={<>
          <S.Button size="sm">Zobrazit smlouvy</S.Button>
          <S.Button size="sm" variant="ghost">Vytvořit úkoly</S.Button>
        </>}
      />
    </div>
  );
}

mount(<Demo />);
