import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() {
  const [sort, setSort] = React.useState({ key: "created", dir: "desc" });
  return <div style={{ padding: 16, background: "var(--canvas)", display: "flex", flexDirection: "column", gap: 16 }}>
    <S.DataTable columns={ORDER_COLUMNS} rows={ORDERS} sort={sort} onSort={(key, dir) => setSort({ key, dir })} onRowClick={() => {}} minWidth={900} />
    <S.DataTable columns={ORDER_COLUMNS.slice(0, 3)} rows={[]} empty="Žádné zakázky neodpovídají filtru" />
  </div>;
}
mount(<Demo />);
