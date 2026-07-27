/**
 * Minimal dependency-free icon set (inline SVG) so we don't need to add an
 * icon library to the required packages. Each icon accepts `size` and
 * standard SVG props.
 */
const base = (props) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  width: props.size || 20,
  height: props.size || 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...props,
})

export const Menu = (p) => (
  <svg {...base(p)}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
)
export const X = (p) => (
  <svg {...base(p)}><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>
)
export const Sun = (p) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="4.2" y1="4.2" x2="5.6" y2="5.6" /><line x1="18.4" y1="18.4" x2="19.8" y2="19.8" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="4.2" y1="19.8" x2="5.6" y2="18.4" /><line x1="18.4" y1="5.6" x2="19.8" y2="4.2" /></svg>
)
export const Moon = (p) => (
  <svg {...base(p)}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
)
export const MapPin = (p) => (
  <svg {...base(p)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
)
export const Upload = (p) => (
  <svg {...base(p)}><path d="M12 16V4" /><path d="M6 10l6-6 6 6" /><path d="M4 20h16" /></svg>
)
export const Trash = (p) => (
  <svg {...base(p)}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>
)
export const Edit = (p) => (
  <svg {...base(p)}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
)
export const Camera = (p) => (
  <svg {...base(p)}><path d="M4 8h3l2-2h6l2 2h3v11H4z" /><circle cx="12" cy="13.5" r="3.5" /></svg>
)
export const Video = (p) => (
  <svg {...base(p)}><rect x="3" y="6" width="12" height="12" rx="2" /><path d="M15 10l6-3v10l-6-3" /></svg>
)
export const Check = (p) => (
  <svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>
)
export const AlertTriangle = (p) => (
  <svg {...base(p)}><path d="M12 3 2 20h20L12 3z" /><line x1="12" y1="10" x2="12" y2="14" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
)
export const Users = (p) => (
  <svg {...base(p)}><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" /><circle cx="17" cy="9" r="2.5" /><path d="M22 20c0-2.6-2-4.8-5-5.6" /></svg>
)
export const FileText = (p) => (
  <svg {...base(p)}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
)
export const LayoutDashboard = (p) => (
  <svg {...base(p)}><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="5" rx="1" /><rect x="13" y="10" width="8" height="11" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /></svg>
)
export const LogOut = (p) => (
  <svg {...base(p)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
)
export const ShieldCheck = (p) => (
  <svg {...base(p)}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
)
export const BarChart3 = (p) => (
  <svg {...base(p)}><line x1="4" y1="20" x2="20" y2="20" /><rect x="6" y="12" width="3" height="6" /><rect x="11" y="7" width="3" height="11" /><rect x="16" y="4" width="3" height="14" /></svg>
)
export const Search = (p) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
)
