import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

mount(<div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, maxWidth: 384 }}>
  <S.Toast tone="success" message="Zakázka uložena." onDismiss={() => {}} />
  <S.Toast tone="error" message="Synchronizace s CRM selhala. Zkuste to znovu." onDismiss={() => {}} />
  <S.Toast tone="info" message="Nová verze aplikace je k dispozici." onDismiss={() => {}} />
</div>);
