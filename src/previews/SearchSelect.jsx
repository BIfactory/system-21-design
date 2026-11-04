import { S, React, mount } from "./shared.jsx";

const COMPANIES = [
  { value: "moravia", label: "Moravia Steel a.s.", hint: "IČ 25812345" },
  { value: "agro", label: "Agro Slovácko s.r.o.", hint: "IČ 28192740" },
  { value: "hradecka", label: "Hradecká strojírna s.r.o.", hint: "IČ 47283756" },
  { value: "novakovi", label: "Novákovi (rodina)", hint: "VIP" },
  { value: "dvorakovi", label: "Dvořákovi (rodina)" },
  { value: "prochazkovi", label: "Procházkovi s.r.o.", hint: "IČ 63729182" },
  { value: "svobodovi", label: "Svobodovi (rodina)", hint: "VIP" },
  { value: "kralovi", label: "Královi (rodina)" },
  { value: "cerny", label: "Černý & syn s.r.o." },
  { value: "bily", label: "Bílý výroba a.s." },
];

function Demo() {
  const [value, setValue] = React.useState("moravia");
  return (
    <div style={{ padding: 16, background: "var(--canvas)", maxWidth: 420 }}>
      <S.Field label="Klient">
        <S.SearchSelect value={value} onChange={setValue} options={COMPANIES} placeholder="Vyberte klienta…" searchPlaceholder="Hledat jméno, IČ…" />
      </S.Field>
    </div>
  );
}

mount(<Demo />);
