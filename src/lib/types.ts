/**
 * GrowthSync Design System — public type interfaces.
 * Every component's prop type is exported here so consuming apps can
 * `import type { TangerineButtonProps } from "@/lib/types";`
 */

import type { CSSProperties, ReactNode } from "react";

/* ============================================================
   Atoms
   ============================================================ */

export interface OrbProps {
  /** Diameter in pixels. Defaults to 22. */
  size?: number;
  style?: CSSProperties;
}

export interface VersionBadgeProps {
  children?: ReactNode;
  style?: CSSProperties;
}

export interface LogoWordmarkProps {
  /** Display size in pixels (drives the orb size proportionally). */
  size?: number;
  withOrb?: boolean;
  withBadge?: boolean;
  /** Override the wordmark color (e.g. for dark backgrounds). */
  color?: string;
}

export type TangerineButtonSize = "sm" | "md" | "lg" | "orb";
export type TangerineButtonVariant = "primary" | "ghost" | "ink";

export interface TangerineButtonProps {
  children: ReactNode;
  size?: TangerineButtonSize;
  variant?: TangerineButtonVariant;
  style?: CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export type StatusPillVariant =
  | "success"
  | "tangerine"
  | "warning"
  | "danger"
  | "info";

export interface StatusPillProps {
  children: ReactNode;
  variant?: StatusPillVariant;
  /** Render a small LED dot before the label. */
  dot?: boolean;
  style?: CSSProperties;
}

export interface MonoLabelProps {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}

export interface EyebrowProps {
  children: ReactNode;
  dot?: boolean;
  style?: CSSProperties;
}

export interface ReadMoreProps {
  children?: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

export interface AvatarProps {
  initials: string;
  bg?: string;
  size?: number;
  style?: CSSProperties;
}

export interface ChromeWindowTab {
  label: string;
  active?: boolean;
}

export interface ChromeWindowProps {
  /** Mono filename centered in the titlebar. */
  title: string;
  /** Optional inner tab bar drawn between titlebar and body. */
  tabs?: ChromeWindowTab[];
  children: ReactNode;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
}

/* ============================================================
   Product surfaces
   ============================================================ */

export type ChatBubbleAuthor = "us" | "them";

export interface ChatMessage {
  who: ChatBubbleAuthor;
  text: string;
}

export interface ChatBubbleProps {
  who: ChatBubbleAuthor;
  children: ReactNode;
  style?: CSSProperties;
}

export interface SocialSignalCardProps {
  handle: string;
  avatar: string;
  avatarColor?: string;
  image?: string;
  body: string;
  meta: string;
  cta?: string;
  platform?: "tiktok" | "instagram" | "youtube" | "threads";
  /** Optional signal id; defaults to a slug of the handle. */
  id?: string;
  style?: CSSProperties;
}

export interface DmChatPanelProps {
  title?: string;
  messages: ChatMessage[];
  footer?: ReactNode;
  style?: CSSProperties;
}

export type CrmStat = [value: string, label: string];
export type CrmTimelineEntry = [date: string, text: string];

export interface CrmProfileCardProps {
  name: string;
  handle: string;
  location: string;
  joined: string;
  avatarInitials: string;
  avatarColor?: string;
  intent?: string;
  stats?: CrmStat[];
  timeline?: CrmTimelineEntry[];
  style?: CSSProperties;
}

/* ============================================================
   Marketing surfaces
   ============================================================ */

export interface NavData {
  tabs: string[];
  activeTab: string;
  accentTab: string;
  search: string;
  cta: string;
  ctaHref: string;
}

export interface BrandNavProps {
  data?: NavData;
}

export type BrandStripLockupStyle = "grotesk" | "serif" | "mono";

export interface BrandStripLockup {
  text: string;
  style: BrandStripLockupStyle;
}

export interface BrandStripData {
  eyebrow: string;
  lockups: BrandStripLockup[];
}

export interface BrandStripProps {
  data?: BrandStripData;
}

export type BrandTileColor = "orange" | "blue" | "lilac" | "tan";

export interface BrandTileData {
  name: string;
  sub: string;
  sub2?: string;
  color: BrandTileColor;
  big?: boolean;
}

export interface BrandGridData {
  eyebrow: string;
  featuredCount: string;
  tiles: BrandTileData[];
}

export interface BrandGridProps {
  data?: BrandGridData;
}

export type BrandTileProps = BrandTileData;

export type MetricTileVariant = "bone" | "tangerine";

export interface MetricTileProps {
  value: string;
  label: string;
  variant?: MetricTileVariant;
  style?: CSSProperties;
}

export interface SectionHeaderProps {
  title: string;
  lede?: string;
  align?: "center" | "left";
  /** If provided AND found in `title`, that word is rendered in Instrument Serif italic. */
  emWord?: string;
}

export interface FooterStatusbarData {
  os: string;
  version: string;
  flow: string[];
  right: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumnData {
  heading: string;
  items: FooterLink[];
}

export interface FooterData {
  statusbar: FooterStatusbarData;
  tagline: string;
  columns: FooterColumnData[];
  colophon: string;
}

export interface FooterDockProps {
  data?: FooterData;
}

/* ============================================================
   Signal Calculator
   ============================================================ */

export interface CalculatorTick {
  lbl: string;
  v: number;
}

export interface CalculatorFormula {
  /** Signal rate at the smallest audience size. */
  maxRate: number;
  /** Signal rate at the largest audience size. */
  minRate: number;
}

export interface CalculatorResultBody {
  lb: string;
  ti: string;
  sub: string;
}

export interface CalculatorData {
  title: string;
  ticks: CalculatorTick[];
  /** Default tick index. The component is uncontrolled by default. */
  defaultStep: number;
  formula: CalculatorFormula;
  /** Display label for the formula band, e.g. "= B3 × 14 × 1.5% = signals". */
  formulaLabel: string;
  /** Short formula stamp shown to the right of "COMPUTED:". */
  formulaShort: string;
  instruction: string;
  resultBody: CalculatorResultBody;
  autosavedAt: string;
}

export interface SignalCalculatorProps {
  data?: CalculatorData;
  initialStep?: number;
}

/* ============================================================
   Case Study desktop scene
   ============================================================ */

export type CaseSkin = "orange" | "mint" | "lilac";

export interface CaseBrowserData {
  skin: CaseSkin;
  brand: string;
  host: string;
  since: string;
  tagline: string;
  caseN: string;
  headline: string;
  by: string;
  body: string;
  stats: Array<[string, string]>;
  quote: string;
  counter: string;
  x: number;
  y: number;
}

export interface CaseBrowserWindowProps extends CaseBrowserData {
  totalCases?: number;
  z?: number;
  onClick?: () => void;
  onClose?: () => void;
  /** Begins a drag on the window — called from the titlebar mousedown. */
  onDragStart?: (e: React.MouseEvent) => void;
}

export interface CaseFileIconData {
  letter: string;
  name: string;
  /** Index into `caseStudies.browsers` to open when this file is clicked. */
  browserIndex?: number;
}

export interface CaseDesktopTab {
  dot: string;
  label: string;
  active?: boolean;
}

export interface CaseFeatureTileData {
  lab: string;
  ti: string;
  c1: string;
  c2: string;
  ic: string;
  tan?: boolean;
}

export interface CaseStudyData {
  eyebrowTop: string;
  title: string;
  eyebrowBelow: string;
  desktopTabs: CaseDesktopTab[];
  url: { host: string; path: string };
  menuItems: string[];
  files: CaseFileIconData[];
  browsers: CaseBrowserData[];
  features: CaseFeatureTileData[];
}

export interface CaseStudyDesktopProps {
  data?: CaseStudyData;
}

/* ============================================================
   Combined GS_DATA shape
   ============================================================ */

export interface GsData {
  brandStrip: BrandStripData;
  brandGrid: BrandGridData;
  calculator: CalculatorData;
  caseStudies: CaseStudyData;
  footer: FooterData;
  nav: NavData;
}
