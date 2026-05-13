// src/styles/common.js
// Theme: Apple Light — white/f5f5f7 background, #1d1d1f text, #0066cc accent
// Inspired by apple.com — no gradients, no shadows, pure typography & spacing

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[var(--page-bg)] min-h-screen";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-[var(--surface-bg)] rounded-2xl p-7 hover:bg-[var(--surface-hover)] transition-colors duration-200 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-bold text-[var(--text-main)] tracking-tight leading-none mb-2";
export const headingClass = "text-2xl font-bold text-[var(--text-main)] tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-[var(--text-main)] tracking-tight";
export const bodyText = "text-[var(--text-muted)] leading-relaxed";
export const mutedText = "text-sm text-[var(--text-soft)]";
export const linkClass = "text-[var(--accent-color)] hover:text-[var(--accent-hover)] transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-[var(--accent-color)] text-white font-semibold px-5 py-2 rounded-full hover:bg-[var(--accent-hover)] transition-colors cursor-pointer text-sm tracking-tight";
export const secondaryBtn =
  "border border-[var(--border-color)] text-[var(--text-main)] font-medium px-5 py-2 rounded-full hover:bg-[var(--surface-bg)] transition-colors cursor-pointer text-sm";
export const ghostBtn = "text-[var(--accent-color)] font-medium hover:text-[var(--accent-hover)] transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-[var(--surface-bg)] rounded-2xl p-10 max-w-4xl mx-auto";
export const formTitle = "text-2xl font-bold text-[var(--text-main)] tracking-tight text-center mb-7";
export const labelClass = "text-xs font-medium text-[var(--text-muted)] mb-1.5 block";
export const inputClass =
  "w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-[var(--text-main)] text-sm placeholder:text-[var(--text-soft)] focus:outline-none focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/10 transition";
export const formGroup = "mb-4";
export const submitBtn =
  "w-full bg-[var(--accent-color)] text-white font-semibold py-2.5 rounded-full hover:bg-[var(--accent-hover)] transition-colors cursor-pointer mt-2 text-sm tracking-tight";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--border-color)] min-h-[68px] flex items-center sticky top-0 z-50";
export const navContainerClass = "w-full flex items-center justify-between pl-0 pr-4 sm:pr-10";
export const navBrandClass = "text-base font-semibold text-[var(--text-main)] tracking-tight";
export const navLinksClass = "flex items-center gap-3 sm:gap-6";
export const navLinkClass = "text-[0.95rem] sm:text-base text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-semibold";
export const navLinkActiveClass = "text-[0.95rem] sm:text-base text-[var(--accent-color)] font-bold";

// ─── Article / Blog ───────────────────────────────────
//export const articleGrid        = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e8ed] border border-[#e8e8ed] rounded-2xl overflow-hidden"
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
export const articleCardClass =
  "bg-[var(--surface-bg)] p-7 hover:bg-[var(--surface-hover)] transition-colors duration-200 flex flex-col gap-2.5 cursor-pointer";
export const articleTitle = "text-base font-semibold text-[var(--text-main)] leading-snug tracking-tight";
export const articleExcerpt = "text-sm text-[var(--text-muted)] leading-relaxed";
export const articleMeta = "text-xs text-[var(--text-soft)]";
export const articleBody = "text-[var(--text-muted)] leading-[1.85] text-[0.95rem] max-w-2xl";
export const timestampClass = "text-xs text-[var(--text-soft)] flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-semibold text-[var(--accent-color)] uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-14";

export const articleHeader = "mb-10 flex flex-col gap-4";

export const articleCategory = "text-[0.7rem] font-semibold uppercase tracking-widest text-[var(--accent-color)]";

export const articleMainTitle = "text-4xl font-bold text-[var(--text-main)] leading-tight tracking-tight";

export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-[var(--border-color)] py-4 text-sm text-[var(--text-muted)]";

export const authorInfo = "flex items-center gap-2 font-medium text-[var(--text-main)]";

export const articleContent = "text-[var(--text-main)] leading-[1.9] text-[1rem] whitespace-pre-line mt-8";

export const articleFooter = "border-t border-[var(--border-color)] mt-12 pt-6 text-sm text-[var(--text-soft)]";
// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-3 mt-6";

export const editBtn = "bg-[var(--accent-color)] text-white text-sm px-4 py-2 rounded-full hover:bg-[var(--accent-hover)] transition";

export const deleteBtn = "bg-[#ff3b30] text-white text-sm px-4 py-2 rounded-full hover:bg-[#d62c23] transition";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-[#ff3b30]/[0.06] text-[#cc2f26] border border-[#ff3b30]/[0.18] rounded-xl px-4 py-3 text-sm";
export const successClass =
  "bg-[#34c759]/[0.07] text-[#248a3d] border border-[#34c759]/20 rounded-xl px-4 py-3 text-sm";
export const loadingClass = "text-[var(--accent-color)]/60 text-sm animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-[var(--text-soft)] py-16 text-sm";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-[var(--border-color)] my-10";
