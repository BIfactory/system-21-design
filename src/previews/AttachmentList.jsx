import { S, React, mount } from "./shared.jsx";

const ITEMS = [
  { id: 1, name: "Smlouva o pojištění 2026.pdf", mimeType: "application/pdf", size: 243_200, uploadedBy: "Pavel O.", uploadedAt: "před 3 h" },
  { id: 2, name: "Foto škody IMG_2041.jpg", mimeType: "image/jpeg", size: 2_480_000, uploadedBy: "Jan Novák", uploadedAt: "včera" },
  { id: 3, name: "Pojistná událost 03-2026.pdf", mimeType: "application/pdf", size: 112_400, uploadedBy: "Alena D.", uploadedAt: "před 2 dny" },
  { id: 4, name: "Poznámky ze schůzky.txt", mimeType: "text/plain", size: 4_120, uploadedBy: "Pavel O.", uploadedAt: "před týdnem" },
];

mount(<div style={{ padding: 16, background: "var(--canvas)", maxWidth: 680 }}>
  <S.Section title="Přílohy">
    <S.AttachmentList items={ITEMS} onDownload={() => {}} onRemove={() => {}} />
  </S.Section>
</div>);
