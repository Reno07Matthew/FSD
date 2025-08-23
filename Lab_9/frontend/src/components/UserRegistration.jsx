import React, { useState } from 'react';
import '../cyberpunk-signup.css';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';
import { User, Mail, Phone, Upload, Loader2, ArrowLeft, Database, Home } from 'lucide-react';

const UserRegistration = ({ onUserRegistered, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profile_picture: null
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

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
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.register(formData);
      toast.success('User registered successfully! Check email for confirmation.');

      setFormData({
        name: '',
        email: '',
        phone: '',
        profile_picture: null
      });
      setPreviewImage(null);

      const fileInput = document.getElementById('profile_picture');
      if (fileInput) fileInput.value = '';

      if (onUserRegistered) {
        onUserRegistered(response.user);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      if (error.response?.data?.details && Array.isArray(error.response.data.details)) {
        error.response.data.details.forEach((err) => {
          toast.error(err.msg || err.message || JSON.stringify(err));
        });
      } else {
        toast.error(errorMessage);
      }
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-bg">
      <div className="cyber-grid" />
      
      {/* Navigation Bar */}
      <div className="fixed top-4 left-4 z-50 flex gap-4">
        <button
          onClick={() => {
            console.log('Home button clicked');
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
            console.log('Database button clicked');
            onNavigate && onNavigate('users');
          }}
          className="cyber-nav-btn group"
          title="View Database"
        >
          <Database className="w-5 h-5" />
          <span className="cyber-nav-text">DATABASE</span>
        </button>
      </div>

      <div className="card cyber-card max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-transparent rounded-full flex items-center justify-center mb-4 border-2 border-cyan-400 shadow-lg">
            <User className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 
            className="text-3xl font-extrabold mb-2"
            style={{color:'#00fff7', fontFamily:'Share Tech Mono, Orbitron, monospace', textShadow:'0 0 12px #ff00ea'}}
          >
            User Signup
          </h2>
          <p className="text-xs" style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}>
            Create your account and get email confirmation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="Enter your full name"
                required
                style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="Enter your email address"
                required
                style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="Enter your phone number"
                required
                style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="form-group">
            <label htmlFor="profile_picture" className="form-label">Profile Picture</label>
            <div className="mt-1 flex items-center space-x-4">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center border-2 border-cyan-400">
                  <User className="w-8 h-8 text-cyan-400" />
                </div>
              )}
              <label
                htmlFor="profile_picture"
                className="cursor-pointer bg-gradient-to-r from-cyan-400 to-pink-500 py-2 px-3 border border-cyan-400 rounded-md shadow-sm text-sm leading-4 font-medium text-black hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
              >
                <Upload className="w-4 h-4 inline mr-2 text-black" />
                Choose File
              </label>
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-xs mt-1" style={{color:'#00fff7', fontFamily:'Share Tech Mono, Orbitron, monospace'}}>
              PNG, JPG, GIF up to 5MB
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center"
            style={{fontFamily:'Share Tech Mono, Orbitron, monospace'}}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2 text-pink-400" />
                Registering...
              </>
            ) : (
              'Register User'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
