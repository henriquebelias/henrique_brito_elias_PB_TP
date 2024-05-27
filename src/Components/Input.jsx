import React from 'react';
import './Input.css';

export function Input({ handleChange, value, children, id, type }) {
  return (
    <label htmlFor={id} className="input-label">
      {children}
      <input
        id={id}
        name={id}
        type={type}
        className="input-text"
        onChange={handleChange}
        value={value}
      />
    </label>
  );
}
