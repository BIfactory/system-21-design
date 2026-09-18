import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, BRAND, QUICK, ORDERS, ORDER_COLUMNS, CRUMBS, orderCard } from "./shared.jsx";
import { MARK } from "../components/mark.js";

mount(<div style={{ padding: 16, background: "var(--canvas)", display: "flex", flexDirection: "column", gap: 8 }}>{ORDERS.slice(0, 3).map(orderCard)}</div>);
