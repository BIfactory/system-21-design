import { S, React, mount } from "./shared.jsx";

const COMMENTS = [
  {
    id: 1, author: "Pavel Obdržálek",
    text: "Klient potvrdil termín schůzky na 20. 11. v 9:00. Beru s sebou návrh smlouvy a tabulku porovnání.",
    createdAt: "před 2 h",
    reactions: { "👍": 2 },
  },
  {
    id: 2, author: "Alena Dvořáková",
    text: "Super, já dám do systému poznámku k rodině. Mám připravit i ten doplňkový úrazovák?",
    createdAt: "před 1 h",
    replies: [
      { id: 21, author: "Pavel Obdržálek", text: "Jo, a hoď k tomu i ceny Allianz a UNIQA.", createdAt: "před 45 min" },
    ],
  },
  {
    id: 3, author: "Tomáš Novák",
    text: "Jen doplnění: paní klientka má alergii — vstupní lékařská prohlídka proběhla už loni, výsledky jsou ve složce.",
    createdAt: "před 10 min",
  },
];

function Demo() {
  const [items, setItems] = React.useState(COMMENTS);
  const add = (text) => setItems([...items, {
    id: Date.now(), author: "Lubomír Hulín", text, createdAt: "právě teď",
  }]);
  return (
    <div style={{ padding: 16, background: "var(--canvas)", maxWidth: 680 }}>
      <S.Section title="Komentáře">
        <S.CommentThread
          items={items}
          onAdd={add}
          currentUser={{ name: "Lubomír Hulín" }}
        />
      </S.Section>
    </div>
  );
}

mount(<Demo />);
