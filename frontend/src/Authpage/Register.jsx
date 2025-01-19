import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send name, email, and password to the server for registration
      const res = await axios.post('http://localhost:5000/api/register', { name, email, password });
      alert(res.data.message);
      navigate('/login');  // Redirect to login page after successful registration
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className='back_ground'> 
    <form onSubmit={handleSubmit} className='Login_page'>
      <h2>Sign in to</h2>

      {/* Name input */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>
    <p style={{fontSize:20}}> Already have an account?<Link to="/login" id='links' >Login</Link></p>

    </div>
  );
};

export default Register;
