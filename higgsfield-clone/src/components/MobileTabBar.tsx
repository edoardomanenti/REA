import { Link, useLocation } from "react-router-dom";
import {
  IconFolder,
  IconHome,
  IconSparkleFill,
  IconUser,
  IconUsers,
} from "./icons";

const tabs = [
  { label: "Home", href: "/", icon: IconHome },
  { label: "Community", href: "/community", icon: IconUsers },
  { label: "Library", href: "/library", icon: IconFolder },
  { label: "Profile", href: "/profile", icon: IconUser },
] as const;

// Bottom navigation shown only on phones, as on the original site.
export function MobileTabBar() {
  const { pathname } = useLocation();
  const [first, second, third, fourth] = tabs;
  const render = (tab: (typeof tabs)[number]) => (
    <Link
      key={tab.label}
      to={tab.href}
      className={`tab${pathname === tab.href ? " is-active" : ""}`}
    >
      <tab.icon />
      <span>{tab.label}</span>
    </Link>
  );
  return (
    <nav className="mobile-tabbar" aria-label="App">
      {render(first)}
      {render(second)}
      <Link to="/ai/video" className="tab-create" aria-label="Create">
        <IconSparkleFill size={24} />
      </Link>
      {render(third)}
      {render(fourth)}
    </nav>
  );
}
