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
    contacts: '',
    phone: '',
    whatsapp: '',
    youtube: '',
    github: '',
    linkedin: '',
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

  // ✅ Validation rules
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Enter a valid email';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.bio.trim()) newErrors.bio = 'Tell us something about yourself';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contacts.trim()) newErrors.contacts = 'Provide at least one contact';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp contact is required';
    if (!formData.youtube.trim()) newErrors.youtube = 'YouTube link is required';
    if (!formData.github.trim()) newErrors.github = 'GitHub profile is required';
    if (!formData.linkedin.trim()) newErrors.linkedin = 'LinkedIn profile is required';
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
        setErrors({ api: err.message || 'Registration failed' });
      }
    }
  };

  return (
    <div className="register-card">
      <h2>✨ Create Your Profile ✨</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
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
