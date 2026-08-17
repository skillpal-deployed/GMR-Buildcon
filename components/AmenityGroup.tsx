import Icon from "./Icon";
import { guessIcon } from "@/lib/icon-map";
import type { ListItem } from "@/lib/types";

// Port of gmr_render_amenity_group() — subhead + amenity grid, skips when empty.
export default function AmenityGroup({
  label,
  items,
}: {
  label: string;
  items: ListItem[];
}) {
  if (!items.length) return null;
  return (
    <>
      <div className="subhead reveal">
        <span className="eyebrow">{label}</span>
        <span className="rule"></span>
      </div>
      <div className="grid amenity-grid">
        {items.map((item, i) => (
          <div className="amenity-card reveal" data-delay={Math.min(i + 1, 3)} key={i}>
            <div className="amenity-card__icon">
              <Icon name={guessIcon(item.title)} size={26} />
            </div>
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
          </div>
        ))}
      </div>
    </>
  );
}
