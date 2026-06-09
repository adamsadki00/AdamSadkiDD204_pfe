import API from './axios';

// ==================== 1. Public ====================

export const registerUser = async (userData) => {
    const response = await API.post('/register', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await API.post('/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const getRooms = async () => {
    const response = await API.get('/rooms');
    return response.data;
};

export const getRoomById = async (id) => {
    const response = await API.get(`/rooms/${id}`);
    return response.data;
};

// ==================== 2. Authenticated ====================

export const logoutUser = async () => {
    const response = await API.post('/logout');
    localStorage.removeItem('token');
    return response.data;
};

export const getMyBookings = async () => {
    const response = await API.get('/bookings');
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await API.post('/bookings', bookingData);
    return response.data;
};

export const updateBooking = async (id, bookingData) => {
    const response = await API.put(`/bookings/${id}`, bookingData);
    return response.data;
};

export const deleteBooking = async (id) => {
    const response = await API.delete(`/bookings/${id}`);
    return response.data;
};

// ==================== 3. Admin ====================

export const createRoom = async (roomData) => {
    const response = await API.post('/rooms', roomData);
    return response.data;
};

export const updateRoom = async (id, roomData) => {
    const response = await API.put(`/rooms/${id}`, roomData);
    return response.data;
};

export const deleteRoom = async (id) => {
    const response = await API.delete(`/rooms/${id}`);
    return response.data;
};

export const getAdminDashboard = async () => {
    const response = await API.get('/admin/dashboard');
    return response.data;
};