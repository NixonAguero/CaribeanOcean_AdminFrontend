# 04 — Admin Pages & Mockup Inventory

## Navbar (present on all admin pages)
- **Links:** Logo | Manage pages | Manage reservations | Manage Rooms | Today's status | Room availability | Offers and advertising | Username (avatar) | Logout
- **Active:** underlined link for current section
- **Username:** pulled from session (ADMIN_USER.name)

---

## Page 1 — Login (`/admin/login`)
**Layout:** Full-screen split (two halves)

**Left half (dark background #071E28):**
- H1: "Login"
- Subtitle: "Enter your account details"
- Username input
- Password input (eye toggle — show/hide)
- "Login" button (full width)
- "Don't have an account?" + "Sign up" button

**Right half:**
- Hotel hero image as background
- "Welcome to Caribbean Ocean" large overlay text

---

## Page 2 — Dashboard (`/admin`)
**Content:** "Estadisticas del mes" — dark card (#071E28)

**Stats with horizontal progress bars:**
| Stat | Bar Color |
|---|---|
| Total de habitaciones reservadas | #D85A30 (coral) |
| Habitaciones premium reservadas | #1D9E75 (teal) |
| Habitaciones estándares reservadas | #6B4C9A (purple) |
| Habitaciones junior reservadas | #1A6FC4 (blue) |
| Total de ganancia obtenida | #1A6FC4 (blue) |

Each row: label + colored bar + numeric value right-aligned.

---

## Page 3 — Manage Pages (`/admin/pages`)
**View — Page Grid:**
- 2×2 grid of cards
- Cards: Home | About Us | Facilities | How to get there
- Each card: thumbnail image + page name + "Edit page content" button (dark)

**On "Edit page content" → Modal:**
- ⓘ icon + Title field
- Description field
- Fee field
- Image preview + "Upload new image" button
- "Save changes" button

---

## Page 4 — Manage Reservations (`/admin/reservations`)
**View — Reservation Table:**
- "Add reservation" button (top left)
- Full-width table with all reservations
- Per row: Manage | Update | Delete buttons

**On "Update" → Modal:**
- ⓘ icon + Start date / End date
- Client's name
- Image preview + "Upload new image" button
- "Save changes" button
*(Same modal used for "Add reservation")*

**On "Manage" → Detail Page:**
- Full page with reservation info card
- ⓘ icon centered
- "The client's reservation information will appear here"
- ← Return button + 🖨 Print button

---

## Page 5 — Manage Rooms (`/admin/rooms`)
**View — Room Type Cards:**
- 3 cards: Junior | Standard | Premium
- Each card: image + name + Manage + Update buttons

**On "Manage" → Room List:**
- Full table of individual rooms for that type
- Per row: Manage button
- **Room state widget (right side):** "Room's state" + Active/Inactive radio + "Save changes"

**On "Update" → Modal:**
- ⓘ icon + Room Title / Description / Fee
- Image preview + "Upload new image" button
- "Save changes" button

---

## Page 6 — Today's Status (`/admin/status`)
**Content:**
- Full-width table — all rooms with computed status (AVAILABLE / OCCUPIED / RESERVED)
- 🖨 Print button (bottom center)
- Print outputs full table content

---

## Page 7 — Room Availability (`/admin/availability`)
**View 1 — Search Form:**
- Start Date (date picker)
- End Date (date picker)
- Room Type (dropdown)
- "Search" button

**View 2 — Results:**
- Same form at top
- Results table below with available rooms

---

## Page 8 — Offers and Advertising (`/admin/offers`)
**View — Category Cards:**
- 2 cards: Advertisement | Offers
- Each: image + Manage + Update buttons

**On "Manage" → List Table:**
- Full table of offers or ads
- Per row: Update button
- Note: offers always link to the client-facing offers section — no active toggle in modal

**On "Update" → Modal:**
- ⓘ icon + Title
- Destiny link (URL input)
- Image preview + "Upload new image" button
- "Save changes" button