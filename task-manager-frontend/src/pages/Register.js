import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../store';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', { name, email, password });
      dispatch(setToken(res.data.token));
      navigate('/');
    } catch (err) {
      alert('Error registering');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
