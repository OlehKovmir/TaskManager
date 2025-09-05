import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.user.token);

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
