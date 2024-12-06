import React, { useState } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import { useToDoStore } from '../store/useToDoStore';
import { motion } from 'framer-motion'; 

type TaskProps = {
  id: string;
  text: string;
  completed: boolean;
};

const TaskItem: React.FC<TaskProps> = ({ id, text, completed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const toggleTask = useToDoStore((state) => state.toggleTask);
  const updateTask = useToDoStore((state) => state.editTask);
  const deleteTask = useToDoStore((state) => state.deleteTask);

  const handleEdit = () => {
    if (isEditing && newText.trim() !== '') {
      updateTask(id, newText); 
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteTask(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md text-white transition-opacity duration-300 ${
        completed ? 'opacity-50' : ''
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 border border-gray-600 bg-gray-700 p-2 rounded-lg text-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      ) : (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTask(id)}
            className="cursor-pointer accent-gray-500"
          />
          <span className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-white'}`}>{text}</span>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all"
          title={isEditing ? 'Save Task' : 'Edit Task'}
        >
          {isEditing ? (
            <span className="text-sm font-bold">Save</span>
          ) : (
            <PencilSquareIcon className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all"
          title="Delete Task"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
