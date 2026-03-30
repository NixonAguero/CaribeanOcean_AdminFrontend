# 06 — Admin Responsive & Print

---

## Breakpoints

| Name | Range | Notes |
|---|---|---|
| Mobile | < 768px | Not a primary target |
| Tablet | 768px – 1024px | Secondary support |
| Desktop | > 1024px | Primary target |

---

## Desktop (> 1024px) — Primary

- Full navbar with all links visible
- Content padding 40px
- Tables full-width
- Forms 2-column layout
- Room type cards 3 in a row
- Page grid 2×2
- Category cards 2 in a row
- Stats card full-width

---

## Tablet (768px – 1024px)

| Element | Adjustment |
|---|---|
| Navbar | Compress link labels, reduce padding to 24px |
| Content padding | 24px |
| Room type cards | 2 in a row (wrap third) |
| Page grid | 2×2 maintained |
| Forms | 1 column |
| Availability form | Stacked fields, full-width |
| Tables | Horizontal scroll if needed |

---

## Mobile (< 768px) — Limited support

| Element | Adjustment |
|---|---|
| Navbar | Logo + hamburger only |
| Content padding | 16px |
| All cards | 1 column |
| Tables | Horizontal scroll |
| Forms | 1 column |
| Modal | width 95vw, padding 24px |

---

## Print Styles

Applied when window.print() is triggered on Today's Status and Reservation Detail.

### Hide on print
- Navbar
- Print button
- Action buttons (Manage / Update / Delete)
- Toast notifications
- Page header

### Print-specific
| Property | Value |
|---|---|
| Body background | white |
| Table background | white |
| Table border | 1px solid `#C9B878` |
| Font | Lato 12px `#1A1A1A` |
| Page title | Montserrat 16px 600 `#0C3D52` mb 16px |
| Date stamp | Lato 11px `#6B6B6B` below title |
| Page margin | 20mm |
| Table width | 100% |
| No page break inside rows | page-break-inside: avoid |