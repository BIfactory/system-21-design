import { S, React, mount } from "./shared.jsx";

function Demo() {
  const steps = [
    {
      id: "basic", title: "Základní",
      validate: ({ values }) => {
        const errs = [];
        if (!values.name || values.name.length < 3) errs.push("Název musí mít alespoň 3 znaky.");
        return errs;
      },
      render: ({ values, setValue }) => (
        <S.Field label="Název zakázky" htmlFor="w-name">
          <S.Input id="w-name" value={values.name || ""} onChange={(v) => setValue("name", v)} placeholder="např. Reporting obchodu" />
        </S.Field>
      ),
    },
    {
      id: "deadline", title: "Termín",
      validate: ({ values }) => {
        const errs = [];
        if (!values.deadline) errs.push("Zadejte termín.");
        else if (new Date(values.deadline) < new Date()) errs.push("Termín musí být v budoucnosti.");
        return errs;
      },
      render: ({ values, setValue }) => (
        <S.Field label="Deadline" htmlFor="w-deadline">
          <S.Input id="w-deadline" type="date" value={values.deadline || ""} onChange={(v) => setValue("deadline", v)} />
        </S.Field>
      ),
    },
    {
      id: "summary", title: "Souhrn",
      render: ({ values }) => (
        <dl className="s21-entity__meta" style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "4px 24px" }}>
          <dt>Název</dt><dd>{values.name || "—"}</dd>
          <dt>Deadline</dt><dd>{values.deadline || "—"}</dd>
        </dl>
      ),
    },
  ];

  const [done, setDone] = React.useState(null);
  return (
    <div style={{ padding: 16, background: "var(--canvas)", maxWidth: 680 }}>
      {done ? (
        <S.Callout tone="success" title="Hotovo">
          Zakázka „{done.name}" vytvořena s deadline {done.deadline}.
        </S.Callout>
      ) : (
        <S.FormWizard
          steps={steps}
          initialValues={{ name: "", deadline: "" }}
          onComplete={setDone}
          onCancel={() => {}}
        />
      )}
    </div>
  );
}

mount(<Demo />);
