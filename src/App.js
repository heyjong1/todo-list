import React, { useState } from "react";

function App() {
  // Step 1: State Management
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Step 2: Handlers
  const handleInputChange = (e) => setTaskInput(e.target.value);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput(""); // Clear the input field
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  // Step 3: Conditional Rendering
  const renderTasks = () =>
    tasks.length === 0 ? (
      <p>No tasks available. Add a task!</p>
    ) : (
      tasks.map((task) => (
        <div key={task.id} style={styles.task}>
          <span
            onClick={() => toggleTaskCompletion(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      ))
    );

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter a task..."
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add Task
        </button>
      </div>
      <div style={styles.taskList}>{renderTasks()}</div>
    </div>
  );
}

// Styles (optional, for better presentation)
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
  },
  addButton: {
    marginLeft: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #333",
  },
  taskList: {
    marginTop: "20px",
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default App;
