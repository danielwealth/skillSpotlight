import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div style={styles.card}>
      <h3>{user.username}</h3>
      <p>{user.bio}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <div>
        <p><strong>Contacts:</strong></p>
        {user.contacts.email && <p>Email: {user.contacts.email}</p>}
        {user.contacts.phone && <p>Phone: {user.contacts.phone}</p>}
        {user.contacts.linkedin && <p>LinkedIn: {user.contacts.linkedin}</p>}
        {user.contacts.github && <p>GitHub: {user.contacts.github}</p>}
        {user.contacts.whatsapp && <p>WhatsApp: {user.contacts.whatsapp}</p>}
      </div>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px', background: '#f9f9f9' }
};

export default ProfileCard;
