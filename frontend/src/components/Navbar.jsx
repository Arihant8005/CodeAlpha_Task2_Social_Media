import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">

                <Link to="/" className="brand">
                    <div className="brand-icon">S</div>
                    <span>Socially</span>
                </Link>

                <div className="nav-links">
                    <Link
                        to="/"
                        className={location.pathname === "/" ? "active" : ""}
                    >
                        🏠 Home
                    </Link>

                    <Link
                        to="/profile"
                        className={
                            location.pathname === "/profile"
                                ? "active"
                                : ""
                        }
                    >
                        👤 Profile
                    </Link>

                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="login-link"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="signup-link"
                            >
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;