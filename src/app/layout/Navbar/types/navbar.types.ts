export interface NavLink {
    to: string;
    label: string;
}

export interface NavGroup {
    label: string;
    links: NavLink[];
}

export const navGroups: NavGroup[] = [
    {
        label: "Dashboard",
        links: [
            { to: "/admin/dashboard", label: "Dashboard" },
        ],
    },
    {
        label: "Rooms",
        links: [
            { to: "/admin/rooms",              label: "Manage Rooms" },
            { to: "/admin/room-availability",  label: "Room Availability" },
            { to: "/admin/status",             label: "Today's Status" },
        ],
    },
    {
        label: "Booking",
        links: [
            { to: "/admin/reservations", label: "Reservations" },
        ],
    },
    {
        label: "Marketing",
        links: [
            { to: "/admin/offers",       label: "Offers" },
            { to: "/admin/advertising",  label: "Advertising" },
            { to: "/admin/season",       label: "Seasons" },
        ],
    },
    {
        label: "Page Content",
        links: [
            { to: "/admin/pages",        label: "Manage Pages" },
            { to: "/admin/HotelContact", label: "Hotel Contact" },
        ],
    },
];

/** Flat list for backward compatibility */
export const navLinks: NavLink[] = navGroups.flatMap((g) => g.links);
