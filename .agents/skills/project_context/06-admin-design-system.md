# 06 — Admin Design System

## Layout
- Navbar: 72px fixed top, background #0C3D52
- Content area: background #F5F0E8, padding 40px
- Max content width: 1200px centered
- Dark stats card: background #071E28

## Color Tokens (admin-specific)

| Token | HEX | Usage |
|---|---|---|
| --admin-nav-bg | #0C3D52 | Navbar background |
| --admin-nav-text | #FDFCFA | Navbar links and icons |
| --admin-content-bg | #F5F0E8 | Page background |
| --admin-card-bg | #FDFCFA | Modal and card backgrounds |
| --admin-card-dark | #071E28 | Dashboard stats card |
| --admin-table-header | #F5F0E8 | Table header row |
| --admin-btn-bg | #0C3D52 | Action buttons (Manage/Update/Delete) |
| --admin-btn-text | #FDFCFA | Action button text |
| --stat-total | #D85A30 | Total reservations bar |
| --stat-premium | #1D9E75 | Premium rooms bar |
| --stat-standard | #6B4C9A | Standard rooms bar |
| --stat-junior | #1A6FC4 | Junior rooms bar |
| --stat-revenue | #1A6FC4 | Total revenue bar |

## Typography (same as public site)

| Element | Font | Size | Weight |
|---|---|---|---|
| Page title (H1) | Cormorant Garamond | 38px | 600 |
| Section title (H2) | Cormorant Garamond | 28px | 600 |
| Card title | Montserrat | 16px | 600 |
| Table header | Montserrat | 12px | 600 |
| Table body | Lato | 14px | 400 |
| Labels / inputs | Montserrat | 13px | 500 |
| Buttons | Montserrat | 13px | 600 uppercase |
| Stat number | Cormorant Garamond | 28px | 600 |

## Buttons

| Variant | Background | Text | Usage |
|---|---|---|---|
| Action (dark pill) | #0C3D52 | #FDFCFA | Manage / Update / Delete |
| Primary | #1D9E75 | #FFFFFF | Save changes, Login, Search |
| Ghost | transparent | #0C3D52 | Cancel, Return |

All buttons: border-radius 30px, padding 10px 24px, Montserrat 13px 600

## Inputs / Form Fields

- Border: 1px solid #C9B878 (gold)
- Border-radius: 4px
- Background: #FFFFFF
- Focus border: #1D9E75 (teal)
- Font: Lato 14px

## Modal

- Overlay: rgba(0,0,0,0.5)
- Card background: #FDFCFA
- Border-radius: 12px
- Padding: 32px
- Max-width: 480px

## Responsive

| Breakpoint | Behavior |
|---|---|
| Desktop > 1024px | Full navbar + sidebar layout |
| Tablet 768–1024px | Compressed navbar, stacked cards |
| Mobile < 768px | Admin not optimized for mobile (desktop-only stated in spec) |