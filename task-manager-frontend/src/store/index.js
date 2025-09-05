import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { token: localStorage.getItem('token') || null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    }
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { list: [] },
  reducers: {
    setTasks: (state, action) => { state.list = action.payload; },
    addTask: (state, action) => { state.list.unshift(action.payload); },
    updateTask: (state, action) => {
      state.list = state.list.map(t => t._id === action.payload._id ? action.payload : t);
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter(t => t._id !== action.payload);
    }
  }
});

export const { setToken, logout } = userSlice.actions;
export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    tasks: tasksSlice.reducer
  }
});

export default store;
