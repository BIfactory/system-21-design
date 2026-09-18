import { S, React, mount, DemoSidebar, DemoTopBar, SETTINGS, USER, BRAND, QUICK, ORDERS, ORDER_COLUMNS, CRUMBS, orderCard } from "./shared.jsx";
import { MARK } from "../components/mark.js";

mount(<div style={{ padding: "16px 0", background: "var(--canvas)" }}><S.StickyActionBar inline label="Cena bez DPH" value="184 000 Kč" note="Změny se ukládají…" action={<S.Button>Uložit</S.Button>} /></div>);
