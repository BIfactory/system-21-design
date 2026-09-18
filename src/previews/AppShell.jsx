import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, BRAND, QUICK, ORDERS, ORDER_COLUMNS, CRUMBS, orderCard } from "./shared.jsx";

function Page() {
  const [tab, setTab] = React.useState("realizace");
  const [chip, setChip] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState({ key: "created", dir: "desc" });
  const [crumbs, setCrumbs] = React.useState(CRUMBS);
  return (
    <S.AppShell sidebar={<DemoSidebar active="/zakazky" />} topbar={<DemoTopBar crumbs={crumbs} onNavigate={(it, i) => setCrumbs(crumbs.slice(0, i + 1))} />}>
      <S.PageHeader
        title={crumbs[crumbs.length - 1].label}
        description="Z CRM + ručně založené v aplikaci"
        actions={<><S.Button variant="secondary" icon="filter">Export</S.Button><S.Button icon="plus">Nová zakázka</S.Button></>}
        tabs={<S.Tabs value={tab} onChange={setTab} items={[{ value: "realizace", label: "Realizace" }, { value: "plan", label: "Plán" }, { value: "vykazy", label: "Výkazy", count: 12 }, { value: "dokumenty", label: "Dokumenty" }, { value: "aktivita", label: "Aktivita" }]} />}
      />
      <S.PageBody>
        <div className="s21-stat-grid">
          <S.StatTile label="Tržby tento měsíc" value="1 248 500" unit="Kč" big />
          <S.StatTile label="Obchodní marže" value="+27 %" accent="success" />
          <S.StatTile label="Po termínu" value="1" accent="danger" hint="Napojení ERP → CRM" />
          <S.StatTile label="Rozpracováno" value="3" accent="primary" />
        </div>
        <S.ChipGroup value={chip} onChange={setChip} items={[{ value: "pipeline", label: "Sales pipeline", count: 14 }, { value: "all", label: "Vše", count: 38 }, { value: "done", label: "Hotové", count: 21 }]} />
        <S.FilterBar activeCount={1}>
          <S.SearchInput className="s21-grow" value={q} onChange={setQ} placeholder="Hledat název, klient, ID…" />
          <S.Select placeholder="Všechny stavy" options={[{ value: "w", label: "Výhra" }, { value: "n", label: "Nabídka" }]} />
          <S.Select placeholder="Všechny typy" options={[{ value: "a", label: "Reporting" }, { value: "b", label: "Automatizace" }]} />
        </S.FilterBar>
        <S.DataTable renderCard={orderCard} columns={ORDER_COLUMNS} rows={ORDERS} sort={sort} onSort={(key, dir) => setSort({ key, dir })} onRowClick={() => {}} minWidth={900} />
        <S.Pagination page={1} totalPages={4} total={38} pageSize={10} noun="zakázek" />
      </S.PageBody>
    </S.AppShell>
  );
}
mount(<Page />);
