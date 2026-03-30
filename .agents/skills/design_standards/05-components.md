# 05 — Admin Components

---

## Action Buttons (Manage / Update / Delete)

### Shared Style
| Property | Value |
|---|---|
| Font | Montserrat 12px 600 uppercase letter-spacing 0.5px |
| Padding | 8px 16px |
| Border radius | 30px |
| Border | none |
| Transition | 250ms ease |

### Variants
| Variant | Background | Text | Hover Background |
|---|---|---|---|
| Manage | `#0C3D52` | `#FDFCFA` | `#071E28` |
| Update | `#0C3D52` | `#FDFCFA` | `#071E28` |
| Delete | `#0C3D52` | `#FDFCFA` | `#D85A30` |

### As text links (inside table cells)
| Variant | Color | Hover |
|---|---|---|
| View / Manage | `#1D9E75` | underline |
| Edit / Update | `#0C3D52` | underline |
| Delete | `#D85A30` | underline |
Separator between links: `·` color `#C9B878`

---

## Primary / Secondary / Ghost Buttons (same as public site)

| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `#1D9E75` | `#FFFFFF` | none |
| Secondary | transparent | `#0C3D52` | 1px `#0C3D52` |
| Ghost | transparent | `#FFFFFF` | 1px `#FFFFFF` |

All: Montserrat 13px 600 uppercase, padding 12px 28px, border-radius 30px, transition 250ms

---

## Admin Tables

| Property | Value |
|---|---|
| Background | `#FDFCFA` |
| Border radius | 8px |
| Border | 1px solid `#F5F0E8` |
| Overflow | hidden |
| Width | 100% |

### Table Header
| Property | Value |
|---|---|
| Background | `#F5F0E8` |
| Font | Montserrat 12px 600 `#0C3D52` uppercase letter-spacing 1px |
| Padding | 14px 20px |
| Border bottom | 1px solid `#E8E4DC` |

### Table Row
| Property | Value |
|---|---|
| Padding | 14px 20px |
| Border bottom | 1px solid `#F5F0E8` |
| Hover background | `#F5F0E8` |
| Transition | background 150ms ease |
| Font | Lato 14px 400 `#1A1A1A` |
| Secondary text | Lato 13px 400 `#6B6B6B` |

### Last row
| Property | Value |
|---|---|
| Border bottom | none |

---

## Admin Forms

| Property | Value |
|---|---|
| Background | `#FDFCFA` |
| Border radius | 8px |
| Padding | 32px |
| Field layout | 2 columns desktop / 1 column mobile |
| Field gap | 24px |

### Field Label
| Property | Value |
|---|---|
| Font | Montserrat 11px 600 `#0C3D52` uppercase letter-spacing 1px |
| Margin bottom | 6px |

### Text Input
| Property | Value |
|---|---|
| Height | 48px |
| Background | `#F5F0E8` |
| Border | 1px solid `#C9B878` |
| Border radius | 4px |
| Padding | 0 16px |
| Font | Lato 14px 400 `#1A1A1A` |
| Placeholder | Lato 14px 400 `#6B6B6B` |
| Focus border | `#1D9E75` |
| Focus shadow | `0 0 0 3px rgba(29,158,117,0.2)` |
| Error border | `#D85A30` |

### Textarea
Same as text input with: padding 12px 16px, min-height 100px, resize vertical.

### Select / Dropdown
Same as text input with: custom chevron-down 16px `#0C3D52`, appearance none.

### Date Picker
Same as text input with: calendar icon 16px `#1D9E75` right side.

### Form Actions Bar
| Property | Value |
|---|---|
| Background | `#F5F0E8` |
| Padding | 20px 32px |
| Border top | 1px solid `#C9B878` 40% |
| Border radius | 0 0 8px 8px |
| Layout | Right-aligned, gap 12px |

---

## Modal Shell

| Property | Value |
|---|---|
| Overlay background | rgba(7,30,40,0.5) |
| Card background | `#FDFCFA` |
| Card border radius | 12px |
| Card padding | 40px |
| Card max width | 520px |
| Card width | 90vw |
| Shadow | `0 8px 32px rgba(7,30,40,0.18)` |
| Open animation | scale 0.96 → 1 + opacity 0 → 1, 250ms ease-out |
| Close animation | scale 1 → 0.96 + opacity 1 → 0, 200ms ease-in |

### Modal Header
| Element | Style |
|---|---|
| ⓘ icon | 20px circle `#F5F0E8`, icon color `#0C3D52`, display inline-block mr 8px |
| Title | Montserrat 14px 600 `#0C3D52` |
| Margin bottom | 24px |
| Bottom divider | 1px `#F5F0E8` mb 24px |

---

## Status Badges

| Status | Background | Text Color | Font |
|---|---|---|---|
| Available / Active | `#E1F5EE` | `#0F6E56` | Montserrat 11px 600 |
| Reserved | `#E6F1FB` | `#185FA5` | Montserrat 11px 600 |
| Occupied | `#FAEEDA` | `#854F0B` | Montserrat 11px 600 |
| Cancelled / Inactive | `#FAECE7` | `#993C1D` | Montserrat 11px 600 |

All badges: padding 4px 12px, border-radius 30px, uppercase, letter-spacing 0.5px.

---

## Feedback States

### Success Toast
| Property | Value |
|---|---|
| Background | `#E1F5EE` |
| Border left | 3px solid `#1D9E75` |
| Icon | checkmark 16px `#1D9E75` |
| Font | Lato 14px 400 `#085041` |
| Border radius | 4px |
| Position | Bottom right, 24px from edges |
| Duration | 4000ms auto-dismiss |

### Error Toast
| Property | Value |
|---|---|
| Background | `#FAECE7` |
| Border left | 3px solid `#D85A30` |
| Icon | x-circle 16px `#D85A30` |
| Font | Lato 14px 400 `#712B13` |
| Border radius | 4px |
| Position | Bottom right, 24px from edges |
| Duration | 5000ms auto-dismiss |

### Inline Field Error
| Property | Value |
|---|---|
| Font | Lato 12px 400 `#D85A30` |
| Icon | alert-circle 12px left of text |
| Margin top | 4px |
| Input border | changes to `#D85A30` |

### Loading Skeleton
| Property | Value |
|---|---|
| Background | `#F5F0E8` |
| Animation | shimmer left→right 1.5s ease infinite |
| Border radius | same as element |

---

## Image Upload Widget

| Property | Value |
|---|---|
| Preview area | width 100% height 140px object-fit cover border-radius 4px border 1px `#C9B878` |
| Placeholder | `#F5F0E8` background, image icon 32px `#C9B878` centered |
| "Upload new image" button | Secondary button, full-width, mt 8px |
| Accepted formats | JPG / GIF / PNG |
| Format error | Inline field error style |