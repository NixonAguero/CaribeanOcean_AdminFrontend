import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { navGroups } from "../types/navbar.types";
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
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

    const toggleGroup = (label: string) => {
        setExpandedGroup(expandedGroup === label ? null : label);
    };

    return (
        <>
            <div className={`mobile-menu${isOpen ? " open" : ""}`}>
                <div className="mobile-menu-inner">
                    {navGroups.map((group) => {
                        if (group.links.length === 1) {
                            const link = group.links[0];
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`nav-link${isActive(link.to) ? " active" : ""}`}
                                    onClick={onClose}
                                >
                                    {group.label}
                                </Link>
                            );
                        }

                        const isExpanded = expandedGroup === group.label;
                        const hasActiveChild = group.links.some((l) => isActive(l.to));

                        return (
                            <div key={group.label} className="mobile-group">
                                <button
                                    type="button"
                                    className={`mobile-group-trigger${hasActiveChild ? " active" : ""}`}
                                    onClick={() => toggleGroup(group.label)}
                                    aria-expanded={isExpanded}
                                >
                                    {group.label}
                                    <FiChevronDown
                                        className={`mobile-group-chevron${isExpanded ? " rotated" : ""}`}
                                        size={16}
                                    />
                                </button>

                                <div className={`mobile-group-items${isExpanded ? " expanded" : ""}`}>
                                    {group.links.map((link) => (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            className={`nav-link mobile-sub-link${isActive(link.to) ? " active" : ""}`}
                                            onClick={onClose}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <UserSection username={username} onLogout={onLogout} />
                </div>
            </div>

            {isOpen && <div className="mobile-overlay" onClick={onClose} />}
        </>
    );
}
