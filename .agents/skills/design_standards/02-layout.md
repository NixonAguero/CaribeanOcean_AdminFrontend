# 02 — Admin Layout

## Overall Structure
```
┌─────────────────────────────────────────┐
│              NAVBAR (72px)              │
├─────────────────────────────────────────┤
│                                         │
│         CONTENT AREA (#F5F0E8)          │
│           max-width 1200px              │
│             padding 40px               │
│                                         │
└─────────────────────────────────────────┘
```

---

## Navbar

### Layout
| Property | Value |
|---|---|
| Height | 72px |
| Position | Fixed, top 0, full width |
| Background | `#0C3D52` |
| Z-index | 100 |
| Padding horizontal | 40px desktop / 24px tablet |
| Max width | 1200px centered |

### Links (left → right)
Logo | Manage pages | Manage reservations | Manage Rooms | Today's status | Room availability | Offers and advertising | Username (avatar) | Logout

### Typography
| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Logo name | Cormorant Garamond | 20px | 600 | `#FDFCFA` |
| Nav links | Montserrat | 13px | 500 | `#A8C4CE` |
| Active link | Montserrat | 13px | 500 | `#FDFCFA` |
| Username | Lato | 13px | 400 | `#A8C4CE` |

### Active Link State
| Property | Value |
|---|---|
| Text color | `#FDFCFA` |
| Bottom border | 2px solid `#1D9E75` |
| Transition | 150ms ease |

### Hover State
| Property | Value |
|---|---|
| Text color | `#FDFCFA` |
| Transition | 150ms ease |

### User Area (right side)
| Element | Style |
|---|---|
| Avatar | 36px circle, initials Montserrat 13px `#FDFCFA`, background `#1D9E75` |
| Username label | Lato 13px 400 `#A8C4CE` |
| Logout icon | 20px → icon, color `#A8C4CE`, hover `#D85A30`, transition 150ms |

---

## Content Area

| Property | Value |
|---|---|
| Background | `#F5F0E8` |
| Padding | 40px |
| Min height | calc(100vh - 72px) |
| Max width | 1200px centered |
| Margin top | 72px (navbar offset) |

---

## Page Header (inside content area)

| Element | Font | Size | Weight | Color | Extra |
|---|---|---|---|---|---|
| Page title | Cormorant Garamond | 32px | 600 | `#0C3D52` | margin-bottom 8px |
| Page subtitle | Lato | 14px | 400 | `#6B6B6B` | margin-bottom 32px |
| Divider below header | 1px | — | — | `#C9B878` 40% | margin-bottom 32px |

---

## Login Page Layout

| Property | Value |
|---|---|
| Layout | Full-screen split — 50% / 50% |
| Left half background | `#071E28` |
| Right half | Hotel hero image (object-fit cover) |
| Left half padding | 64px |
| Vertical alignment | Center |

### Left Half Content
| Element | Style |
|---|---|
| H1 "Login" | Cormorant Garamond 48px 700 `#FDFCFA` |
| Subtitle | Lato 14px 400 `#A8C4CE` mb 40px |
| Username input | Full-width, admin input style |
| Password input | Full-width, eye toggle icon right |
| Login button | Full-width, primary button style |
| "Don't have an account?" | Lato 13px 400 `#A8C4CE` |
| Sign up button | Ghost button style, small |
| Gap between fields | 20px |

### Right Half Content
| Element | Style |
|---|---|
| Overlay | `#0C3D52` 40% opacity |
| Text "Welcome to Caribbean Ocean" | Cormorant Garamond 56px 700 `#FDFCFA` centered |