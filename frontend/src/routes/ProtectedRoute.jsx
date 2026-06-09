
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--dark-bg)' }}>
                <div className="text-gold">Loading...</div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
