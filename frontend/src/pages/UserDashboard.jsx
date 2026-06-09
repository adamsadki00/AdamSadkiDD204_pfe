
import { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import { useAuth } from '../hooks/useAuth';
import '../styles/Dashboard.css';

const UserDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await bookingService.getAllBookings();
                setBookings(data || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleCancelBooking = async (id) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await bookingService.deleteBooking(id);
                setBookings(bookings.filter(b => b.id !== id));
            } catch (error) {
                alert('Failed to cancel booking');
            }
        }
    };

    return (
        <div className="dashboard">
            <div className="container">
                <h1 className="page-title">My <span className="text-gold">Dashboard</span></h1>
                
                <div className="dashboard-content">
                    <div className="profile-section glass-effect">
                        <h2>Profile</h2>
                        <div className="profile-info">
                            <div className="profile-avatar">{user?.name?.charAt(0)}</div>
                            <div>
                                <h3>{user?.name}</h3>
                                <p className="text-gray">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bookings-section">
                        <h2>My Bookings</h2>
                        {loading ? (
                            <div className="text-center text-gold">Loading bookings...</div>
                        ) : (
                            <div className="bookings-list">
                                {bookings.length === 0 ? (
                                    <div className="text-center text-gray">No bookings yet</div>
                                ) : (
                                    bookings.map((booking) => (
                                        <div key={booking.id} className="booking-card glass-effect">
                                            <div className="booking-header">
                                                <h3>Booking #{booking.id}</h3>
                                                <span className={`booking-status ${booking.status}`}>{booking.status}</span>
                                            </div>
                                            <div className="booking-details">
                                                <p>Room: {booking.room?.room_number || 'N/A'}</p>
                                                <p>Check In: {booking.check_in}</p>
                                                <p>Check Out: {booking.check_out}</p>
                                                <p>Total: ${booking.total_price || 'N/A'}</p>
                                            </div>
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="btn-danger"
                                            >
                                                Cancel Booking
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
