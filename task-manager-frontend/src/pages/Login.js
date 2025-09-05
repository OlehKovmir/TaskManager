import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../store';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      dispatch(setToken(res.data.token));
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
