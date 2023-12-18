import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>TODO App</h1>
      <TaskList/>
      <TaskForm/>
    </div>
  );
};

export default App;