import React, { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ token, addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5001/api/tasks', { title, description }, { headers: { Authorization: `Bearer ${token}` } });
    addTask(res.data);
    setTitle(''); setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}
