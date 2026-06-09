
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roomService from '../services/roomService';
import bookingService from '../services/bookingService';
import { useAuth } from '../hooks/useAuth';
import '../styles/RoomDetailsPage.css';

const RoomDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const data = await roomService.getRoomById(id);
                setRoom(data);
            } catch (error) {
                console.error('Error fetching room:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id]);

    const handleBook = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setBookingLoading(true);
        try {
            await bookingService.createBooking({
                user_id: user.id,
                room_id: room.id,
                check_in: checkIn,
                check_out: checkOut
            });
            alert('Booking created successfully!');
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="loading-container"><div className="text-gold">Loading...</div></div>;
    if (!room) return <div className="loading-container"><div className="text-gold">Room not found</div></div>;

    return (
        <div className="room-details-page">
            <div className="container">
                <div className="room-details-content">
                    <div className="room-gallery">
                        {room.image ? (
                            <img src={room.image} alt={room.room_number} />
                        ) : (
                            <div className="placeholder-gallery">No Image Available</div>
                        )}
                    </div>
                    <div className="room-info">
                        <div className="room-header">
                            <h1>{room.room_number}</h1>
                            <span className={`room-status ${room.status}`}>{room.status}</span>
                        </div>
                        <p className="room-type text-gold">{room.type}</p>
                        <p className="room-description">{room.description || 'No description available'}</p>
                        <div className="room-features">
                            <div className="feature">
                                <span>👥</span>
                                <span>Capacity: {room.capacity} guests</span>
                            </div>
                            <div className="feature">
                                <span>💰</span>
                                <span>Price: ${room.price}/night</span>
                            </div>
                        </div>
                        
                        <form onSubmit={handleBook} className="booking-form glass-effect">
                            <h3>Book This Room</h3>
                            <div className="form-group">
                                <label>Check In</label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Check Out</label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={bookingLoading || room.status !== 'available'}>
                                {bookingLoading ? 'Booking...' : 'Book Now'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailsPage;
