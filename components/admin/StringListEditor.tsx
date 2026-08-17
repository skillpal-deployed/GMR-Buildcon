"use client";

// Repeatable rows of plain strings (e.g. floor-plan highlights).
export default function StringListEditor({
  label,
  hint,
  value,
  onChange,
  placeholder = "",
  addLabel = "Add",
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  function update(i: number, val: string) {
    const next = value.slice();
    next[i] = val;
    onChange(next);
  }
  function add() {
    onChange([...value, ""]);
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
          <input
            type="text"
            value={row}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
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
