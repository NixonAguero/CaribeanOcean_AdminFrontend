# 02 — Admin Database Reference

## Entities used by the admin module

### ADMIN_USER
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| username | VARCHAR | Login credential |
| password_hash | VARCHAR | Encrypted |
| name | VARCHAR | Real full name — shown in navbar |
| email | VARCHAR | |
| last_login | DATETIME | |
| active | BOOLEAN | Account enabled |

---

### ROOM_TYPE
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| name | VARCHAR | "Standard", "Junior", "Premium" |
| description | VARCHAR | Editable via admin |
| daily_rate | FLOAT | Price per night |
| image_url | VARCHAR | Type representative image |
| updated_at | DATETIME | |

---

### ROOM
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| room_type_id | INT FK → ROOM_TYPE | |
| number | INT | Physical room number |
| limages | JSON | Array of image URLs |
| active | BOOLEAN | Toggled from admin |

---

### RESERVATION
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| code | VARCHAR | e.g. WIRNDAYU4817FD |
| room_id | INT FK → ROOM | |
| season_id | INT FK → SEASON | |
| offer_id | INT FK → OFFER | Nullable |
| client_name | VARCHAR | |
| client_lastname | VARCHAR | |
| masked_card | VARCHAR | Last 4 digits only |
| transaction_id | VARCHAR | Payment gateway ID |
| created_at | DATETIME | |
| check_in | DATETIME | |
| check_out | DATETIME | |
| total_amount | FLOAT | |

---

### OFFER
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| name | VARCHAR | |
| description | VARCHAR | |
| discount_percentage | FLOAT | e.g. 20.0 |
| start_date | DATETIME | |
| end_date | DATETIME | |
| room_type_id | INT FK → ROOM_TYPE | |
| season_id | INT FK → SEASON | |
| active | BOOLEAN | |
| updated_at | DATETIME | |
| updated_by | INT FK → ADMIN_USER | |

---

### SEASON
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| name | VARCHAR | e.g. "High Season 2024" |
| start_date | DATETIME | |
| end_date | DATETIME | |

---

### PAGE_CONTENT
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| key | VARCHAR | home, about_us, facilities, how_to_get_there |
| title | VARCHAR | Editable |
| text_content | VARCHAR | HTML from WYSIWYG |
| url_content | VARCHAR | Image URL |
| update_at | DATETIME | |
| updated_by | INT FK → ADMIN_USER | |

---

### FACILITY
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| name | VARCHAR | |
| description | VARCHAR | |
| image_url | VARCHAR | |
| display_order | INT | Sort order on public page |
| updated_at | DATETIME | |
| updated_by | INT FK → ADMIN_USER | |
| active | BOOLEAN | |

---

### ADVERTISEMENT
| Column | Type | Notes |
|---|---|---|
| id | INT PK | |
| image_url | VARCHAR | Banner image |
| target_link | VARCHAR | Destination URL |
| url_image | VARCHAR | Additional image URL |
| updated_at | DATETIME | |
| updated_by | INT FK → ADMIN_USER | |
| active | BOOLEAN | |

---

## Room Status Logic (computed, not stored)
- **OCCUPIED:** check_in = today
- **RESERVED:** check_in > today
- **AVAILABLE:** no active reservation or room is inactive