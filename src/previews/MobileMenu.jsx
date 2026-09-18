import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, BRAND, QUICK, ORDERS, ORDER_COLUMNS, CRUMBS, orderCard } from "./shared.jsx";
import { MARK } from "../components/mark.js";

mount(
  <S.AppShell defaultDrawerOpen sidebar={<DemoSidebar active="/zakazky" />} topbar={<DemoTopBar crumbs={CRUMBS.slice(0, 1)} />}>
    <S.PageHeader title="Zakázky" />
    <S.PageBody><S.DataTable renderCard={orderCard} columns={ORDER_COLUMNS} rows={ORDERS} /></S.PageBody>
  </S.AppShell>
);
