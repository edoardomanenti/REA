import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconClose } from "./icons";

// Popover select used by every generation setting (model, ratio, quality...).
export function Select<T extends string | number>({
  value,
  options,
  onChange,
  label,
  icon,
  className,
  render,
  placement = "top",
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  label: string;
  icon?: ReactNode;
  className?: string;
  render?: (value: T) => ReactNode;
  placement?: "top" | "bottom";
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className={`select ${className ?? ""}`} ref={root}>
      <button
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen(!open)}
      >
        {icon}
        <span>{render ? render(value) : value}</span>
      </button>
      {open ? (
        <ul
          className={`select-menu is-${placement}`}
          role="listbox"
          aria-label={label}
        >
          {options.map((option) => (
            <li key={String(option)}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                className={option === value ? "is-selected" : undefined}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {render ? render(option) : option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function Notice({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="notice" role="status">
      <span>{message}</span>
      <button type="button" aria-label="Close" onClick={onClose}>
        <IconClose size={14} />
      </button>
    </div>
  );
}
