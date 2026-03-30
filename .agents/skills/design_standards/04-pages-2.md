# 04 — Admin Pages (Rooms + Status + Availability + Offers)

---

## Manage Rooms (`/admin/rooms`)

### Room Type Cards
| Property | Value |
|---|---|
| Layout | 3 cards in a row, equal width |
| Gap | 24px |

### Room Type Card
| Property | Value |
|---|---|
| Background | `#FDFCFA` |
| Border radius | 8px |
| Border | 1px solid `#F5F0E8` |
| Overflow | hidden |

| Element | Style |
|---|---|
| Image | height 200px object-fit cover width 100% |
| Room type name | Montserrat 16px 600 `#0C3D52` padding 16px 20px 12px |
| Actions row | padding 0 20px 20px, gap 8px |
| Manage button | Dark action pill |
| Update button | Dark action pill |

### Update Room Type Modal
Same modal shell as other modals.

| Element | Style |
|---|---|
| ⓘ icon + "Room Title" | Montserrat 14px 600 `#0C3D52` mb 24px |
| Room Title input | Text, full-width |
| Description textarea | min-height 100px full-width |
| Fee input | Text, full-width |
| Image preview + upload | Same pattern |
| "Save changes" button | Primary, full-width |

### Room List Table (after "Manage")
Full admin table pattern.

| Column | Content |
|---|---|
| Room number | INT |
| Status | Active / Inactive badge |
| Actions | Manage button |

### Room State Widget
| Property | Value |
|---|---|
| Position | Right of table, card |
| Background | `#FDFCFA` |
| Border radius | 8px |
| Border | 1px solid `#F5F0E8` |
| Padding | 24px |
| Max width | 240px |

| Element | Style |
|---|---|
| Label "Room's state" | Montserrat 12px 600 `#0C3D52` uppercase letter-spacing 1px mb 16px |
| Active radio | Label Lato 14px 400 `#1A1A1A` |
| Inactive radio | Label Lato 14px 400 `#1A1A1A` |
| Radio accent color | `#1D9E75` |
| Gap between radios | 12px |
| "Save changes" button | Primary, full-width mt 20px |

---

## Today's Status (`/admin/status`)

### Status Table
Full admin table pattern.

| Column | Content |
|---|---|
| Room number | INT |
| Room type | name |
| Status | AVAILABLE / OCCUPIED / RESERVED badge |
| Check-in | date or — |
| Check-out | date or — |
| Client | name or — |

### Status Logic (computed)
| Status | Condition |
|---|---|
| OCCUPIED | check_in = today |
| RESERVED | check_in > today |
| AVAILABLE | no active reservation or room inactive |

### Print Button
| Property | Value |
|---|---|
| Position | Bottom center, mt 32px |
| Icon | 🖨 16px left of text |
| Style | Secondary button |
| Action | window.print() |
| Print scope | Full table, hide navbar and print button |

---

## Room Availability (`/admin/availability`)

### Search Form
| Property | Value |
|---|---|
| Background | `#FDFCFA` |
| Border radius | 8px |
| Padding | 32px |
| Layout | 3 fields in a row + Search button |
| Gap | 16px |
| Align items | flex-end |

| Element | Style |
|---|---|
| Start Date | Date picker, full-width |
| End Date | Date picker, full-width |
| Room Type | Select dropdown, full-width |
| "Search" button | Primary button, height 48px |

### Results Table
Full admin table pattern, shown below form after search.

| Column | Content |
|---|---|
| Room number | INT |
| Room type | name |
| Daily rate | $X,XXX |
| Status | AVAILABLE badge |

---

## Offers and Advertising (`/admin/offers`)

### Category Cards
| Property | Value |
|---|---|
| Layout | 2 cards side by side |
| Gap | 24px |
| Max width | 700px |

### Category Card
Same card structure as Room Type Card — image + name + Manage + Update buttons.

| Card | Name |
|---|---|
| Left | Advertisement |
| Right | Offers |

### Offer / Ad List Table
Full admin table pattern, shown after "Manage".

| Column (Offers) | Content |
|---|---|
| Name | offer name |
| Discount | X% |
| Room type | type name |
| Valid | start_date → end_date |
| Actions | Update button |

| Column (Ads) | Content |
|---|---|
| Image preview | 60px × 40px thumbnail |
| Destination link | URL |
| Status | Active badge |
| Actions | Update button |

### Note on Offers
Offers do NOT have an active toggle inside the modal. All offers always link to the client-facing offers section.

### Update Offer / Ad Modal
Same modal shell as other modals.

| Element | Style |
|---|---|
| ⓘ icon + "Title" | Montserrat 14px 600 `#0C3D52` mb 24px |
| Title input | Text, full-width |
| Destiny link input | URL input, full-width |
| Image preview + upload | Same pattern |
| "Save changes" button | Primary, full-width |