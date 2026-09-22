// Stroke icons, 24 x 24, drawn for this site. currentColor throughout.
const P = {
  pulse: '<path d="M3 12h4l2-5 4 10 2.5-6 1.5 3h4"/>',
  drop: '<path d="M12 3.5c-3 4.2-6 7.3-6 10.6a6 6 0 0 0 12 0c0-3.3-3-6.4-6-10.6Z"/><path d="M9.2 14.4a3 3 0 0 0 2.6 2.8"/>',
  tube: '<path d="M9 3h6M10 3v13.5a2 2 0 0 0 4 0V3"/><path d="M10 11h4"/>',
  thermo: '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z"/><path d="M12 9v7"/>',
  pill: '<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="m9.4 8.6 5.2 6.8"/>',
  bug: '<circle cx="12" cy="12" r="4.2"/><path d="M12 3v4.8M12 16.2V21M3 12h4.8M16.2 12H21M5.6 5.6l3.4 3.4M15 15l3.4 3.4M18.4 5.6 15 9M9 15l-3.4 3.4"/>',
  bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z"/>',
  cup: '<path d="M6 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 4v1.5M11.5 3v2.5M15 4v1.5"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"/>',
  chat: '<path d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4Z"/><path d="M8 9.5h8M8 12.5h5"/>',
  ear: '<path d="M7 9.5a5 5 0 1 1 10 0c0 3-2.8 3.8-3.4 6.6A3 3 0 0 1 8 16"/><path d="M10 10a2 2 0 1 1 3.6 1.2"/>',
  glasses: '<circle cx="7" cy="14" r="3.5"/><circle cx="17" cy="14" r="3.5"/><path d="M10.5 14h3M3.5 13l1.5-6h2.5M20.5 13 19 7h-2.5"/>',
  room: '<path d="M3 19V9.5M21 19v-5.5H9V11H5.5a2.5 2.5 0 0 0-2.5 2.5M3 16h18"/><circle cx="6.5" cy="8" r="1.8"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>',
  clipboard: '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3.8A.8.8 0 0 1 9.8 3h4.4a.8.8 0 0 1 .8.8v.7"/><path d="m8.5 11 1.5 1.5 3-3M8.5 16.5l1.5 1.5 3-3M15 11h1M15 16.5h1"/>',
  pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  team: '<circle cx="12" cy="7" r="2.6"/><circle cx="5.5" cy="9.5" r="2.1"/><circle cx="18.5" cy="9.5" r="2.1"/><path d="M7.5 19a4.5 4.5 0 0 1 9 0M2.5 17.5a3 3 0 0 1 4.6-2.6M21.5 17.5a3 3 0 0 0-4.6-2.6"/>',
  leaflet: '<path d="M4 6.5 9 4.5l6 2 5-2v13l-5 2-6-2-5 2v-13Z"/><path d="M9 4.5v13M15 6.5v13"/>',
  shield: '<path d="M12 3 19 6v5.5c0 4.2-3 7.4-7 9.5-4-2.1-7-5.3-7-9.5V6l7-3Z"/><path d="m9 12 2 2 4-4.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  alert: '<path d="M12 4 2.8 19.5h18.4L12 4Z"/><path d="M12 10v4.2M12 17h.01"/>',
  play: '<path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14"/>',
  arrow: '<path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5"/>',
  arrowDown: '<path d="M12 4.5v14M6.5 13l5.5 5.5 5.5-5.5"/>',
  cc: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M10.5 10.2a2.3 2.3 0 1 0 0 3.6M17 10.2a2.3 2.3 0 1 0 0 3.6"/>',
  transcript: '<path d="M6 3.5h8.5L19 8v12.5H6Z"/><path d="M14 3.5V8h5M9 12h7M9 15.5h7M9 9h3"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  back: '<path d="M12 5a7 7 0 1 1-6.6 9.3"/><path d="M4 5v5h5"/><text x="12" y="15.2" text-anchor="middle" font-size="6.4" font-weight="700" fill="currentColor" stroke="none" font-family="Arial, sans-serif">10</text>',
  fwd: '<path d="M12 5a7 7 0 1 0 6.6 9.3"/><path d="M20 5v5h-5"/><text x="12" y="15.2" text-anchor="middle" font-size="6.4" font-weight="700" fill="currentColor" stroke="none" font-family="Arial, sans-serif">10</text>',
  file: '<path d="M6 3.5h8.5L19 8v12.5H6Z"/><path d="M14 3.5V8h5"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5.5-5 4 3.5 2.5-2 4.5 3.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  pin: '<path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 0 0-13 0c0 5 6.5 11 6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>',
  repeat: '<path d="M4 11a7 7 0 0 1 12-4.9L18 8M18 4v4h-4M20 13a7 7 0 0 1-12 4.9L6 16M6 20v-4h4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  bed: '<path d="M3 18V7M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="1.8"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>',
  printer: '<path d="M7 9V3.5h10V9M7 17H5a1.5 1.5 0 0 1-1.5-1.5V10.5A1.5 1.5 0 0 1 5 9h14a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 19 17h-2"/><rect x="7" y="14" width="10" height="6.5" rx="1"/>',
  flag: '<path d="M5 21V4M5 4.5h11l-2 4 2 4H5"/>',
  layers: '<path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"/>',
  sliders: '<path d="M5 20v-6M5 10V4M12 20v-8M12 8V4M19 20v-4M19 12V4M3 14h4M10 8h4M17 16h4"/>',
};

export function icon(name, cls = '', label = '') {
  const body = P[name];
  if (!body) throw new Error('Unknown icon: ' + name);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`;
}
export const iconNames = Object.keys(P);
