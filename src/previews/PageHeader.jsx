import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() {
  const [tab, setTab] = React.useState("realizace");
  return (
    <div style={{ background: "var(--canvas)", paddingBottom: 24 }}>
      <DemoTopBar crumbs={CRUMBS.slice(0, 3)} />
      <S.PageHeader sticky={false}
        title="Realizace"
        description="ZAK-2026-0131 · Agro Slovácko · termín 30. 09. 2026"
        actions={<><S.Button variant="secondary">Upravit</S.Button><S.Button icon="check">Označit hotovo</S.Button></>}
        tabs={<S.Tabs value={tab} onChange={setTab} items={[{ value: "realizace", label: "Realizace" }, { value: "plan", label: "Plán" }, { value: "vykazy", label: "Výkazy", count: 12 }, { value: "dokumenty", label: "Dokumenty" }, { value: "fotky", label: "Fotky" }, { value: "poznamky", label: "Poznámky" }, { value: "aktivita", label: "Aktivita" }]} />}
      />
      <div style={{ height: 24 }} />
      <S.PageHeader sticky={false} title="Zakázky" description="Z CRM + ručně založené v aplikaci" actions={<S.Button icon="plus">Nová zakázka</S.Button>} />
    </div>
  );
}
mount(<Demo />);
