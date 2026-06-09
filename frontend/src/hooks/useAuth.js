
import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: authService.isAuthenticated(),
        isAdmin: authService.isAdmin()
    };
};
