import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/rooms', icon: '🏨', label: 'Room Management' },
    { path: '/admin/bookings', icon: '📅', label: 'Booking Management' },
    { path: '/admin/users', icon: '👥', label: 'User Management' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <span className="text-gold">LUXE</span> Admin
          </h2>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path} 
              className="sidebar-link"
              onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
            >
              <span className="link-icon">{item.icon}</span>
              {sidebarOpen && <span className="link-label">{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="link-icon">🚪</span>
            {sidebarOpen && <span className="link-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1>Admin Panel</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-avatar">{user?.name?.charAt(0)}</span>
              <div>
                <p className="user-name">{user?.name}</p>
                <p className="user-role text-gold">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
