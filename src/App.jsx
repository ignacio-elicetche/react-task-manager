// 1. Import React Hooks
import { useState, useEffect } from 'react';

// 2. Import Components
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

// 3. Import external libraries
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function App() {
  // --- STATES ---
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- EFFECT 1: READ from LocalStorage on init ---
  useEffect(() => {
    // 1. Try to get saved data
    const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

    // 2. If data exists, load it into state
    if (getTasks == null) {
      setTasks([]);
    } else {
      setTasks(getTasks);
    }
  }, []); 

  // --- EFFECT 2: Loading Spinner (Simulated) ---
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);


  // --- FUNCTIONS ---

  // Add Task
  const addTask = (task) => {
    const id = uuidv4();
    const newTask = { id, ...task };
    
    // Save to visible list
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);

    // Save to browser storage
    localStorage.setItem("taskAdded", JSON.stringify(newTasks));

    Swal.fire({
      icon: 'success',
      title: 'Great!',
      text: 'You have added a new task'
    });
  }

  // Delete Task
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    
    setTasks(newTasks);
    
    // Update browser storage
    localStorage.setItem("taskAdded", JSON.stringify(newTasks));

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The task has been deleted successfully.'
    });
  }

  // Edit Task (Final Version with LocalStorage)
  const editTask = (id) => {
    // 1. Find current task to pre-fill data
    const taskToEdit = tasks.find((task) => task.id === id);

    // 2. Show modal with two inputs
    Swal.fire({
      title: 'Edit Task',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Task Name" value="${taskToEdit.text}">
        <input id="swal-input2" class="swal2-input" placeholder="Date and Time" value="${taskToEdit.day}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Get values from modal inputs
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    }).then((result) => {
      // 3. If user clicked "Save"
      if (result.isConfirmed) {
        const [newText, newDay] = result.value;

        // Validate that fields are not empty
        if (!newText || !newDay) {
          Swal.fire('Error', 'Both fields are required', 'error');
          return;
        }

        // 4. Calculate new task list
        const updatedTasks = tasks.map((task) => 
          task.id === id ? { ...task, text: newText, day: newDay } : task
        );

        // 5. Update State and LocalStorage
        setTasks(updatedTasks);
        localStorage.setItem("taskAdded", JSON.stringify(updatedTasks));

        // 6. Success message
        Swal.fire('Updated!', 'The task has been modified.', 'success');
      }
    });
  }

  // --- VIEW ---
  return (
    <>
      {loading ? (
        // A) IF LOADING: Spinner
        <div className="spinnerContainer">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // B) IF LOADED: Normal App
        <div className="container">
          <Header
            showForm={() => setShowAddTask(!showAddTask)}
            changeTextAndColor={showAddTask}
          />

          {showAddTask && <AddTask onSave={addTask} />}

          <h3>Pending Tasks: {tasks.length}</h3>

          {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
          ) : (
            <p style={{ textAlign: "center" }}>No pending tasks.</p>
          )}
        </div>
      )}
    </>
  );
}

export default App;