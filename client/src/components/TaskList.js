import { useState } from 'react';
import { CheckIcon, PencilIcon, TrashIcon, MapPinIcon as PinSolidIcon } from '@heroicons/react/24/solid';
import { MapPinIcon as PinOutlineIcon } from '@heroicons/react/24/outline';

const TaskItem = ({ task, onUpdate, onDelete, sortBy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleUpdate = () => {
    onUpdate(task._id, {
      title: editedTitle,
      description: editedDescription,
      status: task.status,
      pinned: task.pinned
    });
    setIsEditing(false);
  };

  const toggleStatus = () => {
    onUpdate(task._id, {
      title: task.title,
      description: task.description,
      status: !task.status,
      pinned: task.pinned
    });
  };

  const togglePin = () => {
    onUpdate(task._id, {
      title: task.title,
      description: task.description,
      status: task.status,
      pinned: !task.pinned
    });
  };

  // Determine what to display in the highlighted area based on sort selection
  let statusDisplay;
  
  if (sortBy === 'date') {
    // Format date as MM/DD/YYYY, HH:MM AM/PM
    statusDisplay = new Date(task.date).toLocaleString();
  } else if (sortBy === 'title') {
    // Just display the title 
    statusDisplay = task.title;
  } else if (sortBy === 'status') {
    // Display "Progress" when sorting by status
    statusDisplay = task.status ? "Completed" : "In Progress";
  }

  return (
    <div className={`p-4 mb-4 border rounded-lg ${task.pinned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'} ${task.status ? 'bg-green-50' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-2 py-1 mb-2 border rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-2 py-1 mb-2 border rounded"
            rows="2"
          />
          <button
            onClick={handleUpdate}
            className="px-3 py-1 mr-2 text-white bg-blue-500 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-medium ${task.status ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-gray-600 mt-1 ${task.status ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center">
              {/* Right side display based on sort selection - just the value without a label */}
              <div className="mr-4 text-sm font-medium text-red-500">
                {statusDisplay}
              </div>
              <div className="flex space-x-2">
                <button onClick={togglePin} className="text-yellow-500 hover:text-yellow-600">
                  {task.pinned ? (
                    <PinSolidIcon className="w-5 h-5" />
                  ) : (
                    <PinOutlineIcon className="w-5 h-5" />
                  )}
                </button>
                <button onClick={toggleStatus} className="text-green-500 hover:text-green-600">
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="text-blue-500 hover:text-blue-600"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete(task._id)} 
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskList = ({ tasks, onUpdate, onDelete, sortBy, onSortChange }) => {
  if (tasks.length === 0) {
    return <div className="py-8 text-center text-gray-500">No tasks yet. Add one to get started!</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="mr-2 font-medium">Sort by:</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => onSortChange('date')} 
            className={`px-3 py-1 rounded ${sortBy === 'date' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Date
          </button>
          <button 
            onClick={() => onSortChange('title')} 
            className={`px-3 py-1 rounded ${sortBy === 'title' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Title
          </button>
          <button 
            onClick={() => onSortChange('status')} 
            className={`px-3 py-1 rounded ${sortBy === 'status' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Status
          </button>
        </div>
      </div>
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onUpdate={onUpdate} 
          onDelete={onDelete}
          sortBy={sortBy}
        />
      ))}
    </div>
  );
};

export default TaskList;