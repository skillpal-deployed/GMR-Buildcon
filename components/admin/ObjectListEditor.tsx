"use client";

type Field = { key: string; placeholder: string; textarea?: boolean };
type Row = Record<string, string>;

// Repeatable rows of objects (e.g. { title, description } or { place, distance }).
export default function ObjectListEditor({
  label,
  hint,
  fields,
  value,
  onChange,
  addLabel = "Add row",
}: {
  label: string;
  hint?: string;
  fields: Field[];
  value: Row[];
  onChange: (v: Row[]) => void;
  addLabel?: string;
}) {
  function update(i: number, key: string, val: string) {
    const next = value.slice();
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  }
  function add() {
    const empty: Row = {};
    fields.forEach((f) => (empty[f.key] = ""));
    onChange([...value, empty]);
  }
  function remove(i: number) {
    onChange(value.filter((_, j) => j !== i));
  }

  return (
    <div className="a-field">
      <label>
        {label}
        {hint ? <span className="hint"> — {hint}</span> : null}
      </label>
      {value.map((row, i) => (
        <div className="a-list-row" key={i}>
          {fields.map((f) =>
            f.textarea ? (
              <textarea
                key={f.key}
                value={row[f.key] || ""}
                placeholder={f.placeholder}
                onChange={(e) => update(i, f.key, e.target.value)}
                style={{ minHeight: "52px" }}
              />
            ) : (
              <input
                key={f.key}
                type="text"
                value={row[f.key] || ""}
                placeholder={f.placeholder}
                onChange={(e) => update(i, f.key, e.target.value)}
              />
            )
          )}
          <button type="button" className="a-btn a-btn--danger a-btn--sm" onClick={() => remove(i)}>
            ✕
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="a-btn a-btn--ghost a-btn--sm" onClick={add}>
          + {addLabel}
        </button>
      </div>
    </div>
  );
}
