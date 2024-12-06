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
    <div className="min-h-screen bg-black py-10 px-6 text-white relative">
      <div className="bg-gray-900 shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-white">Todo ?</h1>
        <div className="flex justify-center gap-2 mt-4">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDate.toDateString() === date.toDateString()
                  ? 'bg-white text-black'
                  : 'bg-gray-700 text-gray-300'
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
        className="fixed bottom-8 right-8 p-4 rounded-full bg-blue-600 text-white text-2xl font-bold shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        title="Add Task"
      >
        +
      </button>
    </div>
  );
};

export default Home;
