// System 21 — window.S21. Types are documentation.
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export type IconName =
  | "dashboard" | "tasks" | "calendar" | "clock" | "notes" | "user" | "logout" | "settings"
  | "chevron-down" | "chevron-right" | "chevron-left" | "chevron-up"
  | "search" | "plus" | "minus" | "check" | "x" | "qr" | "menu" | "folder" | "more" | "filter"
  | "arrow-up" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up-right" | "external-link"
  | "download" | "upload" | "copy" | "edit" | "trash" | "eye" | "eye-off" | "lock" | "unlock"
  | "mail" | "phone" | "send" | "bell" | "bookmark" | "flag" | "heart" | "star" | "share" | "link" | "refresh"
  | "sort-asc" | "sort-desc" | "grid" | "list" | "columns" | "expand" | "collapse"
  | "image" | "file" | "paperclip" | "printer" | "credit-card" | "tag" | "map-pin"
  | "home" | "building" | "users" | "user-plus"
  | "alert-circle" | "alert-triangle" | "info" | "help-circle"
  | "sparkles" | "zap" | "activity" | "trending-up" | "trending-down" | "bar-chart" | "pie-chart"
  | "sun" | "moon" | "play" | "pause" | "arrow-repeat" | "cloud" | "save";

export interface IconProps { name: IconName; size?: number; strokeWidth?: number; className?: string; title?: string }
export declare function Icon(p: IconProps): JSX.Element;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  /** Icon-only square button; pass aria-label and title. */
  iconOnly?: boolean;
  /** Show spinner and set aria-busy; also disables the button. */
  loading?: boolean;
}
export declare function Button(p: ButtonProps): JSX.Element;

export interface BadgeProps { children: ReactNode; color?: string | null; tone?: "neutral" | "success" | "warning" | "danger" | "primary"; fitCell?: boolean }
export declare function Badge(p: BadgeProps): JSX.Element;

export interface TagProps { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "accent" }
export declare function Tag(p: TagProps): JSX.Element;

export interface OptionItem { value: string; label: ReactNode; count?: number; icon?: IconName }
export interface ChipGroupProps { items: OptionItem[]; value: string; onChange?: (v: string) => void }
export declare function ChipGroup(p: ChipGroupProps): JSX.Element;
export interface SegmentedControlProps { items: OptionItem[]; value: string; onChange?: (v: string) => void }
export declare function SegmentedControl(p: SegmentedControlProps): JSX.Element;
export interface TabsProps { items: OptionItem[]; value: string; onChange?: (v: string) => void }
export declare function Tabs(p: TabsProps): JSX.Element;

export interface FieldProps { label?: ReactNode; hint?: ReactNode; error?: ReactNode; children: ReactNode; className?: string }
export declare function Field(p: FieldProps): JSX.Element;
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { invalid?: boolean }
export declare function Input(p: InputProps): JSX.Element;
export interface SearchInputProps { value: string; onChange?: (v: string) => void; placeholder?: string; className?: string }
export declare function SearchInput(p: SearchInputProps): JSX.Element;
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { options?: { value: string; label: string }[]; placeholder?: string }
export declare function Select(p: SelectProps): JSX.Element;
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> { label: ReactNode; count?: number }
export declare function Checkbox(p: CheckboxProps): JSX.Element;
/** First child (search) stays visible on mobile; the rest collapse behind a filter button. */
export declare function FilterBar(p: { children: ReactNode; activeCount?: number; defaultOpen?: boolean }): JSX.Element;

export interface Column<R> {
  key: string; label: ReactNode; sortable?: boolean; align?: "left" | "right" | "center";
  numeric?: boolean; width?: string | number; render?: (row: R) => ReactNode;
}
export interface DataTableProps<R> {
  columns: Column<R>[]; rows: R[]; rowKey?: string;
  sort?: { key: string; dir: "asc" | "desc" }; onSort?: (key: string, dir: "asc" | "desc") => void;
  /** Clicks inside [data-no-row-click] are ignored. */
  onRowClick?: (row: R) => void; empty?: ReactNode; minWidth?: number;
  /** Mobile (<768px): render rows as cards (usually <ListCard/>) instead of the table. */
  renderCard?: (row: R) => ReactNode;
}
export declare function DataTable<R>(p: DataTableProps<R>): JSX.Element;
export declare function SortIcon(p: { active: boolean; dir?: "asc" | "desc" }): JSX.Element;

export interface PaginationProps { page: number; totalPages: number; total: number; pageSize: number; noun?: string; onPage?: (p: number) => void }
export declare function Pagination(p: PaginationProps): JSX.Element;

export interface StatTileProps { label: ReactNode; /** Formatted number without unit; never wraps. */ value: ReactNode; /** Smaller muted unit after the number ("Kč", "h"). */ unit?: string; hint?: ReactNode; accent?: "primary" | "success" | "danger"; big?: boolean }
export declare function StatTile(p: StatTileProps): JSX.Element;

export interface SectionProps { title?: ReactNode; subtitle?: ReactNode; action?: ReactNode; children?: ReactNode; detail?: ReactNode; detailLabel?: string; defaultOpen?: boolean }
export declare function Section(p: SectionProps): JSX.Element;

export interface EmptyStateProps { icon?: IconName; title: ReactNode; description?: ReactNode; action?: ReactNode }
export declare function EmptyState(p: EmptyStateProps): JSX.Element;

export interface StepperProps { steps: string[]; current: number; onGoTo?: (step: number) => void }
export declare function Stepper(p: StepperProps): JSX.Element;

export interface ModalProps { open: boolean; onClose?: () => void; title: ReactNode; description?: ReactNode; size?: "sm" | "md" | "lg"; footer?: ReactNode; children?: ReactNode; /** Preview only: render in flow instead of fixed. */ inline?: boolean }
export declare function Modal(p: ModalProps): JSX.Element | null;

export interface ToastProps { tone?: "success" | "error" | "info"; message: ReactNode; onDismiss?: () => void }
export declare function Toast(p: ToastProps): JSX.Element;
export declare function ToastProvider(p: { children: ReactNode; duration?: number }): JSX.Element;
export declare function useToast(): { show(m: string, tone?: "success" | "error" | "info"): void; success(m: string): void; error(m: string): void; info(m: string): void };

export interface Crumb { label: string; href?: string; icon?: IconName }
export interface BreadcrumbsProps {
  /** Root → current page. The last item is the current page (not a link). */
  items: Crumb[];
  /** Above this, middle levels collapse into "…". Default 4. */
  maxVisible?: number;
  onNavigate?: (item: Crumb, index: number) => void;
  /** Force the mobile "‹ parent" form (automatic below 768px). */
  compact?: boolean;
}
export declare function Breadcrumbs(p: BreadcrumbsProps): JSX.Element | null;

export interface PageHeaderProps { title: string; description?: ReactNode; actions?: ReactNode; breadcrumbs?: ReactNode; tabs?: ReactNode; sticky?: boolean }
export declare function PageHeader(p: PageHeaderProps): JSX.Element;

export interface NavItem { href: string; label: string; icon?: IconName; badge?: number }
export interface NavSection { title?: string; collapsible?: boolean; items: NavItem[] }
export interface SidebarProps {
  brand?: { name: string; subtitle?: string; logo?: ReactNode; href?: string };
  sections: NavSection[]; activeHref?: string; onNavigate?: (item: NavItem) => void;
  quickAction?: { label: string; icon?: IconName; onClick?: () => void };
  search?: ReactNode;
  footer?: ReactNode; defaultCollapsed?: Record<string, boolean>;
}

export interface SettingsGroup { title?: string; items: NavItem[] }
export interface TopBarProps {
  /** <Breadcrumbs/> for the current path (left). */
  breadcrumbs?: ReactNode; title?: ReactNode;
  /** Gear icon menu. A red dot shows when any item has badge > 0. */
  settings?: { groups: SettingsGroup[]; activeHref?: string; onSelect?: (item: NavItem) => void };
  /** Avatar menu: name, role and links (default "Můj profil"). */
  user?: { name: string; role?: string; href?: string; links?: { label: string; href?: string; icon?: IconName; onClick?: () => void }[] };
  onLogout?: () => void;
  /** Extra icon buttons before the gear. */
  extra?: ReactNode;
  /** Mobile dark bar: logo + name (center) and quick action (right). */
  brand?: { name: string; logo?: ReactNode; href?: string };
  quickAction?: { label: string; icon?: IconName; onClick?: () => void };
}
export declare function TopBar(p: TopBarProps): JSX.Element;

export interface PoweredByProps { logo?: ReactNode; name?: string; href?: string; label?: string; variant?: "dark" | "light" }
export declare function PoweredBy(p: PoweredByProps): JSX.Element;

export interface ListCardProps { title: ReactNode; flags?: ReactNode; meta?: ReactNode; actions?: ReactNode; stats?: ReactNode; status?: ReactNode; onClick?: (e: unknown) => void; href?: string }
export declare function ListCard(p: ListCardProps): JSX.Element;

export interface StickyActionBarProps { label?: ReactNode; value?: ReactNode; note?: ReactNode; action?: ReactNode; /** Preview only. */ inline?: boolean }
export declare function StickyActionBar(p: StickyActionBarProps): JSX.Element;
export declare function Sidebar(p: SidebarProps): JSX.Element;

export interface AppShellProps { sidebar: ReactNode; /** <TopBar/>; hosts the mobile menu button. */ topbar?: ReactNode; children: ReactNode; /** Preview only. */ defaultDrawerOpen?: boolean }
export declare function AppShell(p: AppShellProps): JSX.Element;
export declare function PageBody(p: { children: ReactNode }): JSX.Element;

/* — Fáze G components — */
export interface TooltipProps { label: ReactNode; children: ReactNode; side?: "top" | "bottom" | "left" | "right"; delay?: number; className?: string }
export declare function Tooltip(p: TooltipProps): JSX.Element;

export interface SkeletonProps { w?: number | string; h?: number | string; radius?: string; className?: string; style?: React.CSSProperties }
export declare const Skeleton: {
  (p: SkeletonProps): JSX.Element;
  Text: (p: { lines?: number; gap?: number; w?: number | string }) => JSX.Element;
};

export interface ProgressProps { value: number; max?: number; label?: ReactNode; showValue?: boolean; tone?: "primary" | "success" | "danger" | "warning"; size?: "sm" | "md" | "lg" }
export declare const Progress: {
  (p: ProgressProps): JSX.Element;
  Circular: (p: { value: number; max?: number; size?: number; stroke?: number; tone?: "primary" | "success" | "danger" | "warning" }) => JSX.Element;
};

export interface CalloutProps { tone?: "info" | "success" | "warning" | "danger"; icon?: IconName; title?: ReactNode; action?: ReactNode; children?: ReactNode; className?: string }
export declare function Callout(p: CalloutProps): JSX.Element;

export interface SwitchProps { checked?: boolean; onChange?: (checked: boolean, e?: Event) => void; label?: ReactNode; description?: ReactNode; disabled?: boolean; name?: string; id?: string }
export declare function Switch(p: SwitchProps): JSX.Element;

export interface AvatarProps { name?: string; src?: string; size?: number; tone?: "primary" | "accent" | "muted"; className?: string }
export declare function Avatar(p: AvatarProps): JSX.Element;
export interface AvatarGroupProps { items: { name?: string; src?: string; tone?: "primary" | "accent" | "muted" }[]; max?: number; size?: number }
export declare function AvatarGroup(p: AvatarGroupProps): JSX.Element;

export declare function Kbd(p: { children: ReactNode; className?: string }): JSX.Element;

export interface RadioOption { value: string; label: ReactNode; description?: ReactNode }
export interface RadioGroupProps { name: string; value?: string; onChange?: (v: string) => void; options: RadioOption[]; orientation?: "horizontal" | "vertical"; disabled?: boolean }
export declare function RadioGroup(p: RadioGroupProps): JSX.Element;

export interface PopoverProps { open: boolean; onClose?: () => void; anchor?: React.RefObject<HTMLElement>; side?: "top" | "bottom"; align?: "start" | "end" | "center"; children?: ReactNode; className?: string }
export declare function Popover(p: PopoverProps): JSX.Element | null;

export interface DropdownMenuProps { trigger: ReactNode | ((s: { open: boolean }) => ReactNode); children: ReactNode | ((s: { close: () => void }) => ReactNode); align?: "start" | "end"; className?: string }
export declare function DropdownMenu(p: DropdownMenuProps): JSX.Element;

/* — Theme (Fáze E) — */
export declare function useTheme(): { theme: "light" | "dark"; toggle(): void; set(t: "light" | "dark"): void };
export declare function ThemeToggle(p: { className?: string }): JSX.Element;

/* — Fáze H components — */
export interface DrawerProps { open: boolean; onClose?: () => void; side?: "left" | "right" | "top" | "bottom"; size?: number | string; title?: ReactNode; description?: ReactNode; footer?: ReactNode; children?: ReactNode; className?: string }
export declare function Drawer(p: DrawerProps): JSX.Element | null;
export declare function BottomSheet(p: { open: boolean; onClose?: () => void; title?: ReactNode; children?: ReactNode; height?: number | string }): JSX.Element | null;

export interface AccordionItem { key: string; title: ReactNode; meta?: ReactNode; content: ReactNode }
export interface AccordionProps { items: AccordionItem[]; multiple?: boolean; defaultOpen?: string[]; className?: string }
export declare function Accordion(p: AccordionProps): JSX.Element;

export interface TimelineItem { time?: ReactNode; title: ReactNode; description?: ReactNode; by?: ReactNode; icon?: IconName; tone?: "primary" | "success" | "danger" }
export declare function Timeline(p: { items: TimelineItem[]; className?: string }): JSX.Element;

export interface SparklineProps { data: number[]; width?: number; height?: number; stroke?: string; fill?: string; strokeWidth?: number; ariaLabel?: string; showArea?: boolean }
export declare function Sparkline(p: SparklineProps): JSX.Element | null;

export interface CommandItem { id?: string; label: string; hint?: string; icon?: IconName; kbd?: string; onSelect?: () => void }
export interface CommandSection { title?: string; items: CommandItem[] }
export interface CommandPaletteProps { open: boolean; onClose?: () => void; items: CommandSection[]; placeholder?: string; emptyLabel?: string; shortcut?: string }
export declare function CommandPalette(p: CommandPaletteProps): JSX.Element | null;
