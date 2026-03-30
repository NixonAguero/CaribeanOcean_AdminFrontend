# 05 — Admin UX Patterns

## Modal Pattern (shared across all edit actions)

| Trigger | Entity | Fields |
|---|---|---|
| "Edit page content" | PAGE_CONTENT | Title, Description, Fee, Image |
| "Add reservation" / "Update" | RESERVATION | Start date, End date, Client's name, Image |
| "Update" on room type | ROOM_TYPE | Room Title, Description, Fee, Image |
| "Update" on offer/ad | OFFER / ADVERTISEMENT | Title, Destiny link, Image |

**Layout rules:**
- Centered overlay, white card, border-radius 12px
- ⓘ icon + section title at top
- Image area: current preview + "Upload new image" button below
- "Save changes" button full width at bottom
- On save: show inline success or error message

---

## Table Pattern (shared across all list views)

- Full-width, no horizontal scroll on desktop
- Header background: #F5F0E8
- Alternating row shading optional
- Action buttons per row: dark rounded pills
  - Manage → navigates to detail page or drill-down
  - Update → opens edit modal
  - Delete → confirmation then remove (Reservations only)

---

## Room State Widget

- Location: right side of room list table (RoomAdministration)
- Label: "Room's state"
- Controls: Active (radio) | Inactive (radio)
- Button: "Save changes"
- On save: PATCH /api/rooms/:id/status

---

## Print Pattern

- Trigger: 🖨 Print button
- Action: window.print()
- Scope: full table content of current page
- Used in: HotelState (today's status table), Reservations detail page

---

## Reservation Detail Page

- Route: /admin/reservations/:id
- Layout: centered card, full page
- Content: all RESERVATION fields displayed (no edit)
- ⓘ icon centered above content
- Bottom: ← Return button | 🖨 Print button

---

## Auth Redirect Rules

| Condition | Action |
|---|---|
| Valid token + visits /admin/login | Redirect to /admin |
| No token + visits any /admin/* | Redirect to /admin/login |
| Token expires mid-session | Clear token + redirect to /admin/login |
| Wrong credentials on login | Show inline error, stay on login |