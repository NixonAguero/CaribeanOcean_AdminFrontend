# 01 — Admin Module Overview

## Module Identity
- **Access URL:** /admin (protected — redirect to /admin/login if unauthenticated)
- **Users:** Hotel administrators (ADMIN_USER entity)
- **Auth:** JWT — credentials validated against ADMIN_USER table (username + password_hash)
- **Entry point:** /admin/login → on success → /admin (Dashboard)
- **Session logout:** Clears token, redirects to /admin/login
- **Route protection:** All /admin/* routes require valid token except /admin/login

---

## Pages Inventory

| Route | React Module | Description |
|---|---|---|
| /admin/login | Loggin/ | Split-screen login form |
| /admin | Home/ | Dashboard with monthly stats |
| /admin/pages | ModifyPages/ | 2×2 grid of editable public pages |
| /admin/reservations | Reservations/ | Reservation table + modals |
| /admin/rooms | RoomAdministration/ | Room type cards + room list |
| /admin/status | HotelState/ | Today's room status table + print |
| /admin/availability | RoomAvailability/ | Date range search + results |
| /admin/offers | Adds/ | Advertisement + Offers management |

---

## Sprint Schedule (same as project)

| Date | Sprint |
|---|---|
| 21 MAR 2026 | Sprint 0 — Planning + architecture |
| 07 APR 2026 | Sprint 1 |
| 21 APR 2026 | Sprint 2 |
| 09 MAY 2026 | Sprint 3 — Retrospective |
| 02 JUN 2026 | Sprint 4 |
| 27 JUN 2026 | Sprint 5 — Final delivery |