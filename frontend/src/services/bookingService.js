
import API from './api';

const bookingService = {
    getAllBookings: async () => {
        const response = await API.get('/bookings');
        return response.data;
    },

    getBookingById: async (id) => {
        const response = await API.get(`/bookings/${id}`);
        return response.data;
    },

    createBooking: async (bookingData) => {
        const response = await API.post('/bookings', bookingData);
        return response.data;
    },

    updateBooking: async (id, bookingData) => {
        const response = await API.put(`/bookings/${id}`, bookingData);
        return response.data;
    },

    deleteBooking: async (id) => {
        const response = await API.delete(`/bookings/${id}`);
        return response.data;
    },

    getAdminDashboard: async () => {
        const response = await API.get('/admin/dashboard');
        return response.data;
    }
};

export default bookingService;
