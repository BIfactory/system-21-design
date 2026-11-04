import { S, React, mount } from "./shared.jsx";

function Demo() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const send = (text) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, role: "user", content: text }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: id + 1, role: "assistant", content: "Rozumím. Můžu ti pomoct s následujícím: " + text.toLowerCase() + ". Chceš, abych založila úkol?" }]);
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ padding: 16, background: "var(--canvas)", minHeight: 300 }}>
      <S.Button icon="sparkles" onClick={() => setOpen(true)}>Otevřít AI asistentku</S.Button>
      <S.AIPanel
        open={open}
        onClose={() => setOpen(false)}
        context={{ label: "Pracuji s:", value: "ZAK-2026-0131" }}
        suggestedPrompts={[
          { label: "Shrň mi aktuální stav", prompt: "Shrň aktuální stav zakázky", icon: "sparkles" },
          { label: "Co mi zbývá tento týden?", prompt: "Jaké úkoly mi zbývají do konce týdne?", icon: "tasks" },
          { label: "Jak odpovědět klientovi", prompt: "Pomoz mi formulovat odpověď klientovi", icon: "chat" },
        ]}
        messages={messages}
        onSend={send}
        loading={loading}
      />
    </div>
  );
}

mount(<Demo />);
