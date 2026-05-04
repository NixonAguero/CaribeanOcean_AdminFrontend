import { FiUser, FiLogOut } from "react-icons/fi";

interface UserSectionProps {
    username?: string;
    onLogout?: () => void;
}

export default function UserSection({ username = "Username", onLogout }: UserSectionProps) {
    return (
        <div className="user-section">
            <span className="user-name">{username}</span>
            <FiUser size={20} className="user-icon" />
            <button 
                type="button" 
                className="logout-btn" 
                aria-label="Logout" 
                onClick={(e) => {
                    e.preventDefault();
                    console.log("Botón de logout clickeado en UserSection");
                    if (onLogout) onLogout();
                }}
            >
                <FiLogOut size={20} />
            </button>
        </div>
    );
}
