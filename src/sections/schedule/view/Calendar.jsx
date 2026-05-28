import React from 'react';
import { add, sub, format, startOfDay, endOfMonth, startOfMonth, differenceInDays } from 'date-fns';

import { Button } from '@mui/material';

import Cell from './Cell';
import './css/Calendar.css';
import DayCell from './DayCell';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// eslint-disable-next-line react/prop-types
const Calendar = ({ value = new Date(), onChange, events }) => {
  // Your prevMonth, nextMonth, prefixDays, suffixDays, weeks, and numDays logic goes here
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange(add(value, { months: 1 }));
  const goToToday = () => onChange(startOfDay(new Date()));


  // Function to check if there are any events for a particular date
  function hasEvents(date) {
    const cellDate = new Date(value.getFullYear(), value.getMonth(), date); // Construct a new Date object with the current date
    // eslint-disable-next-line react/prop-types
    return events?.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === cellDate.toDateString();
    });
  }

  return (
    <div className="custom-container">
      <div className="custom-flex">
        <div>
          <Button onClick={goToToday}>Today</Button>
          <Button onClick={prevMonth}>Prev</Button>
          <Button onClick={nextMonth}>Next</Button>
        </div>
        <span className="custom-span">{format(value, 'LLLL yyyy')}</span>
      </div>
      <div className="custom-grid">
        <div className="">
          {weeks.map((week) => (
            <Cell className="h-2" key={week}>
              {week}
            </Cell>
          ))}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <Cell className="h-5" key={index} />
          ))}

          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isCurrentDate =
              date === new Date().getDate() && value.getMonth() === new Date().getMonth();
            return (
              <DayCell key={date} isActive={isCurrentDate} hasEvents={hasEvents(date)}>
                {date}
              </DayCell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell className="h-5" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
