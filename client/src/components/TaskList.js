import { useState } from 'react';
import { CheckIcon, PencilIcon, TrashIcon, MapPinIcon as PinSolidIcon } from '@heroicons/react/24/solid';
import { MapPinIcon as PinOutlineIcon } from '@heroicons/react/24/outline';

const TaskItem = ({ task, onUpdate, onDelete }) => {
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
            className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
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
            <div className="flex space-x-2">
              <button onClick={togglePin} className="text-yellow-500 hover:text-yellow-600">
                {task.pinned ? (
                  <PinSolidIcon className="h-5 w-5" />
                ) : (
                  <PinOutlineIcon className="h-5 w-5" />
                )}
              </button>
              <button onClick={toggleStatus} className="text-green-500 hover:text-green-600">
                <CheckIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-blue-500 hover:text-blue-600"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={() => onDelete(task._id)} 
                className="text-red-500 hover:text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            {new Date(task.date).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return <div className="text-center py-8 text-gray-500">No tasks yet. Add one to get started!</div>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TaskList;