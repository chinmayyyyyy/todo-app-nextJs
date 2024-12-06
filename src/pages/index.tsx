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
    <div className="min-h-screen bg-white py-10 px-6 text-black relative">
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6 border border-gray-300">
        <h1 className="text-3xl font-bold text-black">TODO</h1>
          <div className="flex overflow-x-auto gap-2 mt-4 scrollbar-thin  justify-center scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDate.toDateString() === date.toDateString()
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700'
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
        className="fixed bottom-8 right-8 p-4 rounded-full bg-black text-white text-2xl font-bold shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all"
        title="Add Task"
      >
        +
      </button>
    </div>
  );
};

export default Home;
