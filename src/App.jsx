import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('Your To-Do List');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, inputValue.trim()]);
      setInputValue('');
    }
  }

  function handleCheckboxChange(todoToDelete) {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  }

  function handleTitleDoubleClick() {
    setIsEditingTitle(true);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTitleBlur() {
    setIsEditingTitle(false);
  }

  function handleTitleKeyDown(e) {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  }

  return (
    <div className="container">
      <div className="title-container">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="title-input"
            autoFocus
          />
        ) : (
          <h1 className="title" onDoubleClick={handleTitleDoubleClick}>
            {title}
          </h1>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="input"
          placeholder="Enter a new task"
        />
        <button type="submit" className="add-todo">
          ➕ Add Todo
        </button>
      </form>
      <hr width="80%" size="2" />
      <ul>
        {todos.map((todo) => (
          <ul className="todo-list" key={todo}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setTimeout(() => handleCheckboxChange(todo), 500)}
                id={todo}
              />
              <label className="form-check-label" htmlFor={todo}>
                {todo}
              </label>
            </div>
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default App;
