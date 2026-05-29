import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const NAV_ITEMS = [
  {
    label: "Rechtsgebiete",
    links: [
      { label: "Arbeitsrecht",               href: "/rechtsgebiet?landingpage=/arbeitsrecht",            as: "/arbeitsrecht" },
      { label: "Sozialrecht",                href: "/rechtsgebiet?landingpage=/sozialrecht",             as: "/sozialrecht" },
      { label: "Staats- & Verfassungsrecht", href: "/rechtsgebiet?landingpage=/staats-verfassungsrecht", as: "/staats-verfassungsrecht" },
      { label: "Steuerrecht",                href: "/rechtsgebiet?landingpage=/steuerrecht",             as: "/steuerrecht" },
      { label: "Strafrecht",                 href: "/rechtsgebiet?landingpage=/strafrecht",              as: "/strafrecht" },
    ],
  },
  {
    label: "Gerichte",
    links: [
      { label: "Bundesverfassungsgericht (BVerfG)", as: "/bverfg" },
      { label: "Bundesgerichtshof (BGH)",           as: "/bgh" },
      { label: "Bundesverwaltungsgericht (BVerwG)", as: "/bverwg" },
      { label: "Bundesfinanzhof (BFH)",             as: "/bfh" },
      { label: "Bundesarbeitsgericht (BAG)",        as: "/bag" },
      { label: "Bundessozialgericht (BSG)",         as: "/bsg" },
      { label: "Bundespatentgericht (BPatG)",       as: "/bpatg-entscheidungen" },
      { label: "Gemeinsamer Senat (GmS-OGB)",       as: "/gmsogb" },
    ],
  },
  {
    label: "Gesetze",
    links: [
      { label: "BGB",  href: "/gesetz/?kanonischeUrl=/gesetze/bgb",  as: "/gesetze/bgb" },
      { label: "StGB", href: "/gesetz/?kanonischeUrl=/gesetze/stgb", as: "/gesetze/stgb" },
      { label: "ZPO",  href: "/gesetz/?kanonischeUrl=/gesetze/zpo",  as: "/gesetze/zpo" },
      { label: "GG",   href: "/gesetz/?kanonischeUrl=/gesetze/gg",   as: "/gesetze/gg" },
      { label: "HGB",  href: "/gesetz/?kanonischeUrl=/gesetze/hgb",  as: "/gesetze/hgb" },
      { label: "StPO", href: "/gesetz/?kanonischeUrl=/gesetze/stpo", as: "/gesetze/stpo" },
    ],
  },
];

// ── Inline styles (sicher vor styled-jsx Scoping) ──────────────────────────

const S = {
  navItem: { position: "relative" },

  navBtn: (open) => ({
    display: "flex", alignItems: "center", gap: 4,
    padding: "6px 10px",
    fontSize: "0.875rem", fontWeight: 500,
    color: open ? "#014fa4" : "#444",
    background: open ? "#f0f4ff" : "none",
    border: "none", borderRadius: 6,
    cursor: "pointer", whiteSpace: "nowrap",
    transition: "background-color 0.15s, color 0.15s",
  }),

  dropdown: {
    position: "absolute", top: "calc(100% + 8px)", left: 0,
    background: "white", border: "1px solid #e8eaed",
    borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    minWidth: 220, padding: 6, zIndex: 200,
  },

  dropdownLink: {
    display: "block", padding: "8px 12px",
    fontSize: "0.875rem", color: "#333",
    textDecoration: "none", borderRadius: 6,
  },

  // Mobile menu panel
  mobileOverlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.3)", zIndex: 150,
  },

  mobilePanel: {
    position: "fixed", top: 56, left: 0, right: 0,
    background: "white",
    borderBottom: "1px solid #e8eaed",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    zIndex: 160, overflowY: "auto",
    maxHeight: "calc(100vh - 56px)",
    padding: "8px 0 16px",
  },

  mobileSectionBtn: (open) => ({
    display: "flex", alignItems: "center", justifyContent: "space-between",
    width: "100%", padding: "12px 20px",
    fontSize: "1rem", fontWeight: 600,
    color: "#222", background: "none", border: "none",
    cursor: "pointer", textAlign: "left",
  }),

  mobileSectionLinks: {
    paddingBottom: 4,
  },

  mobileSectionLink: {
    display: "block", padding: "10px 20px 10px 32px",
    fontSize: "0.9rem", color: "#444",
    textDecoration: "none", borderBottom: "none",
  },

  hamburger: (open) => ({
    display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center",
    width: 36, height: 36,
    background: "none", border: "none",
    cursor: "pointer", padding: 6, borderRadius: 6,
    gap: 5,
  }),

  bar: (open, i) => ({
    display: "block", width: 20, height: 2,
    background: "#444", borderRadius: 2,
    transformOrigin: "center",
    transition: "transform 0.25s ease, opacity 0.2s ease",
    transform: open
      ? i === 0 ? "translateY(7px) rotate(45deg)"
      : i === 2 ? "translateY(-7px) rotate(-45deg)"
      : "scaleX(0)"
      : "none",
    opacity: open && i === 1 ? 0 : 1,
  }),
};

// ── Desktop Dropdown ───────────────────────────────────────────────────────

function DesktopDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    Router.events.on("routeChangeStart", close);
    return () => Router.events.off("routeChangeStart", close);
  }, []);

  return (
    <div style={S.navItem} ref={ref}>
      <button style={S.navBtn(open)} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {item.label}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", opacity: 0.6 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={S.dropdown}>
          {item.links.map((link) => (
            <Link key={link.as} href={link.href || link.as} as={link.as}
              style={S.dropdownLink}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4ff"; e.currentTarget.style.color = "#014fa4"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#333"; }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Mobile Menu ────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const close = () => onClose();
    Router.events.on("routeChangeStart", close);
    return () => Router.events.off("routeChangeStart", close);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <div style={S.mobileOverlay} onClick={onClose} />
      <div style={S.mobilePanel}>
        {NAV_ITEMS.map((item) => (
          <div key={item.label}>
            <button
              style={S.mobileSectionBtn(expanded === item.label)}
              onClick={() => setExpanded((v) => v === item.label ? null : item.label)}
            >
              <span>{item.label}</span>
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none"
                style={{ transition: "transform 0.2s", transform: expanded === item.label ? "rotate(180deg)" : "none", opacity: 0.5, flexShrink: 0 }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {expanded === item.label && (
              <div style={S.mobileSectionLinks}>
                {item.links.map((link) => (
                  <Link key={link.as} href={link.href || link.as} as={link.as}
                    style={S.mobileSectionLink}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#014fa4"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#444"; }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────

export default function Header({ query, noSearchBar }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      <style jsx>{`
        header {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: fixed;
          width: 100%;
          z-index: 100;
          box-shadow: 0 1px 0 rgba(20, 23, 28, 0.08);
        }
        .header-inner {
          display: flex;
          align-items: center;
          padding: 0 20px;
          height: 56px;
          gap: 8px;
        }
        .logo-wrap { flex-shrink: 0; margin-right: 8px; }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }
        .searchbar-wrap {
          flex: 1;
          max-width: 380px;
          margin: 0 16px;
        }
        .header-right {
          margin-left: auto;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-blog {
          font-size: 0.8rem;
          padding: 5px 12px;
          color: #555;
          border: 1px solid #ddd;
          border-radius: 6px;
          text-decoration: none;
          transition: background-color 0.15s;
          white-space: nowrap;
        }
        .btn-blog:hover { background-color: #f5f5f5; color: #333; }

        /* Desktop: zeige Nav, verstecke Hamburger */
        .desktop-nav  { display: flex; }
        .hamburger-btn { display: none; }

        /* Mobile */
        @media (max-width: 767px) {
          .desktop-nav  { display: none; }
          .hamburger-btn { display: flex; }
          .searchbar-wrap { display: none; }
        }
      `}</style>

      <div className="header-inner">
        <div className="logo-wrap">
          <Logo />
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => (
            <DesktopDropdown key={item.label} item={item} />
          ))}
        </nav>

        {!noSearchBar && (
          <div className="searchbar-wrap">
            <SearchBar query={query} />
          </div>
        )}

        <div className="header-right">
          <a href="https://blog.urteile-gesetze.de" className="btn-blog">
            Neues
          </a>

          {/* Hamburger – nur mobile */}
          <button
            className="hamburger-btn"
            style={S.hamburger(mobileOpen)}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
          >
            <span style={S.bar(mobileOpen, 0)} />
            <span style={S.bar(mobileOpen, 1)} />
            <span style={S.bar(mobileOpen, 2)} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
