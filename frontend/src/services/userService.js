
import API from './api';

const userService = {
    getAllUsers: async () => {
        const response = await API.get('/users');
        return response.data;
    },

    getUserById: async (id) => {
        const response = await API.get(`/users/${id}`);
        return response.data;
    },

    updateUser: async (id, userData) => {
        const response = await API.put(`/users/${id}`, userData);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await API.delete(`/users/${id}`);
        return response.data;
    }
};

export default userService;
