import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { navGroups } from "../types/navbar.types";

interface NavbarLinksProps {
    onLinkClick?: () => void;
}

export default function NavbarLinks({ onLinkClick }: NavbarLinksProps) {
    const location = useLocation();
    const [openGroup, setOpenGroup] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isActive = (path: string) => location.pathname === path;
    const isGroupActive = (groupLabel: string) => {
        const group = navGroups.find((g) => g.label === groupLabel);
        return group?.links.some((link) => isActive(link.to)) ?? false;
    };

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenGroup(label);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenGroup(null), 150);
    };

    useEffect(() => {
        setOpenGroup(null);
    }, [location.pathname]);

    return (
        <div className="navbar-links">
            {navGroups.map((group) => {
                if (group.links.length === 1) {
                    const link = group.links[0];
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`nav-link${isActive(link.to) ? " active" : ""}`}
                            onClick={onLinkClick}
                        >
                            {group.label}
                        </Link>
                    );
                }

                return (
                    <div
                        key={group.label}
                        className={`nav-group${openGroup === group.label ? " nav-group--open" : ""}${isGroupActive(group.label) ? " nav-group--active" : ""}`}
                        onMouseEnter={() => handleMouseEnter(group.label)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            type="button"
                            className={`nav-group-trigger${isGroupActive(group.label) ? " active" : ""}`}
                            onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                            aria-expanded={openGroup === group.label}
                        >
                            {group.label}
                            <FiChevronDown className="nav-group-chevron" size={14} />
                        </button>

                        <div className="nav-dropdown">
                            <div className="nav-dropdown-inner">
                                {group.links.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`nav-dropdown-link${isActive(link.to) ? " active" : ""}`}
                                        onClick={() => {
                                            setOpenGroup(null);
                                            onLinkClick?.();
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
