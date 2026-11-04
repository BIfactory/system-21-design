import { S, React, mount } from "./shared.jsx";

const SECTIONS = [
  {
    title: "Dokumenty",
    count: 12,
    items: [
      { icon: "file", label: "Smlouva o pojištění 2026", meta: "PDF · 240 kB" },
      { icon: "file", label: "Pojistná událost 03/2026", meta: "PDF · 112 kB" },
      { icon: "image", label: "Foto škody" },
    ],
    action: { label: "Přidat dokument", icon: "plus", onClick: () => {} },
  },
  {
    title: "Úkoly",
    count: 3,
    items: [
      { icon: "tasks", label: "Zavolat klientovi", meta: "do 15. 11." },
      { icon: "tasks", label: "Odeslat nabídku", meta: "do 18. 11." },
      { icon: "tasks", label: "Kontrola smlouvy", meta: "zítra" },
    ],
  },
  {
    title: "Osoby",
    count: 4,
    items: [
      { icon: "user", label: "Jan Novák" },
      { icon: "user", label: "Marie Nováková" },
      { icon: "user", label: "Jana Nováková (dcera)" },
      { icon: "user", label: "Petr Novák (syn)" },
    ],
  },
];

mount(<div style={{ padding: 16, background: "var(--canvas)", maxWidth: 360 }}>
  <S.RelationsSidebar sections={SECTIONS} />
</div>);
