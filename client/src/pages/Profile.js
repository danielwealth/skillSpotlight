import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getProfile, updateProfile } from '../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setFormData({
          bio: data.bio || '',
          location: data.location || '',
          contacts: {
            email: data.contacts?.email || '',
            phone: data.contacts?.phone || '',
            linkedin: data.contacts?.linkedin || '',
            github: data.contacts?.github || '',
            whatsapp: data.contacts?.whatsapp || ''
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

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
    try {
      const updated = await updateProfile(formData);
      setUser(updated);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div style={styles.container}>
      {user && <ProfileCard user={user} />}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Edit Profile</h3>
        <input name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input name="email" value={formData.contacts.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={formData.contacts.phone} onChange={handleChange} placeholder="Phone" />
        <input name="linkedin" value={formData.contacts.linkedin} onChange={handleChange} placeholder="LinkedIn" />
        <input name="github" value={formData.contacts.github} onChange={handleChange} placeholder="GitHub" />
        <input name="whatsapp" value={formData.contacts.whatsapp} onChange={handleChange} placeholder="WhatsApp" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', gap: '20px', padding: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }
};

export default Profile;
