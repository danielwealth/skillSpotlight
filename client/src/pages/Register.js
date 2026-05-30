import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { register } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' }
};

export default Register;
