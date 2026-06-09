
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import heroImg from '../assets/bg.jpg';
import { useEffect, useState } from 'react';
import roomService from '../services/roomService';

const HomePage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await roomService.getAllRooms();
                setRooms(data.data || data || []);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const services = [
        { icon: '🏊', title: 'Swimming Pool', desc: 'Heated infinity pool with panoramic views' },
        { icon: '💆', title: 'Spa & Wellness', desc: 'Relaxing spa treatments and massages' },
        { icon: '🍽️', title: 'Fine Dining', desc: 'Michelin-starred restaurant experience' },
        { icon: '🏋️', title: 'Fitness Center', desc: 'State-of-the-art gym equipment' }
    ];

    const testimonials = [
        { name: 'Sarah Johnson', text: 'Absolutely stunning experience! The service was impeccable.', rating: 5 },
        { name: 'Michael Chen', text: 'Best hotel stay I have ever had. Worth every penny.', rating: 5 },
        { name: 'Emily Davis', text: 'Luxury at its finest. Will definitely come back!', rating: 5 }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content fade-in">
                            <h1>Experience <span className="text-gold">Luxury</span></h1>
                            <p className="text-gray">Discover the ultimate in comfort and elegance</p>
                            <Link to="/rooms" className="btn-primary">Explore Rooms</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="container">
                    <h2 className="section-title">Our <span className="text-gold">Services</span></h2>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card glass-effect">
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p className="text-gray">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Rooms Section */}
            <section className="rooms-section">
                <div className="container">
                    <h2 className="section-title">Featured <span className="text-gold">Rooms</span></h2>
                    {loading ? (
                        <div className="text-center text-gold">Loading rooms...</div>
                    ) : (
                        <div className="rooms-grid">
                            {(rooms.slice(0, 4) || []).map((room) => (
                                <div key={room.id} className="room-card glass-effect">
                                    <div className="room-image">
                                        {room.image ? (
                                            <img src={room.image} alt={room.room_number} />
                                        ) : (
                                            <div className="placeholder-image">No Image</div>
                                        )}
                                    </div>
                                    <div className="room-details">
                                        <div className="room-header">
                                            <h3>{room.room_number}</h3>
                                            <span className={`room-status ${room.status}`}>
                                                {room.status}
                                            </span>
                                        </div>
                                        <p className="text-gray">{room.type}</p>
                                        <div className="room-footer">
                                            <span className="room-price">${room.price}/night</span>
                                            <Link to={`/rooms/${room.id}`} className="btn-secondary">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="section-title">What Our <span className="text-gold">Guests Say</span></h2>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card glass-effect">
                                <div className="stars">
                                    {'⭐'.repeat(testimonial.rating)}
                                </div>
                                <p>{testimonial.text}</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">{testimonial.name.charAt(0)}</div>
                                    <div>
                                        <h4>{testimonial.name}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
