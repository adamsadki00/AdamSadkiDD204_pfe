import { useEffect, useState } from 'react';
import roomService from '../services/roomService';
import '../styles/ManagementPage.css';

const RoomManagementPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    room_number: '',
    type: '',
    price: '',
    capacity: '',
    status: 'available',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');

  const fetchRooms = async () => {
    try {
      const data = await roomService.getAllRooms();
      setRooms(data.data || data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await roomService.updateRoom(editingRoom.id, formData);
      } else {
        await roomService.createRoom(formData);
      }
      setShowModal(false);
      resetForm();
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      room_number: room.room_number,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      status: room.status,
      description: room.description,
      image: null
    });
    setImagePreview(room.image || '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await roomService.deleteRoom(id);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      room_number: '',
      type: '',
      price: '',
      capacity: '',
      status: 'available',
      description: '',
      image: null
    });
    setEditingRoom(null);
    setImagePreview('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="management-page">
      <div className="page-header">
        <h1 className="page-title">Room Management</h1>
        <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Room
        </button>
      </div>

      <div className="table-container glass-effect">
        {loading ? (
          <div className="text-center text-gold">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Room #</th>
                <th>Type</th>
                <th>Price/Night</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.room_number}</td>
                  <td>{room.type}</td>
                  <td>${room.price}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <span className={`room-status ${room.status}`}>{room.status}</span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(room)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(room.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Room Number</label>
                  <input
                    type="text"
                    value={formData.room_number}
                    onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Room Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price/Night</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                )}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingRoom ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagementPage;
