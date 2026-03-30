# 01 — Admin Design Tokens

## Color Palette

### Layout Colors
| Token | HEX | Usage |
|---|---|---|
| `--admin-nav-bg` | `#0C3D52` | Navbar background |
| `--admin-content-bg` | `#F5F0E8` | Page background |
| `--admin-card-bg` | `#FDFCFA` | Cards, modals, forms, tables |
| `--admin-card-dark` | `#071E28` | Dashboard stats card |
| `--admin-table-header` | `#F5F0E8` | Table header row |
| `--admin-topbar-bg` | `#FDFCFA` | Top bar background |
| `--admin-topbar-border` | `#C9B878` at 40% | Top bar bottom border |

### Brand Colors (same as public site)
| Token | HEX | Usage |
|---|---|---|
| `--color-ocean-deep` | `#0C3D52` | Primary — buttons, navbar |
| `--color-caribbean-teal` | `#1D9E75` | Active states, save buttons, accents |
| `--color-sand-white` | `#F5F0E8` | Backgrounds, table headers |
| `--color-pearl-white` | `#FDFCFA` | Cards, modals |
| `--color-deep-night` | `#071E28` | Dark card background |
| `--color-coral-sunset` | `#D85A30` | Delete, errors, alerts |
| `--color-golden-sand` | `#C9B878` | Input borders, dividers |

### Text Colors
| Token | HEX | Usage |
|---|---|---|
| `--color-text-primary` | `#1A1A1A` | Table data, body |
| `--color-text-secondary` | `#6B6B6B` | Captions, subtitles |
| `--color-text-light` | `#FDFCFA` | Text on dark backgrounds |
| `--color-text-muted-light` | `#A8C4CE` | Navbar secondary text |

### Dashboard Stat Bar Colors
| Token | HEX | Stat |
|---|---|---|
| `--stat-total` | `#D85A30` | Total reservations |
| `--stat-premium` | `#1D9E75` | Premium rooms |
| `--stat-standard` | `#6B4C9A` | Standard rooms |
| `--stat-junior` | `#1A6FC4` | Junior rooms |
| `--stat-revenue` | `#1A6FC4` | Total revenue |

### Status Badge Colors
| Status | Background | Text |
|---|---|---|
| Available / Active | `#E1F5EE` | `#0F6E56` |
| Reserved | `#E6F1FB` | `#185FA5` |
| Occupied | `#FAEEDA` | `#854F0B` |
| Cancelled / Inactive | `#FAECE7` | `#993C1D` |

---

## Typography

### Font Families (same import as public site)
| Token | Font | Usage |
|---|---|---|
| `--font-display` | Cormorant Garamond | Page titles, section headers |
| `--font-ui` | Montserrat | Labels, buttons, table headers, nav |
| `--font-body` | Lato | Table data, body text, inputs |
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
```

### Admin Type Scale
| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Page title (top bar) | Cormorant Garamond | 24px | 600 | `#0C3D52` |
| Section title (H2) | Cormorant Garamond | 32px | 600 | `#0C3D52` |
| Card title | Montserrat | 16px | 600 | `#0C3D52` |
| Table header | Montserrat | 12px | 600 | `#0C3D52` |
| Table body | Lato | 14px | 400 | `#1A1A1A` |
| Table secondary | Lato | 13px | 400 | `#6B6B6B` |
| Form label | Montserrat | 11px | 600 | `#0C3D52` |
| Input text | Lato | 14px | 400 | `#1A1A1A` |
| Action button | Montserrat | 13px | 600 | `#FDFCFA` |
| Navbar link | Montserrat | 13px | 500 | `#FDFCFA` |
| Stat number | Cormorant Garamond | 28px | 600 | `#FDFCFA` |
| Stat label | Montserrat | 12px | 400 | `#A8C4CE` |
| Badge text | Montserrat | 11px | 600 | (per status) |

---

## Spacing Scale (same as public site)
| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |

---

## Border Radius
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Inputs, badges, table cells |
| `--radius-md` | 8px | Tables, cards, forms |
| `--radius-lg` | 12px | Modals |
| `--radius-pill` | 30px | Action buttons (Manage/Update/Delete) |
| `--radius-circle` | 50% | User avatar |

---

## Transitions
| Token | Value | Usage |
|---|---|---|
| `--transition-fast` | 150ms ease | Hover on links, badges |
| `--transition-base` | 250ms ease | Buttons, inputs |
| `--transition-slow` | 300ms ease | Modals open/close |

---

## Shadows
| Token | Value | Usage |
|---|---|---|
| `--shadow-none` | none | Cards, tables (flat design) |
| `--shadow-modal` | `0 8px 32px rgba(7,30,40,0.18)` | Modals only |
| `--shadow-focus` | `0 0 0 3px rgba(29,158,117,0.3)` | Input and button focus ring |