"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Ports the scroll-reveal + count-up interactions from the theme's main.js.
// Re-runs on route change so newly mounted elements are observed.
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const supported = "IntersectionObserver" in window;

    // ---- Scroll reveal ----
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
    );
    let io: IntersectionObserver | undefined;
    if (supported && revealEls.length) {
      io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io!.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    // ---- Count-up for stat numbers ----
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    let cio: IntersectionObserver | undefined;
    if (supported && counters.length) {
      cio = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const target = parseFloat(el.getAttribute("data-count") || "0");
            const suffix = el.getAttribute("data-suffix") || "";
            const dur = 1400;
            let start: number | null = null;
            const step = (ts: number) => {
              if (start === null) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              const val = target * eased;
              el.textContent =
                (target % 1 === 0 ? Math.round(val) : val.toFixed(2)) + suffix;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => cio!.observe(el));
    }

    return () => {
      io?.disconnect();
      cio?.disconnect();
    };
  }, [pathname]);

  return null;
}
