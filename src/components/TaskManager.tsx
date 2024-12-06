import React, { useState } from 'react';
import AddTaskForm from '../components/AddTaskForm';
import ToDoList from '../components/ToDoList';

interface TaskManagerProps {
  selectedDate: Date;
}

const TaskManager: React.FC<TaskManagerProps> = ({ selectedDate }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const toggleAddTaskForm = () => {
    setShowAddTaskForm(prev => !prev);
  };

  return (
    <div>
      {showAddTaskForm && <AddTaskForm selectedDate={selectedDate} />}
      <ToDoList selectedDate={selectedDate} />
      <button
        onClick={toggleAddTaskForm}
        className="fixed bottom-8 right-8 p-5 rounded-full bg-blue-600 text-white text-3xl font-bold shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
        title="Add Task"
      >
        +
      </button>
    </div>
  );
};

export default TaskManager;
