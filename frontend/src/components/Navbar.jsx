
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar glass-effect">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="logo">
                        <span className="text-gold">LUXE</span>HOTEL
                    </Link>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/rooms">Rooms</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="nav-actions">
                        {isAuthenticated ? (
                            <>
                                <div className="user-menu">
                                    <span className="text-gray">Hello, {user?.name}</span>
                                    <div className="dropdown">
                                        {isAdmin ? (
                                            <>
                                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                                                <Link to="/admin/rooms">Manage Rooms</Link>
                                                <Link to="/admin/bookings">Manage Bookings</Link>
                                            </>
                                        ) : (
                                            <Link to="/dashboard">My Dashboard</Link>
                                        )}
                                        <button onClick={handleLogout} className="logout-btn">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-secondary">Login</Link>
                                <Link to="/register" className="btn-primary">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
