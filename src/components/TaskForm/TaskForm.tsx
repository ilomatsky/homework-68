import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTask} from './tasksSlice';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch(addTask({title: newTask}));
      setNewTask('');
    }
  };

  return (
    <div>
      <h2>TODO list</h2>
      <input
        type="text"
        value={newTask}
        required
        onChange={handleInputChange}/>
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default TaskForm;
