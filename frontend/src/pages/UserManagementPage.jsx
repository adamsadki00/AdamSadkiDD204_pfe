import { useEffect, useState } from 'react';
import API from '../services/api';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await API.get('/users');
      setUsers(response.data || []);
    } catch (err) {
      // If API not implemented, use some test data
      setUsers([
        { id: 1, name: 'Admin User', email: 'admin@hotel.com', role: 'admin' },
        { id: 2, name: 'Test User', email: 'test@example.com', role: 'customer' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u => {
    if (!search) return true;
    return (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="management-page">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
      </div>

      <input
        type="text"
        placeholder="Search users by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="table-container glass-effect">
        {loading ? (
          <div className="text-center text-gold">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`user-role ${user.role}`}>{user.role}</span>
                  </td>
                  <td>
                    {user.role !== 'admin' && (
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .user-role {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          text-transform: capitalize;
        }
        .user-role.admin {
          background: rgba(212,175,55,0.2);
          color: var(--primary-gold);
        }
        .user-role.customer {
          background: rgba(108,117,125,0.2);
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default UserManagementPage;
