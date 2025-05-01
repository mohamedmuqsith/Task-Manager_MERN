import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks');
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Sort tasks based on the selected sort criteria
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by pinned status first (pinned items always come first)
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    
    // Then apply the selected sort criteria
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'status') {
      // Completed tasks come last
      return a.status === b.status ? 0 : a.status ? 1 : -1;
    } else {
      // Default: sort by date (newest first)
      return new Date(b.date) - new Date(a.date);
    }
  });

  if (loading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Tasks</h1>
      <TaskForm onAdd={addTask} />
      <TaskList 
        tasks={sortedTasks} 
        onUpdate={updateTask} 
        onDelete={deleteTask}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
};

export default Dashboard;