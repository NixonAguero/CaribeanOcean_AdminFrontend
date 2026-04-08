---
name: design-standards
description: Design system and styling rules for the Caribbean Ocean Resort & Spa project. Trigger when the user asks about design tokens, responsiveness, colors, typography, and styling components.
---

# Caribbean Ocean Resort & Spa — Design System

## Overview

This design system defines all visual specifications for the Caribbean Ocean Resort & Spa website, including the public-facing site and the administrative module.

**Brand essence:** Where the jungle meets the sea.
**Location:** Puerto Viejo de Talamanca, Limón, Costa Rica.
**Type:** Luxury eco-resort with sustainable tourism certification ICT Level 4.

---

## Files in this system

To effectively learn the design standards, you MUST read the following markdown files located in the `c:\Users\Dereck\Documents\I Semestre 2026\Ingeniería de Software\Proyecto\CaribeanOcean_ClientFrontend\.agents\skills\desing_standars` directory using the `view_file` tool:

| File | Contents |
|---|---|
| `01-tokens.md` | Colors, typography scale, spacing, border radius, transitions, shadows |
| `02-navbar-hero.md` | Navbar (default + scroll states) and Hero section full specs |
| `03-sections.md` | Welcome/About, Rooms/Rates, Facilities, Offers, Testimonials |
| `04-booking-contact-footer.md` | Booking widget, How to Get Here, Contact section, Footer |
| `05-components.md` | Buttons, form inputs, cards, badges, decorative elements, feedback states |
| `06-responsive-admin.md` | Responsive breakpoints, grid system, mobile adjustments, admin module |

---

## Quick Reference

### Brand Colors
| Color | HEX |
|---|---|
| Ocean Deep (primary) | `#0C3D52` |
| Caribbean Teal (accent) | `#1D9E75` |
| Sand White (background) | `#F5F0E8` |
| Coral Sunset (offers/alerts) | `#D85A30` |
| Deep Night (footer) | `#071E28` |

### Brand Fonts
| Role | Font |
|---|---|
| Titles | Cormorant Garamond |
| UI / Buttons / Labels | Montserrat |
| Body text | Lato |

### Key Measurements
| Element | Value |
|---|---|
| Max content width | 1200px |
| Navbar height | 72px |
| Hero height | 100vh |
| Section padding (desktop) | 100px vertical |
| Base font size | 16px |
| Button border radius | 30px (pill) |
| Card border radius | 8px |

---

## Design Principles

1. **Flat over layered** — No box shadows on cards or containers. Depth is created through color contrast between sections, not elevation.

2. **Photography first** — The hero and booking section use full-bleed photography. The design system serves the images, not the other way around.

3. **Teal as the heartbeat** — `#1D9E75` appears consistently as the accent: decorative lines, labels, icons, CTA buttons, hover states. It ties every section together.

4. **Cormorant for emotion, Montserrat for clarity** — Display headlines use the elegant serif to evoke luxury and nature. UI elements use the clean sans-serif for readability and precision.

5. **Alternating section backgrounds** — Sections alternate between `#FDFCFA`, `#F5F0E8`, and `#0C3D52` to create visual rhythm without borders or dividers.

6. **Responsive from the start** — Every component is designed mobile-first. The public site must be fully functional and beautiful at 320px wide.
