import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../types/navbar.types";

interface NavbarLinksProps {
    onLinkClick?: () => void;
}

export default function NavbarLinks({ onLinkClick }: NavbarLinksProps) {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="navbar-links">
            {navLinks.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={`nav-link${isActive(link.to) ? " active" : ""}`}
                    onClick={onLinkClick}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
