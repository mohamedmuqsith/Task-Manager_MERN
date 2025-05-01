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

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'status') {
      return a.status === b.status ? 0 : a.status ? 1 : -1;
    } else {
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
      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-1 border rounded"
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
        </select>
      </div>
      <TaskList 
        tasks={sortedTasks} 
        onUpdate={updateTask} 
        onDelete={deleteTask} 
      />
    </div>
  );
};

export default Dashboard;