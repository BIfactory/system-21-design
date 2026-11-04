import { S, React, mount } from "./shared.jsx";

const ITEMS = [
  { id: 1, group: "Dnes", icon: "sparkles", tone: "primary", title: "AI navrhuje vykázat 6 h", description: "Včera jsi strávil 6 h na ZAK-131.", time: "před 2 h", read: false },
  { id: 2, group: "Dnes", icon: "check", tone: "success", title: "Smlouva podepsaná", description: "SM-089 Moravia Steel.", time: "před 3 h", read: false },
  { id: 3, group: "Včera", icon: "chat", title: "Alena okomentovala smlouvu", description: "„Podpis plánujeme na 20. 11.“", time: "včera", read: true },
];

function Demo() {
  const [items, setItems] = React.useState(ITEMS);
  return (
    <div style={{ padding: 16, background: "var(--canvas)", minHeight: 420, display: "flex", justifyContent: "flex-end" }}>
      <S.NotificationCenter
        notifications={items}
        onMarkAllRead={() => setItems(items.map((n) => ({ ...n, read: true })))}
        onNavigate={() => {}}
        onClick={(n) => setItems(items.map((x) => x.id === n.id ? { ...x, read: true } : x))}
      />
    </div>
  );
}

mount(<Demo />);
