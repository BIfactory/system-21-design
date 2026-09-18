// System 21 — window.S21. Types are documentation.
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export type IconName = "dashboard" | "tasks" | "calendar" | "clock" | "notes" | "user" | "logout" | "settings" | "chevron-down" | "chevron-right" | "chevron-left" | "search" | "plus" | "check" | "x" | "qr" | "menu" | "folder" | "more" | "filter";

export interface IconProps { name: IconName; size?: number; strokeWidth?: number; className?: string; title?: string }
export declare function Icon(p: IconProps): JSX.Element;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  /** Icon-only square button; pass aria-label and title. */
  iconOnly?: boolean;
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
export declare function FilterBar(p: { children: ReactNode }): JSX.Element;

export interface Column<R> {
  key: string; label: ReactNode; sortable?: boolean; align?: "left" | "right" | "center";
  numeric?: boolean; width?: string | number; render?: (row: R) => ReactNode;
}
export interface DataTableProps<R> {
  columns: Column<R>[]; rows: R[]; rowKey?: string;
  sort?: { key: string; dir: "asc" | "desc" }; onSort?: (key: string, dir: "asc" | "desc") => void;
  /** Clicks inside [data-no-row-click] are ignored. */
  onRowClick?: (row: R) => void; empty?: ReactNode; minWidth?: number;
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
}
export declare function TopBar(p: TopBarProps): JSX.Element;
export declare function Sidebar(p: SidebarProps): JSX.Element;

export interface AppShellProps { sidebar: ReactNode; /** <TopBar/>; hosts the mobile menu button. */ topbar?: ReactNode; children: ReactNode }
export declare function AppShell(p: AppShellProps): JSX.Element;
export declare function PageBody(p: { children: ReactNode }): JSX.Element;
