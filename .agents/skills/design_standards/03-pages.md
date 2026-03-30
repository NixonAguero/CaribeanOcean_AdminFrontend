# 03 — Admin Pages (Dashboard + Manage Pages + Reservations)

---

## Dashboard (`/admin`)

### Stats Card
| Property | Value |
|---|---|
| Background | `#071E28` |
| Border radius | 8px |
| Padding | 32px |
| Label "Estadisticas del mes" | Montserrat 12px 600 `#A8C4CE` uppercase letter-spacing 2px mb 24px |

### Stat Row
| Property | Value |
|---|---|
| Layout | label left — bar center — number right |
| Row gap | 16px |
| Label font | Lato 14px 400 `#A8C4CE` |
| Number font | Cormorant Garamond 24px 600 `#FDFCFA` |
| Bar height | 6px |
| Bar background | `#FDFCFA` 10% opacity (track) |
| Bar border radius | 30px |
| Bar fill | Per `--stat-*` token |
| Bar transition | width 600ms ease on load |

### Stat Bar Colors
| Stat | Color |
|---|---|
| Total de habitaciones reservadas | `#D85A30` |
| Habitaciones premium reservadas | `#1D9E75` |
| Habitaciones estándares reservadas | `#6B4C9A` |
| Habitaciones junior reservadas | `#1A6FC4` |
| Total de ganancia obtenida | `#1A6FC4` |

---

## Manage Pages (`/admin/pages`)

### Page Grid
| Property | Value |
|---|---|
| Layout | 2×2 grid |
| Gap | 24px |
| Max width | 800px |

### Page Card
| Property | Value |
|---|---|
| Background | `#FDFCFA` |
| Border radius | 8px |
| Padding | 0 (image top, content below) |
| Border | 1px solid `#F5F0E8` |
| Hover border | 1px solid `#C9B878` |
| Transition | 250ms ease |

| Element | Style |
|---|---|
| Thumbnail image | height 160px, object-fit cover, border-radius 8px 8px 0 0 |
| Page name | Montserrat 14px 600 `#0C3D52` padding 16px 20px 8px |
| "Edit page content" button | Dark action pill, full width bottom of card |

### Edit Page Modal
| Property | Value |
|---|---|
| Overlay | rgba(7,30,40,0.5) |
| Card background | `#FDFCFA` |
| Card border radius | 12px |
| Card padding | 40px |
| Card max width | 520px |
| Card width | 90vw |
| Shadow | `--shadow-modal` |

| Element | Style |
|---|---|
| ⓘ icon + "Title" | Montserrat 14px 600 `#0C3D52` mb 24px |
| Title input | Full-width, admin input |
| Description input | Full-width, textarea min-height 100px |
| Fee input | Full-width, admin input |
| Image preview | width 100% height 140px object-fit cover border-radius 4px mb 8px |
| "Upload new image" button | Secondary button style full-width |
| "Save changes" button | Primary button style full-width mt 24px |
| Gap between fields | 20px |

---

## Manage Reservations (`/admin/reservations`)

### Page Header Actions
| Property | Value |
|---|---|
| "Add reservation" button | Primary button, top left |
| Position | Above table, mb 20px |

### Reservation Table
Full admin table pattern — see `05-components.md`.

| Column | Content |
|---|---|
| Code | VARCHAR — e.g. WIRNDAYU4817FD |
| Client | client_name + client_lastname |
| Room | room number + type |
| Check-in | date formatted |
| Check-out | date formatted |
| Total | total_amount formatted as $X,XXX |
| Actions | Manage · Update · Delete |

### Update / Add Reservation Modal
| Property | Value |
|---|---|
| Same modal shell as Edit Page | border-radius 12px, padding 40px, max-width 520px |

| Element | Style |
|---|---|
| ⓘ icon + "Start date" | Montserrat 14px 600 `#0C3D52` mb 24px |
| Start date input | Date picker, full-width |
| End date input | Date picker, full-width |
| Client's name input | Text input, full-width |
| Image preview + upload | Same as page modal |
| "Save changes" button | Primary, full-width |

### Reservation Detail Page (`/admin/reservations/:id`)
| Property | Value |
|---|---|
| Layout | Centered card, max-width 680px |
| Card background | `#FDFCFA` |
| Card border radius | 8px |
| Card padding | 48px |

| Element | Style |
|---|---|
| ⓘ icon | 48px circle `#F5F0E8` centered, icon `#0C3D52` mb 16px |
| "The client's reservation information will appear here" | Lato 14px 400 `#6B6B6B` centered mb 32px |
| Reservation data rows | label Montserrat 11px 600 `#6B6B6B` uppercase / value Lato 14px 400 `#1A1A1A` |
| Row divider | 1px `#F5F0E8` |
| Bottom actions | ← Return (Secondary button) + 🖨 Print (Secondary button) |
| Actions gap | 12px, right-aligned |