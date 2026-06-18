import React, { useState } from 'react';
import { register } from '../services/authService'; // ✅ keep service import
import '../components/Register.css'; // optional styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    location: '',
    contacts: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // ✅ Update state when typing
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Simple validation rules
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Enter a valid email';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.bio.trim()) newErrors.bio = 'Tell us something about yourself';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contacts.trim()) newErrors.contacts = 'Provide at least one contact';
    return newErrors;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess('');
    } else {
      try {
        setErrors({});
        const res = await register(formData); // ✅ call service
        setSuccess('🎉 Account created successfully!');
        console.log('Registered user:', res);
      } catch (err) {
        setSuccess('');
        setErrors({ api: err.message || 'Registration failed' });
      }
    }
  };

  return (
    <div className="register-card">
      <h2>✨ Create Your Profile ✨</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>👤 Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a cool username"
            className="animated-input"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>📧 Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="animated-input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>🔒 Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            className="animated-input"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>📝 Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="animated-input"
          />
          {errors.bio && <p className="error">{errors.bio}</p>}
        </div>

        <div className="form-group">
          <label>📍 Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where are you based?"
            className="animated-input"
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        <div className="form-group">
          <label>📱 Contacts</label>
          <input
            type="text"
            name="contacts"
            value={formData.contacts}
            onChange={handleChange}
            placeholder="Phone, social handle, etc."
            className="animated-input"
          />
          {errors.contacts && <p className="error">{errors.contacts}</p>}
        </div>

        <button type="submit" className="register-btn">🚀 Register</button>
      </form>
      {errors.api && <p className="error">{errors.api}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;
