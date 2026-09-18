import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, BRAND, QUICK, ORDERS, ORDER_COLUMNS, CRUMBS, orderCard } from "./shared.jsx";
import { MARK } from "../components/mark.js";

mount(<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, background: "var(--canvas)" }}>
  <div style={{ background: "var(--sidebar-bg)", padding: 12, borderRadius: 12, width: 256, boxSizing: "border-box" }}><S.PoweredBy logo={<img src={MARK} alt="" />} /></div>
  <div style={{ padding: 12, width: 256, boxSizing: "border-box" }}><S.PoweredBy variant="light" logo={<img src={MARK} alt="" />} /></div>
</div>);
