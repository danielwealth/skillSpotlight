import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Skill Spotlight Logo" style={styles.logoImg} />
        <h2 style={styles.logoText}>Skill Spotlight</h2>
      </div>
      <ul style={styles.links}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/videos">Videos</Link></li>

       {token ? (
  <>
    <li><Link to="/profile">My Profile</Link></li>
    <li><Link to="/upload">Upload</Link></li>
    <li><Link to="/my-video">My Video</Link></li> {/* New link */}
    <li><button onClick={handleLogout} style={styles.logoutBtn}>Logout</button></li>
  </>
) : (
  <>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
  </>
)}

      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: '#222',
    color: '#fff'
  },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoImg: { height: '40px' },
  logoText: { margin: 0 },
  links: { listStyle: 'none', display: 'flex', gap: '15px', alignItems: 'center' },
  logoutBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default Navbar;
