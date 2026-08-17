"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { site, primaryNav } from "@/lib/config";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Sticky header background on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape or when resizing up to desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={"site-header" + (scrolled ? " scrolled" : "")} id="site-header">
        <div className="container container--wide">
          <div className="site-header__inner">
            <Link className="brand" href="/" aria-label={`${site.name} — Home`}>
              <span className="brand__mark" aria-hidden="true">
                G
              </span>
              <span className="brand__text">
                <span className="brand__name">GMR Buildcon</span>
                <span className="brand__tag">Real Estate</span>
              </span>
            </Link>

            <nav
              className={"primary-nav" + (open ? " is-open" : "")}
              id="primary-nav"
              aria-label="Primary"
            >
              <ul id="primary-menu" className="menu">
                {primaryNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href} className={active ? "current-menu-item" : undefined}>
                      <Link href={item.href} aria-current={active ? "page" : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="header-actions">
              <a className="header-phone" href={`tel:${site.phoneLink}`}>
                <Icon name="phone" size={18} />
                <span>{site.phone}</span>
              </a>
              <a
                className="btn btn--gold header-cta"
                href={site.brochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                Brochure <Icon name="download" size={16} />
              </a>
              <button
                className={"nav-toggle" + (open ? " is-active" : "")}
                id="nav-toggle"
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="primary-nav"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="label">Menu</span>
                <span className="bars" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div
        className={"nav-backdrop" + (open ? " is-open" : "")}
        id="nav-backdrop"
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
}
