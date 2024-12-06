import React, { useState, useEffect } from 'react';
import AddTaskForm from '../components/AddTaskForm';
import ToDoList from '../components/ToDoList';

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const getDatesUpToToday = () => {
    const today = new Date();
    const activeDates: Date[] = [];

    for (let day = 1; day <= today.getDate(); day++) {
      const activeDate = new Date(today.getFullYear(), today.getMonth(), day);
      activeDates.push(activeDate);
    }

    return activeDates;
  };

  useEffect(() => {
    setDates(getDatesUpToToday());
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const toggleAddTaskForm = () => {
    setShowAddTaskForm((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-6 text-gray-800 relative">
      <div className="bg-white  shadow-lg rounded-xl p-6 mb-6 border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">To-Do Manager</h1>
        <p className="text-gray-600 text-sm mt-2">Stay organized and track your tasks effortlessly.</p>
        <div className="flex justify-center overflow-x-auto gap-3 mt-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                selectedDate.toDateString() === date.toDateString()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
              }`}
              onClick={() => handleDateChange(date)}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
      </div>

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

export default Home;
