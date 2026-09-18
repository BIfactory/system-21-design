"use client";
/* System 21 — components. Hand-written from hulinl/polepim-manager (see each README).
   Import as ES module in React/Next.js apps, or use dist/system21.js (window.S21). */
import * as React from "react";
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

const cx = (...a) => a.filter(Boolean).join(" ");

/* ───────────── Icon ───────────── */
const PATHS = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>,
  tasks: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m8 10 2.5 2.5L15 8" /><line x1="8" y1="16" x2="15" y2="16" /></>,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /><circle cx="12" cy="15" r="1.5" fill="currentColor" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>,
  notes: <><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z" /><polyline points="16 3 16 8 21 8" /><line x1="8" y1="12" x2="14" y2="12" /><line x1="8" y1="16" x2="12" y2="16" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  "chevron-down": <polyline points="6 9 12 15 18 9" />,
  "chevron-right": <polyline points="9 6 15 12 9 18" />,
  "chevron-left": <polyline points="15 6 9 12 15 18" />,
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3z" /><path d="M17 17h4v4" /><path d="M14 21h3" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  more: <><circle cx="5" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="19" cy="12" r="1.5" fill="currentColor" /></>,
  filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
};

function Icon({ name, size = 18, strokeWidth = 2, className, title }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={cx("s21-icon", className)}
      aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title && <title>{title}</title>}
      {PATHS[name] || null}
    </svg>
  );
}
Icon.names = Object.keys(PATHS);

/* ───────────── Button ───────────── */
function Button({ variant = "primary", size = "md", icon, iconOnly = false, className, children, type = "button", ...rest }) {
  return (
    <button type={type} {...rest}
      className={cx("s21-btn", `s21-btn--${variant}`, `s21-btn--${size}`, iconOnly && "s21-btn--icon", className)}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {iconOnly ? null : children}
    </button>
  );
}

/* ───────────── Badge ───────────── */
const TONES = { neutral: "var(--neutral-status)", success: "var(--success-solid)", danger: "var(--danger-solid)", warning: "var(--warning-text)", primary: "var(--primary-text)" };
function Badge({ color, tone = "neutral", fitCell = false, children }) {
  const c = color || TONES[tone] || TONES.neutral;
  return (
    <span className={cx("s21-badge", fitCell && "s21-badge--fit")} style={{ "--badge-c": c }}>
      <span className="s21-badge__dot" />
      <span className="s21-badge__label">{children}</span>
    </span>
  );
}

/* ───────────── Tag (flag pill) ───────────── */
function Tag({ tone = "neutral", children }) {
  return <span className={cx("s21-tag", `s21-tag--${tone}`)}>{children}</span>;
}

/* ───────────── ChipGroup ───────────── */
function ChipGroup({ items, value, onChange }) {
  return (
    <div className="s21-chips" role="group">
      {items.map((it) => (
        <button key={it.value} type="button" aria-pressed={value === it.value}
          className={cx("s21-chip", value === it.value && "is-active")}
          onClick={() => onChange && onChange(it.value)}>
          {it.label}
          {it.count != null && <span className="s21-chip__count">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}

/* ───────────── SegmentedControl ───────────── */
function SegmentedControl({ items, value, onChange }) {
  return (
    <div className="s21-seg" role="tablist">
      {items.map((it) => (
        <button key={it.value} type="button" role="tab" aria-selected={value === it.value}
          className={cx("s21-seg__item", value === it.value && "is-active")}
          onClick={() => onChange && onChange(it.value)}>
          {it.icon && <Icon name={it.icon} size={14} />}
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ───────────── Tabs ───────────── */
function Tabs({ items, value, onChange }) {
  return (
    <div className="s21-tabs" role="tablist">
      <div className="s21-tabs__row">
        {items.map((it) => (
          <button key={it.value} type="button" role="tab" aria-selected={value === it.value}
            className={cx("s21-tab", value === it.value && "is-active")}
            onClick={() => onChange && onChange(it.value)}>
            {it.label}
            {it.count != null && <span className="s21-tab__count">{it.count}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Form controls ───────────── */
function Field({ label, hint, error, children, className }) {
  return (
    <label className={cx("s21-field", className)}>
      {label && <span className="s21-field__label">{label}</span>}
      {children}
      {error ? <span className="s21-field__error">{error}</span> : hint ? <span className="s21-field__hint">{hint}</span> : null}
    </label>
  );
}
function Input({ className, invalid, ...rest }) {
  return <input {...rest} aria-invalid={invalid || undefined} className={cx("s21-input", className)} />;
}
function SearchInput({ value, onChange, placeholder = "Hledat…", className, ...rest }) {
  return (
    <div className={cx("s21-search", className)}>
      <Icon name="search" size={16} className="s21-search__icon" />
      <input type="search" value={value} placeholder={placeholder} className="s21-input"
        onChange={(e) => onChange && onChange(e.target.value)} {...rest} />
      {value ? (
        <button type="button" className="s21-search__clear" aria-label="Vymazat" onClick={() => onChange && onChange("")}>
          <Icon name="x" size={12} strokeWidth={2.5} />
        </button>
      ) : null}
    </div>
  );
}
function Select({ options = [], placeholder, className, ...rest }) {
  return (
    <div className={cx("s21-select", className)}>
      <select {...rest} className="s21-input">
        {placeholder != null && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <Icon name="chevron-down" size={16} className="s21-select__chev" />
    </div>
  );
}
function Checkbox({ label, count, className, ...rest }) {
  return (
    <label className={cx("s21-check", className)}>
      <input type="checkbox" {...rest} />
      <span>{label}</span>
      {count ? <span className="s21-check__count">({count})</span> : null}
    </label>
  );
}

/* ───────────── FilterBar ───────────── */
function FilterBar({ children }) {
  return <div className="s21-filterbar">{children}</div>;
}

/* ───────────── DataTable ───────────── */
function SortIcon({ active, dir }) {
  return (
    <span className="s21-sort" aria-hidden="true">
      <span className={active && dir === "asc" ? "is-on" : ""}>▲</span>
      <span className={active && dir === "desc" ? "is-on" : ""}>▼</span>
    </span>
  );
}
function DataTable({ columns, rows, rowKey = "id", sort, onSort, onRowClick, empty = "Žádné záznamy", minWidth }) {
  return (
    <div className="s21-table-wrap">
      <table className="s21-table" style={minWidth ? { minWidth } : undefined}>
        <thead>
          <tr>
            {columns.map((c) => {
              const al = c.align || "left";
              const sortable = c.sortable && onSort;
              const active = sort && sort.key === c.key;
              return (
                <th key={c.key} style={{ width: c.width, textAlign: al }} aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}>
                  {sortable ? (
                    <button type="button" className="s21-th-btn" onClick={() => onSort(c.key, active && sort.dir === "asc" ? "desc" : "asc")}>
                      {c.label}<SortIcon active={active} dir={sort && sort.dir} />
                    </button>
                  ) : c.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td className="s21-table__empty" colSpan={columns.length}>{empty}</td></tr>
          ) : rows.map((r, i) => (
            <tr key={r[rowKey] != null ? r[rowKey] : i} className={onRowClick ? "is-clickable" : undefined}
              onClick={onRowClick ? (e) => { if (!e.target.closest("[data-no-row-click]")) onRowClick(r); } : undefined}>
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align || "left" }} className={c.numeric ? "is-num" : undefined}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────── Pagination ───────────── */
function Pagination({ page, totalPages, total, pageSize, noun = "záznamů", onPage }) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pages = [];
  for (let p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) pages.push(p);
  const go = (p) => onPage && onPage(p);
  return (
    <div className="s21-pager">
      <div className="s21-pager__info">{from}–{to} z <strong>{total}</strong> {noun}</div>
      <nav className="s21-pager__nav" aria-label="Stránkování">
        <button type="button" className="s21-pg" disabled={page <= 1} onClick={() => go(page - 1)}>← Předchozí</button>
        {pages[0] > 1 && <><button type="button" className="s21-pg" onClick={() => go(1)}>1</button>{pages[0] > 2 && <span className="s21-pager__gap">…</span>}</>}
        {pages.map((p) => (
          <button key={p} type="button" className={cx("s21-pg", p === page && "is-current")} aria-current={p === page ? "page" : undefined} onClick={() => go(p)}>{p}</button>
        ))}
        {pages[pages.length - 1] < totalPages && <>{pages[pages.length - 1] < totalPages - 1 && <span className="s21-pager__gap">…</span>}<button type="button" className="s21-pg" onClick={() => go(totalPages)}>{totalPages}</button></>}
        <button type="button" className="s21-pg" disabled={page >= totalPages} onClick={() => go(page + 1)}>Další →</button>
      </nav>
    </div>
  );
}

/* ───────────── StatTile ───────────── */
function StatTile({ label, value, unit, hint, accent, big }) {
  const full = unit ? `${value} ${unit}` : String(value);
  return (
    <div className={cx("s21-stat", accent && `s21-stat--${accent}`)}>
      <div className="s21-stat__label">{label}</div>
      <div className={cx("s21-stat__value", big && "is-big")} title={full}>
        <span className="s21-stat__num">{value}</span>
        {unit && <span className="s21-stat__unit">{unit}</span>}
      </div>
      {hint && <div className="s21-stat__hint">{hint}</div>}
    </div>
  );
}

/* ───────────── Section (card) ───────────── */
function Section({ title, subtitle, action, detailLabel = "detail", detail, defaultOpen = false, children }) {
  return (
    <section className="s21-section">
      {(title || action) && (
        <div className="s21-section__head">
          <div>
            {title && <h2 className="s21-section__title">{title}</h2>}
            {subtitle && <p className="s21-section__sub">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
      {detail && (
        <details className="s21-section__details" open={defaultOpen}>
          <summary><Icon name="chevron-right" size={14} strokeWidth={2.5} className="s21-section__chev" /><span className="when-closed">Rozbalit {detailLabel}</span><span className="when-open">Sbalit {detailLabel}</span></summary>
          <div className="s21-section__detail">{detail}</div>
        </details>
      )}
    </section>
  );
}

/* ───────────── EmptyState ───────────── */
function EmptyState({ icon = "folder", title, description, action }) {
  return (
    <div className="s21-empty">
      <div className="s21-empty__icon"><Icon name={icon} size={28} /></div>
      <h3 className="s21-empty__title">{title}</h3>
      {description && <p className="s21-empty__desc">{description}</p>}
      {action && <div className="s21-empty__action">{action}</div>}
    </div>
  );
}

/* ───────────── Stepper ───────────── */
function Stepper({ steps, current, onGoTo }) {
  return (
    <div className="s21-stepper">
      {steps.map((label, i) => {
        const n = i + 1, active = n === current, done = n < current;
        return (
          <button key={label} type="button" aria-current={active ? "step" : undefined}
            className={cx("s21-step", active && "is-active", done && "is-done")} onClick={() => onGoTo && onGoTo(n)}>
            <span className="s21-step__num">{done ? <Icon name="check" size={11} strokeWidth={3.5} /> : n}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ───────────── Modal ───────────── */
function Modal({ open, onClose, title, description, size = "md", footer, children, inline = false }) {
  useEffect(() => {
    if (!open || inline) return;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, inline, onClose]);
  if (!open) return null;
  return (
    <div role="presentation" className={cx("s21-modal", inline && "s21-modal--inline")} onClick={() => onClose && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="s21-modal-title" className={cx("s21-modal__panel", `s21-modal__panel--${size}`)} onClick={(e) => e.stopPropagation()}>
        <header className="s21-modal__head">
          <div className="s21-modal__titles">
            <h2 id="s21-modal-title" className="s21-modal__title">{title}</h2>
            {description && <p className="s21-modal__desc">{description}</p>}
          </div>
          <button type="button" className="s21-modal__close" aria-label="Zavřít" onClick={() => onClose && onClose()}><Icon name="x" size={18} /></button>
        </header>
        <div className="s21-modal__body">{children}</div>
        {footer && <footer className="s21-modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}

/* ───────────── Toast ───────────── */
const ToastCtx = createContext(null);
function Toast({ tone = "info", message, onDismiss }) {
  const sym = tone === "success" ? "check" : tone === "error" ? "x" : null;
  return (
    <div role="status" className={cx("s21-toast", `s21-toast--${tone}`)}>
      <span className="s21-toast__icon">{sym ? <Icon name={sym} size={16} strokeWidth={2.5} /> : <span className="s21-toast__i">i</span>}</span>
      <span className="s21-toast__msg">{message}</span>
      {onDismiss && <button type="button" className="s21-toast__x" aria-label="Zavřít" onClick={onDismiss}><Icon name="x" size={14} /></button>}
    </div>
  );
}
let toastId = 0;
function ToastProvider({ children, duration = 4000 }) {
  const [list, setList] = useState([]);
  const show = useCallback((message, tone = "info") => {
    const id = ++toastId;
    setList((a) => [...a, { id, message, tone }]);
    setTimeout(() => setList((a) => a.filter((t) => t.id !== id)), duration);
  }, [duration]);
  const api = { show, success: (m) => show(m, "success"), error: (m) => show(m, "error"), info: (m) => show(m, "info") };
  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="s21-toasts">
        {list.map((t) => <Toast key={t.id} tone={t.tone} message={t.message} onDismiss={() => setList((a) => a.filter((x) => x.id !== t.id))} />)}
      </div>
    </ToastCtx.Provider>
  );
}
function useToast() {
  return useContext(ToastCtx) || { show: () => {}, success: () => {}, error: () => {}, info: () => {} };
}

/* ───────────── Breadcrumbs (NEW) ───────────── */
function Breadcrumbs({ items, maxVisible = 4, onNavigate, compact = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  if (!items || items.length === 0) return null;
  const last = items.length - 1;
  let visible = items.map((it, i) => ({ it, i }));
  let hidden = [];
  if (items.length > maxVisible) {
    const tail = maxVisible - 2; // keep first + last (tail) items
    hidden = visible.slice(1, items.length - tail);
    visible = [visible[0], { gap: true }, ...visible.slice(items.length - tail)];
  }
  const link = (it, i, extra) => {
    const current = i === last;
    if (current) return <span className="s21-crumb is-current" aria-current="page">{it.icon && <Icon name={it.icon} size={14} />}<span className="s21-crumb__txt">{it.label}</span></span>;
    return (
      <a href={it.href || "#"} className={cx("s21-crumb", extra)} title={it.label}
        onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(it, i); } }}>
        {it.icon && <Icon name={it.icon} size={14} />}<span className="s21-crumb__txt">{it.label}</span>
      </a>
    );
  };
  const parent = items[last - 1];
  return (
    <nav className={cx("s21-crumbs", compact && "s21-crumbs--compact")} aria-label="Drobečková navigace">
      <ol className="s21-crumbs__list">
        {visible.map((v, k) => (
          <li key={k} className="s21-crumbs__item">
            {k > 0 && <Icon name="chevron-right" size={12} strokeWidth={2.5} className="s21-crumbs__sep" />}
            {v.gap ? (
              <span className="s21-crumbs__more" ref={ref}>
                <button type="button" className="s21-crumb s21-crumb--more" aria-label={`Zobrazit ${hidden.length} skryté úrovně`} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                  <Icon name="more" size={14} />
                </button>
                {open && (
                  <ul className="s21-crumbs__menu">
                    {hidden.map(({ it, i }) => <li key={i}>{link(it, i, "s21-crumb--menu")}</li>)}
                  </ul>
                )}
              </span>
            ) : link(v.it, v.i)}
          </li>
        ))}
      </ol>
      {parent && (
        <a href={parent.href || "#"} className="s21-crumbs__back"
          onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(parent, last - 1); } }}>
          <Icon name="chevron-left" size={14} strokeWidth={2.5} />{parent.label}
        </a>
      )}
    </nav>
  );
}

/* ───────────── PageHeader ───────────── */
function PageHeader({ title, description, actions, breadcrumbs, tabs, sticky = true }) {
  return (
    <div className={cx("s21-pagehead", sticky && "is-sticky")}>
      {breadcrumbs && <div className="s21-pagehead__crumbs">{breadcrumbs}</div>}
      <div className="s21-pagehead__main">
        <div className="s21-pagehead__titles">
          <h1 className="s21-pagehead__title">{title}</h1>
          {description && <p className="s21-pagehead__desc">{description}</p>}
        </div>
        {actions && <div className="s21-pagehead__actions">{actions}</div>}
      </div>
      {tabs && <div className="s21-pagehead__tabs">{tabs}</div>}
    </div>
  );
}

/* ───────────── Sidebar ───────────── */
function initials(name) {
  const parts = String(name || "").split("@")[0].split(/[\s._-]+/).filter(Boolean).slice(0, 2);
  return parts.length ? parts.map((p) => p[0].toUpperCase()).join("") : "?";
}
function Sidebar({ brand, sections, activeHref, onNavigate, quickAction, search, footer, defaultCollapsed }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed || {});
  const isActive = (href) => href === activeHref;
  const nav = (e, item) => { if (onNavigate) { e.preventDefault(); onNavigate(item); } };
  return (
    <aside className="s21-sidebar">
      <div className="s21-sidebar__head">
        <div className="s21-sidebar__brandrow">
          <a href={brand && brand.href || "#"} className="s21-sidebar__brand">
            {brand && brand.logo ? <span className="s21-sidebar__logo">{brand.logo}</span> : null}
            <span className="s21-sidebar__names">
              <span className="s21-sidebar__name">{brand && brand.name}</span>
              {brand && brand.subtitle && <span className="s21-sidebar__sub">{brand.subtitle}</span>}
            </span>
          </a>
          {quickAction && (
            <button type="button" className="s21-sidebar__quick" aria-label={quickAction.label} title={quickAction.label} onClick={quickAction.onClick}>
              <Icon name={quickAction.icon || "plus"} size={20} />
            </button>
          )}
        </div>
        {search}
      </div>
      <nav className="s21-sidebar__nav">
        {sections.map((s, si) => {
          const hasActive = s.items.some((i) => isActive(i.href));
          const userPref = collapsed[s.title || si];
          const isCol = s.collapsible ? (userPref !== undefined ? userPref : !hasActive) : false;
          return (
            <div key={si} className={cx("s21-navsec", si > 0 && "s21-navsec--gap")}>
              {s.title && (s.collapsible ? (
                <button type="button" className="s21-navsec__head" aria-expanded={!isCol}
                  onClick={() => setCollapsed((p) => ({ ...p, [s.title || si]: !isCol }))}>
                  <span className="s21-navsec__title">{s.title}</span>
                  <Icon name="chevron-down" size={16} strokeWidth={2.5} className={cx("s21-navsec__chev", !isCol && "is-open")} />
                </button>
              ) : <div className="s21-navsec__label">{s.title}</div>)}
              {!isCol && (
                <ul className="s21-navsec__list">
                  {s.items.map((it) => (
                    <li key={it.href}>
                      <a href={it.href} onClick={(e) => nav(e, it)} aria-current={isActive(it.href) ? "page" : undefined}
                        className={cx("s21-navitem", isActive(it.href) && "is-active")}>
                        <span className="s21-navitem__main">{it.icon && <Icon name={it.icon} />}<span className="s21-navitem__txt">{it.label}</span></span>
                        {it.badge > 0 && <span className="s21-navitem__badge" title={`${it.badge} položek vyžaduje pozornost`}>{it.badge}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
      {footer && <div className="s21-sidebar__powered">{footer}</div>}
    </aside>
  );
}

/* ───────────── Dropdown (internal) ───────────── */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const down = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const key = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [open]);
  return { open, setOpen, ref };
}

/* ───────────── TopBar (NEW) ───────────── */
const ShellCtx = createContext(null);
function TopBar({ breadcrumbs, title, settings, user, onLogout, extra }) {
  const shell = useContext(ShellCtx);
  const set = useDropdown();
  const usr = useDropdown();
  const setAlert = settings && settings.groups && settings.groups.some((g) => g.items.some((i) => i.badge > 0));
  const pick = (item, close) => (e) => { if (settings && settings.onSelect) { e.preventDefault(); settings.onSelect(item); } close(false); };
  return (
    <header className="s21-topbar">
      {shell && (
        <button type="button" className="s21-topbar__burger s21-iconbtn" aria-label="Otevřít menu" onClick={shell.openDrawer}><Icon name="menu" size={20} /></button>
      )}
      <div className="s21-topbar__left">
        {breadcrumbs || (title ? <span className="s21-topbar__title">{title}</span> : null)}
      </div>
      <div className="s21-topbar__right">
        {extra}
        {settings && (
          <div className="s21-dd" ref={set.ref}>
            <button type="button" className={cx("s21-iconbtn", set.open && "is-open")} aria-label="Nastavení" title="Nastavení" aria-haspopup="menu" aria-expanded={set.open} onClick={() => set.setOpen((o) => !o)}>
              <Icon name="settings" size={20} />
              {setAlert && <span className="s21-iconbtn__dot" aria-hidden="true" />}
            </button>
            {set.open && (
              <div className="s21-dd__menu s21-dd__menu--wide" role="menu">
                {settings.groups.map((g, gi) => (
                  <div key={gi} className="s21-dd__group">
                    {g.title && <div className="s21-dd__label">{g.title}</div>}
                    {g.items.map((it) => (
                      <a key={it.href} href={it.href} role="menuitem" className={cx("s21-dd__item", settings.activeHref === it.href && "is-active")} onClick={pick(it, set.setOpen)}>
                        <span>{it.label}</span>
                        {it.badge > 0 && <span className="s21-navitem__badge">{it.badge}</span>}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {user && (
          <div className="s21-dd" ref={usr.ref}>
            <button type="button" className={cx("s21-iconbtn s21-iconbtn--avatar", usr.open && "is-open")} aria-label={`Profil: ${user.name}`} title={user.name} aria-haspopup="menu" aria-expanded={usr.open} onClick={() => usr.setOpen((o) => !o)}>
              <span className="s21-avatar s21-avatar--sm">{initials(user.name)}</span>
            </button>
            {usr.open && (
              <div className="s21-dd__menu" role="menu">
                <div className="s21-dd__user">
                  <span className="s21-avatar">{initials(user.name)}</span>
                  <span className="s21-dd__uinfo"><span className="s21-dd__uname">{user.name}</span>{user.role && <span className="s21-dd__urole">{user.role}</span>}</span>
                </div>
                {(user.links || [{ label: "Můj profil", href: user.href || "#" }]).map((l) => (
                  <a key={l.label} href={l.href || "#"} role="menuitem" className="s21-dd__item" onClick={(e) => { if (l.onClick) { e.preventDefault(); l.onClick(); } usr.setOpen(false); }}>
                    <span className="s21-dd__itemmain">{l.icon && <Icon name={l.icon} size={16} />}{l.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        {onLogout && (
          <button type="button" className="s21-iconbtn" aria-label="Odhlásit se" title="Odhlásit se" onClick={onLogout}><Icon name="logout" size={20} /></button>
        )}
      </div>
    </header>
  );
}

/* ───────────── AppShell ───────────── */
function AppShell({ sidebar, topbar, children }) {
  const [open, setOpen] = useState(false);
  return (
    <ShellCtx.Provider value={{ openDrawer: () => setOpen(true) }}>
      <div className={cx("s21-shell", open && "is-drawer-open")}>
        <div className="s21-shell__side">{sidebar}</div>
        <div className="s21-shell__scrim" onClick={() => setOpen(false)} />
        <main className="s21-shell__main">{topbar}{children}</main>
      </div>
    </ShellCtx.Provider>
  );
}

/* ───────────── Page ───────────── */
function PageBody({ children }) {
  return <div className="s21-pagebody">{children}</div>;
}

export {
  Icon, Button, Badge, Tag, ChipGroup, SegmentedControl, Tabs,
  Field, Input, SearchInput, Select, Checkbox, FilterBar,
  DataTable, SortIcon, Pagination, StatTile, Section, EmptyState, Stepper,
  Modal, Toast, ToastProvider, useToast,
  Breadcrumbs, PageHeader, Sidebar, TopBar, AppShell, PageBody,
};

if (typeof window !== "undefined") {
  window.S21 = {
  Icon, Button, Badge, Tag, ChipGroup, SegmentedControl, Tabs,
  Field, Input, SearchInput, Select, Checkbox, FilterBar,
  DataTable, SortIcon, Pagination, StatTile, Section, EmptyState, Stepper,
  Modal, Toast, ToastProvider, useToast,
  Breadcrumbs, PageHeader, Sidebar, TopBar, AppShell, PageBody,
};
}
