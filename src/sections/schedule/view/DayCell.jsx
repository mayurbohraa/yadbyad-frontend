/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import { useState } from 'react';

import './css/DayCell.css';
import { EventModal } from './modal';

// eslint-disable-next-line react/prop-types
const DayCell = ({ children, className, isActive = false, hasEvents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle clicking on a day in the calendar grid
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onClick={
        hasEvents.length > 0
          ? handleModal
          : () => {
              // console.log('hello');
            }
      }
      className={`custom-day-cell ${isActive && 'active-cell'} ${className}`}
    >
      <div>
        <div className="">{children}</div>
        {hasEvents.length > 0 && (
          <div className="font-bold bg-red-200 p-1 rounded-md text-sm inline">
            {hasEvents.length} Events
          </div>
        )}
      </div>
      {hasEvents.length > 0 && <div className="custom-badge">{hasEvents.length}</div>}
      {hasEvents.length > 0 && (
        <EventModal events={hasEvents} date={children} isOpen={isModalOpen} close={handleModal} />
      )}
    </div>
  );
};

export default DayCell;