import { S, React, mount, DemoSidebar, SECTIONS, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() { return <div style={{ height: 400 }}><S.Modal inline open onClose={() => {}} title="Nová zakázka" description="Založí zakázku mimo CRM" footer={<><S.Button variant="secondary">Zrušit</S.Button><S.Button>Založit</S.Button></>}>
  <S.Field label="Název"><S.Input placeholder="Např. Reporting obchodu" /></S.Field>
  <S.Field label="Klient"><S.Select placeholder="Vyberte klienta" options={[{ value: "1", label: "Moravia Steel a.s." }]} /></S.Field>
</S.Modal></div>; }
mount(<Demo />);
