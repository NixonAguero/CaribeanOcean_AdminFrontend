# Caribbean Ocean Resort & Spa — Admin Design System

## Overview

This design system defines all visual specifications for the administrative module of Caribbean Ocean Resort & Spa.

**Access:** /admin (protected routes, JWT auth)
**Users:** Hotel administrators only
**Scope:** Login, Dashboard, Page Management, Reservations, Rooms, Hotel Status, Availability, Offers & Advertising

---

## Files in this system

| File | Contents |
|---|---|
| `01-tokens.md` | Admin color tokens, typography scale, spacing, shadows |
| `02-layout.md` | Navbar, sidebar, top bar, page layout structure |
| `03-pages.md` | Login, Dashboard, Manage Pages, Manage Reservations |
| `04-pages-2.md` | Manage Rooms, Hotel Status, Room Availability, Offers & Advertising |
| `05-components.md` | Tables, modals, forms, badges, action buttons, widgets |
| `06-responsive.md` | Breakpoints, responsive behavior, print styles |

---

## Quick Reference

### Admin Colors
| Color | HEX | Usage |
|---|---|---|
| Ocean Deep | `#0C3D52` | Navbar, sidebar, action buttons |
| Deep Night | `#071E28` | Dashboard stats card |
| Sand White | `#F5F0E8` | Page background, table headers |
| Pearl White | `#FDFCFA` | Cards, modals, forms, tables |
| Caribbean Teal | `#1D9E75` | Active states, save buttons, accents |
| Coral Sunset | `#D85A30` | Delete actions, error states, stat bar |

### Admin Fonts
| Role | Font |
|---|---|
| Page titles | Cormorant Garamond |
| UI / Labels / Buttons / Tables | Montserrat |
| Body / Table data / Inputs | Lato |

### Key Measurements
| Element | Value |
|---|---|
| Navbar height | 72px |
| Content background | `#F5F0E8` |
| Content padding | 40px |
| Max content width | 1200px |
| Table border radius | 8px |
| Modal border radius | 12px |
| Action button border radius | 30px (pill) |
| Input border radius | 4px |

---

## Design Principles

1. **Utility over decoration** — The admin module prioritizes clarity and efficiency. No decorative photography, no hero sections. Every element exists to support a task.

2. **Ocean Deep as the anchor** — `#0C3D52` defines the navbar and action buttons. It grounds the interface with the same brand color as the public site while signaling authority.

3. **Teal for confirmation** — `#1D9E75` is reserved for save actions, active nav states, and success feedback. When the user sees teal, something positive happened or can happen.

4. **Coral for caution** — `#D85A30` marks delete actions, error states, and the total-reservations stat bar. It demands attention without being aggressive.

5. **Flat and scannable** — Tables use alternating hover states, not row borders or shadows. Information density is high; visual noise is low.

6. **Desktop-first** — Unlike the public site, the admin module is designed primarily for desktop use. Tablet support is secondary. Mobile is not a target environment.