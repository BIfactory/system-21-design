import { S, React, mount } from "./shared.jsx";

const VARIANTS_BY_INTENT = [
  "Dobrý den, zasílám smlouvu k podpisu. V případě dotazů jsem k dispozici na tel. +420 602 123 456. S pozdravem Pavel",
  "Dobrý den, posílám vám připravenou smlouvu k podpisu. Prosím, dejte vědět, jestli všechno odpovídá domluvě. S pozdravem Pavel",
  "Dobrý den, smlouvu máme hotovou — v příloze. Pokud by bylo co upravit, dejte vědět. Děkuji, Pavel",
];

function Demo() {
  const [text, setText] = React.useState("ahoj posilam smlouvu");
  return (
    <div style={{ padding: 16, background: "var(--canvas)", maxWidth: 560 }}>
      <S.Field label="Zpráva klientovi">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <S.Textarea value={text} onChange={setText} rows={4} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <S.AIInputHelper
              value={text}
              variants={VARIANTS_BY_INTENT}
              onSelect={setText}
              onGenerate={(current) => new Promise((res) => setTimeout(() => res(VARIANTS_BY_INTENT), 700))}
              label="Přepsat formálněji"
            />
          </div>
        </div>
      </S.Field>
    </div>
  );
}

mount(<Demo />);
