
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import roomService from '../services/roomService';
import '../styles/RoomsPage.css';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterPrice, setFilterPrice] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await roomService.getAllRooms();
                const roomsData = data.data || data || [];
                setRooms(roomsData);
                setFilteredRooms(roomsData);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    useEffect(() => {
        let result = [...rooms];
        if (searchTerm) {
            result = result.filter(room =>
                room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterType) {
            result = result.filter(room => room.type === filterType);
        }
        if (filterPrice) {
            const [min, max] = filterPrice.split('-').map(Number);
            result = result.filter(room => room.price >= min && room.price <= max);
        }
        setFilteredRooms(result);
    }, [searchTerm, filterType, filterPrice, rooms]);

    const uniqueTypes = [...new Set(rooms.map(r => r.type))];

    return (
        <div className="rooms-page">
            <div className="container">
                <h1 className="page-title">Our <span className="text-gold">Rooms</span></h1>
                
                {/* Filters */}
                <div className="filters glass-effect">
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="filter-input"
                    />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Types</option>
                        {uniqueTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Prices</option>
                        <option value="0-100">$0 - $100</option>
                        <option value="100-200">$100 - $200</option>
                        <option value="200-500">$200 - $500</option>
                        <option value="500-1000">$500 - $1000</option>
                        <option value="1000-9999">$1000+</option>
                    </select>
                </div>

                {/* Rooms List */}
                {loading ? (
                    <div className="text-center text-gold loading-text">Loading rooms...</div>
                ) : (
                    <div className="rooms-grid">
                        {filteredRooms.map((room) => (
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
                                    <p className="text-gray">Capacity: {room.capacity} guests</p>
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
        </div>
    );
};

export default RoomsPage;
