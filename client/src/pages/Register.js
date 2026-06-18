import React, { useState } from 'react';
import { registerUser } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    location: '',
    updateVideo: '',
    contacts: { email: '', phone: '', linkedin: '', github: '', whatsapp: '' }
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.bio.length > 200) newErrors.bio = 'Bio cannot exceed 200 characters';
    if (formData.location.length > 100) newErrors.location = 'Location cannot exceed 100 characters';
    if (formData.updateVideo && !/^https?:\/\/.*$/.test(formData.updateVideo)) newErrors.updateVideo = 'Must be a valid URL';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['email','phone','linkedin','github','whatsapp'].includes(name)) {
      setFormData({ ...formData, contacts: { ...formData.contacts, [name]: value } });
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
      {errors.username && <p>{errors.username}</p>}

      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <p>{errors.email}</p>}

      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />

      <input name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
      {errors.bio && <p>{errors.bio}</p>}

      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      {errors.location && <p>{errors.location}</p>}

      <input name="updateVideo" value={formData.updateVideo} onChange={handleChange} placeholder="Profile Video URL" />
      {errors.updateVideo && <p>{errors.updateVideo}</p>}

      <input name="linkedin" value={formData.contacts.linkedin} onChange={handleChange} placeholder="LinkedIn" />
      <input name="github" value={formData.contacts.github} onChange={handleChange} placeholder="GitHub" />
      <input name="phone" value={formData.contacts.phone} onChange={handleChange} placeholder="Phone" />
      <input name="whatsapp" value={formData.contacts.whatsapp} onChange={handleChange} placeholder="WhatsApp" />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
