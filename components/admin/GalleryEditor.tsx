"use client";

import ImageInput from "./ImageInput";

export default function GalleryEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
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
        Gallery images<span className="hint"> — the first image leads the gallery grid</span>
      </label>
      {value.map((row, i) => (
        <div className="a-list-row" key={i}>
          <div style={{ flex: 1 }}>
            <ImageInput value={row} onChange={(v) => update(i, v)} />
          </div>
          <button type="button" className="a-btn a-btn--danger a-btn--sm" onClick={() => remove(i)}>
            ✕
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="a-btn a-btn--ghost a-btn--sm" onClick={add}>
          + Add image
        </button>
      </div>
    </div>
  );
}
