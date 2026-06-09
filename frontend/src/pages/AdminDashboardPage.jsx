import { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import '../styles/AdminDashboard.css';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await bookingService.getAdminDashboard();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading-container"><span className="text-gold">Loading...</span></div>;
  }

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="stat-card glass-effect">
          <div className="stat-icon">👥</div>
          <div>
            <h3>{stats?.users?.total || 0}</h3>
            <p className="text-gray">Total Users</p>
          </div>
        </div>
        <div className="stat-card glass-effect">
          <div className="stat-icon">🏨</div>
          <div>
            <h3>{stats?.rooms?.total || 0}</h3>
            <p className="text-gray">Total Rooms</p>
          </div>
        </div>
        <div className="stat-card glass-effect">
          <div className="stat-icon">✅</div>
          <div>
            <h3>{stats?.rooms?.available || 0}</h3>
            <p className="text-gray">Available Rooms</p>
          </div>
        </div>
        <div className="stat-card glass-effect">
          <div className="stat-icon">🔒</div>
          <div>
            <h3>{stats?.rooms?.occupied || 0}</h3>
            <p className="text-gray">Occupied Rooms</p>
          </div>
        </div>
        <div className="stat-card glass-effect">
          <div className="stat-icon">📅</div>
          <div>
            <h3>{stats?.bookings?.total || 0}</h3>
            <p className="text-gray">Total Bookings</p>
          </div>
        </div>
        <div className="stat-card glass-effect">
          <div className="stat-icon">💰</div>
          <div>
            <h3>${stats?.bookings?.total ? (stats.bookings.total * 150).toLocaleString() : '0'}</h3>
            <p className="text-gray">Estimated Revenue</p>
          </div>
        </div>
      </div>

      <div className="recent-bookings glass-effect">
        <h2>Recent Bookings</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.bookings?.latest || []).map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.user?.name || 'N/A'}</td>
                  <td>{booking.room?.room_number || 'N/A'}</td>
                  <td>{booking.check_in}</td>
                  <td>{booking.check_out}</td>
                  <td>
                    <span className={`booking-status ${booking.status}`}>{booking.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
