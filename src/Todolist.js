import React, { useState } from 'react';
import './TodoList.css'; // Optionally create a CSS file for styling

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks(prevTasks => [...prevTasks, { id: Date.now(), text: newTask.trim() }].sort((a, b) => a.text.localeCompare(b.text)));
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.text);
  };

  const handleUpdateTask = () => {
    if (newTask.trim()) {
      setTasks(prevTasks => prevTasks.map(task => (task.id === currentTask.id ? { ...task, text: newTask.trim() } : task)).sort((a, b) => a.text.localeCompare(b.text)));
      setIsEditing(false);
      setNewTask('');
      setCurrentTask({});
    }
  };

  return (
    <div className="todo-list-app">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={isEditing ? handleUpdateTask : handleAddTask}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
