import { useEffect, useState, type ReactNode } from "react";
import type { MasonryItem } from "../content/home";
import { IconArrowUpRight } from "./icons";

// Column count by viewport width: [minWidth, columns], largest first.
type Breakpoints = readonly (readonly [number, number])[];

function useColumnCount(breakpoints: Breakpoints): number {
  const pick = () =>
    breakpoints.find(([min]) => window.innerWidth >= min)?.[1] ?? 2;
  const [count, setCount] = useState(pick);
  useEffect(() => {
    const onResize = () => setCount(pick());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });
  return count;
}

// Items keep their order left-to-right, top-to-bottom like the original columns.
export function Masonry({
  items,
  breakpoints,
  gap = 8,
  render,
}: {
  items: readonly MasonryItem[];
  breakpoints: Breakpoints;
  gap?: number;
  render: (item: MasonryItem, index: number) => ReactNode;
}) {
  const count = useColumnCount(breakpoints);
  const columns: { item: MasonryItem; index: number }[][] = Array.from(
    { length: count },
    () => [],
  );
  items.forEach((item, index) => columns[index % count]?.push({ item, index }));
  return (
    <div className="masonry" style={{ gap }}>
      {columns.map((column, c) => (
        <div className="masonry-column" style={{ gap }} key={c}>
          {column.map(({ item, index }) => (
            <div key={item.seed}>{render(item, index)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Bottom fade with a centered "View all" button, used under every gallery.
export function FadeMore({
  label,
  href = "#",
}: {
  label: string;
  href?: string;
}) {
  return (
    <div className="fade-more">
      <a href={href} className="btn btn-ghost-lime">
        {label}
        <IconArrowUpRight />
      </a>
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-title display">
          <a href="#">{title}</a>
        </h2>
        <p className="section-description">{description}</p>
      </div>
      {action}
    </div>
  );
}
