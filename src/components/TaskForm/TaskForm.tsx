import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTask, fetchTasks} from './tasksSlice';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTask.trim() !== '') {
      dispatch(addTask({title: newTask}));
      setNewTask('');
      dispatch(fetchTasks());
    }
  };

  return (
    <form
      className="container col-6"
      onSubmit={handleAddTask}>
      <h2>TODO list</h2>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={newTask}
          required
          onChange={handleInputChange}/>
        <button
          className="btn btn-primary"
          type="submit">Add</button>
      </div>
    </form>
  );
};

export default TaskForm;
