import { S, React, mount } from "./shared.jsx";

function Demo() {
  // Mock onFiles — emulate 1-2s upload
  const onFiles = (files) => new Promise((res, rej) => {
    setTimeout(() => {
      // Simulate 20% chance of failure for file named "bad"
      if (files[0].name.toLowerCase().includes("bad")) rej(new Error("Server error"));
      else res();
    }, 1200);
  });
  return (
    <div style={{ padding: 16, background: "var(--canvas)", maxWidth: 560 }}>
      <S.FileUploadZone onFiles={onFiles} accept=".pdf,.jpg,.png,.doc,.docx" maxSize={10 * 1024 * 1024} />
    </div>
  );
}

mount(<Demo />);
