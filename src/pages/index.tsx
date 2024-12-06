import React, { useState, useEffect } from 'react';
import DateSelector from '../components/DateSelector';
import TaskManager from '../components/TaskManager';

// Get all dates up to today
const getDatesUpToToday = () => {
  const today = new Date();
  const activeDates: Date[] = [];
  for (let day = 1; day <= today.getDate(); day++) {
    activeDates.push(new Date(today.getFullYear(), today.getMonth(), day));
  }
  return activeDates;
};

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);

  // Set dates on component mount
  useEffect(() => {
    setDates(getDatesUpToToday());
  }, []);

  // Handle date change
  const handleDateChange = (date: Date) => setSelectedDate(date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-6 text-gray-800 relative">
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">To-Do Manager</h1>
        <p className="text-gray-600 text-sm mt-2">Stay organized and track your tasks effortlessly.</p>
        <DateSelector dates={dates} selectedDate={selectedDate} onDateChange={handleDateChange} />
      </div>

      <TaskManager selectedDate={selectedDate} />
    </div>
  );
};

export default Home;
