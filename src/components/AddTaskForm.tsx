import React, { useState } from 'react';
import { useToDoStore } from '../store/useToDoStore';

type AddTaskFormProps = {
  selectedDate: Date;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ selectedDate }) => {
  const [text, setText] = useState('');
  const addTask = useToDoStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, selectedDate.toISOString().split('T')[0]);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex text-black items-center gap-2 p-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
