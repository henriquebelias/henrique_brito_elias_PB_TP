import React from 'react';
import './Button.css';

export function Button({ children, handleClick, modal }) {
  return (
    <button className="system-button" onClick={() => handleClick(modal, true)}>
      {children}
    </button>
  );
}
