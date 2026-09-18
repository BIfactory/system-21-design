import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, ORDERS, ORDER_COLUMNS, CRUMBS } from "./shared.jsx";

function Demo() {
  const [crumbs, setCrumbs] = React.useState(CRUMBS);
  React.useEffect(() => { const b = document.querySelectorAll(".s21-topbar")[1]?.querySelector('[aria-label="Nastavení"]'); b && b.click(); }, []);
  return (
    <div style={{ background: "var(--canvas)", height: 540 }}>
      <S.TopBar breadcrumbs={<S.Breadcrumbs items={crumbs} onNavigate={(it, i) => setCrumbs(crumbs.slice(0, i + 1))} />} settings={SETTINGS} user={USER} onLogout={() => {}} />
      <div style={{ height: 24 }} />
      <S.TopBar breadcrumbs={<S.Breadcrumbs items={CRUMBS.slice(0, 2)} onNavigate={() => {}} />} settings={{ ...SETTINGS, activeHref: "/nastaveni" }} user={USER} onLogout={() => {}} />
    </div>
  );
}
mount(<Demo />);
