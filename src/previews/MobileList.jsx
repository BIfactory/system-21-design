import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, BRAND, QUICK, ORDERS, ORDER_COLUMNS, CRUMBS, orderCard } from "./shared.jsx";
import { MARK } from "../components/mark.js";

function Page() {
  const [chip, setChip] = React.useState("all");
  const [q, setQ] = React.useState("");
  return (
    <S.AppShell sidebar={<DemoSidebar active="/zakazky" />} topbar={<DemoTopBar crumbs={CRUMBS.slice(0, 1)} />}>
      <S.PageHeader title="Zakázky" description="Z CRM + ručně založené v aplikaci" actions={<S.Button icon="plus">Nová zakázka</S.Button>} />
      <S.PageBody>
        <S.ChipGroup value={chip} onChange={setChip} items={[{ value: "pipeline", label: "Pipeline", count: 14 }, { value: "all", label: "Vše", count: 38 }, { value: "done", label: "Hotové", count: 21 }]} />
        <S.FilterBar activeCount={1}>
          <S.SearchInput value={q} onChange={setQ} placeholder="Hledat název, klient…" />
          <S.Select placeholder="Všechny stavy" options={[{ value: "w", label: "Výhra" }]} />
          <S.Select placeholder="Všechny typy" options={[{ value: "a", label: "Reporting" }]} />
        </S.FilterBar>
        <S.DataTable renderCard={orderCard} columns={ORDER_COLUMNS} rows={ORDERS} />
        <S.Pagination page={2} totalPages={4} total={38} pageSize={10} noun="zakázek" />
      </S.PageBody>
    </S.AppShell>
  );
}
mount(<Page />);
