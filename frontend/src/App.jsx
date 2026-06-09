import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RoomManagementPage from './pages/RoomManagementPage';
import BookingManagementPage from './pages/BookingManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/rooms" element={<RoomsPage />} />
                    <Route path="/rooms/:id" element={<RoomDetailsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <UserDashboard />
                        </ProtectedRoute>
                    } />
                </Route>
                
                <Route element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }>
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/rooms" element={<RoomManagementPage />} />
                    <Route path="/admin/bookings" element={<BookingManagementPage />} />
                    <Route path="/admin/users" element={<UserManagementPage />} />
                    <Route path="/admin/settings" element={<AdminSettingsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}