# 07 — Admin User Stories & Acceptance Criteria

## Actors
- **Hotel admin** — authenticated administrator

---

## US-09: Admin login
**As** an admin
**I want** to enter my credentials on a login page
**So that** I can access all admin options

**Acceptance criteria:**
- Login form requires username and password
- Only authenticated admins can access the admin module
- Incorrect credentials show inline error message
- Redirects to /admin (dashboard) on success
- Logout clears session and redirects to /admin/login

---

## US-10: Modify page text content
**As** an admin
**I want** to change the text of a public page
**So that** I can renew the site's appearance periodically

**Acceptance criteria:**
- Admin selects which page to edit (Home, About Us, Facilities, How to get there)
- Title and text fields are editable
- Changes saved and reflected on public site immediately
- Confirmation shown on save

---

## US-11: Modify page image
**As** an admin
**I want** to update the image shown to clients
**So that** I can keep the site visually fresh

**Acceptance criteria:**
- Current image is displayed in modal
- "Upload new image" button functional
- Accepted formats: JPG / GIF / PNG
- No dimension validation required
- Image not mandatory to upload
- On save: success or error message shown
- Change persists on public site

---

## US-12: Load room description and rate
**As** an admin
**I want** to load the description, rate and photo of a room type
**So that** clients see current information

**Acceptance criteria:**
- Admin can edit room type description
- Admin can set daily rate
- Admin can upload a new representative image

---

## US-13: View room info
**As** an admin
**I want** to verify current room information
**So that** I can confirm it is up to date

**Acceptance criteria:**
- Room list shows all individual rooms per type
- Each room shows its current active status

---

## US-14: Activate / deactivate rooms
**As** an admin
**I want** to change the active status of a room
**So that** I can manage availability

**Acceptance criteria:**
- Toggle per room between Active and Inactive
- Changes reflected immediately in availability queries

---

## US-15: View reservation list
**As** an admin
**I want** to see a list of all reservations
**So that** I can manage them

**Acceptance criteria:**
- Table shows all reservations
- Manage / Update / Delete actions available per row

---

## US-16: View reservation detail + print
**As** an admin
**I want** to view full reservation details and print
**So that** I can have physical records

**Acceptance criteria:**
- "Manage" opens full reservation detail page
- Print button prints the reservation info
- Return button goes back to reservation list

---

## US-17: Update reservation
**As** an admin
**I want** to update reservation data
**So that** I can correct errors

**Acceptance criteria:**
- "Update" opens modal with editable fields
- Changes saved successfully

---

## US-18: Delete reservation
**As** an admin
**I want** to delete a reservation
**So that** I can remove cancelled bookings

**Acceptance criteria:**
- "Delete" shows confirmation dialog
- On confirm: reservation removed from table

---

## US-19: Add reservation manually
**As** an admin
**I want** to add a reservation manually
**So that** I can register phone or in-person bookings

**Acceptance criteria:**
- "Add reservation" opens same modal as Update
- All reservation fields available and saveable

---

## US-20: View today's hotel status
**As** an admin
**I want** to see the status of all rooms today
**So that** I can consult daily availability

**Acceptance criteria:**
- Table shows all rooms with status: AVAILABLE / OCCUPIED / RESERVED
- Status computed from reservations (not stored in DB)
- Print button prints the full table

---

## US-21: Consult room availability by date range
**As** an admin
**I want** to determine available rooms in a date range
**So that** I can advise clients

**Acceptance criteria:**
- Search form: start date, end date, room type
- Start date must be before end date
- Results table shows available rooms for that range

---

## US-22: Manage offers
**As** an admin
**I want** to manage special offers
**So that** I can attract more clients

**Acceptance criteria:**
- Offer list with Update button per offer
- Update modal: Title, Destiny link, Image
- Offers visible in client-facing offers page

---

## US-23: Manage advertisements
**As** an admin
**I want** to manage the advertisement banner
**So that** I can show relevant promotions on every public page

**Acceptance criteria:**
- Ad image uploadable
- Destination link configurable
- Ad area visible on all public pages after update

---

## US-24: View monthly statistics dashboard
**As** an admin
**I want** to see a dashboard with hotel statistics
**So that** I can track monthly performance

**Acceptance criteria:**
- Dashboard shows: total reservations, premium reserved, standard reserved, junior reserved, total revenue
- Displayed with colored progress bars per category
- Data reflects current month only