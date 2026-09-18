import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, BRAND, QUICK, ORDERS, ORDER_COLUMNS, CRUMBS, orderCard } from "./shared.jsx";
import { MARK } from "../components/mark.js";

function Page() {
  const [tab, setTab] = React.useState("realizace");
  return (
    <S.AppShell sidebar={<DemoSidebar active="/zakazky" />} topbar={<DemoTopBar crumbs={CRUMBS.slice(0, 3)} />}>
      <S.PageHeader title="Realizace" description="ZAK-2026-0131 · Agro Slovácko"
        actions={<><S.Button variant="secondary">Upravit</S.Button><S.Button icon="check">Hotovo</S.Button></>}
        tabs={<S.Tabs value={tab} onChange={setTab} items={[{ value: "realizace", label: "Realizace" }, { value: "plan", label: "Plán" }, { value: "vykazy", label: "Výkazy", count: 12 }, { value: "dokumenty", label: "Dokumenty" }]} />} />
      <S.PageBody>
        <div className="s21-stat-grid">
          <S.StatTile label="Cena bez DPH" value="312 000" unit="Kč" big />
          <S.StatTile label="Provozní marže" value="−4 %" accent="danger" hint="Vykázáno 128 h z 110 h" />
        </div>
        <S.Section title="Operace" subtitle="3 ze 7 hotovo">
          <S.Stepper current={3} steps={["Analýza", "Mapování", "Napojení", "Test"]} />
        </S.Section>
      </S.PageBody>
      <S.StickyActionBar label="Cena bez DPH" value="312 000 Kč" note="Ukládám…" />
    </S.AppShell>
  );
}
mount(<Page />);
