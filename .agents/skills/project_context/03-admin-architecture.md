# 03 — Admin Architecture

## Frontend — React Feature-Based Package Structure

### Admin App
```
App/
├── Router/          ← Protected routes, redirect to /login if no token
├── App/             ← Root admin component
└── Layout/          ← Admin navbar wrapper

Feature modules (each: Components/ | Hooks/ | Interfaces/ | Service/):
├── Loggin/          ← Login page
├── Home/            ← Dashboard with monthly stats
├── ModifyPages/     ← Edit page content (Home, About Us, Facilities, How to)
├── Reservations/    ← Reservation table + modals + detail page
├── RoomAdministration/ ← Room type cards + room list + state toggle
├── HotelState/      ← Today's room status table + print
├── RoomAvailability/ ← Search availability by date range
└── Adds/            ← Advertisement + Offers management

Shared/              ← Same shared module as public site
├── UI Components/
├── Utilities/
├── Assets/
└── Service/         ← Axios config, base requests, auth interceptor
```

---

## Backend — Clean Architecture (same 4 layers, admin-specific endpoints)
```
API/Controllers/
├── AuthController        ← POST /api/auth/login, /logout
├── StatsController       ← GET /api/stats/monthly
├── PageContentController ← GET, PUT /api/pages/:id
├── ReservationController ← GET, POST, PUT, DELETE /api/reservations
├── RoomTypeController    ← GET, PUT /api/room-types/:id
├── RoomController        ← GET /api/rooms, PATCH /api/rooms/:id/status
│                           GET /api/rooms/status/today
│                           GET /api/rooms/availability
├── OfferController       ← GET, PUT /api/offers/:id
└── AdvertisementController ← GET, PUT /api/advertisements/:id
```

---

## Auth Flow
```
/admin/login
  → POST /api/auth/login { username, password }
  → 200: { token, user.name } → store token → redirect /admin
  → 401: show error message

Protected routes
  → axios interceptor adds Authorization: Bearer <token>
  → 401 response → clear token → redirect /admin/login
```

---

## API Endpoints

| Method | Endpoint | Module | Description |
|---|---|---|---|
| POST | /api/auth/login | Loggin | Validate credentials, return token |
| POST | /api/auth/logout | Loggin | Invalidate session |
| GET | /api/stats/monthly | Home | Reservations by type + total revenue |
| GET | /api/pages | ModifyPages | All PAGE_CONTENT records |
| PUT | /api/pages/:id | ModifyPages | Update title, text_content, url_content |
| GET | /api/reservations | Reservations | All reservations |
| POST | /api/reservations | Reservations | Create reservation manually |
| PUT | /api/reservations/:id | Reservations | Update reservation |
| DELETE | /api/reservations/:id | Reservations | Delete reservation |
| GET | /api/room-types | RoomAdministration | All room types |
| PUT | /api/room-types/:id | RoomAdministration | Update type info |
| GET | /api/rooms?typeId= | RoomAdministration | Rooms filtered by type |
| PATCH | /api/rooms/:id/status | RoomAdministration | Toggle active/inactive |
| GET | /api/rooms/status/today | HotelState | All rooms with computed status |
| GET | /api/rooms/availability?start=&end=&typeId= | RoomAvailability | Available rooms in range |
| GET | /api/offers | Adds | All offers |
| PUT | /api/offers/:id | Adds | Update offer |
| GET | /api/advertisements | Adds | All advertisements |
| PUT | /api/advertisements/:id | Adds | Update advertisement |