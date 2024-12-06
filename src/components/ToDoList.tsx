import React from 'react';
import { useToDoStore } from '../store/useToDoStore';
import TaskItem from './TaskItem';

type ToDoListProps = {
  selectedDate: Date;
};

const ToDoList: React.FC<ToDoListProps> = ({ selectedDate }) => {
  const tasks = useToDoStore((state) => state.tasks);

  const filteredTasks = tasks.filter(
    (task) => task.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks for this date.</p>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task.id} {...task} />)
      )}
    </div>
  );
};

export default ToDoList;
