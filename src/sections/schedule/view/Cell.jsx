/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-body-style */
import React from 'react';

import './css/Cell.css';

// eslint-disable-next-line react/prop-types
const Cell = ({ children, className, onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={onClick} className={`custom-cell-container ${className}`}>
      {children}
    </div>
  );
};

export default Cell;
