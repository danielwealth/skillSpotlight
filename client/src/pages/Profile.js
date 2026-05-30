import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import { getProfile } from '../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>My Profile</h2>
      {user ? <ProfileCard user={user} /> : <p style={{ textAlign: 'center' }}>Loading...</p>}
    </div>
  );
};

export default Profile;
