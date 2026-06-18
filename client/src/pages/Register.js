import React, { useState } from 'react';
import { registerUser } from '../services/authService';

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
      linkedin: '',
      github: '',
      whatsapp: ''
    }
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.bio.length > 200) {
      newErrors.bio = 'Bio cannot exceed 200 characters';
    }
    if (formData.location.length > 100) {
      newErrors.location = 'Location cannot exceed 100 characters';
    }
    if (formData.contacts.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.contacts.linkedin)) {
      newErrors.linkedin = 'Must be a valid LinkedIn URL';
    }
    if (formData.contacts.github && !/^https?:\/\/(www\.)?github\.com\/.*$/.test(formData.contacts.github)) {
      newErrors.github = 'Must be a valid GitHub URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['email', 'phone', 'linkedin', 'github', 'whatsapp'].includes(name)) {
      setFormData({
        ...formData,
        contacts: { ...formData.contacts, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerUser(formData);
      // redirect or show success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      {errors.username && <p className="error">{errors.username}</p>}

      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <p className="error">{errors.email}</p>}

      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />

      <input name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
      {errors.bio && <p className="error">{errors.bio}</p>}

      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      {errors.location && <p className="error">{errors.location}</p>}

      <input name="linkedin" value={formData.contacts.linkedin} onChange={handleChange} placeholder="LinkedIn" />
      {errors.linkedin && <p className="error">{errors.linkedin}</p>}

      <input name="github" value={formData.contacts.github} onChange={handleChange} placeholder="GitHub" />
      {errors.github && <p className="error">{errors.github}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
