import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.png";

interface NavbarLogoProps {
    onClick?: () => void;
}

export default function NavbarLogo({ onClick }: NavbarLogoProps) {
    return (
        <Link to="/admin/rooms" className="navbar-logo" onClick={onClick}>
            <span className="navbar-logo-icon">✦</span>
            <img src={logo} alt="Caribbean Ocean Resort & Spa" className="logo" />
            <div className="navbar-logo-text">
                <span className="navbar-logo-main">Caribbean Ocean</span>
                <span className="navbar-logo-sub">Resort & Spa</span>
            </div>
        </Link>
    );
}
