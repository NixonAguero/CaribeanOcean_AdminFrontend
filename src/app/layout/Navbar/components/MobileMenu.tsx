import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../types/navbar.types";
import UserSection from "./UserSection";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    username?: string;
    onLogout?: () => void;
}

export default function MobileMenu({ isOpen, onClose, username, onLogout }: MobileMenuProps) {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <div className={`mobile-menu${isOpen ? " open" : ""}`}>
                <div className="mobile-menu-inner">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`nav-link${isActive(link.to) ? " active" : ""}`}
                            onClick={onClose}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <UserSection username={username} onLogout={onLogout} />
                </div>
            </div>

            {isOpen && <div className="mobile-overlay" onClick={onClose} />}
        </>
    );
}
