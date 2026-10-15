import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand } from "../config/brand";
import { mainNav } from "../content/navigation";
import { IconDiamond, IconGlobe, IconInstagram, IconSparkle } from "./icons";
import { LogoMark } from "./Logo";

function isActive(href: string, pathname: string, search: string): boolean {
  const [path = "", query] = href.split("?");
  if (path === "/") return pathname === "/";
  if (query) return pathname === path && search.includes(query);
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Header() {
  const { pathname, search } = useLocation();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${compact ? " is-compact" : ""}`}>
      <Link to="/" className="site-logo" aria-label={brand.name}>
        <LogoMark size={compact ? 24 : 32} />
        <span className="site-logo-name">{brand.name}</span>
      </Link>

      <nav className="main-nav" aria-label="Main">
        <ul>
          {mainNav.map((item) => (
            <li
              key={item.label}
              className={item.separatorBefore ? "has-separator" : undefined}
            >
              <Link
                to={item.href}
                className={`nav-link${isActive(item.href, pathname, search) ? " is-active" : ""}`}
              >
                {item.label}
                {item.badge ? (
                  <span className="badge">{item.badge}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">
        <a className="header-social" href="#" aria-label="Instagram">
          <IconInstagram size={24} />
        </a>
        <Link to="/pricing" className="header-pill header-pricing">
          <IconDiamond />
          <span>Pricing</span>
          <span className="discount-badge">{brand.discountLabel}</span>
        </Link>
        <Link to="/enterprise" className="header-pill header-enterprise">
          <IconSparkle />
          <span>Enterprise</span>
        </Link>
        <button
          type="button"
          className="header-pill header-icon"
          aria-label="Change language"
        >
          <IconGlobe />
        </button>
        <span className="header-divider" aria-hidden="true" />
        <button type="button" className="header-login">
          Login
        </button>
        <button type="button" className="header-signup">
          Sign up
        </button>
      </div>
    </header>
  );
}
