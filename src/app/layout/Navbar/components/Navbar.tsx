import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../styles/Navbar.css";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import UserSection from "./UserSection";
import MobileMenu from "./MobileMenu";
import { logout } from "../services/auth.service";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    return (
        <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
            <div className="navbar-container">

                <NavbarLogo onClick={closeMenu} />

                {/* Hamburger (mobile only) */}
                <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                <NavbarLinks />

                <span className="navbar-divider" />

                <UserSection onLogout={logout} />

                <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} onLogout={logout} />

            </div>
        </nav>
    );
}