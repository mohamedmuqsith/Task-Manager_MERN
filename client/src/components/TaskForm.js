import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-8 rounded-lg bg-gray-50">
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task description"
          rows="2"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <PlusCircleIcon className="w-5 h-5 mr-2" />
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;