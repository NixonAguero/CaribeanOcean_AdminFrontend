# 08 — Admin Conventional Commits

## Structure
```
git commit -m "<type>(<scope>): <description>"
```

## Admin Scopes
`auth` `dashboard` `manage-pages` `manage-rooms` `manage-reservations` `hotel-state` `room-availability` `offers-admin`

---

## Examples by module

### Auth
```bash
feat(auth): add split-screen login with password toggle
feat(auth): add jwt token storage on login success
feat(auth): add axios interceptor for auth header
fix(auth): redirect not firing on successful login
fix(auth): error message not clearing between attempts
```

### Dashboard
```bash
feat(dashboard): add monthly stats card with dark background
feat(dashboard): add colored progress bars per room type
fix(dashboard): stat bars not scaling to correct percentage
```

### Manage Pages
```bash
feat(manage-pages): add 2x2 page grid with edit modal
feat(manage-pages): add image upload to edit modal
fix(manage-pages): modal not closing after save changes
```

### Manage Reservations
```bash
feat(manage-reservations): add reservation table with manage update delete
feat(manage-reservations): add reservation detail page with print button
feat(manage-reservations): add add-reservation button using update modal
fix(manage-reservations): delete confirmation not showing
fix(manage-reservations): print not including all table rows
```

### Manage Rooms
```bash
feat(manage-rooms): add room type cards with manage and update buttons
feat(manage-rooms): add room list table with active inactive toggle
feat(manage-rooms): add room state widget with save changes
fix(manage-rooms): room state widget not saving inactive status
```

### Hotel State
```bash
feat(hotel-state): add today status table with computed room status
feat(hotel-state): add print button for full table output
fix(hotel-state): occupied status not matching check-in date correctly
```

### Room Availability
```bash
feat(room-availability): add availability search form with date pickers
feat(room-availability): add results table below search form
fix(room-availability): end date not blocking dates before start date
```

### Offers Admin
```bash
feat(offers-admin): add advertisement and offers category cards
feat(offers-admin): add offer list table with update modal
feat(offers-admin): add image upload to offer update modal
fix(offers-admin): destiny link not saving on update
```

---

## What NEVER to do
```bash
# ❌ No type
git commit -m "fixed the login bug"

# ❌ Too vague
git commit -m "fix: fixed stuff"

# ❌ Multiple concerns
git commit -m "feat: add login page, fix dashboard, update rooms"

# ❌ Uppercase
git commit -m "feat(auth): Add login form"

# ❌ Period at end
git commit -m "feat(auth): add login form."

# ❌ Past tense
git commit -m "feat(auth): added login form"
```