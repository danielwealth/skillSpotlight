import React, { useState } from 'react';
import { registerUser } from '../services/authService'; // ✅ correct import
import '../components/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    location: '',
    contacts: {
      email: '',
      phone: '',
      whatsapp: '',
      github: '',
      linkedin: '',
      youtube: '',
    },
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // ✅ Update state when typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['email','phone','whatsapp','github','linkedin','youtube'].includes(name)) {
      setFormData({
        ...formData,
        contacts: { ...formData.contacts, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Validation rules
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Enter a valid email';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.bio.trim()) newErrors.bio = 'Tell us something about yourself';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contacts.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.contacts.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp contact is required';
    if (!formData.contacts.github.trim()) newErrors.github = 'GitHub profile is required';
    if (!formData.contacts.linkedin.trim()) newErrors.linkedin = 'LinkedIn profile is required';
    if (!formData.contacts.youtube.trim()) newErrors.youtube = 'YouTube link is required';
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
        const res = await registerUser(formData); // ✅ call service
        setSuccess('🎉 Account created successfully!');
        console.log('Registered user:', res);
      } catch (err) {
        setSuccess('');
        setErrors({ api: err.response?.data?.message || 'Registration failed' });
      }
    }
  };

  return (
    <div className="register-card">
      <h2>✨ Create Your Profile ✨</h2>
      <form onSubmit={handleSubmit}>
        {/* Top-level fields */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="animated-input"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="animated-input"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="animated-input"
          />
          {errors.bio && <p className="error">{errors.bio}</p>}
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className="animated-input"
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        {/* Contacts nested */}
        {['phone','whatsapp','github','linkedin','youtube'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'phone' || field === 'whatsapp' ? 'tel' : 'url'}
              name={field}
              value={formData.contacts[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className="animated-input"
            />
            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}

        <button type="submit" className="register-btn">🚀 Register</button>
      </form>
      {errors.api && <p className="error">{errors.api}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;
import React, { useState } from 'react';
import { registerUser } from '../services/authService'; // ✅ correct import
import '../components/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    location: '',
    contacts: {
      email: '',
      phone: '',
      whatsapp: '',
      github: '',
      linkedin: '',
      youtube: '',
    },
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // ✅ Update state when typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['email','phone','whatsapp','github','linkedin','youtube'].includes(name)) {
      setFormData({
        ...formData,
        contacts: { ...formData.contacts, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Validation rules
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Enter a valid email';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.bio.trim()) newErrors.bio = 'Tell us something about yourself';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contacts.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.contacts.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp contact is required';
    if (!formData.contacts.github.trim()) newErrors.github = 'GitHub profile is required';
    if (!formData.contacts.linkedin.trim()) newErrors.linkedin = 'LinkedIn profile is required';
    if (!formData.contacts.youtube.trim()) newErrors.youtube = 'YouTube link is required';
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
        const res = await registerUser(formData); // ✅ call service
        setSuccess('🎉 Account created successfully!');
        console.log('Registered user:', res);
      } catch (err) {
        setSuccess('');
        setErrors({ api: err.response?.data?.message || 'Registration failed' });
      }
    }
  };

  return (
    <div className="register-card">
      <h2>✨ Create Your Profile ✨</h2>
      <form onSubmit={handleSubmit}>
        {/* Top-level fields */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="animated-input"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="animated-input"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="animated-input"
          />
          {errors.bio && <p className="error">{errors.bio}</p>}
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className="animated-input"
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        {/* Contacts nested */}
        {['phone','whatsapp','github','linkedin','youtube'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'phone' || field === 'whatsapp' ? 'tel' : 'url'}
              name={field}
              value={formData.contacts[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className="animated-input"
            />
            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}

        <button type="submit" className="register-btn">🚀 Register</button>
      </form>
      {errors.api && <p className="error">{errors.api}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;
