import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasks, updateTask, deleteTask} from '../TaskForm/tasksSlice';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCheckboxChange = (id: string, status: boolean) => {
    dispatch(updateTask({id, status: !status}));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.status} onChange={() => handleCheckboxChange(task.id, task.status)}/>
            <span>{task.title}</span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
