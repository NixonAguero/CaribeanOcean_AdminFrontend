export interface NavLink {
    to: string;
    label: string;
}

export const navLinks: NavLink[] = [
    { to: "/admin/pages",              label: "Manage Pages" },
    { to: "/admin/rooms",              label: "Manage Rooms" },
    { to: "/admin/reservations",       label: "Reservations" },
    { to: "/admin/status",             label: "Today's Status" },
    { to: "/admin/room-availability",  label: "Room Availability" },
    { to: "/admin/offers-advertising", label: "Offers & Ads" },
    { to: "/admin/season",             label: "Seasons" },
];
