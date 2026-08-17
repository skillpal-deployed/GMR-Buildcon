import { ICON_PATHS } from "@/lib/icons";

type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

// Renders an inline SVG icon by name (port of gmr_icon()).
export default function Icon({ name, size = 24, className }: IconProps) {
  const inner = ICON_PATHS[name];
  if (!inner) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
