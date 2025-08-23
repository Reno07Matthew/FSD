import React, { useState, useEffect } from 'react';
import '../cyberpunk-signup.css';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle,
  Loader2,
  RefreshCw,
  UserPlus,
  ArrowLeft,
  Home
} from 'lucide-react';

const UserList = ({ refreshTrigger, onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, unconfirmed: 0 });

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.users);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Fetch users error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userAPI.getUserStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(userId);
        toast.success('User deleted successfully');
        fetchUsers();
        fetchStats();
      } catch (error) {
        toast.error('Failed to delete user');
        console.error('Delete user error:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await userAPI.updateUser(editingUser.id, updatedData);
      toast.success('User updated successfully');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user');
      console.error('Update user error:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin w-8 h-8 text-cyan-400" />
        <span className="ml-2 text-cyan-400">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="cyber-bg">
      <div className="cyber-grid" />
      
      {/* Navigation Bar */}
      <div className="fixed top-4 left-4 z-50 flex gap-4">
        <button
          onClick={() => {
            console.log('Home button clicked from UserList');
            onNavigate && onNavigate('home');
          }}
          className="cyber-nav-btn group"
          title="Back to Home"
        >
          <Home className="w-5 h-5" />
          <span className="cyber-nav-text">HOME</span>
        </button>
        
        <button
          onClick={() => {
            console.log('Register button clicked from UserList');
            onNavigate && onNavigate('register');
          }}
          className="cyber-nav-btn group"
          title="User Registration"
        >
          <UserPlus className="w-5 h-5" />
          <span className="cyber-nav-text">REGISTER</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Header with Stats */}
        <div className="card cyber-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-cyan-400 mr-3" />
              <h2 className="text-2xl font-bold" style={{color:'#00fff7', fontFamily:'Share Tech Mono, Orbitron, monospace', textShadow:'0 0 8px #ff00ea'}}>User Management</h2>
            </div>
            <button
              onClick={fetchUsers}
              className="cyber-refresh-btn flex items-center px-4 py-2"
              style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg cyber-card" style={{borderColor:'#00fff7', boxShadow:'0 0 16px #00fff7'}}>
              <div className="flex items-center">
                <UserPlus className="w-6 h-6 text-cyan-400 mr-2" />
                <div>
                  <p className="text-sm" style={{color:'#00fff7'}}>Total Users</p>
                  <p className="text-2xl font-bold" style={{color:'#00fff7'}}>{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg cyber-card" style={{borderColor:'#00fff7', boxShadow:'0 0 16px #00fff7'}}>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-cyan-400 mr-2" />
                <div>
                  <p className="text-sm" style={{color:'#00fff7'}}>Email Confirmed</p>
                  <p className="text-2xl font-bold" style={{color:'#00fff7'}}>{stats.confirmed}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg cyber-card" style={{borderColor:'#ff00ea', boxShadow:'0 0 16px #ff00ea'}}>
              <div className="flex items-center">
                <XCircle className="w-6 h-6 text-magenta-400 mr-2" />
                <div>
                  <p className="text-sm" style={{color:'#ff00ea'}}>Pending Confirmation</p>
                  <p className="text-2xl font-bold" style={{color:'#ff00ea'}}>{stats.unconfirmed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
            />
          </div>
        </div>

        {/* Users Grid */}
        {filteredUsers.length === 0 ? (
          <div className="card cyber-card p-12 text-center">
            <Users className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium" style={{color:'#00fff7', fontFamily:'Share Tech Mono, Orbitron, monospace'}}> 
              {searchTerm ? 'No users found' : 'No users registered yet'}
            </h3>
            <p className="text-xs" style={{color:'#ff00ea', fontFamily:'Share Tech Mono, Orbitron, monospace'}}>
              {searchTerm 
                ? 'Try adjusting your search criteria' 
                : 'Register the first user to get started'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-fr">
            {filteredUsers.map((user) => (
              <CyberUserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingUser && (
          <EditUserModal
            user={editingUser}
            onUpdate={handleUpdate}
            onCancel={() => setEditingUser(null)}
          />
        )}
      </div>
    </div>
  );
};

// Cyberpunk User Card Component
const CyberUserCard = ({ user, onEdit, onDelete }) => {
  const getProfileImage = () => {
    if (user.profile_picture) {
      return `http://localhost:5000${user.profile_picture}`;
    }
    return null;
  };

  return (
    <div className="cyber-user-card group">
      {/* Card Border Glow */}
      <div className="cyber-card-border"></div>
      
      {/* Card Content */}
      <div className="cyber-card-content">
        {/* Header with Profile and Actions */}
        <div className="cyber-card-header">
          <div className="cyber-profile-section">
            {getProfileImage() ? (
              <img
                src={getProfileImage()}
                alt={user.name}
                className="cyber-avatar"
              />
            ) : (
              <div className="cyber-avatar-placeholder">
                <span className="cyber-avatar-initial">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="cyber-user-info">
              <h3 className="cyber-user-name">{user.name}</h3>
              <div className="cyber-status-badge">
                {user.is_email_confirmed ? (
                  <CheckCircle className="w-3 h-3 text-green-400 mr-1" />
                ) : (
                  <XCircle className="w-3 h-3 text-orange-400 mr-1" />
                )}
                <span className={`cyber-status-text ${
                  user.is_email_confirmed ? 'text-green-400' : 'text-orange-400'
                }`}>
                  {user.is_email_confirmed ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="cyber-action-buttons">
            <button
              onClick={() => onEdit(user)}
              className="cyber-edit-btn"
              title="Edit User"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="cyber-delete-btn"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="cyber-contact-section">
          <div className="cyber-contact-item">
            <Mail className="cyber-contact-icon" />
            <span className="cyber-contact-text">{user.email}</span>
          </div>
          <div className="cyber-contact-item">
            <Phone className="cyber-contact-icon" />
            <span className="cyber-contact-text">{user.phone}</span>
          </div>
        </div>

        {/* Footer with Registration Date */}
        <div className="cyber-card-footer">
          <div className="cyber-date-section">
            <span className="cyber-date-label">REGISTERED:</span>
            <span className="cyber-date-value">
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: '2-digit',
                month: 'short',
                day: '2-digit'
              })}
            </span>
          </div>
          <div className="cyber-id-section">
            <span className="cyber-id-label">ID:</span>
            <span className="cyber-id-value">#{user.id.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div className="cyber-hover-glow"></div>
    </div>
  );
};

// Edit User Modal Component
const EditUserModal = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profile_picture: null
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user.profile_picture) {
      setPreviewImage(`http://localhost:5000${user.profile_picture}`);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profile_picture: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit User</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Profile Picture</label>
            <div className="flex items-center space-x-4">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Updating...
                </>
              ) : (
                'Update User'
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserList;
