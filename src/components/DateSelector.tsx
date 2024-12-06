import React from 'react';

// Format the date to display as "Weekday, Day"
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

interface DateSelectorProps {
  dates: Date[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ dates, selectedDate, onDateChange }) => {
  return (
    <div className="flex justify-start sm:justify-start md:justify-center mt-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 overflow-x-auto gap-3">
      {dates.map((date, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            selectedDate.toDateString() === date.toDateString()
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
          } sm:px-2 sm:py-1 lg:px-6 lg:py-3 lg:text-lg`}
          onClick={() => onDateChange(date)}
        >
          {formatDate(date)}
        </button>
      ))}
    </div>
  );
};

export default DateSelector;
