import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { login } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert('Login successful!');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' }
};

export default Login;
