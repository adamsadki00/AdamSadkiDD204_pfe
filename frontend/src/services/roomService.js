
import API from './api';

const roomService = {
    getAllRooms: async () => {
        const response = await API.get('/rooms');
        return response.data;
    },

    getRoomById: async (id) => {
        const response = await API.get(`/rooms/${id}`);
        return response.data;
    },

    createRoom: async (roomData) => {
    const formData = new FormData();
    for (const key in roomData) {
        if (roomData[key] !== null && roomData[key] !== undefined) {
            formData.append(key, roomData[key]);
        }
    }
    
    // ✅ zid hadi bash tchoufi shu katb3at
    for (let [key, value] of formData.entries()) {
        console.log(key, ':', value);
    }
    
    const response = await API.post('/rooms', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
},

    updateRoom: async (id, roomData) => {
        const formData = new FormData();
        for (const key in roomData) {
            if (roomData[key] !== null && roomData[key] !== undefined) {
                formData.append(key, roomData[key]);
            }
        }
        formData.append('_method', 'PUT');
        const response = await API.post(`/rooms/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    deleteRoom: async (id) => {
        const response = await API.delete(`/rooms/${id}`);
        return response.data;
    }
};

export default roomService;
