import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('Your To-Do List 📝');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const todosRef = collection(firestore, "todos");

  useEffect(() => {
    // Fetch todos from Firestore
    async function fetchTodos() {
      try {
        const querySnapshot = await getDocs(todosRef);
        const todosFromDB = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosFromDB);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    // Fetch title from Firestore
    async function fetchTitle() {
      try {
        const titleDocRef = doc(firestore, "todo-list-title", "title");
        const titleDoc = await getDoc(titleDocRef);

        if (titleDoc.exists()) {
          setTitle(titleDoc.data().text); // Set the title from Firestore
        } else {
          // If no title exists, set the default title and save it to Firestore
          await setDoc(titleDocRef, { text: "Your To-Do List 📝" });
          setTitle("Your To-Do List 📝");
        }
      } catch (error) {
        console.error("Error fetching title:", error);
      }
    }

    fetchTodos(); // Fetch todos
    fetchTitle(); // Fetch title
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = { text: inputValue.trim(), completed: false };

      try {
        const docRef = await addDoc(todosRef, newTodo);
        setTodos([...todos, { id: docRef.id, ...newTodo }]); // Add the new todo to the state
        setInputValue(''); // Clear the input field
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  }

  async function handleCheckboxChange(todoToDelete) {
    try {
      await deleteDoc(doc(firestore, "todos", todoToDelete.id)); // Delete the todo from Firestore
      setTodos(todos.filter((todo) => todo.id !== todoToDelete.id)); // Remove it from the state
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function handleTitleBlur() {
    setIsEditingTitle(false);
    try {
      const titleDocRef = doc(firestore, "todo-list-title", "title");
      await setDoc(titleDocRef, { text: title }); // Update the title in Firestore
    } catch (error) {
      console.error("Error saving title:", error);
    }
  }

  function handleTitleKeyDown(e) {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  }

  return (
    <div className="container">
      <div className="title-container">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="title-input"
            autoFocus
          />
        ) : (
          <h1 className="title" onDoubleClick={() => setIsEditingTitle(true)}>
            {title}
          </h1>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          <li className="todo-list" key={todo.id}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setTimeout(() => handleCheckboxChange(todo), 500)}
                id={todo.id}
              />
              <label className="form-check-label" htmlFor={todo.id}>
                {todo.text}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
