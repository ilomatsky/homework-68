import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axiosApi.get('/tasks.json');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: { title: string }) => {
  const response = await axiosApi.post('/tasks.json', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: { id: string, status: boolean }) => {
  await axiosApi.patch(`/tasks/${task.id}.json`, {status: task.status});
  return task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  await axiosApi.delete(`/tasks/${taskId}.json`);
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as any[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (_state, action) => {
        return action.payload ? Object.keys(action.payload).map((key) => ({id: key, ...action.payload[key]})) : [];
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push({id: action.payload.name, ...action.payload});
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state[index].status = action.payload.status;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
