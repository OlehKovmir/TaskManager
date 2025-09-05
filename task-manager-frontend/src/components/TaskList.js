import React from 'react';
import axios from 'axios';
import './TaskList.css';

export default function TaskList({ tasks, token, updateTask, deleteTask }) {

  const toggleComplete = async (task) => {
    const res = await axios.put(`http://localhost:5001/api/tasks/${task._id}`, { completed: !task.completed }, { headers: { Authorization: `Bearer ${token}` } });
    updateTask(res.data);
  };

  const handleDelete = async (task) => {
    await axios.delete(`http://localhost:5001/api/tasks/${task._id}`, { headers: { Authorization: `Bearer ${token}` } });
    deleteTask(task._id);
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id} className={task.completed ? 'completed' : ''}>
          <span onClick={() => toggleComplete(task)}>{task.title}</span>
          <button onClick={() => handleDelete(task)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
