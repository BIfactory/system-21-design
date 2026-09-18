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
  "chevron-up": <polyline points="18 15 12 9 6 15" />,
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  check: <path d="M20 6 9 17l-5-5" />,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3z" /><path d="M17 17h4v4" /><path d="M14 21h3" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  more: <><circle cx="5" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="19" cy="12" r="1.5" fill="currentColor" /></>,
  filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
  /* — added in Fáze F — */
  "arrow-up": <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>,
  "arrow-down": <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>,
  "arrow-left": <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
  "arrow-right": <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  "arrow-up-right": <><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></>,
  "external-link": <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
  "eye-off": <><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.77 19.77 0 0 1 5.06-5.94" /><path d="M9.9 4.24A10.9 10.9 0 0 1 12 4c7 0 11 8 11 8a19.4 19.4 0 0 1-2.16 3.19" /><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  unlock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 6 12 13 2 6" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  bookmark: <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></>,
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  refresh: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
  "sort-asc": <><path d="M11 5h10" /><path d="M11 9h7" /><path d="M11 13h4" /><path d="m3 17 3 3 3-3" /><path d="M6 4v16" /></>,
  "sort-desc": <><path d="M11 5h4" /><path d="M11 9h7" /><path d="M11 13h10" /><path d="m3 7 3-3 3 3" /><path d="M6 20V4" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
  list: <><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" /></>,
  columns: <><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></>,
  expand: <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>,
  collapse: <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
  paperclip: <path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />,
  printer: <><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" rx="1" /></>,
  "credit-card": <><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>,
  tag: <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>,
  "map-pin": <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  "user-plus": <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></>,
  "alert-circle": <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
  "alert-triangle": <><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  "help-circle": <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  sparkles: <><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" /><path d="M19 3v4M21 5h-4M5 17v4M7 19H3" /></>,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  "trending-up": <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
  "trending-down": <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></>,
  "bar-chart": <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>,
  "pie-chart": <><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.07" y2="4.93" /></>,
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  play: <polygon points="5 3 19 12 5 21 5 3" />,
  pause: <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></>,
  "arrow-repeat": <><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>,
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></>,
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
function Button({ variant = "primary", size = "md", icon, iconOnly = false, loading = false, className, children, type = "button", disabled, ...rest }) {
  const iconSize = size === "sm" ? 14 : 16;
  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}
      className={cx("s21-btn", `s21-btn--${variant}`, `s21-btn--${size}`, iconOnly && "s21-btn--icon", loading && "s21-btn--loading", className)}>
      {loading
        ? <span className="s21-spinner" aria-hidden="true" style={{ width: iconSize, height: iconSize }} />
        : (icon && <Icon name={icon} size={iconSize} />)}
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
function FilterBar({ children, activeCount = 0, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const list = React.Children.toArray(children);
  return (
    <div className={cx("s21-filterbar", open && "is-open")}>
      <div className="s21-filterbar__first">
        {list[0]}
        {list.length > 1 && (
          <button type="button" className="s21-filterbar__toggle" aria-label="Filtry" title="Filtry" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <Icon name="filter" size={18} />
            {activeCount > 0 && <span className="s21-filterbar__count">{activeCount}</span>}
          </button>
        )}
      </div>
      {list.slice(1).map((c, i) => <div key={i} className={cx("s21-filterbar__more", c.props && c.props.className && String(c.props.className).includes("s21-check") && "is-auto")}>{c}</div>)}
    </div>
  );
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
function DataTable({
  columns, rows, rowKey = "id", sort, onSort, onRowClick, empty = "Žádné záznamy", minWidth, renderCard,
  /* — Fáze I additions — */
  selectable = false, selected = [], onSelectedChange, bulkActions,
  density = "md", stickyFirst = false, loading = false, loadingRows = 5,
  expandRow, isRowExpanded,
}) {
  const rowId = (r, i) => (r[rowKey] != null ? r[rowKey] : i);
  const allIds = rows.map(rowId);
  const selSet = new Set(selected);
  const allChecked = allIds.length > 0 && allIds.every((id) => selSet.has(id));
  const someChecked = allIds.some((id) => selSet.has(id));
  const toggleAll = () => {
    if (!onSelectedChange) return;
    onSelectedChange(allChecked ? [] : allIds);
  };
  const toggleOne = (id) => {
    if (!onSelectedChange) return;
    const next = selSet.has(id) ? selected.filter((x) => x !== id) : [...selected, id];
    onSelectedChange(next);
  };
  const totalCols = columns.length + (selectable ? 1 : 0) + (expandRow ? 1 : 0);

  return (
    <>
    {selectable && selected.length > 0 && bulkActions && (
      <div className="s21-table-bulk">
        <span className="s21-table-bulk__count">Vybráno <strong>{selected.length}</strong> z {rows.length}</span>
        <div className="s21-table-bulk__actions">{typeof bulkActions === "function" ? bulkActions(selected) : bulkActions}</div>
        <button type="button" className="s21-table-bulk__clear" onClick={() => onSelectedChange && onSelectedChange([])} aria-label="Zrušit výběr"><Icon name="x" size={16} /></button>
      </div>
    )}
    {renderCard && (
      <div className="s21-cardlist">
        {rows.length === 0 ? <div className="s21-cardlist__empty">{empty}</div> : rows.map((r, i) => <React.Fragment key={rowId(r, i)}>{renderCard(r)}</React.Fragment>)}
      </div>
    )}
    <div className={cx("s21-table-wrap", renderCard && "has-cards", `s21-table-wrap--${density}`, stickyFirst && "s21-table-wrap--sticky-first")}>
      <table className="s21-table" style={minWidth ? { minWidth } : undefined}>
        <thead>
          <tr>
            {selectable && (
              <th className="s21-table__selcol">
                <label className="s21-table__selall" title={allChecked ? "Zrušit výběr" : "Vybrat vše"}>
                  <input type="checkbox" checked={allChecked} ref={(el) => { if (el) el.indeterminate = !allChecked && someChecked; }} onChange={toggleAll} aria-label="Vybrat vše" />
                </label>
              </th>
            )}
            {expandRow && <th className="s21-table__expcol" aria-hidden="true" />}
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
          {loading ? (
            Array.from({ length: loadingRows }).map((_, i) => (
              <tr key={`sk-${i}`}>
                {selectable && <td className="s21-table__selcol"><span className="s21-sk" style={{ width: 14, height: 14, borderRadius: 3, display: "inline-block" }} /></td>}
                {expandRow && <td className="s21-table__expcol" />}
                {columns.map((c) => (<td key={c.key}><span className="s21-sk" style={{ height: 12, width: c.numeric ? 64 : "70%", borderRadius: 3, display: "inline-block" }} /></td>))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr><td className="s21-table__empty" colSpan={totalCols}>{empty}</td></tr>
          ) : rows.map((r, i) => {
            const id = rowId(r, i);
            const isSel = selSet.has(id);
            const expanded = expandRow && isRowExpanded && isRowExpanded(r);
            return (
              <React.Fragment key={id}>
                <tr className={cx(onRowClick && "is-clickable", isSel && "is-selected")}
                  onClick={onRowClick ? (e) => { if (!e.target.closest("[data-no-row-click]")) onRowClick(r); } : undefined}>
                  {selectable && (
                    <td className="s21-table__selcol" data-no-row-click>
                      <input type="checkbox" checked={isSel} onChange={() => toggleOne(id)} aria-label="Vybrat řádek" />
                    </td>
                  )}
                  {expandRow && (
                    <td className="s21-table__expcol" data-no-row-click>
                      <button type="button" className="s21-iconbtn s21-btn--sm s21-btn--icon" style={{ width: 24, height: 24 }} onClick={() => expandRow.onToggle && expandRow.onToggle(r)} aria-expanded={!!expanded} aria-label={expanded ? "Skrýt" : "Zobrazit"}>
                        <Icon name={expanded ? "chevron-down" : "chevron-right"} size={14} />
                      </button>
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.key} style={{ textAlign: c.align || "left" }} className={c.numeric ? "is-num" : undefined}>
                      {c.render ? c.render(r) : r[c.key]}
                    </td>
                  ))}
                </tr>
                {expanded && (
                  <tr className="s21-table__exprow">
                    <td colSpan={totalCols}>{expandRow.render(r)}</td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
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
      {!parent && <span className="s21-crumbs__back s21-crumbs__back--current">{items[last].label}</span>}
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
function TopBar({ breadcrumbs, title, settings, user, onLogout, extra, brand, quickAction }) {
  const shell = useContext(ShellCtx);
  const set = useDropdown();
  const usr = useDropdown();
  const setAlert = settings && settings.groups && settings.groups.some((g) => g.items.some((i) => i.badge > 0));
  const pick = (item, close) => (e) => { if (settings && settings.onSelect) { e.preventDefault(); settings.onSelect(item); } close(false); };
  const settingsList = (close) => settings && settings.groups.map((g, gi) => (
    <div key={gi} className="s21-dd__group">
      {g.title && <div className="s21-dd__label">{g.title}</div>}
      {g.items.map((it) => (
        <a key={it.href} href={it.href} role="menuitem" className={cx("s21-dd__item", settings.activeHref === it.href && "is-active")} onClick={pick(it, close)}>
          <span>{it.label}</span>
          {it.badge > 0 && <span className="s21-navitem__badge">{it.badge}</span>}
        </a>
      ))}
    </div>
  ));
  const avatar = user && (
    <div className="s21-dd" ref={usr.ref}>
      <button type="button" className={cx("s21-iconbtn s21-iconbtn--avatar", usr.open && "is-open")} aria-label={`Profil: ${user.name}`} title={user.name} aria-haspopup="menu" aria-expanded={usr.open} onClick={() => usr.setOpen((o) => !o)}>
        <span className="s21-avatar s21-avatar--sm">{initials(user.name)}</span>
        {setAlert && <span className="s21-iconbtn__dot s21-mobile-only" aria-hidden="true" />}
      </button>
      {usr.open && (
        <div className="s21-dd__menu s21-dd__menu--user" role="menu">
          <div className="s21-dd__user">
            <span className="s21-avatar">{initials(user.name)}</span>
            <span className="s21-dd__uinfo"><span className="s21-dd__uname">{user.name}</span>{user.role && <span className="s21-dd__urole">{user.role}</span>}</span>
          </div>
          {(user.links || [{ label: "Můj profil", href: user.href || "#", icon: "user" }]).map((l) => (
            <a key={l.label} href={l.href || "#"} role="menuitem" className="s21-dd__item" onClick={(e) => { if (l.onClick) { e.preventDefault(); l.onClick(); } usr.setOpen(false); }}>
              <span className="s21-dd__itemmain">{l.icon && <Icon name={l.icon} size={16} />}{l.label}</span>
            </a>
          ))}
          {settings && <div className="s21-mobile-only s21-dd__mobileset">{settingsList(usr.setOpen)}</div>}
          {onLogout && (
            <div className="s21-mobile-only s21-dd__group">
              <button type="button" role="menuitem" className="s21-dd__item s21-dd__item--btn" onClick={() => { usr.setOpen(false); onLogout(); }}>
                <span className="s21-dd__itemmain"><Icon name="logout" size={16} />Odhlásit se</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
  const isRoot = !!(breadcrumbs && breadcrumbs.props && Array.isArray(breadcrumbs.props.items) && breadcrumbs.props.items.length <= 1);
  return (
    <header className={cx("s21-topbar", isRoot && "is-root")}>
      <div className="s21-topbar__mbar">
        {shell && (
          <button type="button" className="s21-iconbtn s21-iconbtn--dark" aria-label="Otevřít menu" onClick={shell.openDrawer}><Icon name="menu" size={22} /></button>
        )}
        <a href={(brand && brand.href) || "#"} className="s21-topbar__brand">
          {brand && brand.logo ? <span className="s21-topbar__logo">{brand.logo}</span> : null}
          <span className="s21-topbar__bname">{brand ? brand.name : title}</span>
        </a>
        <div className="s21-topbar__mright">
          {quickAction && (
            <button type="button" className="s21-sidebar__quick s21-sidebar__quick--sm" aria-label={quickAction.label} title={quickAction.label} onClick={quickAction.onClick}>
              <Icon name={quickAction.icon || "plus"} size={20} />
            </button>
          )}
          {avatar}
        </div>
      </div>
      <div className="s21-topbar__bar">
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
              {set.open && <div className="s21-dd__menu s21-dd__menu--wide" role="menu">{settingsList(set.setOpen)}</div>}
            </div>
          )}
          {avatar}
          {onLogout && (
            <button type="button" className="s21-iconbtn" aria-label="Odhlásit se" title="Odhlásit se" onClick={onLogout}><Icon name="logout" size={20} /></button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ───────────── AppShell ───────────── */
function AppShell({ sidebar, topbar, children, defaultDrawerOpen = false }) {
  const [open, setOpen] = useState(defaultDrawerOpen);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const mobile = window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
    if (mobile) document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <ShellCtx.Provider value={{ openDrawer: () => setOpen(true), closeDrawer: () => setOpen(false) }}>
      <div className={cx("s21-shell", open && "is-drawer-open")}>
        <div className="s21-shell__side" aria-hidden={undefined}>{sidebar}</div>
        <div className="s21-shell__scrim" onClick={() => setOpen(false)} />
        <main className="s21-shell__main">{topbar}{children}</main>
      </div>
    </ShellCtx.Provider>
  );
}

/* ───────────── PoweredBy (NEW) ───────────── */
function PoweredBy({ logo, name = "BIfactory", href = "https://bifactory.cz", label = "Powered by", variant = "dark" }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={cx("s21-powered", `s21-powered--${variant}`)}>
      <span className="s21-powered__label">{label}</span>
      <span className="s21-powered__brand">
        {logo && <span className="s21-powered__logo">{logo}</span>}
        <span className="s21-powered__name">{name}</span>
      </span>
    </a>
  );
}

/* ───────────── ListCard (mobile row) ───────────── */
function ListCard({ title, flags, meta, actions, stats, status, onClick, href }) {
  const go = (e) => {
    if (e.target.closest("a, button, [data-no-row-click]")) return;
    if (onClick) onClick(e); else if (href) window.location.href = href;
  };
  return (
    <div role="link" tabIndex={0} className="s21-lcard" onClick={go} onKeyDown={(e) => { if (e.key === "Enter") go(e); }}>
      <div className="s21-lcard__head">
        <div className="s21-lcard__titles">
          <div className="s21-lcard__title"><span>{title}</span>{flags}</div>
          {meta && <div className="s21-lcard__meta">{meta}</div>}
        </div>
        {actions && <div className="s21-lcard__actions" data-no-row-click>{actions}</div>}
      </div>
      {(stats || status) && (
        <div className="s21-lcard__foot">
          <div className="s21-lcard__stats">{stats}</div>
          {status && <div className="s21-lcard__status">{status}</div>}
        </div>
      )}
    </div>
  );
}

/* ───────────── StickyActionBar (mobile) ───────────── */
function StickyActionBar({ label, value, note, action, inline = false }) {
  return (
    <>
      <div className={cx("s21-actionbar", inline && "s21-actionbar--inline")}>
        <div className="s21-actionbar__text">
          {label && <div className="s21-actionbar__label">{label}</div>}
          {value && <div className="s21-actionbar__value">{value}</div>}
        </div>
        {note && <span className="s21-actionbar__note" aria-live="polite">{note}</span>}
        {action}
      </div>
      {!inline && <div className="s21-actionbar__spacer" aria-hidden="true" />}
    </>
  );
}

/* ───────────── Tooltip (NEW — Fáze G) ───────────── */
function Tooltip({ label, children, side = "top", delay = 250, className }) {
  const [open, setOpen] = useState(false);
  const t = useRef(null);
  const show = () => { clearTimeout(t.current); t.current = setTimeout(() => setOpen(true), delay); };
  const hide = () => { clearTimeout(t.current); setOpen(false); };
  useEffect(() => () => clearTimeout(t.current), []);
  return (
    <span className={cx("s21-tt", className)} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {open && <span role="tooltip" className={cx("s21-tt__pop", `s21-tt__pop--${side}`)}>{label}</span>}
    </span>
  );
}

/* ───────────── Skeleton (NEW — Fáze G) ───────────── */
function Skeleton({ w, h, radius = "var(--radius-md)", className, style }) {
  const s = { width: w, height: h, borderRadius: radius, ...style };
  return <span aria-hidden="true" className={cx("s21-sk", className)} style={s} />;
}
Skeleton.Text = function ({ lines = 3, gap = 8, w = "100%" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: lines }).map((_, i) =>
        <Skeleton key={i} h={12} w={i === lines - 1 ? "60%" : w} />)}
    </div>
  );
};

/* ───────────── Progress (NEW — Fáze G) ───────────── */
function Progress({ value, max = 100, label, showValue = false, tone = "primary", size = "md" }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cx("s21-progress", `s21-progress--${size}`, `s21-progress--${tone}`)}>
      {(label || showValue) && (
        <div className="s21-progress__head">
          {label && <span className="s21-progress__label">{label}</span>}
          {showValue && <span className="s21-progress__val">{Math.round(pct)} %</span>}
        </div>
      )}
      <div className="s21-progress__track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div className="s21-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
Progress.Circular = function ({ value, max = 100, size = 40, stroke = 4, tone = "primary" }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={cx("s21-progress-c", `s21-progress-c--${tone}`)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="s21-progress-c__track" fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="s21-progress-c__fill" fill="none"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
  );
};

/* ───────────── Callout (NEW — Fáze G) ───────────── */
function Callout({ tone = "info", icon, title, action, children, className }) {
  const defaultIcon = { info: "info", success: "check", warning: "alert-triangle", danger: "alert-circle" }[tone] || "info";
  return (
    <div className={cx("s21-callout", `s21-callout--${tone}`, className)} role={tone === "danger" || tone === "warning" ? "alert" : "note"}>
      <span className="s21-callout__icon"><Icon name={icon || defaultIcon} size={18} /></span>
      <div className="s21-callout__body">
        {title && <div className="s21-callout__title">{title}</div>}
        {children && <div className="s21-callout__desc">{children}</div>}
      </div>
      {action && <div className="s21-callout__action">{action}</div>}
    </div>
  );
}

/* ───────────── Switch (NEW — Fáze G) ───────────── */
function Switch({ checked, onChange, label, description, disabled, name, id }) {
  const _id = id || (name && `s21-sw-${name}`) || undefined;
  return (
    <label className={cx("s21-switch", disabled && "is-disabled")}>
      <input id={_id} name={name} type="checkbox" role="switch" checked={!!checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked, e)} className="s21-switch__input" />
      <span className="s21-switch__track" aria-hidden="true"><span className="s21-switch__thumb" /></span>
      {(label || description) && (
        <span className="s21-switch__txt">
          {label && <span className="s21-switch__label">{label}</span>}
          {description && <span className="s21-switch__desc">{description}</span>}
        </span>
      )}
    </label>
  );
}

/* ───────────── Avatar + AvatarGroup (NEW — Fáze G) ───────────── */
function Avatar({ name, src, size = 36, tone = "primary", className }) {
  const style = { width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.38)) };
  return (
    <span className={cx("s21-avatar2", `s21-avatar2--${tone}`, className)} style={style} aria-label={name} title={name}>
      {src ? <img src={src} alt="" /> : <span>{initials(name || "?")}</span>}
    </span>
  );
}
function AvatarGroup({ items = [], max = 4, size = 32 }) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <span className="s21-avatar-grp" style={{ "--sz": `${size}px` }}>
      {shown.map((it, i) => <Avatar key={i} name={it.name} src={it.src} size={size} tone={it.tone} />)}
      {rest > 0 && <span className="s21-avatar2 s21-avatar2--muted" style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.38)) }}>+{rest}</span>}
    </span>
  );
}

/* ───────────── Kbd (NEW — Fáze G) ───────────── */
function Kbd({ children, className }) {
  return <kbd className={cx("s21-kbd", className)}>{children}</kbd>;
}

/* ───────────── RadioGroup (NEW — Fáze G) ───────────── */
function RadioGroup({ name, value, onChange, options = [], orientation = "horizontal", disabled }) {
  return (
    <div className={cx("s21-radio-grp", `s21-radio-grp--${orientation}`)} role="radiogroup">
      {options.map((o) => {
        const id = `${name}-${o.value}`;
        const checked = value === o.value;
        return (
          <label key={o.value} htmlFor={id} className={cx("s21-radio", checked && "is-checked", disabled && "is-disabled")}>
            <input id={id} type="radio" name={name} value={o.value} checked={checked} disabled={disabled}
              onChange={() => onChange && onChange(o.value)} className="s21-radio__input" />
            <span className="s21-radio__dot" aria-hidden="true" />
            <span className="s21-radio__label">{o.label}</span>
            {o.description && <span className="s21-radio__desc">{o.description}</span>}
          </label>
        );
      })}
    </div>
  );
}

/* ───────────── Popover (NEW — Fáze G) ───────────── */
function Popover({ open, onClose, anchor, side = "bottom", align = "start", children, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target) && !(anchor && anchor.current && anchor.current.contains(e.target))) onClose && onClose(); };
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open, onClose, anchor]);
  if (!open) return null;
  return <div ref={ref} className={cx("s21-popover", `s21-popover--${side}`, `s21-popover--${align}`, className)} role="dialog">{children}</div>;
}

/* ───────────── DropdownMenu (NEW — Fáze G, řízená alternativa k .s21-dd surové ─────────────) */
function DropdownMenu({ trigger, children, align = "end", className }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={wrap} className={cx("s21-dd", className)}>
      <span onClick={() => setOpen((v) => !v)}>{typeof trigger === "function" ? trigger({ open }) : trigger}</span>
      {open && <div className={cx("s21-dd__menu", align === "start" && "s21-dd__menu--start")} role="menu">{typeof children === "function" ? children({ close: () => setOpen(false) }) : children}</div>}
    </div>
  );
}

/* ───────────── Drawer (NEW — Fáze H) ───────────── */
function Drawer({ open, onClose, side = "right", size = 400, title, description, footer, children, className }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  const style = (side === "left" || side === "right") ? { width: size } : { height: size };
  return (
    <div className={cx("s21-drawer-root", `s21-drawer-root--${side}`)} role="dialog" aria-modal="true" aria-labelledby={title ? "s21-drawer-title" : undefined}>
      <div className="s21-drawer__backdrop" onClick={onClose} />
      <aside className={cx("s21-drawer", `s21-drawer--${side}`, className)} style={style}>
        {(title || onClose) && (
          <header className="s21-drawer__head">
            <div className="s21-drawer__titles">
              {title && <h2 id="s21-drawer-title" className="s21-drawer__title">{title}</h2>}
              {description && <p className="s21-drawer__desc">{description}</p>}
            </div>
            {onClose && <button type="button" onClick={onClose} className="s21-drawer__close" aria-label="Zavřít"><Icon name="x" size={18} /></button>}
          </header>
        )}
        <div className="s21-drawer__body">{children}</div>
        {footer && <footer className="s21-drawer__foot">{footer}</footer>}
      </aside>
    </div>
  );
}

/* ───────────── BottomSheet (NEW — Fáze H) — mobile-first Drawer varianta ───────────── */
function BottomSheet({ open, onClose, title, children, height = "60vh" }) {
  return <Drawer open={open} onClose={onClose} side="bottom" size={height} title={title} className="s21-drawer--sheet">{children}</Drawer>;
}

/* ───────────── Accordion (NEW — Fáze H) ───────────── */
function Accordion({ items = [], multiple = false, defaultOpen = [], className }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const toggle = (k) => setOpen((prev) => {
    const n = new Set(multiple ? prev : []);
    if (prev.has(k)) n.delete(k); else n.add(k);
    return n;
  });
  return (
    <div className={cx("s21-acc", className)}>
      {items.map((it) => {
        const isOpen = open.has(it.key);
        return (
          <div key={it.key} className={cx("s21-acc__item", isOpen && "is-open")}>
            <button type="button" className="s21-acc__head" onClick={() => toggle(it.key)} aria-expanded={isOpen}>
              <span className="s21-acc__title">{it.title}</span>
              {it.meta && <span className="s21-acc__meta">{it.meta}</span>}
              <Icon name="chevron-down" size={16} className="s21-acc__chev" />
            </button>
            {isOpen && <div className="s21-acc__body">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ───────────── Timeline (NEW — Fáze H) ───────────── */
function Timeline({ items = [], className }) {
  return (
    <ol className={cx("s21-tl", className)}>
      {items.map((it, i) => (
        <li key={i} className={cx("s21-tl__item", it.tone && `s21-tl__item--${it.tone}`)}>
          <span className="s21-tl__dot">{it.icon ? <Icon name={it.icon} size={12} /> : null}</span>
          <div className="s21-tl__body">
            {it.time && <span className="s21-tl__time">{it.time}</span>}
            <div className="s21-tl__title">{it.title}</div>
            {it.description && <div className="s21-tl__desc">{it.description}</div>}
            {it.by && <div className="s21-tl__by">— {it.by}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ───────────── Sparkline (NEW — Fáze H) — mini SVG chart ───────────── */
function Sparkline({ data = [], width = 100, height = 32, stroke = "var(--primary)", fill = "var(--primary-soft)", strokeWidth = 2, ariaLabel = "Trend", showArea = true }) {
  if (!data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;
  const pts = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - strokeWidth) - strokeWidth / 2]);
  const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = showArea ? `${path} L${width.toFixed(1)},${height} L0,${height} Z` : null;
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel} className="s21-spark">
      {area && <path d={area} fill={fill} />}
      <path d={path} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={strokeWidth + 1} fill={stroke} />
    </svg>
  );
}

/* ───────────── CommandPalette (NEW — Fáze H) ⌘K ───────────── */
function CommandPalette({ open, onClose, items = [], placeholder = "Hledat příkazy, stránky…", emptyLabel = "Nic nenalezeno", shortcut = "⌘K" }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setQ(""); setIdx(0);
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const nq = norm(q);
  const flat = items.flatMap((sec) => (sec.items || []).map((it) => ({ ...it, section: sec.title })));
  const matches = nq ? flat.filter((it) => norm(it.label).includes(nq) || norm(it.hint || "").includes(nq)) : flat;
  const grouped = matches.reduce((acc, it) => {
    (acc[it.section || ""] = acc[it.section || ""] || []).push(it); return acc;
  }, {});

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(matches.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); const it = matches[idx]; if (it) { it.onSelect && it.onSelect(); onClose && onClose(); } }
  };

  if (!open) return null;
  let running = -1;
  return (
    <div className="s21-cmdk" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="s21-cmdk__backdrop" onClick={onClose} />
      <div className="s21-cmdk__panel">
        <div className="s21-cmdk__head">
          <Icon name="search" size={18} className="s21-cmdk__searchicon" />
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            onKeyDown={onInputKey} className="s21-cmdk__input" placeholder={placeholder} aria-label={placeholder} />
          <Kbd>{shortcut}</Kbd>
        </div>
        <div className="s21-cmdk__list" role="listbox">
          {matches.length === 0 && <div className="s21-cmdk__empty">{emptyLabel}</div>}
          {Object.entries(grouped).map(([sec, list]) => (
            <div key={sec || "_"} className="s21-cmdk__group">
              {sec && <div className="s21-cmdk__label">{sec}</div>}
              {list.map((it) => { running += 1; const i = running; return (
                <button key={it.id || i} type="button" role="option" aria-selected={i === idx}
                  className={cx("s21-cmdk__item", i === idx && "is-active")}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => { it.onSelect && it.onSelect(); onClose && onClose(); }}>
                  {it.icon && <Icon name={it.icon} size={16} />}
                  <span className="s21-cmdk__lbl">{it.label}</span>
                  {it.hint && <span className="s21-cmdk__hint">{it.hint}</span>}
                  {it.kbd && <Kbd>{it.kbd}</Kbd>}
                </button>
              ); })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Theme (NEW — Fáze E) ───────────── */
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem("system21-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(t) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", t);
  try { window.localStorage.setItem("system21-theme", t); } catch {}
}
function useTheme() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    applyTheme(t);
  }, []);
  const toggle = useCallback(() => {
    setTheme((prev) => { const next = prev === "dark" ? "light" : "dark"; applyTheme(next); return next; });
  }, []);
  const set = useCallback((t) => { setTheme(t); applyTheme(t); }, []);
  return { theme, toggle, set };
}
function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  return (
    <button type="button" onClick={toggle} className={cx("s21-iconbtn", className)} aria-label={theme === "dark" ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"} title={theme === "dark" ? "Světlý režim" : "Tmavý režim"}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
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
  Breadcrumbs, PageHeader, Sidebar, TopBar, AppShell, PageBody, PoweredBy, ListCard, StickyActionBar,
  Tooltip, Skeleton, Progress, Callout, Switch, Avatar, AvatarGroup, Kbd, RadioGroup, Popover, DropdownMenu,
  ThemeToggle, useTheme,
  Drawer, BottomSheet, Accordion, Timeline, Sparkline, CommandPalette,
};

if (typeof window !== "undefined") {
  window.S21 = {
  Icon, Button, Badge, Tag, ChipGroup, SegmentedControl, Tabs,
  Field, Input, SearchInput, Select, Checkbox, FilterBar,
  DataTable, SortIcon, Pagination, StatTile, Section, EmptyState, Stepper,
  Modal, Toast, ToastProvider, useToast,
  Breadcrumbs, PageHeader, Sidebar, TopBar, AppShell, PageBody, PoweredBy, ListCard, StickyActionBar,
  Tooltip, Skeleton, Progress, Callout, Switch, Avatar, AvatarGroup, Kbd, RadioGroup, Popover, DropdownMenu,
  ThemeToggle, useTheme,
  Drawer, BottomSheet, Accordion, Timeline, Sparkline, CommandPalette,
};
}
