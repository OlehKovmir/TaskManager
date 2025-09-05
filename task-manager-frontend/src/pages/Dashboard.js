import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, addTask, updateTask, deleteTask, logout } from '../store';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const tasks = useSelector(state => state.tasks.list);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5001/api/tasks', { headers: { Authorization: `Bearer ${token}` } });
    dispatch(setTasks(res.data));
  };

  useEffect(() => { fetchTasks(); }, []);

  const completedPercent = tasks.length ? Math.round(tasks.filter(t => t.completed).length / tasks.length * 100) : 0;

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <ProgressBar percent={completedPercent} />
      <TaskForm token={token} addTask={(task) => dispatch(addTask(task))} />
      <TaskList tasks={tasks} token={token} updateTask={(task) => dispatch(updateTask(task))} deleteTask={(id) => dispatch(deleteTask(id))} />
    </div>
  );
}
