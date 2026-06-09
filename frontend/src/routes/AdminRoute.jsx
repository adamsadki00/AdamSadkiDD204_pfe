
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--dark-bg)' }}>
                <div className="text-gold">Loading...</div>
            </div>
        );
    }

    return isAuthenticated && isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
