import React, {useEffect} from 'react';
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
    <div className="container col-6">
      <ul className="list-group">
        {tasks.map((task: any) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.status}
              onChange={() => handleCheckboxChange(task.id, task.status)}/>
            <span>{task.title}</span>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
