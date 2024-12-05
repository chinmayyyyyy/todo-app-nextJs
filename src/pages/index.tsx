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

  // Filtered dates till today 
  const getDatesUpToToday = () => {
    const today = new Date();
    const activeDates: Date[] = [];

    // Loop through the current month and add all dates until today
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl text-blue font-bold mb-5">To-Do List</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Active Dates</h2>
        <div className="flex gap-4 overflow-x-auto py-2">
          {dates.map((activeDate, index) => (
            <div
              key={index}
              className={`flex items-center justify-center flex-col cursor-pointer ${
                selectedDate.toDateString() === activeDate.toDateString() ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => handleDateChange(activeDate)}
            >
              <div className="font-semibold">{formatDate(activeDate)}</div>
            </div>
          ))}
        </div>
      </div>

      <AddTaskForm selectedDate={selectedDate} />
      <ToDoList selectedDate={selectedDate} />
    </div>
  );
};

export default Home;
