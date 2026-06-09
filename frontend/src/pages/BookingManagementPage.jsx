import { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';

const BookingManagementPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getAllBookings();
      setBookings(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await bookingService.updateBooking(id, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await bookingService.deleteBooking(id);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (!search) return true;
    return (
      (b.user?.name && b.user.name.toLowerCase().includes(search.toLowerCase())) ||
      (b.room?.room_number && b.room.room_number.toString().includes(search))
    );
  });

  return (
    <div className="management-page">
      <div className="page-header">
        <h1 className="page-title">Booking Management</h1>
      </div>

      <input
        type="text"
        placeholder="Search bookings by guest name or room number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="table-container glass-effect">
        {loading ? (
          <div className="text-center text-gold">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.user?.name || 'N/A'}</td>
                  <td>{booking.room?.room_number || 'N/A'}</td>
                  <td>{booking.check_in}</td>
                  <td>{booking.check_out}</td>
                  <td>${booking.total_price || 'N/A'}</td>
                  <td>
                    <span className={`booking-status ${booking.status}`}>{booking.status}</span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <button
                        className="btn-approve"
                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                      >
                        Approve
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button
                        className="btn-cancel"
                        onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingManagementPage;
