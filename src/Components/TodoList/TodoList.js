import React, { useState, useEffect } from 'react';
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(""); 

  
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(e) {
    setNewTask(e.target.value);
    setError(""); 
  }

  function addTask() {
    if (newTask.trim() !== "") {
      if (tasks.some(task => task.text === newTask)) {
        setError("Task already exists!"); 
      } else {
        setTasks(t => [...t, { text: newTask, completed: false }]);
        setNewTask("");
        setError("");
      }
    }
  }

  function deleteTask(index) {
    setTasks(tasks.filter((task, i) => i !== index));
  }

  function toggleTaskCompletion(index) {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  }


  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="wrapper">
      <header>To-Do List</header>
      <div className="inputField">
        <input 
          type="text" 
          placeholder="Add your new todo" 
          value={newTask} 
          onChange={handleChange} 
        />
        <button className='add-btn' onClick={addTask}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
          </svg>
        </button>
      </div>
      {error && <p className="error">{error}</p>} 
      <ul className="todoList">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleTaskCompletion(index)} 
            />
            <span className='task'>{task.text}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={() => deleteTask(index)}>
              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
            </svg>
          </li>
        ))}
      </ul>
      <div className="footer">
        <span>You have <span className="pendingTasks">{pendingTasks}</span> pending tasks</span>
        <button onClick={() => setTasks([])}>Clear All</button>
      </div>
    </div>
  )
}

export default TodoList;
