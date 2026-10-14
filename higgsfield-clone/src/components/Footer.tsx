import { brand } from "../config/brand";
import { footerColumns, legalLinks } from "../content/navigation";
import { IconChevronDown } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <h2 className="footer-title display">
          AI-native
          <br />
          creative suite
        </h2>
        <div className="footer-columns">
          {footerColumns.map((groups, i) => (
            <div className="footer-column" key={i}>
              {groups.map((group) => (
                <div className="footer-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.links.map((link) => (
                      <li key={link}>
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-contact">
        <span className="footer-glow" aria-hidden="true" />
        <p>{brand.address}</p>
        <ul>
          {brand.social.map((s) => (
            <li key={s.label}>
              <a href={s.href}>{s.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {brand.legalName} All rights reserved.
        </p>
        <div className="footer-legal">
          <button type="button" className="footer-language">
            <span className="flag" aria-hidden="true" />
            English
            <IconChevronDown />
          </button>
          {legalLinks.map((label) => (
            <a href="#" key={label}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
