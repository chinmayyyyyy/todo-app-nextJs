import React from 'react';
import { useToDoStore } from '../store/useToDoStore';

type TaskProps = {
  id: string;
  text: string;
  completed: boolean;
};

const TaskItem: React.FC<TaskProps> = ({ id, text, completed }) => {
  const toggleTask = useToDoStore((state) => state.toggleTask);
  const deleteTask = useToDoStore((state) => state.deleteTask);

  return (
    <div className="flex items-center gap-2 p-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTask(id)}
        className="cursor-pointer"
      />
      <span className={`flex-1 ${completed ? 'line-through' : ''}`}>{text}</span>
      <button onClick={() => deleteTask(id)} className="text-red-500">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
