import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

const AdminSettingsPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // In a real app, you would update the user via API
    setMessage('Profile updated successfully!');
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setMessage('Password updated successfully!');
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">Settings</h1>

      <div className="settings-grid">
        <div className="settings-card glass-effect">
          <h2>Profile Settings</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
              />
            </div>
            <button type="submit" className="btn-primary">Update Profile</button>
          </form>
        </div>

        <div className="settings-card glass-effect">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordUpdate}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Change Password</button>
          </form>
        </div>
      </div>

      {message && (
        <div className="message-box glass-effect">
          <p>{message}</p>
        </div>
      )}

      <style>{`
        .settings-page {
          width: 100%;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }
        .settings-card {
          padding: 30px;
        }
        .settings-card h2 {
          margin-bottom: 25px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: var(--gray-text);
        }
        .form-group input {
          width: 100%;
          padding: 12px;
          background: var(--dark-bg);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
          color: var(--white-text);
        }
        .form-group input:disabled {
          opacity: 0.5;
        }
        .message-box {
          margin-top: 20px;
          padding: 15px;
          text-align: center;
          color: var(--primary-gold);
        }
      `}</style>
    </div>
  );
};

export default AdminSettingsPage;
